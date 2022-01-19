export class API{
    showMessage:(a:string,b:string)=>void
    constructor(showMessage:(a:string,b:string)=>void){
        this.showMessage = showMessage
    }

    fetchWithTimeout = async(resource:string, options:RequestInit = {},schema:Object = {}):Promise<any> => {    
        const controller = new AbortController();
        const id = setTimeout(() => {
            controller.abort()
            this.showMessage(`The Server is unrechable at ${this.Get_Base_URL()}. Please try again later.`,'error')
        }, 5000);
        const response = await fetch(resource, {
          ...options,
          signal: controller.signal,
          credentials: "include"  
        });
        clearTimeout(id);
        if(response.ok){
            if(response.headers.get('content-type')?.includes('json')){
                const parsedResponse = await response.json()
                    const validation = this.SchemaCheck(parsedResponse,schema)
                    if(validation.errors.length === 0)
                        return parsedResponse;
                    else
                        validation.errors.forEach((err:any)=>{
                            const ErrorString = `Server sent back an invalid response. Schema Error Message: ${err.message}. Check Logs for More Details.`
                            console.error(ErrorString)
                            console.error(validation)
                            this.showMessage(ErrorString,'error')
                        })
            }    
            else{
                const parsedResponse = await response.text()
                return parsedResponse; 
            }
        }
        else if(response.status !== undefined){
            switch(response.status){
                case 400:
                    this.showMessage('The Website sent an invalid request to the server. Check the logs for more details.','error')
                    break;
                case 401:
                    this.showMessage('You are unauthorized to access the site. Please login or contact the administrator to be given access.','error')
                    break;
                case 409:
                    this.showMessage('Unable to modify user access. Conflicts with other users.','error')
                    break;
                case 500:
                    this.showMessage('The server encountered an error. Please see log for more details.','error')
                    break;
                default:
                    this.showMessage(`Server Sent Back a Status ${response.status}. Check Logs for More Details.`,'error')
                    break;
            }
        }

        else
            return undefined
    }

    Get_Base_URL = () =>{
        let domain_name = window.location.hostname
        if(domain_name.includes('www.cs.colostate.edu'))
            return 'https://10.1.45.140/api'
        return 'http://localhost:3001/api'
    }

    SchemaCheck = (response:Object,schema:Object) =>{
        var Validator = require('jsonschema').Validator;
        var v = new Validator();
        return v.validate(response, schema)
    }
}

export default API
export class API{
    showMessage:(a:string,b:string)=>void
    constructor(showMessage:(a:string,b:string)=>void){
        this.showMessage = showMessage
    }

    fetchWithTimeout = async(resource:string, options:RequestInit = {},schema:Object = {}):Promise<any> => {    
        const controller = new AbortController();
        const id = setTimeout(() => {
            controller.abort()
            this.showMessage('Server did not Respond Within Three Seconds. Check Logs for More Details','error')
        }, 3000);
        const response = await fetch(resource, {
          ...options,
          signal: controller.signal  
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
        else if(response.status !== undefined)
            this.showMessage(`Server Sent Back a Status ${response.status}. Check Logs for More Details.`,'error')

        else
            return undefined
    }

    Get_Base_URL = () =>{
        let domain_name = window.location.hostname
        if(domain_name.includes('www.cs.colostate.edu'))
            return 'http://localhost:3001/api'
        return 'http://localhost:3001/api'
    }

    SchemaCheck = (response:Object,schema:Object) =>{
        var Validator = require('jsonschema').Validator;
        var v = new Validator();
        return v.validate(response, schema)
    }
}

export default API
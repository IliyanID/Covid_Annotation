import { connect_database } from './connect_database'
export class database {
    connection
    constructor(enviroment:'dev'|'prod'){
        if(enviroment == 'dev')
            this.connection = connect_database('localhost')
        else    
            this.connection = connect_database('')
    }

    queryDatabase = async (query:string) =>{
        return new Promise((resolve) => {
            this.connection.query(query, (err, res) => {
                
                if(res && res.rows)
                    resolve(res.rows)
                //console.log(err)
            })
          });
    }

}
import { connect_database } from './connect_database'
import mariadb from 'mariadb'
import createError from 'http-errors'

export class database {
    connection:mariadb.Pool

    error_state = false

    constructor (enviroment:'dev'|'prod'){
        try{
        if(enviroment == 'dev')
            this.handleLogin('faure')
        else    
            this.handleLogin('faure')
        }catch{}
    }

    handleLogin = async (url:string) =>{
        this.connection = await connect_database(url)
    }

    queryDatabase = async (query:string):Promise<any[]> =>{
        this.error_state = false;
        return new Promise((resolve) => {

            connect_database('faure').then(e=>e.getConnection()
            .then(conn => {
            
            conn.query(query)
                .then((rows) => {
                    if(rows)
                        resolve(rows)
                    else    
                        resolve([])
                    conn.end()
                })
                .catch(err => {
                    console.log(err)
                    conn.end();
                    this.error_state = true;
                    resolve([])
                })
                
                }).catch(err => {
                    console.log('Failed to Connect to Database')
                    this.error_state = true;
                    resolve([])
                })
            )
            
        })
    }
}
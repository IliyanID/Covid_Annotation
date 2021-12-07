import { connect_database } from './connect_database'
import mariadb from 'mariadb'
export class database {
    connection:mariadb.Pool
    constructor (enviroment:'dev'|'prod'){
        if(enviroment == 'dev')
            this.handleLogin('faure')
        else    
            this.handleLogin('faure')
    }

    handleLogin = async (url:string) =>{
        this.connection = await connect_database(url)
    }

    queryDatabase = async (query:string) =>{
        return new Promise((resolve) => {

            this.connection.getConnection()
            .then(conn => {
            
            conn.query(query)
                .then((rows) => {
                //console.log(rows);
                resolve(rows)
                conn.end()
                return rows
                })
                .catch(err => {
                //handle error
                console.log(err); 
                conn.end();
                })
                
                }).catch(err => {
                //not connected
                });
        })
    }

}
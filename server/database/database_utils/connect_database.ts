import { Client } from 'pg'
import mariadb from 'mariadb'
export const connect_database = async (url:string) =>{
    /*const client = new Client({
        user: 'iliyan',
        host: url,
        database: 'covid_tweet',
        password: '832542166',
        port: 3306,
      })
      client.connect()*/


    const connection = mariadb.createPool({
      host: 'faure.cs.colostate.edu',
        user: 'iliyan',
        password: '832542166',
        database: 'covid_tweet',
        port: 3306,
 });

    return connection
}

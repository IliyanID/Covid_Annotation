import { Client } from 'pg'
export const connect_database = (url:string) =>{
    const client = new Client({
        user: 'iliyan',
        host: url,
        database: 'covidtweet',
        password: 'password',
        port: 5432,
      })
      client.connect()

    return client
}
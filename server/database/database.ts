import { connect_database } from './connect_database'
import express from 'express'
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

            connect_database('faure').then(e=>e.getConnection()
            .then(conn => {
            
            conn.query(query)
                .then((rows) => {
                resolve(rows)
                conn.end()
                })
                .catch(err => {
                console.log(err)
                resolve(undefined)
                
                conn.end();
                })
                
                }).catch(err => {
                //not connected
                })
            )
            
        })
    }

}
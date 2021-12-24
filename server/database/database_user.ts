import { database } from './database'



export class database_user extends database{
    constructor(){
        super('dev')
    }
    login = (ename:string,eid:string) =>{

    }

    logout = (eid:number) =>{
        let eid1 = `
        UPDATE unvalidated SET eid1 = NULL WHERE
        eid1 = ${eid} AND claim1 IS NULL and stance1 IS NULL
        `

        let eid2 = `
        UPDATE unvalidated SET eid2 = NULL WHERE
        eid2 = ${eid} AND claim2 IS NULL and stance2 IS NULL
        `

        this.queryDatabase(eid1)
        this.queryDatabase(eid2)
    }

    newUser = (ename:string,eid:string) =>{
        
    }
}
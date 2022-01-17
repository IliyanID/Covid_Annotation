import { database } from './database_utils/database'



export class database_user extends database{
    constructor(){
        super('dev')
    }
    login = async (eid:string) =>{
        const checkExists = `
        SELECT * FROM users WHERE eid = ${eid}
        `
        let results:any = await this.queryDatabase(checkExists)
        if(results[0]!== undefined)
            return results[0].account_type
        
        const addNewUser = `
        INSERT INTO users (eid,account_type) VALUES (${eid},"validator")
        `
        //await this.queryDatabase(addNewUser);
        return "unauthorized"
    }

    logout = (eid:string) =>{
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
}
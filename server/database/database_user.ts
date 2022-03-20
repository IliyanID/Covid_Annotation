import { database } from './database_utils/database'
import { User_Queries } from './Queires/core_queries'


export class database_user extends database{
    queries
    constructor(){
        super('dev')
        this.queries = new User_Queries()
    }
    login = async (eid:string) =>{
        const login_queries = this.queries.login(eid)
        let results:any = await this.queryDatabase(login_queries[0])
        if(results[0]!== undefined)
            return results[0]
    
        return "unauthorized"
    }

    logout = (eid:string) =>{
        const logout_queries = this.queries.logout(eid)

        this.queryDatabase(logout_queries[0])
        this.queryDatabase(logout_queries[1])
    }
}
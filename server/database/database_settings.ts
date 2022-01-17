import { database } from "./database_utils/database";
import { JsonTocsv } from "../utils/JsonTocsv";
import { Export_Data_Queries, Import_Data_Queries, Manage_Access_Queries } from "./Queires/settings_queries";
import { unvalidated_tweet } from "../common/common_types";

export class Export_Database extends database {
    queries:Export_Data_Queries
    constructor(){
        super('dev')
        this.queries = new Export_Data_Queries()
    }

    export_data = async () =>{
        let tweetsArr = await this.queryDatabase(this.queries.export_data())
        if(!tweetsArr)
            return
        let csvTweets = JsonTocsv(tweetsArr)
        return csvTweets
    }
}

export class Import_Database extends database {
    queries:Import_Data_Queries
    constructor(){
        super('dev')
        this.queries = new Import_Data_Queries()
    }

    import_data = async (tweets:unvalidated_tweet[]) =>{
        return await this.queryDatabase(this.queries.import_data(tweets))
    }
}

export class Manage_Access_Database extends database {
    queries:Manage_Access_Queries
    constructor(){
        super('dev')
        this.queries = new Manage_Access_Queries()
    }

    get_users = async (parent_EID:string) =>{
        return await this.queryDatabase(this.queries.get_users(parent_EID))
    }

    add_user = (new_EID:string,parent_EID:string,privlidge:string) =>{
        this.queries.add_user(new_EID,parent_EID,privlidge).forEach(async (query)=>{
            await this.queryDatabase(query)
        })
    }

    delete_user = async (delete_EID:string,parent_EID:string) =>{
        await this.queryDatabase(this.queries.remove_user(delete_EID,parent_EID))
    }

}
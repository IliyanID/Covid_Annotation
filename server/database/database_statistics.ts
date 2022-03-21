import { ICondition } from "react-filter-easy";


import { database } from "./database_utils/database";
import { Dashboard_Queries, Annotated_Tweets_Queries, Incomplete_Tweets_Queries, Skipped_Tweets_Queries, User_Tweets_Goals } from "./Queires/statistics_queries";

export class Dashboard_Database extends database {
    queries:Dashboard_Queries
    constructor(){
        super('dev')
        this.queries = new Dashboard_Queries()
    }

    get_active_tweets = async () => {
        return await this.queryDatabase(this.queries.get_active_tweets())
    }  

    get_loggedin_users = async () => {
        return await this.queryDatabase(this.queries.get_loggedin_users())
    }
}

export class Annotated_Tweets_Database extends database {     
    queries:Annotated_Tweets_Queries
    constructor(){
        super('dev')
        this.queries = new Annotated_Tweets_Queries()
    }

    get_tweets = async (filters:ICondition[],limit:number) => {
        return await this.queryDatabase(this.queries.get_tweets(filters,limit))
    }
}

export class Incomplete_Tweets_Database extends database {     
    queries:Incomplete_Tweets_Queries
    constructor(){
        super('dev')
        this.queries = new Incomplete_Tweets_Queries()
    }
    
    get_tweets = async (filters:ICondition[],limit:number) => {
        return await this.queryDatabase(this.queries.get_tweets(filters,limit))
    }
}

export class Skipped_Tweets_Database extends database {     
    queries:Skipped_Tweets_Queries
    constructor(){
        super('dev')
        this.queries = new Skipped_Tweets_Queries()
    }
    
    get_tweets = async (filters:ICondition[],limit:number) => {
        return await this.queryDatabase(this.queries.get_tweets(filters,limit))
    }

    delete_tweet = async(id:string|number) => {
        return await this.queryDatabase(this.queries.delete_tweet(id))
    }
}

export class UserTweetGoalsDatabase extends database{
    queries:User_Tweets_Goals
    constructor(){
        super('dev')
        this.queries = new User_Tweets_Goals()

    }
    get_users = async(filters:ICondition[])=>{
        let result = await this.queryDatabase(this.queries.get_users(filters));
        return result
    }

    update_users = async(users:any[]) =>{

        let result 
        users.map((users,index)=>{
            result = this.queryDatabase(this.queries.update_users(users));
        }) 
        return result
    }
}
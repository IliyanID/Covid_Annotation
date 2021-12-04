import { database } from "./database"
import databaseJSON from '../database.json'

export class database_tweets extends database {
    tweets_validating = []
    tweets_validated = []
    tweets_unvalidated = databaseJSON
    constructor(){
        super('dev')
    }
    
    add_complete_tweets = (tweets,eid:number) =>{
        tweets.forEach(item=>{
            let temp = {...item,eid}
            this.tweets_validated.push(temp)
        })
    }

    skip_tweet = (tweet,eid:number) =>{
        
    }

    give_tweets = (eid:string,limit:number) =>{
        let sentData = this.tweets_unvalidated.splice(0,limit)
        sentData = sentData.map(item=>{
            return {...item,eid}
        })
        this.tweets_unvalidated.splice(0,limit)
        this.tweets_validating = this.tweets_validating.concat(sentData)
        return sentData
    }

    remove_tweets = (eid:string) =>{

    }
}
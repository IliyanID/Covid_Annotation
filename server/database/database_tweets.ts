import { database } from "./database"
import databaseJSON from '../database.json'
import { unvalidated_tweet, validated_tweet, validating_tweet } from "../common/common_types"
import { Client } from "pg"



const ADD_TWEET_VALIDATING = (tweet:validating_tweet) =>{
    let query =  `
    INSERT INTO validating(id, tweet_content, priority)
    VALUES(${tweet.id},'${tweet.tweet_content}',${tweet.priority})
    `
}

const ADD_TWEET_VALIDATED = (tweet:validated_tweet) =>{
    return `
    INSERT INTO validated(id, tweet_content, eid1,stance1, claim1)
    VALUES(${tweet.id},'${tweet.tweet_content}',${tweet.eid}, '${tweet.stance}', '${tweet.claim}')
    `
}
const GET_TWEET_UNVALIDATED = (limit:number) =>{
    return `
        SELECT * FROM unvalidated LIMIT ${limit}
    `
}

const ADD_TWEET_UNVALIDATED = (tweet:unvalidated_tweet) => {
    return `
    INSERT INTO unvalidated(id,tweet_content,priority)
    VALUES(nextval('unvalidated_seq'),'${tweet.tweet_content}',false)
    `
}

const REMOVE_TWEET_VALIDATING = (id:number) =>{
    return `
    DELETE FROM validating WHERE id == ${id} 
    `
}

export class database_tweets extends database {
    tweets_validating:validating_tweet[] = []
    tweets_validated:validated_tweet[] = []
    tweets_unvalidated:unvalidated_tweet[] = databaseJSON
    constructor(){
        super('dev')
    }
    
    add_complete_tweets = (tweets:validated_tweet[],eid:number) =>{
        tweets.forEach(item=>{
            let temp = {...item,eid}
            this.queryDatabase(ADD_TWEET_VALIDATED(temp))
            this.queryDatabase(REMOVE_TWEET_VALIDATING(temp.id))
        })
    }

    skip_tweet = (tweet:unvalidated_tweet,eid:number) =>{
        this.tweets_validating = this.tweets_validating.filter(item=>{return !(item.tweet_content === tweet.tweet_content)})
        this.tweets_unvalidated.push(tweet)
    }

    give_tweets = (eid:number,limit:number) =>{
        let sentData = this.tweets_validating.filter((item)=>{return item.eid === eid})
        if(sentData.length < limit){
            limit = limit - sentData.length
            let addedUnvalidated = this.tweets_unvalidated.splice(0,limit).map(item=>{return {...item,eid}})

            sentData = sentData.concat(addedUnvalidated)
            this.tweets_validating = this.tweets_validating.concat(addedUnvalidated)
            this.tweets_unvalidated.splice(0,limit)
        }
        sentData = sentData.map(item=>{
            return {...item,eid}
        })


        return sentData
    }

    remove_tweets = (eid:string) =>{

    }

    import_tweets = (tweets:unvalidated_tweet[]) =>{
        tweets.forEach(tweet =>{
            if(tweet.tweet_content)
                this.queryDatabase(ADD_TWEET_UNVALIDATED(tweet))
        })
    }
}
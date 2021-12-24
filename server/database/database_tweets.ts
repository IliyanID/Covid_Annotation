import { database } from "./database"
import { Request } from 'express'
import { unvalidated_tweet, validated_tweet, validating_tweet } from "../common/common_types"
import { JsonTocsv } from "../utils/JsonTocsv"
import express, { query } from "express"







const ADD_TWEET_COMPLETE = (tweet:validated_tweet,columns:string[]) =>{
    return `
    UPDATE unvalidated SET ${columns[0]} = '${tweet.claim}', ${columns[1]} = '${tweet.stance}'
    WHERE id = ${tweet.id}
    `
}

const GET_TWEETS_VALIDATING = (eid:number, limit:number) =>{
    return`
    SELECT * FROM unvalidated WHERE 
    (eid1 = ${eid} AND claim1 IS NULL AND stance1 IS NULL) 
    OR 
    (eid2 = ${eid} AND claim2 IS NULL AND stance2 IS NULL)
      LIMIT ${limit}
    `
}
const ADD_TWEET_VALIDATING = (id:number,eid:number) =>{
    return `
    UPDATE unvalidated
    SET eid1 = COALESCE(eid1,${eid}),
        eid2 =
            CASE
            WHEN eid1  = ${eid} THEN
              NULL
            ELSE
              ${eid}
            END
    WHERE id = ${id}
    `
}

const GET_TWEET_UNVALIDATED = (id:number) =>{
    return `
        SELECT * FROM unvalidated WHERE id = ${id}
    `
}
const GET_TWEETS_UNVALIDATED = (limit:number, eid:number,order:string) =>{
    return `
    SELECT * FROM unvalidated WHERE 
    (eid1 IS NULL AND eid2 IS NOT NULL AND eid2 != ${eid}) 
    OR 
    (eid2 IS NULL AND eid1 IS NOT NULL AND eid1 != ${eid}) 
    OR 
    (eid1 IS NULL AND eid2 IS NULL)
    ORDER BY ${order} LIMIT ${limit}
    `
}

const SKIP_TWEET = async(id:number,column:string,queryDatabase:any,eid:number) =>{
    const unasignRow = `
    UPDATE unvalidated SET ${column} = NULL
    WHERE id = ${id}
    `

    await queryDatabase(unasignRow);
    let assigned = await queryDatabase(GET_TWEETS_UNVALIDATED(1,eid,'RAND()'))
    assigned = assigned[0]
    let res = await queryDatabase(ADD_TWEET_VALIDATING(assigned.id,eid))
    console.log(res)
    return res
}

const ADD_TWEETS_UNVALIDATED = (tweets:unvalidated_tweet[]) => {
    let result = `INSERT INTO unvalidated(tweet_content,tweet_created) VALUES `
    result += tweets.map((tweet)=>{
        return` ('${tweet.tweet_content}','${tweet.tweet_created}') `
    }
    )
    result += ` ON DUPLICATE KEY UPDATE tweet_content=tweet_content;`
    return result
}

const GET_TWEETS_VALIDATED = () =>{
    return `
    SELECT * FROM validated
    `
}


export class database_tweets extends database {
    constructor(){
        super('dev')
    }
    

    add_complete_tweets = async (tweets:validated_tweet[],eid:number) =>{
        let response:any;
       for(let i = 0; i < tweets.length; i++){
            let item = tweets[i]
            let temp = {...item,eid}
            let unvalidatedTweet = await this.queryDatabase(GET_TWEET_UNVALIDATED(item.id)) as any
            if(unvalidatedTweet[0].eid2 === eid){
                response =  await this.queryDatabase(ADD_TWEET_COMPLETE(temp,['claim2','stance2']))
            }
            else if(unvalidatedTweet[0].eid1 === eid)
                response =  await this.queryDatabase(ADD_TWEET_COMPLETE(temp,['claim1','stance1']))
            if(!response)
                return
        }
        return response;
    }

    skip_tweet = async (tweet:unvalidated_tweet,eid:number) =>{
        let response:any = []
        
        let unvalidatedTweet = await this.queryDatabase(GET_TWEET_UNVALIDATED(tweet.id)) as any

        if(unvalidatedTweet[0].eid1 === eid)
            SKIP_TWEET(tweet.id,'eid1',this.queryDatabase,eid)
        else if (unvalidatedTweet[0].eid2 === eid)
            SKIP_TWEET(tweet.id,'eid2',this.queryDatabase,eid)
        return response
    }

    give_tweets = async (eid:number,limit:number) =>{
        let sentData = await this.queryDatabase(GET_TWEETS_VALIDATING(eid,limit)) as validating_tweet[]
        
        if(sentData.length < limit){
            limit = limit - sentData.length
            let addedUnvalidated = await this.queryDatabase(GET_TWEETS_UNVALIDATED(limit,eid,' eid1 DESC, eid2')) as validating_tweet[]
            addedUnvalidated.forEach((tweet)=>{
                this.queryDatabase(ADD_TWEET_VALIDATING(tweet.id,eid))
            })
            sentData = sentData.concat(addedUnvalidated)
        }
        sentData = sentData.map(item=>{
            return {...item,eid}
        })
   
        return sentData
    }

    remove_tweets = (eid:string) =>{

    }

    import_tweets = async (tweets:unvalidated_tweet[]) =>{
        return await this.queryDatabase(ADD_TWEETS_UNVALIDATED(tweets))
    }

    export_tweets = async() =>{
        let tweetsArr = await this.queryDatabase(GET_TWEETS_VALIDATED())
        if(!tweetsArr)
            return
        //console.log(tweetsArr)
        let csvTweets = JsonTocsv(tweetsArr)
        return csvTweets
    }
}
import { database } from "./database"
import { unvalidated_tweet, validated_tweet, validating_tweet } from "../common/common_types"
import { JsonTocsv } from "../utils/JsonTocsv"







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
const GET_TWEETS_UNVALIDATED = (limit:number, eid:number) =>{
    return `
    SELECT * FROM unvalidated WHERE 
    (eid1 IS NULL AND eid2 IS NOT NULL AND eid2 != ${eid}) 
    OR 
    (eid2 IS NULL AND eid1 IS NOT NULL AND eid1 != ${eid}) 
    OR 
    (eid1 IS NULL AND eid2 IS NULL)
    ORDER BY eid1 DESC LIMIT ${limit}
    `
}

const SKIP_TWEET = (id:number,column:string) =>{
    return `
    UPDATE unvalidated SET ${column} = NULL
    WHERE id = ${id}
    `
}

const ADD_TWEET_UNVALIDATED = (tweet:unvalidated_tweet) => {
    return `
    INSERT INTO unvalidated(tweet_content,tweet_created)
    VALUES('${tweet.tweet_content}','${tweet.tweet_created}')
    `
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
        tweets.forEach(async (item)=>{
            let temp = {...item,eid}
            let unvalidatedTweet = await this.queryDatabase(GET_TWEET_UNVALIDATED(item.id)) as any
            console.log(unvalidatedTweet.eid1)
            if(unvalidatedTweet[0].eid2 === eid){
                this.queryDatabase(ADD_TWEET_COMPLETE(temp,['claim2','stance2']))
            }
            else if(unvalidatedTweet[0].eid1 === eid)
                this.queryDatabase(ADD_TWEET_COMPLETE(temp,['claim1','stance1']))
        })
    }

    skip_tweet = async (tweet:unvalidated_tweet,eid:number) =>{
        let unvalidatedTweet = await this.queryDatabase(GET_TWEET_UNVALIDATED(tweet.id)) as any

        if(unvalidatedTweet[0].eid1 === eid)
            this.queryDatabase(SKIP_TWEET(tweet.id,'eid1'))
        else if (unvalidatedTweet[0].eid2 === eid)
            this.queryDatabase(SKIP_TWEET(tweet.id,'eid2'))
    }

    give_tweets = async (eid:number,limit:number) =>{
        let sentData = await this.queryDatabase(GET_TWEETS_VALIDATING(eid,limit)) as validating_tweet[]
        
        if(sentData.length < limit){
            limit = limit - sentData.length
            let addedUnvalidated = await this.queryDatabase(GET_TWEETS_UNVALIDATED(limit,eid)) as validating_tweet[]
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

    import_tweets = (tweets:unvalidated_tweet[]) =>{
        tweets.forEach(tweet =>{
            if(tweet.tweet_content && tweet.tweet_content !== '')
                this.queryDatabase(ADD_TWEET_UNVALIDATED(tweet))
        })
    }

    export_tweets = async() =>{
        let tweetsArr = await this.queryDatabase(GET_TWEETS_VALIDATED())
        //console.log(tweetsArr)
        let csvTweets = JsonTocsv(tweetsArr)
        return csvTweets
    }
}
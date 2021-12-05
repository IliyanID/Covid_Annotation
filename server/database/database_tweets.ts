import { database } from "./database"
import { unvalidated_tweet, validated_tweet, validating_tweet } from "../common/common_types"



const ADD_TWEET_VALIDATING = (tweet:validating_tweet) =>{
    return `
    INSERT INTO validating(id, tweet_content, priority,eid)
    VALUES(${tweet.id},'${tweet.tweet_content}',${tweet.priority},${tweet.eid})
    `
}

const REMOVE_TWEET_VALIDATING = (id:number) =>{
    return `
    DELETE FROM validating WHERE id = ${id} 
    `
}
const GET_TWEETS_VALIDATING = (eid:number) =>{
    return `
    SELECT * FROM validating WHERE eid = ${eid}
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

const REMOVE_TWEET_UNVALIDATED = (id:number) =>{
    return `
        DELETE FROM unvalidated WHERE id = ${id}
    `
}

const ADD_TWEET_UNVALIDATED = (tweet:unvalidated_tweet) => {
    return `
    INSERT INTO unvalidated(id,tweet_content,priority)
    VALUES(nextval('unvalidated_seq'),'${tweet.tweet_content}',false)
    `
}


export class database_tweets extends database {
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
        this.queryDatabase(ADD_TWEET_UNVALIDATED(tweet))
        this.queryDatabase(REMOVE_TWEET_VALIDATING(tweet.id))
    }

    give_tweets = async (eid:number,limit:number) =>{
        let sentData = await this.queryDatabase(GET_TWEETS_VALIDATING(eid)) as validating_tweet[]

        if(sentData.length < limit){
            limit = limit - sentData.length
            let addedUnvalidated = await this.queryDatabase(GET_TWEET_UNVALIDATED(limit)) as validating_tweet[]
            addedUnvalidated.forEach(tweet=>{
                this.queryDatabase(REMOVE_TWEET_UNVALIDATED(tweet.id))
            })
            sentData = sentData.concat(addedUnvalidated)
        }
        sentData = sentData.map(item=>{
            return {...item,eid}
        })

        sentData.forEach(tweet=>{
            this.queryDatabase(ADD_TWEET_VALIDATING(tweet))
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
}
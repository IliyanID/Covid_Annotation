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
        let allText = tweets.map((obj)=>{return obj.tweet_content})
        this.tweets_validating = this.tweets_validating.filter(item=>{return !allText.includes(item.tweet_content)})
    }

    skip_tweet = (tweet,eid:number) =>{
        this.tweets_validating = this.tweets_validating.filter(item=>{return !item.tweet_content === tweet.tweet_content})
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
}
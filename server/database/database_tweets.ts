import { database } from "./database"
import databaseJSON from '../database.json'
import { unvalidated_tweet, validated_tweet, validating_tweet } from "../common/common_types"

export class database_tweets extends database {
    tweets_validating:validating_tweet[] = []
    tweets_validated:validated_tweet[] = []
    tweets_unvalidated:unvalidated_tweet[] = databaseJSON
    constructor(){
        super('dev')
    }

    writeArray = (arr:any[],name:string) =>{
        var fs = require('fs');

        var file = fs.createWriteStream(`../${name}.json`);
        file.write('[\n')
        arr.forEach((obj:any,ind)=>{
            let newline = (ind=== arr.length - 1)? '\n':',\n'
            file.write(JSON.stringify(obj) + newline)
        })
        file.write(']\n')
        file.end();
            }
    writeAllArrs = () =>{
        this.writeArray(this.tweets_validating,'tweets_validating')
        this.writeArray(this.tweets_unvalidated,'tweets_unvalidated')
        this.writeArray(this.tweets_validated,'tweets_validated')
    }
    
    add_complete_tweets = (tweets:validated_tweet[],eid:number) =>{
        tweets.forEach(item=>{
            let temp = {...item,eid}
            this.tweets_validated.push(temp)

        })
        let allText = tweets.map((obj)=>{return obj.tweet_content})
        this.tweets_validating = this.tweets_validating.filter(item=>{return !allText.includes(item.tweet_content)})
        this.writeAllArrs()
    }

    skip_tweet = (tweet:unvalidated_tweet,eid:number) =>{
        this.tweets_validating = this.tweets_validating.filter(item=>{return !(item.tweet_content === tweet.tweet_content)})
        this.tweets_unvalidated.push(tweet)
        this.writeAllArrs()
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

        this.writeAllArrs()

        return sentData
    }

    remove_tweets = (eid:string) =>{

    }
}
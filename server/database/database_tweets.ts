import { database } from "./database_utils/database"
import { unvalidated_tweet, validated_tweet, validating_tweet } from "../common/common_types"
import { Tweets_Queries, User_Queries } from "./Queires/core_queries"

export class database_tweets extends database {
    queries:Tweets_Queries
    queries_user:User_Queries
    constructor(){
        super('dev')
        this.queries = new Tweets_Queries()
        this.queries_user = new User_Queries();
    }
    

    add_complete_tweets = async (tweets:any[],eid:number) =>{
        let response:any;
        let user = {tracked_tweets:0}
       for(let i = 0; i < tweets.length; i++){
            let item = tweets[i]
            let temp = {...item,eid}
            let unvalidatedTweet = await this.queryDatabase(this.queries.get_tweet_unvalidated(item.id)) as any
            if(unvalidatedTweet[0].eid2 === eid){
                response =  await this.queryDatabase(this.queries.add_tweets_complete(temp,['claim2','stance2']))
            }
            else if(unvalidatedTweet[0].eid1 === eid)
                response =  await this.queryDatabase(this.queries.add_tweets_complete(temp,['claim1','stance1']))

            let users = await this.queryDatabase(this.queries_user.getUser(eid)) as any;
            user = users[0]
            user.tracked_tweets++;
            await this.queryDatabase(this.queries_user.updated_tracked_tweets(user.tracked_tweets,eid));
            if(!response)
                return 0
        }
        return user;
    }

    skip_tweet_help = async(id:number,column:string,queryDatabase:any,eid:number) =>{
        await queryDatabase(this.queries.unasign_tweet(id,column));

        let assigned = await queryDatabase(this.queries.get_tweets_unvalidated(1,eid,'RAND()'))
        assigned = assigned[0]
        let res = await queryDatabase(this.queries.add_tweet_validating(assigned.id,eid))
        return res
    }

    skip_tweet = async (tweet:unvalidated_tweet,eid:number) =>{
        await this.queryDatabase(`INSERT IGNORE INTO skipped_tweets SELECT * FROM unvalidated WHERE id = ${tweet.id}`)

        let response:any = []
        let unvalidatedTweet = await this.queryDatabase(this.queries.get_tweet_unvalidated(tweet.id)) as any

        if(unvalidatedTweet[0].eid1 === eid){
            await this.skip_tweet_help(tweet.id,'eid1',this.queryDatabase,eid)
        }
        else if (unvalidatedTweet[0].eid2 === eid){
            await this.skip_tweet_help(tweet.id,'eid2',this.queryDatabase,eid)
        }

        return response
    }

    give_tweets = async (eid:number,limit:number) =>{
        let sentData = await this.queryDatabase(this.queries.get_tweets_validating(eid,limit)) as validating_tweet[]
        
        if(sentData.length < limit){
            limit = limit - sentData.length
            let addedUnvalidated = await this.queryDatabase(this.queries.get_tweets_unvalidated(limit,eid,' eid1 DESC, eid2')) as validating_tweet[]
            addedUnvalidated.forEach((tweet)=>{
                //assign unvalidated tweets
                this.queryDatabase(this.queries.add_tweet_validating(tweet.id,eid))
            })
            sentData = sentData.concat(addedUnvalidated)
        }
        sentData = sentData.map(item=>{
            return {...item,eid}
        })
   
        return sentData
    }
}
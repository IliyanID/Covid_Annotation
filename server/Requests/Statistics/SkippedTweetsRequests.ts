import { Request, Response} from 'express'
import { validateResponse } from '../../utils/validateResponse';
import { Express } from 'express'
import { ICondition } from 'react-filter-easy'
import { Skipped_Tweets_Database } from '../../database/database_statistics';

import getSkippedTweetsSchema from '../../Schemas/Statistics/SkippedTweets/GET_TWEET.json'
import deleteSkippedTweetSchema from '../../Schemas/Statistics/SkippedTweets/DELETE_TWEET.json'

export const skippedTweetsRequest = (app:Express) =>{
    const database = new Skipped_Tweets_Database()
    
    app.post('/api/statistics/skippedTweets',
        (req,res,next)=>validateResponse(req,res,next,getSkippedTweetsSchema),
        (req:Request,res:Response,error)=>{
        const body = req.body as {filter:ICondition[],limit:number}
        database.get_tweets(body.filter,body.limit).then(result => {
            if(database.error_state)
                return error()
            res.json(result)
        });
    })

    app.delete('/api/statistics/skippedTweets',
        (req,res,next)=>validateResponse(req,res,next,deleteSkippedTweetSchema),
        (req:Request,res:Response,error)=>{
            const body = req.body
            database.delete_tweet(body.id).then(result => {
                if(database.error_state)
                    return error()
                res.json(result)
            });
    })
    
}
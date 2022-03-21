import { Request, Response } from 'express'
import { validateResponse } from '../../utils/validateResponse';
import { Express } from 'express'
import { ICondition } from 'react-filter-easy'

import { Annotated_Tweets_Database } from '../../database/database_statistics';

import getAnnotatedTweets from '../../Schemas/Statistics/AnnotatedTweets/GET_TWEETS.json'

export const annotatedTweetsRequests = (app:Express) =>{
    const database = new Annotated_Tweets_Database()

    app.post('/api/statistics/annotatedTweets',
        (req,res,next)=>validateResponse(req,res,next,getAnnotatedTweets),
        (req:Request,res:Response,error)=>{
        const body = req.body as {filter:ICondition[],limit:number}
        database.get_tweets(body.filter,body.limit).then(result => {
            if(database.error_state)
                return error()
            
            res.json(result)
        });  
    })
}
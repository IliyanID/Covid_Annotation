import { log } from '../../utils/log'
import { NextFunction, Request, Response } from 'express'
import { database_tweets } from '../../database/database_tweets';
import { validateResponse } from '../../utils/validateResponse';
import bodyParser from 'body-parser';
import express, { Express } from 'express'
import { ICondition } from 'react-filter-easy'

import { Annotated_Tweets_Database } from '../../database/database_statistics';

import getAnnotatedTweets from '../../Schemas/Statistics/AnnotatedTweets/GET_TWEETS.json'

const database = new Annotated_Tweets_Database()


export const annotatedTweetsRequests = (app:Express) =>{
    let jsonParser = bodyParser.json()
    app.post('/api/statistics/annotatedTweets',jsonParser,(req,res,next)=>validateResponse(req,res,next,getAnnotatedTweets),(req:Request,res:Response)=>{
        log(req)
        let body = req.body as {filter:ICondition[],limit:number}
        database.get_tweets(body.filter,body.limit).then(result => res.json(result));
    })
}
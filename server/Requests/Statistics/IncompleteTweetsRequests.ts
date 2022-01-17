import { log } from '../../utils/log'
import {NextFunction, Request, Response} from 'express'
import { database_tweets } from '../../database/database_tweets';
import { validateResponse } from '../../utils/validateResponse';
import bodyParser from 'body-parser';
import express, { Express } from 'express'
import { ICondition } from 'react-filter-easy'

import { Incomplete_Tweets_Database } from '../../database/database_statistics';
import getIncompleteTweetsSchema from '../../Schemas/Statistics/IncompleteTweets/GET_TWEETS.json'

export let response:express.Response;

export const incompleteTweetsRequets = (app:Express) =>{
    let jsonParser = bodyParser.json()
    let database = new Incomplete_Tweets_Database()
    app.post('/api/statistics/incompleteTweets',jsonParser,(req,res,next)=>validateResponse(req,res,next,getIncompleteTweetsSchema),(req:Request,res:Response)=>{
        log(req)
        let body = req.body as {filter:ICondition[],limit:number}
        database.get_tweets(body.filter,body.limit).then(result => res.json(result));
    })
}
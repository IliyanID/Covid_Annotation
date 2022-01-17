import { log } from '../../utils/log'
import {NextFunction, Request, Response} from 'express'
import { database_tweets } from '../../database/database_tweets';
import { validateResponse } from '../../utils/validateResponse';
import bodyParser from 'body-parser';
import express, { Express } from 'express'
import { ICondition } from 'react-filter-easy'

import { database_statistics } from '../../database/database_statistics';

export let response:express.Response;

export const skippedTweetsRequest = (app:Express) =>{
    let jsonParser = bodyParser.json()
    let database = new database_statistics()
    app.post('/api/statistics/skippedTweets',jsonParser,(req:Request,res:Response)=>{
        log(req)
        let body = req.body as {filter:ICondition[],limit:number}
        database.get_skipped_tweets(body.filter,body.limit).then(result => res.json(result));
    })
}
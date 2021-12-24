import { log } from '../utils/log'
import {NextFunction, Request, Response} from 'express'
import { database_user } from '../database/database_user';
import { validateResponse } from '../utils/validateResponse';
import TweetsCompleteRequest from '../Schemas/TweetsCompleteRequest.json'
import TweetsSkipRequest from '../Schemas/TweetsSkipRequest.json'
import TweetsImportRequest from '../Schemas/TweetImportRequest.json'
import bodyParser from 'body-parser';
import express, { Express } from 'express'
import { csvToJson } from '../utils/csvToJson';

export let response:express.Response;

export const userRequests = (app:Express) =>{


    var jsonParser = bodyParser.json()
    let database = new database_user()
      
      app.post('/api/user/:eid',jsonParser,async(req:Request,res:Response)=>{
            log(req)
            const eid = parseInt(req.params.eid);
            database.logout(eid)
            res.send();
      })


}


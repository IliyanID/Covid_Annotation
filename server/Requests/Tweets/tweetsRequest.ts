import { log } from '../../utils/log'
import {NextFunction, Request, Response} from 'express'
import { database_tweets } from '../../database/database_tweets';
import { validateResponse } from '../../utils/validateResponse';
import TweetsCompleteRequest from '../../Schemas/TweetsCompleteRequest.json'
import TweetsSkipRequest from '../../Schemas/TweetsSkipRequest.json'
import bodyParser from 'body-parser';
import express, { Express } from 'express'


export let response:express.Response;

export const tweetsRequest = (app:Express) =>{


    var jsonParser = bodyParser.json()
      let database:database_tweets = new database_tweets()

    const buildTweet = (response:any,eid:number):any =>{
      return{
        tweet_content:response.tweet_content,
        id:response.id,
      }
    }

    app.get("/api/tweets/:eid",async (req:Request, res:Response) => {
        log(req)  
        const eid = parseInt(req.params.eid);
        const limit:any = req.query.limit
        let data = await database.give_tweets(eid,limit)
        let response:any  = data.map(item =>{return buildTweet(item,eid)})
        res.json(response);
      });
      
      app.post('/api/tweets/complete/:eid',jsonParser,(req,res,next)=>validateResponse(req,res,next,TweetsCompleteRequest),async(req:Request,res:Response)=>{
        log(req)
        const eid = parseInt(req.params.eid);
      
        let response = await database.add_complete_tweets(req.body,eid) as any
        res.send({eid:String(eid),failed_tweets:[],success:true})
      })


      app.post('/api/tweets/skip/:eid',jsonParser,(req,res,next)=>validateResponse(req,res,next,TweetsSkipRequest), async(req:Request,res:Response)=>{
        log(req)
        const eid = parseInt(req.params.eid);
        let response = await database.skip_tweet(req.body,eid)
        res.send({eid:String(eid),success:true},)
      })      
}
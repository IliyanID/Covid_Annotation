import { log } from '../utils/log'
import {NextFunction, Request, Response} from 'express'
import { database_tweets } from '../database/database_tweets';
import { validateResponse } from '../utils/validateResponse';
import TweetsCompleteRequest from '../Schemas/TweetsCompleteRequest.json'
import TweetsSkipRequest from '../Schemas/TweetsSkipRequest.json'
import TweetsImportRequest from '../Schemas/TweetImportRequest.json'
import bodyParser from 'body-parser';
import express, { Express } from 'express'
import { csvToJson } from '../utils/csvToJson';

export let response:express.Response;

export const tweetsRequest = (app:Express) =>{

    const errorMessage = {error:'Internal Database Query Error'}

    var jsonParser = bodyParser.json()
      let database:database_tweets = new database_tweets()

    const buildTweet = (response:any,eid:number):any =>{
      let priority = false;
      if(response.eid1 && response.eid1 != eid)
        priority = true
      else if(response.eid2 && response.eid2 != eid)
        priority = true
      
      return{
        tweet_content:response.tweet_content,
        id:response.id,
        priority:false
      }
    }

    app.get("/api/tweets/:eid",async (req:Request, res:Response) => {
        log(req)  
        const eid = parseInt(req.params.eid);
        const limit:any = req.query.limit
        let data = await database.give_tweets(eid,limit)
        if(!data){
          res.status(500)
          res.send(errorMessage)
          return
        }
        let response:any  = data.map(item =>{return buildTweet(item,eid)})
        res.json(response);
      });
      
      app.post('/api/tweets/complete/:eid',jsonParser,async(req:Request,res:Response)=>{
        res.status(200)
        log(req)
        const eid = parseInt(req.params.eid);
        let schema = validateResponse(req.body,TweetsCompleteRequest)
        if(!schema.valid){
          res.status(400)
          res.send(schema)
          return
        }
      
        let response = await database.add_complete_tweets(req.body,eid) as any
        console.log('response is: ' + response)
        if(!response){
          res.status(500)
          res.send(errorMessage)
          return
        }
          res.send(schema)
      })


      app.post('/api/tweets/skip/:eid',jsonParser,async(req:Request,res:Response)=>{
        log(req)
        const eid = parseInt(req.params.eid);
        let schema = validateResponse(req.body,TweetsSkipRequest)
        if(!schema.valid){
          res.status(400)
          res.send(schema)
          return
        }
      
        let response = await database.skip_tweet(req.body,eid)
        if(!response){
          res.status(500)
          res.send(errorMessage)
          return
        }
        res.send(schema)

      })

      var urlencodedParser = bodyParser.text()
      app.put('/api/tweets',urlencodedParser,async (req:Request,res:Response) =>{
        let obj = csvToJson(req.body)
        let schema = validateResponse(obj,TweetsImportRequest)
        if(!schema.valid){
          res.status(400)
          res.send(schema)
          return
        }
    
        let response = await database.import_tweets(obj)
        if(!response){
          res.status(500)
          res.send(errorMessage)
          return
        }
        res.send(obj)

        
      })

      app.get('/api/tweets',async (req:Request,res:Response) =>{
        let allTweetsObj = await database.export_tweets()
        if(!allTweetsObj){
          res.status(500)
          res.send(errorMessage)
          return
        }
        console.log(allTweetsObj)
        res.setHeader('content-type', 'text/plain');
        if(!allTweetsObj)
          allTweetsObj = ''
        res.send(allTweetsObj)
      })
}


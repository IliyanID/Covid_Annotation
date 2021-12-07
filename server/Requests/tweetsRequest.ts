import { log } from '../utils/log'
import {Request, Response} from 'express'
import { database_tweets } from '../database/database_tweets';
import { validateResponse } from '../utils/validateResponse';
import TweetsCompleteRequest from '../Schemas/TweetsCompleteRequest.json'
import TweetsSkipRequest from '../Schemas/TweetsSkipRequest.json'
import TweetsImportRequest from '../Schemas/TweetImportRequest.json'
import bodyParser from 'body-parser';
import { Express } from 'express'
import { csvToJson } from '../utils/csvToJson';

export const tweetsRequest = (app:Express) =>{
    var jsonParser = bodyParser.json()
    const database = new database_tweets()

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

        let response:any  = data.map(item =>{return buildTweet(item,eid)})
        res.json(response);
      });
      
      app.post('/api/tweets/complete/:eid',jsonParser,(req:Request,res:Response)=>{
        log(req)
        const eid = parseInt(req.params.eid);
        let schema = validateResponse(req.body,TweetsCompleteRequest)
        if(!schema.valid){
          res.status(400)
          res.send(schema)
          return
        }
      
        database.add_complete_tweets(req.body,eid)
        res.send(schema)
      })


      app.post('/api/tweets/skip/:eid',jsonParser,(req:Request,res:Response)=>{
        log(req)
        const eid = parseInt(req.params.eid);
        let schema = validateResponse(req.body,TweetsSkipRequest)
        if(!schema.valid){
          res.status(400)
          res.send(schema)
          return
        }
      
        database.skip_tweet(req.body,eid)
        res.send(schema)
      })

      var urlencodedParser = bodyParser.text()
      app.put('/api/tweets',urlencodedParser,(req:Request,res:Response) =>{
        let obj = csvToJson(req.body)
        let schema = validateResponse(obj,TweetsImportRequest)
        if(!schema.valid){
          res.status(400)
          res.send(schema)
          return
        }
    
        database.import_tweets(obj)
        res.send(obj)
      })

      app.get('/api/tweets',async (req:Request,res:Response) =>{
        let allTweetsObj = await database.export_tweets()
        console.log(allTweetsObj)
        res.setHeader('content-type', 'text/plain');
        if(!allTweetsObj)
          allTweetsObj = ''
        res.send(allTweetsObj)
      })
}


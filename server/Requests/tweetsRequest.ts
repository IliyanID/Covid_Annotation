import { log } from '../utils/log'
import {Request, Response} from 'express'
import { database_tweets } from '../database/database_tweets';
import { validateResponse } from '../utils/validateResponse';
import TweetsCompleteRequest from '../Schemas/TweetsCompleteRequest.json'
import TweetsSkipRequest from '../Schemas/TweetsSkipRequest.json'
import bodyParser from 'body-parser';
import { Express } from 'express'
import csv from 'csv-parse'
import { unvalidated_tweet } from '../common/common_types';



export const tweetsRequest = (app:Express) =>{
    var jsonParser = bodyParser.json()
    const database = new database_tweets()

    app.get("/api/tweets/:eid", (req:Request, res:Response) => {
        log(req)  
        const eid = parseInt(req.params.eid);
        const limit:any = req.query.limit
        let data = database.give_tweets(eid,limit)
        res.json(data);
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
      app.post('/api/tweets',urlencodedParser,(req:Request,res:Response) =>{
        let obj = csv(req.body)
        //console.log(obj)
        database.import_tweets(obj)
        res.send({valid:true})
      })
}

import { Request, Response} from 'express'
import { database_tweets } from '../../database/database_tweets';
import { validateResponse } from '../../utils/validateResponse';
import TweetsCompleteRequest from '../../Schemas/TweetsCompleteRequest.json'
import TweetsSkipRequest from '../../Schemas/TweetsSkipRequest.json'
import { Express } from 'express'



export const tweetsRequest = (app:Express) =>{
    const database = new database_tweets()

    const buildTweet = (response:any,eid:number):any =>{
      return{
        tweet_content:response.tweet_content,
        id:response.id,
      }
    }

    app.get("/api/tweets/:eid",async (req:Request, res:Response,error) => { 
        const eid = parseInt(req.params.eid);
        const limit:any = req.query.limit
        const data = await database.give_tweets(eid,limit)
        if(database.error_state)
          return error()

        const response:any  = data.map(item =>{return buildTweet(item,eid)})
        res.json(response);
      });
      
      app.post('/api/tweets/complete/:eid',
        (req,res,next)=>validateResponse(req,res,next,TweetsCompleteRequest),
        async(req:Request,res:Response,error)=>{
          const eid = parseInt(req.params.eid);
          
          const user = await database.add_complete_tweets(req.body,eid) as any
          if(database.error_state)
            return error()

          let tracked_tweets_percentage = 100
          if (user.tracked_tweets_goal !== 0){
            tracked_tweets_percentage = Math.floor((user.tracked_tweets/user.tracked_tweets_goal)*100)
          }
          if(tracked_tweets_percentage > 100)
            tracked_tweets_percentage = 100
          res.send({eid:String(eid),failed_tweets:[],success:true,tracked_tweets:user.tracked_tweets,tracked_tweets_percentage})
      })


      app.post('/api/tweets/skip/:eid',
        (req,res,next)=>validateResponse(req,res,next,TweetsSkipRequest), 
        async(req:Request,res:Response,error)=>{
          const eid = parseInt(req.params.eid);
          const response = await database.skip_tweet(req.body,eid)
          if(database.error_state)
            return error()

          res.send({eid:String(eid),success:true},)
      })      
}
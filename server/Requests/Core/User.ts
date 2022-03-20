import { Request, Response} from 'express'
import { database_user } from '../../database/database_user';
import { Express } from 'express'
import bcrypt from 'bcrypt'

export const userRequests = (app:Express,addSession:(eid:string,token:string)=>void,removeSession:(eid:string)=>void) =>{
    let database = new database_user()
      
      app.post('/api/user/:eid',async(req:Request,res:Response)=>{
            const eid = req.params.eid;
            database.logout(eid)
            removeSession(eid)
            res.send();
      })

      app.get('/api/user/:eid',async(req:Request,res:Response)=>{
            const eid = req.params.eid;
            let account = await database.login(eid)
            if(database.error_state){
                  res.status(500)
                  res.json({error_message:'Internal Server Error'})
            }
            else if(account === 'unauthorized'){
                  res.status(401)
                  res.send()
            }
            else{
                  const salt = await bcrypt.genSalt(5);
                  const secureToken = await bcrypt.hash(eid,salt)

                  
                  res.cookie(`token`,secureToken,{httpOnly:false,sameSite:'none',secure:true});
                  addSession(eid,secureToken)

                  let tracked_tweets_percentage = 100
                  if (account.tracked_tweets_goal !== 0){
                        tracked_tweets_percentage = Math.floor((account.tracked_tweets/account.tracked_tweets_goal) * 100)
                        console.log(tracked_tweets_percentage)
          }
                  res.send({account_type:account.account_type,eid:req.params.eid,tracked_tweets:account.tracked_tweets,tracked_tweets_percentage})
            }
      })
}
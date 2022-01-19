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
            let account_type = await database.login(eid)
            if(database.error_state){
                  res.status(500)
                  res.json({error_message:'Internal Server Error'})
            }
            else if(account_type === 'unauthorized'){
                  res.status(401)
                  res.send()
            }
            else{
                  const salt = await bcrypt.genSalt(5);
                  const secureToken = await bcrypt.hash(eid,salt)

                  
                  res.cookie(`token`,secureToken);
                  res.header('Access-Control-Allow-Origin', 'https://www.cs.colostate.edu/COVID-19TweetAnnotation/')
                  res.header('Access-Control-Allow-Credentials','true')
                  addSession(eid,secureToken)
                  res.send({account_type,eid:req.params.eid})
            }
      })
}
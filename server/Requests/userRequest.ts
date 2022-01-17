import { log } from '../utils/log'
import {NextFunction, Request, Response} from 'express'
import { database_user } from '../database/database_user';
import { validateResponse } from '../utils/validateResponse';

import bodyParser from 'body-parser';
import express, { Express } from 'express'
import bcrypt from 'bcrypt'


export let response:express.Response;

export const userRequests = (app:Express,addSession:(eid:string,token:string)=>void,removeSession:(eid:string)=>void) =>{


    var jsonParser = bodyParser.json()
    let database = new database_user()
      
      app.post('/api/user/:eid',jsonParser,async(req:Request,res:Response)=>{
            log(req)
            const eid = req.params.eid;
            database.logout(eid)
            removeSession(eid)
            res.send();
      })

      app.get('/api/user/:eid',async(req:Request,res:Response)=>{
            log(req)
            const eid = req.params.eid;
            let account_type = await database.login(eid)

            if(account_type === 'unauthorized'){
                  res.status(401)
                  res.send()
            }
            else{
                  const salt = await bcrypt.genSalt(5);
                  const secureToken = await bcrypt.hash(eid,salt)

                  
                  res.cookie(`token`,secureToken);
                  addSession(eid,secureToken)
                  res.send({account_type,eid:req.params.eid})
            }
      })
}
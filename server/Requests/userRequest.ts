import { log } from '../utils/log'
import {NextFunction, Request, Response} from 'express'
import { database_user } from '../database/database_user';
import { validateResponse } from '../utils/validateResponse';
import bodyParser from 'body-parser';
import express, { Express } from 'express'

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

      app.get('/api/user/:eid',async(req:Request,res:Response)=>{
            log(req)
            const eid = parseInt(req.params.eid);
            let account_type = await database.login(eid)
            res.send({account_type,eid:req.params.eid})
      })

      app.get('/api/user/:eid',async(req:Request,res:Response)=>{
            log(req)
            const eid = parseInt(req.params.eid);
            let accountType = await database.login(eid)
            res.send({accountType})
      })

      
      
      app.get('/api/user/parent/:eid',async(req:Request,res:Response)=>{
            log(req)
            const eid = parseInt(req.params.eid);
            let parent_users = await database.get_parent_users(eid)
            res.send(parent_users)
      })

      app.put('/api/user/parent/:eid',jsonParser,async(req:Request,res:Response)=>{
            log(req)
            const eid = parseInt(req.params.eid);
            database.logout(eid)
            res.send();
      })

      app.post('/api/user/parent/:eid',jsonParser,async(req:Request,res:Response)=>{

            log(req)
            const eid = parseInt(req.params.eid);
            const parent_eid = req.body.eid
            database.add_parent_user(eid,req.body.eid)
            res.send(
                  {
                        added_eid:String(eid),
                        privlidge:req.body.privlidge,
                        parent_eid:String(parent_eid),
                        success:true
                  }
            );
      })
      
      app.delete('/api/user/parent/:eid',jsonParser,async(req:Request,res:Response)=>{

            log(req)
            const eid = parseInt(req.params.eid);
            const delete_eid = req.body.eid
            database.delete_parent_user(eid,delete_eid)
            res.send(
                  {
                        deleted_eid:String(delete_eid),
                        parent_eid:String(eid),
                        success:true
                  }
            );
      })




}


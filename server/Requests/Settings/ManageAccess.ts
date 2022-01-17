import { Express, Request, Response } from 'express'
import bodyParser from 'body-parser';

import { log } from '../../utils/log'
import { Manage_Access_Database } from '../../database/database_settings'
import { validateResponse } from '../../utils/validateResponse';

import addUserSchema from '../../Schemas/Settings/ManageAccess/ADD_USER.json'
import deleteUserSchema from '../../Schemas/Settings/ManageAccess/DELETE_USER.json'

export const manageAccessRequests = (app:Express) =>{
    var jsonParser = bodyParser.json() 
    const database = new Manage_Access_Database()

    app.get('/api/user/parent/:eid',async(req:Request,res:Response)=>{
        log(req)
        const parent_EID = req.params.eid;
        const parent_users = await database.get_users(parent_EID)
        res.send(parent_users)
  })

  app.put('/api/user/parent/:eid',jsonParser,async(req:Request,res:Response)=>{
        log(req)
        res.send();
  })

  app.post('/api/user/parent/:eid',jsonParser,(req,res,next)=>validateResponse(req,res,next,addUserSchema),async(req:Request,res:Response)=>{

        log(req)
        const new_EID = req.params.eid;
        const parent_EID = req.body.eid;
        const privlidge = req.body.privlidge
        database.add_user(parent_EID,new_EID,privlidge)
        res.send(
              {
                    added_eid:String(new_EID),
                    privlidge:privlidge,
                    parent_eid:String(parent_EID),
                    success:true
              }
        );
  })
  
  app.delete('/api/user/parent/:eid',jsonParser,(req,res,next)=>validateResponse(req,res,next,deleteUserSchema),async(req:Request,res:Response)=>{
        log(req)
        const parent_EID = req.params.eid;
        const delete_EID = req.body.eid
        database.delete_user(delete_EID,parent_EID)
        res.send(
              {
                    deleted_eid:String(delete_EID),
                    parent_eid:String(parent_EID),
                    success:true
              }
        );
  })
}
    
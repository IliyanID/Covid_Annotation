import { Express, Request, Response } from 'express'
import { Manage_Access_Database } from '../../database/database_settings'
import { validateResponse } from '../../utils/validateResponse';

import addUserSchema from '../../Schemas/Settings/ManageAccess/ADD_USER.json'
import deleteUserSchema from '../../Schemas/Settings/ManageAccess/DELETE_USER.json'

export const manageAccessRequests = (app:Express) =>{
      const database = new Manage_Access_Database()

      app.get('/api/user/parent/:eid',async(req:Request,res:Response,error)=>{
            const parent_EID = req.params.eid;
            database.get_users(parent_EID).then(response => {
                  if(database.error_state)
                        return error()
                  res.json(response)
            })
      })

      app.put('/api/user/parent/:eid',async(req:Request,res:Response)=>{
            res.send();
      })

      app.post('/api/user/parent/:eid',
            (req,res,next)=>validateResponse(req,res,next,addUserSchema),
            async(req:Request,res:Response,error)=>{
                  const new_EID = req.body.eid;
                  const parent_EID = req.body.parent;
                  const privlidge = req.body.privlidge;

                  const admin_accounts = await database.get_admins()
                  //If the parent is not an admin
                  console.log(admin_accounts.some(account => account.eid == parseInt(parent_EID)))
                  if(!admin_accounts.some(account => account.eid == parseInt(parent_EID))){
                        res.status(401)
                        return res.send()
                  }

                  //If the new user is already an admin
                  if(admin_accounts.some(account => account.eid === parseInt(new_EID))){
                        res.status(409)
                        return res.send()
                  }

                  database.add_user(new_EID,parent_EID,privlidge).then(response => {
                        if(database.error_state)
                              return error()
                        res.send(
                              {
                                    added_eid:String(new_EID),
                                    privlidge:privlidge,
                                    parent_eid:String(parent_EID),
                              }
                        );
                  })
      })
  
      app.delete('/api/user/parent/:eid',
            (req,res,next)=>validateResponse(req,res,next,deleteUserSchema),
            async(req:Request,res:Response,error)=>{
                  const parent_EID = req.params.eid;
                  const delete_EID = req.body.eid

                  const admin_accounts = await database.get_admins()
                  //If the parent is not an admin
                  if(!admin_accounts.some(account => account.eid == parseInt(parent_EID))){
                        res.status(401)
                        return res.send()
                  }

                  const all_users = await database.get_all_users()
                  //If Admin is not the parent of deleted user
                  if(!all_users.some(user=>(user.eid === parseInt(delete_EID) && user.parent === parseInt(parent_EID)))){
                        res.status(409)
                        return res.send()
                  }

                  database.delete_user(delete_EID,parent_EID).then(response => {
                        if(database.error_state)
                              return error()
                        res.send(
                              {
                                    deleted_eid:String(delete_EID),
                                    parent_eid:String(parent_EID),
                                    success:true
                              }
                        );
                  })
            })
}
    
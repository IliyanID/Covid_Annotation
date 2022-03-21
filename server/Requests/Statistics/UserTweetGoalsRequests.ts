import { Request, Response} from 'express'
import { validateResponse } from '../../utils/validateResponse';
import { Express } from 'express'
import { ICondition } from 'react-filter-easy'
import { UserTweetGoalsDatabase } from '../../database/database_statistics';

import getUsersSchema from '../../Schemas/Statistics/UserTweetGoals/GET_USERS.json'
import clearGoalSchema from '../../Schemas/Statistics/UserTweetGoals/CLEAR_GOALS.json'
import updateGoalSchema from '../../Schemas/Statistics/UserTweetGoals/UPDATE_GOALS.json'


export const UserTweetsGoalRequests = (app:Express) =>{
    const database = new UserTweetGoalsDatabase()
    app.post('/api/statistics/usertweetgoals/users',
        (req,res,next)=>validateResponse(req,res,next,getUsersSchema),
        (req:Request,res:Response,error)=>{
        const filter = req.body as ICondition[]
        database.get_users(filter).then((result:any) => {
            if(database.error_state)
                return error()
            let response = []
            for(let user of result){
                response.push({eid:user.eid,tweets_completed:user.tracked_tweets,tweets_completed_goal:user.tracked_tweets_goal})
            }
            res.json(response)
        });
    })


    app.put('/api/statistics/usertweetgoals/users',
        (req,res,next)=>validateResponse(req,res,next,updateGoalSchema),
        (req:Request,res:Response,error)=>{
        
        database.update_users (req.body).then((result:any) => {
            if(database.error_state)
                return error()
            
            res.json(result)
        });
    })


 
    
}
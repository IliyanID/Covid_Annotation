import { Request, Response} from 'express'
import { validateResponse } from '../../utils/validateResponse';
import { Express } from 'express'
import { ICondition } from 'react-filter-easy'

import { Incomplete_Tweets_Database } from '../../database/database_statistics';
import getIncompleteTweetsSchema from '../../Schemas/Statistics/IncompleteTweets/GET_TWEETS.json'

export const incompleteTweetsRequets = (app:Express) =>{
    const database = new Incomplete_Tweets_Database()
    
    app.post('/api/statistics/incompleteTweets',
        (req,res,next)=>validateResponse(req,res,next,getIncompleteTweetsSchema),
        (req:Request,res:Response,error)=>{
        let body = req.body as {filter:ICondition[],limit:number}
        database.get_tweets(body.filter,body.limit).then(result =>{
            if(database.error_state)
                error() 
            res.json(result)});
    })
}
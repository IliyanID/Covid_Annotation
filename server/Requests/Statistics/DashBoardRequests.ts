import { Request, Response} from 'express'
import { Express } from 'express'

import { Dashboard_Database } from '../../database/database_statistics';


export const dashBoardRequests = (app:Express) =>{
    const database = new Dashboard_Database()
    app.get('/api/statistics/dashboard/loggedin',(req:Request,res:Response,error)=>{
        database.get_loggedin_users().then((users:any)=>{
            if(database.error_state)
                return error()

            let response:any[] = [];
            users.map((row:any)=>{
                Object.keys(row).map((a)=>{
                    let data = row[a]
                    if(data !== null && !response.includes(data))
                        response.push(row[a])
                })
            }) 
            res.json(response) 
        })
    })

    app.get('/api/statistics/dashboard/activeTweets', (req:Request,res:Response,error)=>{
        database.get_active_tweets().then((users:any)=>{
            if(database.error_state)
                return error()

            let response:any[] = [];
            users.map((row:any)=>{
                if(row.eid1 !== null && row.claim1 === null)
                    response.push({id:row.id,tweet_content:row.tweet_content,reviewer:row.eid1})
                if(row.eid2 !== null && row.claim2 === null)
                    response.push({id:row.id,tweet_content:row.tweet_content,reviewer:row.eid2})

            }) 
            res.json(response) 
        })
    })
}
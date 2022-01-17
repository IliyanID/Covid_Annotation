import { log } from '../../utils/log'
import {NextFunction, Request, Response} from 'express'
import { database_tweets } from '../../database/database_tweets';
import { validateResponse } from '../../utils/validateResponse';
import bodyParser from 'body-parser';
import express, { Express } from 'express'
import { ICondition } from 'react-filter-easy'

import { Dashboard_Database } from '../../database/database_statistics';

export let response:express.Response;

export const dashBoardRequests = (app:Express) =>{
    let jsonParser = bodyParser.json()
    const database = new Dashboard_Database()
    app.get('/api/statistics/dashboard/loggedin',(req:Request,res:Response)=>{
        log(req)
        database.get_loggedin_users().then((users:any)=>{
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

    app.get('/api/statistics/dashboard/activeTweets',jsonParser,(req:Request,res:Response)=>{
        log(req)
        database.get_active_tweets().then((users:any)=>{
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
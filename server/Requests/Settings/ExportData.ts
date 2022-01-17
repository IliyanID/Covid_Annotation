import { log } from '../../utils/log'
import { Request, Response } from 'express'
import { validateResponse } from '../../utils/validateResponse';
import bodyParser from 'body-parser';
import express, { Express } from 'express'

import { Export_Database } from '../../database/database_settings';

export const exportDataRequests = (app:Express) =>{
  let jsonParser = bodyParser.json()
  const database = new Export_Database()
  app.get('/api/tweets',async (req:Request,res:Response) =>{
    log(req)
    let allTweetsCSV = await database.export_data()

    res.setHeader('content-type', 'text/plain');
    if(!allTweetsCSV)
      allTweetsCSV = ''
    res.send(allTweetsCSV)
  })
}
    
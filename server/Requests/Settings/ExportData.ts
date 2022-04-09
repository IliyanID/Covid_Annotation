import { Request, Response } from 'express'
import { Express } from 'express'

import { Export_Database } from '../../database/database_settings';

export const exportDataRequests = (app:Express) =>{
  const database = new Export_Database()

  app.get('/api/tweets', (req:Request,res:Response,error) =>{
    let dataType = req.query.dataType as string;
    database.export_data(dataType).then(allTweetsCSV => {
      if(database.error_state)
        return error()
      res.setHeader('content-type', 'text/plain');
      res.send(allTweetsCSV)
    })
  })

  app.delete('/api/tweets', (req:Request,res:Response,error) =>{
    let dataType = req.query.dataType as string;
    dataType = dataType.toLowerCase();
    database.delete_database(dataType).then(() => {
      if(database.error_state)
        return error()
      res.setHeader('content-type', 'text/plain');
      res.send({success:true})
    })
  })
}
    
import express, {Request, Response } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import { validateResponse } from './validateResponse'
import database from './database.json'

import TweetsCompleteRequest from './Schemas/TweetsCompleteRequest.json'

const PORT = process.env.PORT || 3001;

const app = express()
var jsonParser = bodyParser.json()

let activeSearchDatabase = []

const log = (req:Request) =>{
  console.log(`${req.method} ${req.url}`)
  if(req.body)
    console.log(req.body)
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get("/api/tweets/:eid", (req:Request, res:Response) => {
  log(req)


  const eid = req.params.eid;
  const limit:any = req.query.limit
  let sentData = database.splice(0,limit)
  database.splice(0,limit)
  activeSearchDatabase = activeSearchDatabase.concat(sentData)
  res.json(sentData);
});

app.post('/api/tweets/complete/:eid',jsonParser,(req:Request,res:Response)=>{
  log(req)
  let schema = validateResponse(req.body,TweetsCompleteRequest)
  if(schema.valid){
    res.status(200)
    res.send()
  }
  else{
    res.status(400)
    res.send(schema)
  }
})
import express, {Request, Response } from 'express';
import cors from 'cors'
import { tweetsRequest } from './Requests/tweetsRequest';

import TweetsCompleteRequest from './Schemas/TweetsCompleteRequest.json'

const PORT = process.env.PORT || 3001;

const app = express()

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

tweetsRequest(app)


import express, {Request, Response } from 'express';
import cors from 'cors'
import { tweetsRequest } from './Requests/tweetsRequest';
import { userRequests } from './Requests/userRequest';
import { annotatedTweetsRequests } from './Requests/Statistics/AnnotatedTweetsRequests';
import { dashBoardRequests } from './Requests/Statistics/DashBoardRequests';

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
  origin: true,
}));

tweetsRequest(app)
userRequests(app)
dashBoardRequests(app)
annotatedTweetsRequests(app)


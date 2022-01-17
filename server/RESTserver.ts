import express, {Request, Response } from 'express';
import cors from 'cors'
import cookieparser from 'cookie-parser'
import helmet from 'helmet'

import { importDataRequests } from './Requests/Settings/ImportData';
import { exportDataRequests } from './Requests/Settings/ExportData';
import { manageAccessRequests } from './Requests/Settings/ManageAccess';
import { annotatedTweetsRequests } from './Requests/Statistics/AnnotatedTweetsRequests';
import { dashBoardRequests } from './Requests/Statistics/DashBoardRequests';
import { incompleteTweetsRequets } from './Requests/Statistics/IncompleteTweetsRequests';
import { skippedTweetsRequest } from './Requests/Statistics/SkippedTweetsRequests';
import { tweetsRequest } from './Requests/Tweets/tweetsRequest';
import { userRequests } from './Requests/userRequest';


const PORT = process.env.PORT || 3001;

const app = express()

let activeSessions:{eid:string,token:string}[] = []

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
  credentials:true
}));

app.use(cookieparser())
app.use(helmet())

const addCookie = (eid:string,token:string) => {
  removeCookie(eid)
  activeSessions.push({eid:eid,token:token})
}

const removeCookie = (eid:string) => {
  activeSessions = activeSessions.filter(session => session.eid !== eid)
}

userRequests(app,addCookie,removeCookie)
app.use((req,res,next)=>{
  let validToken = false;
  activeSessions.forEach((sessions)=>{
    if(sessions.token === req.cookies.token)
      validToken = true
  })

  if(validToken)
    next()
  else{
    res.status(401)
    res.send();
  }
})

importDataRequests(app)
exportDataRequests(app)
manageAccessRequests(app)
annotatedTweetsRequests(app)
dashBoardRequests(app)
incompleteTweetsRequets(app)
skippedTweetsRequest(app)
tweetsRequest(app)
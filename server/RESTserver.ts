import express, { Errback, Request, Response } from 'express';
import cors from 'cors'
import cookieparser from 'cookie-parser'
import helmet from 'helmet'
import bodyParser from 'body-parser';
import https from 'https'
import http from 'http'
import fs from 'fs'

import { manageSessions } from './manageSessions';
import { importDataRequests } from './Requests/Settings/ImportData';
import { exportDataRequests } from './Requests/Settings/ExportData';
import { manageAccessRequests } from './Requests/Settings/ManageAccess';
import { annotatedTweetsRequests } from './Requests/Statistics/AnnotatedTweetsRequests';
import { dashBoardRequests } from './Requests/Statistics/DashBoardRequests';
import { incompleteTweetsRequets } from './Requests/Statistics/IncompleteTweetsRequests';
import { skippedTweetsRequest } from './Requests/Statistics/SkippedTweetsRequests';
import { tweetsRequest } from './Requests/Core/Tweets';
import { UserTweetsGoalRequests } from './Requests/Statistics/UserTweetGoalsRequests'

let PORT = process.env.PORT || 443;
//PORT = 8000
const app = express()
/*app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});*/
if(PORT === 443){
https
  .createServer(
    {
      key: fs.readFileSync("covid-19.cs.colostate.edu.key"),
      cert: fs.readFileSync("covid-19tweetannotation_cs_colostate_edu_cert.cer"),
    },
    app
  )
  .listen(PORT, function () {
    console.log(
      `Server listening on port ${PORT}`
    );
  });}
if(PORT === 443){
  PORT = 80
}
http.createServer(app).listen(PORT,()=>{
  console.log(`Server listening on port ${PORT}`)
})

//Requires the use of credentials
app.use(cors({
  origin: true,
  credentials:true
}));


//Used for logging each request
app.use((req,res,next)=>{
  console.log(`${req.method} ${req.url}`)
  console.log(JSON.stringify(req.headers))
  if(req.body)
    console.log(req.body)

  console.log()

  next()
})


//Requests for Importing data into the database
//It's here because the client doesn't want to send the auth token when uploading data
importDataRequests(app)

//Convert all of the data to plain text and increase the limit
//The limit is set so the user uploading large amounts of data into the database
app.use(bodyParser.json({type:"text/plain",limit:"5000mb"}))
app.use(cookieparser())
app.use(helmet())

//This checks the credentials of every request
//If the request is invalid it will block it
manageSessions(app)
exportDataRequests(app)



manageAccessRequests(app)
annotatedTweetsRequests(app)
dashBoardRequests(app)
incompleteTweetsRequets(app)
skippedTweetsRequest(app)
tweetsRequest(app)
UserTweetsGoalRequests(app)


//When the server errors out
app.use((req,res)=>{
  console.error('Server Sent Back a Error 500')
  res.status(500)
  res.json({error_message:'Internal Server Error'})
})
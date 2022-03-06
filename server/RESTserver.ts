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

let PORT = process.env.PORT || 443;
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

app.use(cors({
  origin: true,
  credentials:true
}));

app.use((req,res,next)=>{
  console.log(`${req.method} ${req.url}`)
  console.log(JSON.stringify(req.headers))
  if(req.body)
    console.log(req.body)

  console.log()

  next()
})

importDataRequests(app)


app.use(bodyParser.json({type:"text/plain",limit:"50mb"}))
app.use(cookieparser())
app.use(helmet())

manageSessions(app)
exportDataRequests(app)






manageAccessRequests(app)
annotatedTweetsRequests(app)
dashBoardRequests(app)
incompleteTweetsRequets(app)
skippedTweetsRequest(app)
tweetsRequest(app)

app.use((req,res)=>{
  console.error('Server Sent Back a Error 500')
  res.status(500)
  res.json({error_message:'Internal Server Error'})
})
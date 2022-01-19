import express, { Errback, Request, Response } from 'express';
import cors from 'cors'
import cookieparser from 'cookie-parser'
import helmet from 'helmet'
import bodyParser from 'body-parser';

import { manageSessions } from './manageSessions';
import { importDataRequests } from './Requests/Settings/ImportData';
import { exportDataRequests } from './Requests/Settings/ExportData';
import { manageAccessRequests } from './Requests/Settings/ManageAccess';
import { annotatedTweetsRequests } from './Requests/Statistics/AnnotatedTweetsRequests';
import { dashBoardRequests } from './Requests/Statistics/DashBoardRequests';
import { incompleteTweetsRequets } from './Requests/Statistics/IncompleteTweetsRequests';
import { skippedTweetsRequest } from './Requests/Statistics/SkippedTweetsRequests';
import { tweetsRequest } from './Requests/Core/Tweets';

const PORT = process.env.PORT || 3001;
const app = express()
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(cors({
  origin: true,
  credentials:true
}));

app.use(bodyParser.json())
app.use(cookieparser())
app.use(helmet())

manageSessions(app)
importDataRequests(app)
exportDataRequests(app)


app.use((req,res,next)=>{
  console.log(`${req.method} ${req.url}`)
  if(req.body)
    console.log(req.body)
  console.log()

  next()
})

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
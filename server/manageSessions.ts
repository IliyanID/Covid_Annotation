import { Express } from 'express'
import { userRequests } from './Requests/Core/User'

export const manageSessions = (app:Express) => {
    let activeSessions:{eid:string,token:string}[] = []
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

        if(req.url === '/api/tweets' && req.method === 'POST')
          validToken = true
      
        if(validToken)
          next()
        else{
          res.status(401)
          res.send(req.cookies);
        }
      })
}
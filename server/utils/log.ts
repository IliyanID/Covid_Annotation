import {Request } from 'express';
export const log = (req:Request) =>{
    console.log(`${req.method} ${req.url}`)
    if(req.body)
      console.log(req.body)
}

export default log;
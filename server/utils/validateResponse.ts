import Ajv from 'ajv'
import { Request, Response, NextFunction } from 'express'


export const validateResponse = (req:Request,res:Response,next:NextFunction,schema:Object) => {
    const ajv = new Ajv({allErrors:true})
    ajv.validate(schema,req.body)
    if(ajv.errors){
        res.status(400)
        console.log(req.body)
        console.error(ajv.errors)
        res.json(ajv.errors)
    }
    else
        next()
}
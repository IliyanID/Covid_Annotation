import { log } from '../../utils/log'
import {NextFunction, Request, Response } from 'express'
import { validateResponse } from '../../utils/validateResponse';
import bodyParser from 'body-parser';
import { Express } from 'express'

import { Import_Database } from '../../database/database_settings';
import { csvToJson } from '../../utils/csvToJson';
import importTweetsSchema from '../../Schemas/Settings/IMPORT_TWEETS.json'

const multer  = require('multer');
const os = require('os')
const fs = require('fs')

export const importDataRequests = (app:Express) =>{
    const database = new Import_Database();
    const upload = multer({ dest: os.tmpdir() });
    
    app.post('/api/tweets',upload.single('file'), async (req:any,res:Response) =>{
        fs.readFile(req.file.path,'utf8', async function (err:any, fileData:any) {
            const parsedObj = csvToJson(fileData)
            validateResponse(req,res,()=>{
                database.import_data(parsedObj)
                res.json(parsedObj)
            },importTweetsSchema)
        })
    })
}
    
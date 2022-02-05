import { Request, Response } from 'express'
import { validateResponse } from '../../utils/validateResponse';
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
    
    app.post('/api/tweets'/*,upload.single('file')*/, async (req:any,res:Response,error) =>{
        /*fs.readFile(req.file.path,'utf8', async function (err:any, fileData:any) {
            const parsedObj = csvToJson(fileData)
            validateResponse({body:parsedObj} as Request,res,()=>{
                database.import_data(parsedObj).then(response=>{
                    if(database.error_state)
                        return error()
                    res.json(parsedObj)
                })
            },importTweetsSchema)
        })*/

        console.log(req)
        const parsedObj = csvToJson(req.body.text())
            validateResponse({body:parsedObj} as Request,res,()=>{
                database.import_data(parsedObj).then(response=>{
                    if(database.error_state)
                        return error()
                    res.json(parsedObj)
                })
            },importTweetsSchema)
    })
}
    
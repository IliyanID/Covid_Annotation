import React from 'react'
import { globalProps } from '../../common_types'
import { API_Export_Tweets } from '../../utils/API/APISettings'

import { Button } from 'reactstrap'

let api:API_Export_Tweets
export const Export = (props:globalProps) =>{
    api = new API_Export_Tweets(props.showMessage)
    return <div>
                <Button style={{marginTop:'20px'}} onClick={handleExport}>Export Validated Tweets as CSV File</Button>
            </div>
}

const handleExport = async () =>{
    var fileDownload = require('js-file-download');
    api.API_EXPORT((fileContents)=>{
        const d = new Date();
        let date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDay() + 'T' + d.getHours() + "_" + d.getMinutes();
        fileDownload(fileContents,  date + 'Annotated_Tweets.csv');  
    })
}

export default Export;
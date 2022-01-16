import React from 'react'
import { API_EXPORT } from '../../utils/API'
import { globalProps } from '../../common_types'

import { Button } from 'reactstrap'


export const Export = (props:globalProps) =>{
    return <div>
                <Button style={{marginTop:'20px'}} onClick={handleExport}>Export Validated Tweets as CSV File</Button>
            </div>
}

const handleExport = async () =>{
    var fileDownload = require('js-file-download');
    let csv = await API_EXPORT()
    const d = new Date();
    let date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDay() + 'T' + d.getHours() + "_" + d.getMinutes();
    fileDownload(csv,  date + 'Annotated_Tweets.csv');
}

export default Export;
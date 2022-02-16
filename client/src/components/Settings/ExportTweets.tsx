import React, { useState } from 'react'
import { globalProps } from '../../common_types'
import { API_Export_Tweets } from '../../utils/API/APISettings'

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import useToggle from '../../hooks/useToggle'

let api:API_Export_Tweets

const ExportOptions = [
    {
        data:'none',
        text:'Export Options'
    },
    {
        data:'validated',
        text:'Export Validated Tweets'
    },
    {
        data:'partial',
        text:'Export Partially Completed Tweets'
    },
    {
        data:'skipped',
        text:'Export Skipped Tweets'
    },
]

const ExportDataType = [
    {
        data:'none',
        text:'Export Data Type'
    },
    {
        data:'csv',
        text:'CSV'
    }
]

export const Export = (props:globalProps) =>{
    api = new API_Export_Tweets(props.showMessage)
    const [dropdown,toggleDropdown] = useToggle(false)
    const [selectedOption,setSelectedOption] = useState(0)
    return <div
        style={{width:'500px',margin:'auto'}}
    >
                <Dropdown isOpen={dropdown} toggle={toggleDropdown}>
                    <DropdownToggle caret
                    style={{minWidth:'300px',float:'right'}}
                    >
                    {ExportOptions[selectedOption].text}
                    </DropdownToggle>
                    <DropdownMenu>
                        {
                            ExportOptions.map((item,index)=>{
                                if(index === 0)
                                    return <></>
                                return <DropdownItem
                                        onClick={()=>{setSelectedOption(index)}}
                                        
                                    >
                                    {item.text}
                                </DropdownItem>
                            })
                        }
                    </DropdownMenu>
                </Dropdown>
                <Button color='primary' disabled={selectedOption === 0} style={{marginTop:'0px',float:'left'}} onClick={()=>handleExport(selectedOption)}>Export Tweets</Button>
            </div>
}

const handleExport = async (selectedOption:number) =>{
    let data = ExportOptions[selectedOption].data
    var fileDownload = require('js-file-download');
    api.API_EXPORT(data,(fileContents)=>{
        const d = new Date();
        let date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDay() + 'T' + d.getHours() + "_" + d.getMinutes();
        fileDownload(fileContents,  date + `${data}_Tweets.csv`);  
    })
}

export default Export;
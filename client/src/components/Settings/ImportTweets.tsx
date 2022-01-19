import React from 'react'
import { globalProps } from '../../common_types'
import { API_Import_Tweets } from '../../utils/API/APISettings'

import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader'
import { Table } from 'reactstrap' 

export const Import = (props:globalProps) =>{
    const getUploadParams: IDropzoneProps['getUploadParams'] = () => { return { url: new API_Import_Tweets(props.showMessage).Get_Base_URL() +'/tweets' } }
  

    // called every time a file's `status` changes
    const handleChangeStatus: IDropzoneProps['onChangeStatus'] = ({ meta, file, remove }, status) => { 
        if(status ==='done'){
            remove()
            props.showMessage('Tweets Succesfully Imported','info')
        }
        else if(status === 'error_upload'){
            remove()
            props.showMessage('File Validation Failed. Check Logs for more Details','error')
        }
    }
    
    return (
    <div>

      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        SubmitButtonComponent={()=>{return null}}
        accept=".csv"
        styles={{dropzone: {minHeight: 200, maxHeight: 250 } }}
        inputContent='Click or Drag and Drop CSV File'
      />
      <br/>
      <h5>Required CSV Row Titles</h5>
      <Table>
      <tbody>
                    <tr>
                        <td>tweet_created</td>
                        <td>id</td>
                        <td>tweet_content</td>
                    </tr>
                    </tbody>
      </Table>
      </div>
    )
}

export default Import;
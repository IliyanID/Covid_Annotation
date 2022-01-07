import React, { useState, useEffect } from 'react'
import { Table, Button, Input } from 'reactstrap'
import '../../static/css/SettingsContainer.css'
import { globalProps, tweet, tweetDefaultValidated } from '../../common_types'
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader'
import { Get_Base_URL ,API_EXPORT, API_GET_USERS_PARENT, API_DELETE_USERS_PARENT, API_ADD_USERS_PARENT  } from '../../utils/API'
import { Pages } from '../../containers/App'
import { MdOutlineEditNote } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'


const handleExport = async () =>{
    var fileDownload = require('js-file-download');
    let csv = await API_EXPORT()
    const d = new Date();
    let date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDay() + 'T' + d.getHours() + "_" + d.getMinutes();
    console.log(date)
    fileDownload(csv,  date + 'Annotated_Tweets.csv');
}

const ImportExport = (props:any) =>{
    const getUploadParams: IDropzoneProps['getUploadParams'] = () => { return { url: Get_Base_URL()+'/tweets' } }
  

    // called every time a file's `status` changes
    const handleChangeStatus: IDropzoneProps['onChangeStatus'] = ({ meta, file, remove }, status) => { 
       console.log(status)
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
        inputContent='Drag and Drop CSV File'
      />
        <Button style={{marginTop:'20px'}} onClick={handleExport}>Export Validated Tweets as CSV File</Button>
      </div>
    )
}



const ManageAccess = (props:globalProps) =>{
   
    const [users,setUsers] = useState([])
    const updateList = () =>{
        API_GET_USERS_PARENT({eid:props.eid}).then((res)=>{
            setUsers(res)
        })
    }
    useEffect(()=>{
        updateList()
    },[])

    const [newUser,setNewUser] = useState<number|undefined>()
    return  <div>
                {(users.length>0)?<Table>
                    <thead>
                    <tr>
                        <th>EID</th>
                        <th>Account Type</th>
                        <th>Modify</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user:any,index:number)=>{
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                let multiStyle = {cursor:'pointer',width:20,height:20}
                                
                                return <tr>
                                    <td scope="row">{user.eid}</td>
                                    <td>{user.account_type}</td>
                                    <td><AiOutlineClose onClick={async ()=>{
                                        await API_DELETE_USERS_PARENT(props.eid,user.eid);
                                        updateList();
                                    }
                                    } style={multiStyle}/></td>
                                </tr>
                            })
                        }

                    </tbody>
                </Table>:<></>}
                <div className='divider'/>
                <Input value={newUser} onChange={(e)=>{
                    let input = e.target.value
                    if(input.length <=9){
                        if(input.length > 0)
                            setNewUser(parseInt(e.target.value))
                        else
                            setNewUser(undefined)
                    }
                    else
                        e.target.value = input.substring(0,input.length - 1)
                    }
                
                }
                   

                    style={{margin:'20px 0px'}} 
                    placeholder='New User EID' 
                    type='number'
                />
                <Button 
                    color = {(newUser !== undefined && newUser >=111111111)?'success':'secondary'} 
                    
                    onClick={async ()=>{
                        await API_ADD_USERS_PARENT(props.eid,newUser);
                        updateList();
                        setNewUser(0)
                    }}
                    >
                        Add New Admin User</Button>
  
            </div>
}

const AdminSettings = (props:globalProps) =>{
    enum InView {
        impExp = 0,
        access = 1
    }

    const [selected,setSelected] = useState(InView.impExp)
    const settingOptions = ['Import or Export', 'Manage Access'];
    const settingsContent = [<ImportExport {...props}/>,<ManageAccess {...props}/>]
    return <div>

        <div id='optionSelectorSettings'>
            <ul>
                {settingOptions.map((value,index)=>{
                    return <li 
                        className={(index === selected)?'selectedSettings':''}
                        onClick={()=>setSelected(index)}
                        >{value}</li>
                })}
            </ul>
     
        </div>
        <div id='optionContentSettings'> 
           {
               settingsContent[selected]
           }
        </div>
    </div>
}

const ValidatorSettings = (props:any) =>{
    return  <h3 className='validatorMessage'>
                No Settings Currently Available
            </h3>

}

const SettingsContainer = (props:globalProps) =>{
    return<div id='containerSettings'>
        {
            (props.account_type === 'admin')?
            <AdminSettings {...props}/>
            :
            <ValidatorSettings/>
        
        }
        <Button 
            color="primary"
            onClick={()=>{props.setCurrentPage(Pages.validate)}}
            style={{position:'absolute',bottom:'45px',right:'5px'}}
        >
            Return Home
        </Button>
        </div>
}
export default SettingsContainer
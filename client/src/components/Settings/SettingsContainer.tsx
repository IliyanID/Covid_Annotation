import React, { useState } from 'react'
import MyAccount from './MyAccount'
import Export from './ExportTweets'
import Import from './ImportTweets'
import ManageUsers from './ManageUsers'
import SideBar from '../SideBar'
import { Pages } from '../../containers/App'

import '../../static/css/SettingsContainer.css'
import { globalProps } from '../../common_types'

import { Button } from 'reactstrap'
import { BiImport, BiExport } from 'react-icons/bi'
import { MdAdminPanelSettings } from 'react-icons/md'
import { VscAccount } from 'react-icons/vsc'

const AdminSettings = (props:globalProps) =>{
    const [selected,setSelected] = useState(0)
    const settings = [
        {
            title:'My Account',
            icon:<VscAccount/>,
            content:<MyAccount {...props}/>
        },
        {
            title:'Import Data',
            icon:<BiImport/>,
            content: <Import {...props}/>
        }, 
        {
            title:'Export Data',
            icon:<BiExport/>,
            content: <Export {...props} />
        },
        {
            title:'Mangage Users',
            icon:<MdAdminPanelSettings/>,
            content:<ManageUsers {...props}/>
        }
    ];
    return  <div>
                <SideBar width='280px' listOptions={settings} selected={selected} setSelected={setSelected}/>
                <div id='optionContentSettings'> 
                    <div className='settingsTitle'>{settings[selected].title}</div>
                    {settings[selected].content}
                </div>
            </div>
}

const ValidatorSettings = (props:globalProps) =>{
        const [selected,setSelected] = useState(0)
       const settings = [
        {
            title:'My Account',
            icon:<VscAccount/>,
            content:<MyAccount {...props}/>
        }
    ];
    return  <div>
                <SideBar width='280px' listOptions={settings} selected={selected} setSelected={setSelected}/>
                <div id='optionContentSettings'> 
                    <div className='settingsTitle'>{settings[selected].title}</div>
                    {settings[selected].content}
                </div>
            </div>

}

const SettingsContainer = (props:globalProps) =>{
    return<div id='containerSettings'>
        {
            (props.account_type === 'admin')?
            <AdminSettings {...props}/>
            :
            <ValidatorSettings {...props}/>
        
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
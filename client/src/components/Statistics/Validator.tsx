import React, { useState } from 'react'
import SideBar from '../SideBar';
import UserStatistics from './Admin/UserTweetGoals';
import { Pages } from '../../containers/App'

import { globalProps } from '../../common_types';
import '../../static/css/Statistics/Admin/Admin.css'


import { FiUsers } from 'react-icons/fi'
import { Button } from 'reactstrap'


export const Validator = (props:globalProps)=>{

    const listOptions =[
        {
            title:'User Statistics',
            icon: <FiUsers/>,
            content:<div></div>
        }
    ]

    const [selected, setSelected] = useState(0)
    return <div style={{marginTop:'40px',width:'100vw'}}>
        <SideBar width='250px' listOptions={listOptions} selected={selected} setSelected={setSelected}/>
        <div style={{width:'calc(100vw - 250px)'}} className='statisticsContent'>
            {listOptions[selected].content}
        </div>
        <Button 
            color="primary"
            onClick={()=>{props.setCurrentPage(Pages.validate)}}
            style={{position:'fixed',bottom:'45px',right:'5px'}}
        >
            Return Home
        </Button>
    </div>
}

export default Validator;
import React, { useState } from 'react'
import SideBar from '../SideBar';
import DashBoard from './Admin/DashBoard'
import AnnotatedTweets from './Admin/AnnotatedTweets'
import SkippedTweets from './Admin/SkippedTweets'
import IncompleteTweets from './Admin/IncompleteTweets'
import UserTweetGoals from './Admin/UserTweetGoals';
import { Pages } from '../../containers/App'

import { globalProps } from '../../common_types';
import '../../static/css/Statistics/Admin/Admin.css'


import { HiAnnotation } from 'react-icons/hi'
import { BsFillSkipEndFill } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { CgFormatSeparator } from 'react-icons/cg'
import { MdSpaceDashboard } from 'react-icons/md'
import { Button } from 'reactstrap'


export const Admin = (props:globalProps)=>{

    const listOptions =[
        {
            title:'Dashboard',
            icon:<MdSpaceDashboard/>,
            content:<DashBoard {...props}/>
        },
        {
            title:'Annotated Tweets',
            icon:<HiAnnotation/>,
            content:<AnnotatedTweets {...props}/>
        },
        {
            title:'Skipped Tweets',
            icon:<BsFillSkipEndFill/>,
            content:<SkippedTweets {...props}/>
        },
        {
            title:'Incomplete Tweets',
            icon:<CgFormatSeparator/>,
            content:<IncompleteTweets {...props}/>
        },
        {
            title:'User Tweet Goals',
            icon: <FiUsers/>,
            content:<UserTweetGoals {...props}/>
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

export default Admin;
import React from 'react'
import {globalProps} from '../../globalProps'
import { Popover, PopoverHeader, PopoverBody } from  'reactstrap' 
import { useToggle } from '../../hooks/useToggle'
import '../../static/css/Headers/Header.css'

const header = (props:globalProps) =>{
    console.log(props)
    return  <div className = 'Header'>
                Twitter Validator
                <UserActions {...props}/>
            </div>
}

const UserActions = (props:globalProps) =>{
    const [popover,togglePopover] = useToggle(true)
    return  <>  
                <div onClick={togglePopover} id='UserActions'/>
                <Popover placement='bottom' target='UserActions' toggle={togglePopover} >
                    <PopoverHeader>User Actions</PopoverHeader>
                    <PopoverBody>
                        userToggle {props.eid}
                    </PopoverBody>
                </Popover>

            </>
}

export default header;
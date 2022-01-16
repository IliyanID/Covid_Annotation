import React from 'react'
import {globalProps} from '../../common_types'
import { Popover, Container, Row, Col } from  'reactstrap' 
import { ImStatsBars } from 'react-icons/im'
import { AiFillSetting, AiOutlineLogout } from 'react-icons/ai'
import { useToggle } from '../../hooks/useToggle'
import { Pages } from '../App'
import '../../static/css/Headers/Header.css'
import '../../static/css/Headers/Footer.css'

const header = (props:globalProps) =>{
    return  <>
                <div className = 'Header'>
                    Tweet Validator
                    <UserActions {...props}/>
                </div>
                <div className='Footer'></div>
            </>
}

const handleLogout = () =>{
    window.location.reload();
}

const UserActions = (props:globalProps) =>{
    const [popover,togglePopover] = useToggle(false)

    let ButtonStyle = {marginBottom:'5px',border:'1px solid black',borderRadius:'5px',width:'20px',height:'20px',cursor:'pointer'}
    return  <>  
                <div style={{fontSize:`${25}px`}} id='UserActions'>UA</div>
                <Popover  placement='bottom' isOpen={popover} target='UserActions' toggle={togglePopover} >

                        <h3 className='UserActionsHeader' >User Actions</h3>
                        <Container className='UserActionsBody'>
                            <UserActionsRow  label='EID' value={props.eid}/>
                            <UserActionsRow label='Acccount' value={props.account_type}/>
                            <UserActionsRow label='Statistics' onClick={()=>{togglePopover();props.setCurrentPage(Pages.statistics)}} value={<ImStatsBars style={ButtonStyle}/>}/>
                            <UserActionsRow label='Settings' onClick={()=>{togglePopover();props.setCurrentPage(Pages.settings)}} value={<AiFillSetting  style={ButtonStyle}/>}/>
                            <UserActionsRow label='Logout' value={<AiOutlineLogout onClick={handleLogout} style={ButtonStyle}/>}/>
                        </Container>


                </Popover>

            </>
}
const UserActionsRow = (props:{label:any,value:any,xsValue?:any,onClick?:any}) =>{
    return  <Row {...props} style={{display:'flex',alignItems:'center',marginTop:'5px',borderBottom:'1px solid black'}}>
                <Col xs ={(props.xsValue)?'auto':'auto'}>
                    {props.label}
                </Col>
                <Col xs={props.xsValue || ''} style={{textAlign:'right'}}>
                    {props.value}
                </Col>
            </Row>
}

export default header;
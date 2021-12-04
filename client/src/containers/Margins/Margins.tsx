import React, { useEffect } from 'react'
import {globalProps} from '../../globalProps'
import { Popover, Container, Row, Col, Button} from  'reactstrap' 
import { ImStatsBars } from 'react-icons/im'
import { useToggle } from '../../hooks/useToggle'
import '../../static/css/Headers/Header.css'
import '../../static/css/Headers/Footer.css'

const header = (props:globalProps) =>{
    console.log(props)
    return  <>
                <div className = 'Header'>
                    Tweet Validator
                    <UserActions {...props}/>
                </div>
                <div className='Footer'></div>
            </>
}

const UserActions = (props:globalProps) =>{
    const [popover,togglePopover] = useToggle(false)
    let Initials = ''
    let splittedName = props.name.split(' ')
    splittedName.forEach((item)=>{
        console.log(item)
        Initials += item[0].toUpperCase()
    })
    let length = splittedName.length * .8
    let fontSize = 30 - ((length * length))
    console.log(fontSize)
    return  <>  
                <div style={{fontSize:`${fontSize}px`}} id='UserActions'>{Initials}</div>
                <Popover  placement='bottom' isOpen={popover} target='UserActions' toggle={togglePopover} >

                        <h3 className='UserActionsHeader' >User Actions</h3>
                        <Container>
                            <UserActionsRow label='EID' value={props.eid}/>
                            <UserActionsRow xsValue = 'auto' label='Name' value={props.name}/>
                            <UserActionsRow label='Acccount' value={props.account_type}/>
                            <UserActionsRow label='Statistics' value={<Button><ImStatsBars/></Button>}/>
                        </Container>


                </Popover>

            </>
}
const UserActionsRow = (props:{label:any,value:any,xsValue?:any}) =>{
    return  <Row style={{display:'flex',alignItems:'center',marginTop:'5px',borderBottom:'1px solid black'}}>
                <Col xs ={(props.xsValue)?'auto':'auto'}>
                    {props.label}
                </Col>
                <Col xs={props.xsValue || ''} style={{textAlign:'right'}}>
                    {props.value}
                </Col>
            </Row>
}

export default header;
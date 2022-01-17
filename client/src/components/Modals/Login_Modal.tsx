import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap'
import { globalProps } from '../../common_types'
import { API_USER } from '../../utils/API/APIMain'

export const Login_Modal = (props:globalProps) =>{
    const [input,setInput] = useState(localStorage.getItem('eid') || '')
    const api = new API_USER(props.showMessage)
    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        api.LOGIN(input,(response)=>{
            props.setModalOpen(false)
            localStorage.setItem('eid',input);
            props.setEid(input)
            props.setAccount_type(response.account_type)
        })
        
        

    }

    return <Modal isOpen = {props.modalOpen}>
        <ModalHeader>Enter Your 9 Digit EID</ModalHeader>
        <ModalBody>
            <Input value={input} onChange={(e)=>setInput(e.target.value)} valid={input.length === 9} invalid={input.length !== 9} placeholder='EID'/>
        </ModalBody>
        <ModalFooter><Button 
                        onClick={handleLogin}
                        style={{margin:'auto'}}
                        disabled = {input.length !== 9}
                        color = {(input.length === 9)?'success':'secondary'}
                        >
                            Login
        </Button></ModalFooter>
    </Modal>
}

export default Login_Modal
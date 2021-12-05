import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap'
import { globalProps } from '../../common_types'

export const Login_Modal = (props:globalProps) =>{
    const [input,setInput] = useState('')

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        props.setModalOpen(false)
        props.setEid(input)
    }

    return <Modal isOpen = {props.modalOpen}>
        <ModalHeader>Enter EID</ModalHeader>
        <ModalBody>
            <Input value={input} onChange={(e)=>setInput(e.target.value)} valid={input.length === 9} invalid={input.length !== 9} placeholder='Your EID'/>
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
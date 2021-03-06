import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap'
import { globalProps } from '../../common_types'
import { API_USER } from '../../utils/API/APIMain'

export const Login_Modal = (props:globalProps) =>{
    const [input,setInput] = useState(localStorage.getItem('eid') || '')
    const api = new API_USER(props.showMessage)

    //This runs whenever the user logs in
    //It stores the eid within the browser storage
    //On the next login it retrevies it from storage
    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        api.LOGIN(input,(response)=>{
            props.setModalOpen(false)
            localStorage.setItem('eid',input);
            props.setEid(input)
            props.setAccount_type(response.account_type)
            props.setTracked_tweets(response.tracked_tweets)
            props.setTracked_tweets_percentage(response.tracked_tweets_percentage)
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
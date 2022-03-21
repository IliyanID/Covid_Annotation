import react, { useState, useEffect, useRef } from 'react'
import ReactFilterEasy, { ICondition, IField } from 'react-filter-easy'
import { userTweetGoals } from '../../../static/config/filterConfig'
import { FiUser, FiUsers } from 'react-icons/fi'
import '../../../static/css/Statistics/Admin/UserTweetGoals.css'
import { Button, Input, InputGroup, Modal, ModalBody, ModalHeader, Popover, UncontrolledTooltip } from 'reactstrap'
import { AiTwotoneSave } from 'react-icons/ai'
import { MdClearAll } from 'react-icons/md'
import useToggle from '../../../hooks/useToggle'
import { API_User_Tweet_Goals } from '../../../utils/API/APIStatisitcs'
import { user } from '../../../common_types'

let API:API_User_Tweet_Goals

export const UserTweetGoals = (props:any)=>{
    API = new API_User_Tweet_Goals(props.showMessage);


    const [filter,setFilter] = useState<ICondition[]>([]) 
    const [openConfirmation,toggleConfirmation] = useToggle(false);
    const [users,setUsers] = useState<user[]>([])
    const [goal,setGoal] = useState('')
    const currentChange= useRef('')

    const getUsers = () =>{
        API.GET_USERS(filter,(result)=>{
            setUsers(result)
        })
    }

    useEffect(()=>{
        getUsers()
    },[filter])

    const ApplyChanges = () => {
        let tempUsers:any;

        switch(currentChange.current){
            case 'Update':
                tempUsers = users.map((user,index)=>{
                    user.tweets_completed_goal = parseInt(goal)
                    return user;
                })
                API.UPDATE_GOALS(tempUsers,(result)=>{
                    props.showMessage('Succesfully Update User Goals','success')
                    getUsers()
                })
            break;

            case 'Clear':
                tempUsers = users.map((user,index)=>{
                    user.tweets_completed = 0
                    return user;
                })
                API.UPDATE_GOALS(tempUsers,(result)=>{
                    props.showMessage('Succesfully Clear User Tweet Counts','success')
                    getUsers()
                })
            break;
        }
        currentChange.current = ''
    }
    
    const ConfirmationWindow = ()=>{
        let title = ''
        if(currentChange.current == 'Update'){
            title = `Are you sure you want to update the selected user's goals?`
        }
        else if(currentChange.current = 'Clear'){
            title = `Are you sure you want to clear the selected user's confirmed tweet count?`

        }
        return <Modal isOpen = {openConfirmation}>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody className='confirmation_box'>
                <Button onClick={()=>{
                    toggleConfirmation()
                    ApplyChanges()

                }
                    } color='primary' value='Apply Changes'>Apply</Button>
                <Button onClick={toggleConfirmation} color='secondary' value='Cancel'>Cancel</Button>
            </ModalBody>
        </Modal>
    }
    
    return <div>
        <ConfirmationWindow />
        <h3 className='FilterHeader'><FiUsers/>Modify User Tweet Goals</h3>
                <ReactFilterEasy
                    fields={userTweetGoals}
                    conditions={filter}
                    onChange={setFilter}
                    className='filterTweets'
                />
                <div className='ModifyGoalContainer'>
                    <h6>Modify All Users Filtered</h6>
                    <InputGroup>
                        <Input type='number' value={goal} onChange={(e)=>{setGoal(e.target.value)}}  placeholder='New Tweet Completion Goal'/>
                        <Button onClick={()=>{
                            currentChange.current = 'Update'
                            toggleConfirmation();
                            }} disabled={goal==''} color='primary' id='saveGoals'><AiTwotoneSave/></Button>
                        <Button onClick={ ()=>{
                            currentChange.current = 'Clear'
                            toggleConfirmation();
                        }} disabled={users.length === 0} color='primary' id='clearCompleted'><MdClearAll/></Button>
                    </InputGroup>
                    <UncontrolledTooltip placement='bottom' target='saveGoals'>
                        Apply New Goal To Filtered Users
                    </UncontrolledTooltip>
                    <UncontrolledTooltip placement='bottom' target='clearCompleted'>
                        Clear Completed Tweets on Filtered Useres
                    </UncontrolledTooltip>
                   
                </div>
                <ul>
                    {users.map((user:any,index)=>{
                        return  <li style={{position:'relative'}} className='tweet_goal_row annotatedTweetRow'>
                                    <FiUser className='tweet_goal_icon'/>
                                    <div className='annotatedId'>User {user.eid}</div>
                                    <div style={{display:'block'}}>Tweets Completed: {user.tweets_completed}</div>
                                    <div>Tweet Completion Goal: {user.tweets_completed_goal}</div>                                        
                                </li>         
                    })}
                </ul>
    </div>
}


export default UserTweetGoals
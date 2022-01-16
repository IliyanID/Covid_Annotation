import React, { useState, useEffect } from 'react'
import { globalProps } from '../../common_types';
import { API_ADD_USERS_PARENT, API_DELETE_USERS_PARENT, API_GET_USERS_PARENT } from '../../utils/API';

import { Button, Table, InputGroup, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { AiOutlineClose } from 'react-icons/ai';

export const ManageUsers = (props:globalProps) =>{
    const [users,setUsers] = useState([])
    const updateList = () =>{
        API_GET_USERS_PARENT({eid:props.eid}).then((res)=>{
            setUsers(res)
        })
    }
    useEffect(()=>{
        updateList()
    // eslint-disable-next-line
    },[])

    const [newUser,setNewUser] = useState<number|undefined>()
    const [dropdown,setDropwdown] = useState(false)
    const [newAccountType, setNewAccountType] = useState('Account Type')
    return  <div>
                {(users.length>0)?<Table>
                    <tbody>
                    <tr>
                        <td>EID</td>
                        <td>Account Type</td>
                        <td>Modify</td>
                    </tr>
                    </tbody>
                    <tbody>
                        {
                            users.map((user:any,index:number)=>{
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                let multiStyle = {cursor:'pointer',width:20,height:20}
                                
                                return <tr>
                                    <td>{user.eid}</td>
                                    <td>{user.account_type}</td>
                                    <td><AiOutlineClose onClick={async ()=>{
                                        await API_DELETE_USERS_PARENT(props.eid,user.eid);
                                        updateList();
                                    }
                                    } style={multiStyle}/></td>
                                </tr>
                            })
                        }

                    </tbody>
                </Table>:<></>}
                <InputGroup>
                    <Input 
                        value={newUser} 
                        onChange={(e)=>{
                            let input = e.target.value
                            if(input.length <=9){
                                if(input.length > 0)
                                    setNewUser(parseInt(e.target.value))
                                else
                                    setNewUser(undefined)
                            }
                            else
                                e.target.value = input.substring(0,input.length - 1)
                            }
                    
                        }
                        placeholder='New User EID' 
                        type='number'/>
                    <Dropdown isOpen={dropdown} toggle={()=>{setDropwdown(!dropdown)}}>
                        <DropdownToggle  caret>
                            {newAccountType}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={()=>setNewAccountType('Admin')}>
                                Admin
                            </DropdownItem>
                            <DropdownItem onClick={()=>setNewAccountType('Validator')}>
                                Validator
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </InputGroup>
                <Button 
                    color = {(newUser !== undefined && newUser >=111111111)?'success':'secondary'} 
                    style={{marginTop:'10px'}}
                    onClick={async ()=>{
                        await API_ADD_USERS_PARENT(props.eid,newUser);
                        updateList();
                        setNewUser(0)
                    }}
                    disabled={newAccountType ==='Account Type' || newUser === undefined}
                    >Add New User</Button>
            </div>
}

export default ManageUsers;
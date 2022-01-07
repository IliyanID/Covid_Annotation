import { propTypes } from 'react-bootstrap/esm/Image'
import { tweet } from '../common_types'

type api = {
    requestType?:'complete' | 'skip',
    eid:number | string,
    ename?:string,
    limit?:number,
    data?:tweet[] | tweet
}

export const API_GET_USERS_PARENT = async({eid}:api)=>{
    let base_url = Get_Base_URL()
    let response = await fetch(`${base_url}/user/parent/${eid}`, {
        method: 'GET',
    })
    if(response.ok){
        let json = await response.json()
        return json
    }
    else   
        return false
}

export const API_ADD_USERS_PARENT = async(eid:string,new_user:number|undefined)=>{
    let base_url = Get_Base_URL()

    let body = JSON.stringify({eid:new_user})
    await fetch(`${base_url}/user/parent/${eid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body:body
    })

    
}

export const API_DELETE_USERS_PARENT = async(parent_eid:string,delete_eid:string) =>{
    let base_url = Get_Base_URL()

    let body = JSON.stringify({eid:delete_eid})
    await fetch(`${base_url}/user/parent/${parent_eid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
        body:body
    })
}

export const API_EXPORT = async()=>{
    let base_url = Get_Base_URL()
    let response = await fetch(`${base_url}/tweets`, {
        method: 'GET',
    })
    if(response.ok){
        let text = await response.text()
        return text
    }
    else   
        return false
}

export const API_Get_Tweets = async ({eid,limit}:api)=> {
    let base_url = Get_Base_URL()
    let response = await fetch(`${base_url}/tweets/${eid}?limit=${limit}`, {
        method: 'GET',
    })
    if(response.ok){
        let json = await response.json()
        return json
    }
    else   
        return false
}

export const API_Post_Tweet = async ({requestType,eid,data}:api,showMessage:any) => {
    let base_url = Get_Base_URL()
    let body = JSON.stringify(data)
    let response = await fetch(`${base_url}/tweets/${requestType}/${eid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body:body
    })

    if(response.ok){
        let tweets = await response.json();
        return tweets
    }
    else {
        showMessage(`Failed to send ${requestType}ed tweets to server. Check log for more details`,'error')
        return false
    }
}

export const API_LOGIN = async ({eid}:api) => {
    let base_url = Get_Base_URL();
    let response = await fetch(`${base_url}/user/${eid}`, {
        method: 'GET'
    })

    if(response.ok){
        let json = await response.json();
        return json;
    }
    else {
        return false
    }
}

export const API_LOGOUT =  ({eid}:api) => {
    let base_url = Get_Base_URL();

    navigator.sendBeacon(`${base_url}/user/${eid}`, '');


}

export const Get_Base_URL = () =>{
    let domain_name = window.location.hostname
    if(domain_name.includes('www.cs.colostate.edu'))
        return 'http://localhost:3001/api'
    return 'http://localhost:3001/api'
}




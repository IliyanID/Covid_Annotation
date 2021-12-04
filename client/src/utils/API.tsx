import { tweet } from '../propTypes'

type api = {
    requestType?:'complete' | 'skip',
    eid:number | string,
    ename?:string,
    limit?:number,
    data?:tweet[]
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

export const API_Post_Tweet = async ({requestType,eid,data}:api) => {
    let base_url = Get_Base_URL()
    let response = await fetch(`${base_url}/tweets/${requestType}/${eid}`, {
        method: 'POST',
        body:JSON.stringify(data)
    })

    if(response.ok){
        let tweets = await response.json();
        return tweets
    }
    else {
        return false
    }
}

export const API_LOGIN = async ({ename,eid}:api) => {
    let base_url = Get_Base_URL();
    let response = await fetch(`${base_url}/user/${eid}`, {
        method: 'POST',
        body:JSON.stringify({ename,eid})
    })

    if(response.ok){
        let tweets = await response.json();
        return tweets
    }
    else {
        return false
    }
}

export const Get_Base_URL = () =>{
    return 'http://localhost:3001/api'
}




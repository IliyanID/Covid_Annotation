import { API } from "./API";

import GetUsersManageAccessSchema from '../../static/schemas/Settings/ManageAccess/GET_USERS.json'
import AddUsersManageAccessSchema from '../../static/schemas/Settings/ManageAccess/ADD_USER.json'
import DeleteUsersManageAccessSchema from '../../static/schemas/Settings/ManageAccess/DELETE_USER.json'

export class API_Account_Settings extends API{
}

export class API_Export_Tweets extends API{

    API_EXPORT = async(setResult:(a:any)=>void)=>{
        const url = `${this.Get_Base_URL()}/tweets`
        this.fetchWithTimeout(url, {
            method: 'GET',
        }).then(response=>{
            if(response !== undefined)
                setResult(response)
        })
    }
}

export class API_Import_Tweets extends API{
}



export class API_Manage_Access extends API{

    GET_USERS = (parent:string,setResult:(a:any)=>void) =>{
        const url = `${this.Get_Base_URL()}/user/parent/${parent}`;
        this.fetchWithTimeout(url, {
            method: 'GET'
        },GetUsersManageAccessSchema).then(response=>{
            if(response !== undefined)
                setResult(response)
        })
    }

    ADD_USER = (payload:{eid:number,privlidge:'admin'|'validator', parent:string},setResult:(a:any)=>void) =>{
        const url = `${this.Get_Base_URL()}/user/parent/${payload.parent}`;
        this.fetchWithTimeout(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(payload)
        },AddUsersManageAccessSchema).then(response=>{
            if(response !== undefined && response.success){
                this.showMessage(`Succesfully Added User ${payload.eid} as ${payload.privlidge}.`, 'success')
                setResult(response)
            }
        })
    }

    DELETE_USER = (payload:{eid:string, parent:string},setResult:(a:any)=>void) =>{
        const url = `${this.Get_Base_URL()}/user/parent/${payload.parent}`;
        this.fetchWithTimeout(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(payload)
        },DeleteUsersManageAccessSchema).then(response=>{
            if(response !== undefined && response.success){
                this.showMessage(`Succesfully Removed User ${payload.eid}.`, 'success')
                setResult(response)
            }
        })
    }

}
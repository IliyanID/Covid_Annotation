import { API } from "./API";

import GetUsersManageAccessSchema from '../../static/schemas/Settings/ManageAccess/GET_USERS.json'
import AddUsersManageAccessSchema from '../../static/schemas/Settings/ManageAccess/ADD_USER.json'
import DeleteUsersManageAccessSchema from '../../static/schemas/Settings/ManageAccess/DELETE_USER.json'

//Sub-API Classes utilize the general methods from API.
//on a succesful api call the calback function is usually called with the result passed.

export class API_Account_Settings extends API{
}

export class API_Export_Tweets extends API{

    API_EXPORT = async(dataType:string,setResult:(a:any)=>void)=>{
        const url = `${this.Get_Base_URL()}/tweets?dataType=${dataType}`
        this.fetchWithTimeout(url, {
            method: 'GET',
        }).then(response=>{
            if(response !== undefined)
                setResult(response)
        })
    }

    CLEAR_DB = async(dataType:string,successFunc:()=>void)=>{
        const url = `${this.Get_Base_URL()}/tweets?dataType=${dataType}`
        this.fetchWithTimeout(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({dataType})
        }).then(response=>{
            if(response !== undefined)
                successFunc()
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
            if(response !== undefined){
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
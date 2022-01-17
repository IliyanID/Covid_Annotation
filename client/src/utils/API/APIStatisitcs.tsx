import { API } from "./API"
import { ICondition } from "react-filter-easy";

import getLoggedInUserSchema from '../../static/schemas/Statistics/Dashboard/GET_LOGGEDIN.json'
import getActiveTweetsSchema from '../../static/schemas/Statistics/Dashboard/GET_ACTIVE_TWEETS.json'

import getAnnotatedTweetsSchema from '../../static/schemas/Statistics/AnnotatedTweets/GET_TWEETS.json'

import getIncompleteTweetsSchema from '../../static/schemas/Statistics/IncompleteTweets/GET_TWEETS.json'

import getSkippedTweetsSchema from '../../static/schemas/Statistics/SkippedTweets/GET_TWEETS.json'


export class API_Dashboard extends API {
    GET_LOGGEDIN = (setResult:(a:any)=>void) => {
        const url = `${this.Get_Base_URL()}/statistics/dashboard/loggedin`;
        this.fetchWithTimeout(url, {
            method: 'GET',
        },getLoggedInUserSchema).then(response=>{
            if(response !== undefined)
                setResult(response) 
        })
    }

    GET_ACTIVE_TWEETS = (setResult:(a:any)=>void) => {
        const url = `${this.Get_Base_URL()}/statistics/dashboard/activeTweets`;
        this.fetchWithTimeout(url, {
            method: 'GET',
        },getActiveTweetsSchema).then(response=>{   
            if(response !== undefined)
                setResult(response)
        })
    }
}

export class API_Annotated_Tweets extends API {

    GET_TWEETS = (filter:{filter:ICondition[],limit:number},setResult:(a:any)=>void) =>{
        const url = `${this.Get_Base_URL()}/statistics/annotatedTweets `;
        this.fetchWithTimeout(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(filter)
        },getAnnotatedTweetsSchema).then(response=>{
            if(response !== undefined)
                setResult(response)      
        })
    }
} 

export class API_Incomplete_Tweets extends API {

    GET_TWEETS = (filter:{filter:ICondition[],limit:number},setResult:(a:any)=>void) =>{
        const url = `${this.Get_Base_URL()}/statistics/incompleteTweets `;
        this.fetchWithTimeout(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(filter)
        },getIncompleteTweetsSchema).then(response=>{
            if(response !== undefined)
                setResult(response)
        })
    }
}


export class API_Skipped_Tweets extends API {

    GET_TWEETS = (filter:{filter:ICondition[],limit:number},setResult:(a:any)=>void) =>{
        const url = `${this.Get_Base_URL()}/statistics/skippedTweets `;
        this.fetchWithTimeout(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(filter)
        },getSkippedTweetsSchema).then(response=>{
            if(response !== undefined)
                setResult(response)
        })
    }
}


import { Get_Base_URL } from "./API"
import { ICondition } from "react-filter-easy";
import { SchemaCheck } from '../utils/SchemaCheck'

import getAnnotatedTweetsSchema from '../static/schemas/Statistics/AnnotatedTweets/GET_TWEETS.json'
import getLoggedInUserSchema from '../static/schemas/Statistics/Dashboard/GET_LOGGEDIN.json'
import getActiveTweetsSchema from '../static/schemas/Statistics/Dashboard/GET_ACTIVE_TWEETS.json'
export class API_Dashboard{
    getLoggedIn = (setResult:(a:any)=>void) => {
        const url = `${Get_Base_URL()}/statistics/dashboard/loggedin`;
        fetch(url, {
            method: 'GET',
        }).then(response=>{
            if(response.ok)
                response.json().then(parsedResponse=>{
                    const validation = SchemaCheck(parsedResponse,getLoggedInUserSchema)
                    if(validation.errors.length === 0)
                        setResult(parsedResponse)
                    else
                        validation.errors.map((err:any)=>{
                            console.error(`Schema Error For Request GET ${url} with message: ${err.message}`)
                        })
                })
        })
    }

    getActiveTweets = (setResult:(a:any)=>void) => {
        const url = `${Get_Base_URL()}/statistics/dashboard/activeTweets`;
        fetch(url, {
            method: 'GET',
        }).then(response=>{
            if(response.ok)
                response.json().then(parsedResponse=>{
                    console.log(parsedResponse)

                    const validation = SchemaCheck(parsedResponse,getActiveTweetsSchema)
                    if(validation.errors.length === 0)
                        setResult(parsedResponse)
                    else
                        validation.errors.map((err:any)=>{
                            console.error(`Schema Error For Request GET ${url} with message: ${err.message}`)
                        })
                })
        })
    }
}

export class API_Annotated_Tweets {
    GET_TWEETS = (filter:{filter:ICondition[],limit:number},setResult:(a:any)=>void) =>{
        const url = `${Get_Base_URL()}/statistics/annotatedTweets `;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(filter)
        }).then(response=>{
            if(response.ok)
                response.json().then(parsedResponse=>{
                    const validation = SchemaCheck(parsedResponse,getAnnotatedTweetsSchema)
                    if(validation.errors.length === 0)
                        setResult(parsedResponse)
                    else
                        validation.errors.map((err:any)=>{
                            console.error(`Schema Error For Request GET ${url} with message: ${err.message}`)
                        })
                })
        })
    }
} 



import { API } from "./API";

import GetTweetsApiTweets from '../../static/schemas/Main/Tweets/GET_TWEETS.json'
import SubmitTweetsApiTweets from '../../static/schemas/Main/Tweets/SUBMIT_TWEETS.json'
import SkipTweetApiTweets from '../../static/schemas/Main/Tweets/SKIP_TWEET.json'

import loginApiUserSchema from '../../static/schemas/Main/User/LOGIN.json'


//Sub-API Classes utilize the general methods from API.
//on a succesful api call the calback function is usually called with the result passed.

export class API_Tweets extends API{
    GET_TWEETS = (eid:string,limit:number,setResult:(a:any)=>void) =>{
        const url = `${this.Get_Base_URL()}/tweets/${eid}?limit=${limit}`;
        this.fetchWithTimeout(url, {
            method: 'GET'
        },GetTweetsApiTweets).then(response=>{
            if(response !== undefined)
                setResult(response)
        })
    }
    SUBMIT_TWEETS = (eid:string,tweets:any,setResult:(a:any)=>void) =>{
        const url = `${this.Get_Base_URL()}/tweets/complete/${eid}`;
        this.fetchWithTimeout(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(tweets)
        }, SubmitTweetsApiTweets).then(response=>{
            if(response !== undefined){
                this.showMessage(`Succesfully Submitted Completed Tweets.`, 'success')
                setResult(response)
            }
        })
    }

    SKIP_TWEET = (eid:string,tweet:any,setResult:(a:any)=>void) =>{
        const url = `${this.Get_Base_URL()}/tweets/skip/${eid}`;
        this.fetchWithTimeout(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
            body:JSON.stringify(tweet)
        },SkipTweetApiTweets).then(response=>{   
            if(response !== undefined)
                setResult(response)
            
        })
    }
}

export class API_USER extends API{
    LOGIN = (eid:string,setResult:(a:any)=>void) =>{
        const url = `${this.Get_Base_URL()}/user/${eid}`;
        this.fetchWithTimeout(url, {
            method: 'GET'
        },loginApiUserSchema).then(response=>{
            if(response !== undefined){
                setResult(response)
                this.showMessage(`Welcome ${eid}!`,'info')
            }
        })
    }

    LOGOUT = (eid:number) =>{
        let url = `${this.Get_Base_URL()}/user/${eid}`;
        navigator.sendBeacon(url, '');
    }
}



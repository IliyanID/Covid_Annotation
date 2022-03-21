export type globalProps = {
    eid:string,
    account_type: 'validator' | 'admin' | 'NA',
    showMessage:any,
    modalOpen:boolean,
    currentPage?:any,
    tracked_tweets:number,
    tracked_tweets_percentage:number
    [key: string]: any
}

export const globalPropsDefaultObj:globalProps = {
    eid:'',
    account_type:'NA',
    showMessage:(a:any,b:any)=>{return },
    modalOpen:true,
    tracked_tweets:0,
    tracked_tweets_percentage:0

} as const

export type tweet = unvalidated_tweet | validated_tweet

type unvalidated_tweet = {
    tweet_content:string,
    id:number,
    priority:boolean,
    claim?:never,
    stance?:never,
    complete?:never,
    eid?:never
    [key: string]: any
}

type validated_tweet = {
    tweet_content:string,
    claim:string,
    stance:string,
    complete:boolean,
    priority:boolean,
    id:number,
    eid:number
    [key: string]: any   
}

export const tweetDefaultValidated:tweet = {
    tweet_content:'',
    claim:'',
    stance:'',
    complete:false,
    priority:false,
    id:-1,
    eid:-1
}

export const tweetDefaultUnvalidated:unvalidated_tweet = {
    tweet_content:'',
    priority:false,
    id:-1
}

export type user = {eid:number,tweets_completed:number,tweets_completed_goal:number}
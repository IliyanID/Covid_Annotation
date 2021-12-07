export type globalProps = {
    eid:string,
    name:string,
    account_type: 'validator' | 'admin' | 'NA',
    showMessage:any,
    modalOpen:boolean,
    [key: string]: any
}

export const globalPropsDefaultObj:globalProps = {
    eid:'',
    name:'Iliyan Dimitrov',
    account_type:'validator',
    showMessage:(a:any,b:any)=>{return },
    modalOpen:true,
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
export type globalProps = {
    eid:string,
    name:string,
    account_type: 'validator' | 'admin' | 'NA',
    showMessage:any,
    [key: string]: any
}

export const globalPropsDefaultObj:globalProps = {
    eid:'832542166',
    name:'Iliyan Dimitrov',
    account_type:'validator',
    showMessage:(a:any,b:any)=>{return }
} as const

export type tweet = {
    tweet_content:string,
    claim:string,
    stance:string,
    complete:boolean,
    priority:boolean,
    id:number
    [key: string]: any
}

export const tweetDefaultObject:tweet = {
    tweet_content:'',
    claim:'',
    stance:'',
    complete:false,
    priority:false,
    id:-1
}
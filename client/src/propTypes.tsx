export type globalProps = {
    eid:string,
    name:string,
    account_type: 'validator' | 'admin' | 'NA',
    [key: string]: any
}

export const globalPropsDefaultObj:globalProps = {
    eid:'832542166',
    name:'Iliyan Dimitrov',
    account_type:'validator'
} as const

export type tweet = {
    tweet_content:string,
    claim:string,
    stance:string,
    complete:boolean,
    [key: string]: any
}

export const tweetDefaultObject:tweet = {
    tweet_content:'',
    claim:'',
    stance:'',
    complete:false
}
export type tweet = unvalidated_tweet | validated_tweet

 export type unvalidated_tweet = {
    tweet_content:string,
    id:number,
    priority:boolean,
    claim?:never,
    stance?:never,
    complete?:never,
    eid?:never
    [key: string]: any
}

export type validated_tweet = {
    tweet_content:string,
    claim:string,
    stance:string,
    complete:boolean,
    priority:boolean,
    id:number,
    eid:number
    [key: string]: any   
}

export type validating_tweet = {
    tweet_content:string,
    priority:boolean,
    id:number,
    eid:number,
    claim?:never,
    stance?:never,
    complete?:never,
    [key: string]: any   
}

import React, { useState, useEffect } from 'react'
import { globalProps, tweet, tweetDefaultValidated } from '../../common_types'
import '../../static/css/TweetContainer.css'
import IndividualTweet from './Tweet/IndividualTweet'
import { Button } from 'reactstrap'
import { API_Tweets } from '../../utils/API/APIMain'
import { packageStatesIntoObject } from '../../utils/packageStatesIntoObject'
import NoMoreTweets from './No-More-Tweets'
import { Line } from 'rc-progress';


let api:API_Tweets

type TweetContainerStates = {
    tweets:tweet[],
    setTweets:(a:tweet[])=>void,
    showTweets:number,
    setShowTweets:(a:number)=>void
}

export type tweetContainerAllPackages = globalProps & TweetContainerStates

const AddMissingProps = (tweets:tweet[]) =>{
    let temp = tweets.map(item=>{
        let tempObj = {...tweetDefaultValidated}
        Object.keys(item).forEach(key=>{
            tempObj[key] = item[key]
        })
        return tempObj
    })
    temp.sort((a:tweet,b:tweet)=>{
        if(a.priority )
            return -1
        else
            return 1
    })
    return temp;

}

const PackageAll = (props:globalProps):tweetContainerAllPackages =>{
    let p:any = {...props}
    p = packageStatesIntoObject(p,['tweets','setTweets'],useState<tweet[]>([]))
    p = packageStatesIntoObject(p,['showTweets','setShowTweets'],useState(1))
    return p;
}

const HandleNewTweets = (allPackages:tweetContainerAllPackages) =>{
    return useEffect(()=>{
        let NumTweets = allPackages.tweets.length
        if(NumTweets === allPackages.showTweets || allPackages.eid.length !== 9)
            return
        api.GET_TWEETS(allPackages.eid,allPackages.showTweets,(response:tweet[])=>{
            let updatedTweets = AddMissingProps(response)
            allPackages.setShowTweets(response.length)
            if(response.length  > 0)
                allPackages.setTweets([...updatedTweets])
        })
        // eslint-disable-next-line
    },[allPackages.tweets,allPackages.eid,allPackages.showTweets])
}

const handleSubmit = async(props:tweetContainerAllPackages) =>{
    let notCompleted = props.tweets.filter((tweet:tweet) =>{return !tweet.complete})
    let completed = props.tweets.filter((tweet:tweet) =>{return tweet.complete})
    api.SUBMIT_TWEETS(props.eid,completed,(response)=>{
        props.setTweets(notCompleted)
        props.setTracked_tweets(response.tracked_tweets)
        props.setTracked_tweets_percentage(response.tracked_tweets_percentage)

    })
}

const handleInput = (e:React.MouseEvent<HTMLInputElement, MouseEvent>,allPackages:tweetContainerAllPackages) =>{
    
    let value = document.getElementById('inputId') as any
    value = parseInt(value.value)
    if(value > 0 && value !== allPackages.showTweets){
        console.log('set: ' + value)
    allPackages.setShowTweets(value)
    }
}

const calculateCompletionColor = (percent:number)=>{
    function componentToHex(c:number) {
        c = Math.floor(c)
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }

    let b = 255 - (2.55 * percent)
    let g = 255 - b;
    return "#" + componentToHex(17) + componentToHex(g) + componentToHex(b);
}

export const TweetContainer = (props:globalProps) =>{
    api = new API_Tweets(props.showMessage)

    const allPackages = PackageAll(props)



    HandleNewTweets(allPackages)
    let completedExists = allPackages.tweets.filter(item => {return item.complete}).length > 0
    return  <>
                <div className='TweetContainer'>
                    <h6 style={{marginTop:'60px'}}>Completed {props.tracked_tweets} {(props.tracked_tweets == 1)? 'Tweet':'Tweets'}. {props.tracked_tweets_percentage}% of Goal</h6>
                    <Line  percent={props.tracked_tweets_percentage} strokeWidth={1} strokeColor={calculateCompletionColor(props.tracked_tweets_percentage)} />
                    <NoMoreTweets tweets = {allPackages.tweets}/>
                    
                    {allPackages.tweets.map((tweet,index) =>{
                        let indivPackages = {...allPackages,index}
                        return <IndividualTweet 
                                    key={allPackages.tweets.toString() + index + tweet.toString()} 
                                    {...indivPackages}
                                />
                    })}
                </div>
                
                <Button 
                    onClick={()=>handleSubmit(allPackages)} 
                    color={completedExists?'success':'secondary'} 
                    disabled={!completedExists} 
                    className='submit_completed'
                >
                    Submit Completed
                </Button>
            </>
}

export default TweetContainer
import React, { useState, useEffect, useRef } from 'react'
import { globalProps, tweet, tweetDefaultValidated } from '../../common_types'
import '../../static/css/TweetContainer.css'
import IndividualTweet from './Tweet/IndividualTweet'
import { Button } from 'reactstrap'
import { API_Get_Tweets, API_Post_Tweet } from '../../utils/API'
import { packageStatesIntoObject } from '../../utils/packageStatesIntoObject'
import No_More_Tweets from './No-More-Tweets'
import { propTypes } from 'react-bootstrap/esm/Image'

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
    p = packageStatesIntoObject(p,['showTweets','setShowTweets'],useState(5))
    return p;
}

const HandleNewTweets = (allPackages:tweetContainerAllPackages) =>{
    return useEffect(()=>{
        let NumTweets = allPackages.tweets.length
        if(NumTweets === allPackages.showTweets || allPackages.eid.length !== 9)
            return
        API_Get_Tweets({eid:allPackages.eid,limit:allPackages.showTweets}).then((response:tweet[]) =>{
            if(response){
                let updatedTweets = AddMissingProps(response)
                allPackages.setShowTweets(response.length)
                if(response.length  > 0)
                    allPackages.setTweets([...updatedTweets])
            }
        })
    },[allPackages.tweets,allPackages.eid,allPackages.showTweets])
}

const handleSubmit = async(props:tweetContainerAllPackages) =>{
    let notCompleted = props.tweets.filter((tweet:tweet) =>{return !tweet.complete})
    let completed = props.tweets.filter((tweet:tweet) =>{return tweet.complete})
    let success = await API_Post_Tweet({requestType:'complete',eid:props.eid,data:completed},props.showMessage)
    if(success){
        props.setTweets(notCompleted)
        props.showMessage(`Submitted Completed Tweets! Getting New Tweets...`)
    }
}

const handleInput = (e:React.MouseEvent<HTMLInputElement, MouseEvent>,allPackages:tweetContainerAllPackages) =>{
    
    let value = document.getElementById('inputId') as any
    console.log(value)
    value = parseInt(value.value)
    console.log(value)
    if(value > 0 && value !== allPackages.showTweets){
        console.log('set: ' + value)
    allPackages.setShowTweets(value)
    }
}

export const TweetContainer = (props:globalProps) =>{
    const allPackages = PackageAll(props)
    HandleNewTweets(allPackages)
    let completedExists = allPackages.tweets.filter(item => {return item.complete}).length > 0
    return  <>
                <input  id='inputId' defaultValue='5' style={{marginTop:'20px'}}  onMouseUp={(e)=>{handleInput(e,allPackages)}} type='range' min='1' max='10'></input>
                <h6>Displaying {allPackages.showTweets} Tweets</h6>
                <div className='TweetContainer'>
                    <No_More_Tweets tweets = {allPackages.tweets}/>
                    
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
import React, { useState, useEffect, useRef } from 'react'
import { globalProps, tweet, tweetDefaultObject } from '../../propTypes'
import '../../static/css/TweetContainer.css'
import IndividualTweet from './Tweet/IndividualTweet'
import { Button } from 'reactstrap'
import { API_Get_Tweets } from '../../utils/API'
import { packageStatesIntoObject } from '../../utils/packageStatesIntoObject'
type TweetContainerStates = {
    tweets:tweet[],
    setTweets:(a:tweet[])=>void,
    showTweets:number,
    setShowTweets:(a:number)=>void
}

export type tweetContainerAllPackages = globalProps & TweetContainerStates

const AddMissingProps = (tweets:tweet[]) =>{

    let temp = tweets.map(item=>{
        let tempObj = {...tweetDefaultObject}
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
    p = packageStatesIntoObject(p,['showTweets','setSHowTweets'],useState(6))
    return p;
}

const HandleNewTweets = (allPackages:tweetContainerAllPackages) =>{
    return useEffect(()=>{
        let NumTweets = allPackages.tweets.length
        if(NumTweets >= allPackages.showTweets)
            return
        let missingAmmount = allPackages.showTweets - NumTweets
        API_Get_Tweets({eid:allPackages.eid,limit:missingAmmount}).then((response:tweet[]) =>{
            if(response){
                console.log(response)
                let updatedTweets = AddMissingProps(response)
                let temp = [...allPackages.tweets]
                temp = temp.concat(updatedTweets)
                allPackages.setTweets([...temp])
            }
        })
    },[allPackages.tweets])
}

const handleSubmit = (props:any) =>{
    let notCompleted = props.tweets.filter((tweet:tweet) =>{return !tweet.complete})
    props.setTweets(notCompleted)
    props.showMessage(`Submitted Completed Tweets! Getting New Tweets...`)
}

export const TweetContainer = (props:globalProps) =>{
    const allPackages = PackageAll(props)
    HandleNewTweets(allPackages)
    let completedExists = allPackages.tweets.filter(item => {return item.complete}).length > 0
    return  <>
                <div className='TweetContainer'>
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
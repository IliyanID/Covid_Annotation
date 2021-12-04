import React, { useState } from 'react'
import { globalProps, tweet, tweetDefaultObject } from '../../propTypes'
import '../../static/css/TweetContainer.css'
import IndividualTweet from './Tweet/IndividualTweet'
import { Button } from 'reactstrap'


const tempData:any = [
    {
        tweet_content:'This is the tweet that they are trying to figure out now and the context might be something or it might be something',
        
    },
    {
        tweet_content:'This is the tweet that they are trying to figure out now and the context might be something or it might be something',
        
    },
    {
        tweet_content:'This is the tweet that they are trying to figure out now and the context might be something or it might be something',
        
    },
    {
        tweet_content:'This is the tweet that they are trying to figure out now and the context might be something or it might be something',
        
    }
    , {
        tweet_content:'This is the tweet that they are trying to figure out now and the context might be something or it might be something',
        
    }
    , {
        tweet_content:'This is the tweet that they are trying to figure out now and the context might be something or it might be something',
        
    }

]

const AddMissingProps = (tweets:tweet[]) =>{

    let temp = tweets.map(item=>{
        let tempObj = {...tweetDefaultObject}
        Object.keys(item).forEach(key=>{
            tempObj[key] = item[key]
        })
        return tempObj
    })
    return temp;

}

const handleSubmit = (props:any) =>{
    let notCompleted = props.tweets.filter((tweet:tweet) =>{return !tweet.complete})
    console.log(notCompleted)
    props.setTweets(notCompleted)
}

export const TweetContainer = (props:globalProps) =>{
    let updatedTweets = AddMissingProps(tempData)
    const [tweets,setTweets] = useState(updatedTweets)
    let completedExists = tweets.filter(item => {return item.complete}).length > 0
    console.log(completedExists)
    return  <>
                <div className='TweetContainer'>
                    {tweets.map((tweet,index) =>{
                        let packaged = {tweets:tweets,setTweets:setTweets,index:index}
                        return <IndividualTweet key={tweets.toString() + index} {...packaged}/>
                    })}
                </div>
                <Button onClick={()=>handleSubmit({tweets,setTweets})} color={completedExists?'success':'secondary'} disabled={!completedExists} className='submit_completed'>Submit Completed</Button>
            </>
}

export default TweetContainer
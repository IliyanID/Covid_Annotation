import React, { useState } from 'react'
import { globalProps } from '../../globalProps'
import '../../static/css/TweetContainer.css'
import IndividualTweet from './Tweet/IndividualTweet'


const tempData = [
    {
        Tweet:'This is the tweet that they are trying to figure out now and the context might be something or it might be something',
        
    },
    {
        Tweet:'This is the tweet that they are trying to figure out now and the context might be something or it might be something',
        
    },
    {
        Tweet:'This is the tweet that they are trying to figure out now and the context might be something or it might be something',
        
    },
    {
        Tweet:'This is the tweet that they are trying to figure out now and the context might be something or it might be something',
        
    }
    , {
        Tweet:'This is the tweet that they are trying to figure out now and the context might be something or it might be something',
        
    }
    , {
        Tweet:'This is the tweet that they are trying to figure out now and the context might be something or it might be something',
        
    }

]



export const TweetContainer = (props:globalProps) =>{
    const claimArr:string[] = new Array(tempData.length).fill('')
    const [claim,setClaim] = useState([...claimArr])

    const authorStanceArr:string[] = new Array(tempData.length).fill('')
    const [authorStance,setAuthorStance] = useState(authorStanceArr)
    return  <div className='TweetContainer'>
                {tempData.map((tweetText,index) =>{

                    return <IndividualTweet key={claim.toString() + index} setClaim={setClaim} {...{claim,authorStance,setAuthorStance,tweetText:tweetText.Tweet,index}}/>
                })}
            </div>
}

export default TweetContainer
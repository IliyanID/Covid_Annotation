import React, { useState, useEffect } from 'react'
import '.././../../static/css/Statistics/Admin/Dashboard.css'
import { API_Dashboard } from '../../../utils/API/APIStatisitcs'
import { globalProps } from '../../../common_types'

import { FiUser } from 'react-icons/fi'

let db:API_Dashboard
export const DashBoard = (props:globalProps) =>{
    db = new API_Dashboard(props.showMessage)
    return <div>
        <ActiveTweets {...props}/>
        <ActiveUsers/>
    </div>
}





const ActiveTweets = (props:globalProps) =>{
    const [activeTweets,setActiveTweets] = useState<any[]>([])
    useEffect(()=>{
        db.GET_ACTIVE_TWEETS(setActiveTweets)
    },[])
    useEffect(()=>{
        let temp:any[] = []
        activeTweets.forEach(tweet=>{
            if(tweet.reviewer !== props.eid)
                temp.push(tweet)
        })
        if (activeTweets.length !== temp.length)
            setActiveTweets(temp)
    //eslint-disable-next-line
    },[activeTweets])

    return  <div style={{float:'left',width:'calc(100vw - 500px)'}}>
                <h4>Tweets Currently Under Review</h4>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                    {activeTweets.map((tweet,index)=>{
                        if (index > 3)
                            return <></>
                        return  <div  className='IndividualTweet'>
                                    <h3 style={{position:'relative'}}>
                                        Tweet #{tweet.id}
                                        <div style={{fontSize:'15px',position:'absolute',top:'5px',right:'10px',cursor:'pointer'}}>
                                            Assigned To {tweet.reviewer}
                                        </div>
                                    </h3>
                                    
                                    <p  className='tweetText'>{tweet.tweet_content}</p>
                                    <br/>
                                
                                </div>
                    })}
                </div>
            </div>
}

const ActiveUsers = (props:{}) =>{
    const [loggedIn,setLoggedIn] = useState<string[]>([])
    useEffect(()=>{
        db.GET_LOGGEDIN(setLoggedIn)
    },[])
    return  <div className='activeUsers'>
               <h5>Users Logged-In</h5>
               <ul className='activeUsersList'>
                    {loggedIn.map(user=>{
                        return  <li>
                                    <FiUser/>
                                    {user}
                                </li>
                    })}
               </ul>
            </div>
}

export default DashBoard
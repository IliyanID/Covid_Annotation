import React, { useState, useEffect } from 'react'
import { DisplayStoredTweets } from '../DisplayStoredTweets'
import { API_Skipped_Tweets } from '../../../utils/API/APIStatisitcs'
import { globalProps } from '../../../common_types'


import { ICondition } from 'react-filter-easy'

export const SkippedTweets = (props:globalProps)=>{
    const [tweets,setTweets] = useState([])
    const [filter,setFilter] = useState<ICondition[]>([])
    const [limit,setLimit] = useState(5)

    const api = new API_Skipped_Tweets(props.showMessage)
    useEffect(()=>{
        api.GET_TWEETS({filter,limit},setTweets)
        
    },[filter,limit])
    return  <DisplayStoredTweets limit={limit} setLimit={setLimit} filter={filter} setFilter = {setFilter} context='skippedTweets' inputTweets={tweets}/>
}

export default SkippedTweets


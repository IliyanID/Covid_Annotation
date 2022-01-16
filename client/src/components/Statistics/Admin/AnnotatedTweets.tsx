import React, { useState, useEffect } from 'react'
import { DisplayStoredTweets } from '../DisplayStoredTweets'
import { API_Annotated_Tweets } from '../../../utils/APIStatisitcs'

import { ICondition } from 'react-filter-easy'

export const AnnotatedTweets = (props:{})=>{
    const [tweets,setTweets] = useState([])
    const [filter,setFilter] = useState<ICondition[]>([])
    const [limit,setLimit] = useState(5)

    const api = new API_Annotated_Tweets()
    useEffect(()=>{
        api.GET_TWEETS({filter,limit},setTweets)
        
    },[filter,limit])
    return  <DisplayStoredTweets limit={limit} setLimit={setLimit} filter={filter} setFilter = {setFilter} context='annotatedTweets' inputTweets={tweets}/>
}

export default AnnotatedTweets


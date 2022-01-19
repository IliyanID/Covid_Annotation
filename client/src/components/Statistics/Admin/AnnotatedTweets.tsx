import React, { useState, useEffect } from 'react'
import { DisplayStoredTweets } from '../DisplayStoredTweets'
import { API_Annotated_Tweets } from '../../../utils/API/APIStatisitcs'
import { globalProps } from '../../../common_types'

import { ICondition } from 'react-filter-easy'

export const AnnotatedTweets = (props:globalProps)=>{
    const [tweets,setTweets] = useState([])
    const [filter,setFilter] = useState<ICondition[]>([])
    const [limit,setLimit] = useState(5)

    const api:any = new API_Annotated_Tweets(props.showMessage)
    const updateTweets = () => {
        api.GET_TWEETS({filter,limit},setTweets)
    }
    useEffect(()=>{
        updateTweets()
        
    },[filter,limit])
    return  <DisplayStoredTweets updateTweets = {updateTweets} api={api} limit={limit} setLimit={setLimit} filter={filter} setFilter = {setFilter} context='annotatedTweets' inputTweets={tweets}/>
}

export default AnnotatedTweets


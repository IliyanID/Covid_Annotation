import React from 'react'

export const No_More_Tweets = (props:{tweets:any}) =>{
    return <>
            {
                (props.tweets.length === 0)?
                <div className='IndividualTweet'>
                    <h5>There are no more tweets to review. Good job!</h5>
                </div>:<></>
            }
        </>
}

export default No_More_Tweets
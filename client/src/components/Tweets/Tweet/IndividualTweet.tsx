import React, { useEffect, useRef } from 'react'
import { tweet } from '../../../common_types'
import { Button } from 'reactstrap'
import { BsFillSkipForwardFill } from 'react-icons/bs'
import { tweetContainerAllPackages } from '../TweetContainer'
import { API_Post_Tweet } from '../../../utils/API'

type PropsType = {
    index:number,
}
type IndividualTweetType = tweetContainerAllPackages & PropsType

let authorStance = [
    'Approve',
    'Revoke',
    'Neutral',
    "No Comment",
    "No Claim"
]

const updateKey = (props:IndividualTweetType,key:string,value:any)=>{
    let temp = [...props.tweets]
    temp[props.index][key] = value;
    props.setTweets(temp)
}

const HandleSkip = async(props:IndividualTweetType) =>{
    let temp = [...props.tweets]
    let removedTweet = temp.splice(props.index,1)
    temp.splice(props.index,1)

    let data = removedTweet[0]
    let response = await API_Post_Tweet({requestType:'skip',eid:props.eid,data:data},props.showMessage)

    if(response){
        props.showMessage(`Skipped Tweet #${props.tweets[props.index].id}`)
        props.setTweets(temp)
    }

}

const IndividualTweet = (props:IndividualTweetType) =>{
    let currentTweet = props.tweets[props.index]
    const ref = useRef<HTMLParagraphElement>(null)
    const indivRef = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        if(ref.current !== null && indivRef.current !== null){
            let width = (document.getElementsByClassName('IndividualTweet')[0] as any)
            indivRef.current.style.width = width.clientWidth + 'px!important';
            ref.current.addEventListener('mouseup',(e)=>{
                if(ref.current === null)
                    return
                let obj = window.getSelection()
                if(obj === null)
                    return
                updateKey(props,'claim',obj.toString())
            })
        }
    },[])

    if (currentTweet.claim !== '' && currentTweet.stance !== ''){
        if(!currentTweet.complete)
            updateKey(props,'complete',true)
    }
    else if(currentTweet.complete)
        updateKey(props,'complete',false)

    return  <div ref={indivRef} className='IndividualTweet'>
                <h3 style={{position:'relative'}}>
                    Tweet #{currentTweet.id}
                    <div onClick={()=>HandleSkip(props)} style={{fontSize:'15px',position:'absolute',top:'5px',right:'10px',cursor:'pointer'}}>
                        Skip
                        <BsFillSkipForwardFill style={{marginLeft:'5px'}}/>
                    </div>
                </h3>
                <p ref={ref} className='tweetText'>{currentTweet.tweet_content}</p>
                { (currentTweet.stance !== 'No Claim')?
                    <div>
                        <h5>Author's Claim</h5>
                        <p className='selectedClaim'>{currentTweet.claim}</p>
                    </div>:<></>
                }
                <br/>
                <h5>Author's Stance</h5>
                {
                    authorStance.map((stance,index)=>{
                        let unique = `Button-author-stance-${props.index}-${index}`
                        return <Button 
                                    key={unique}
                                    color={(authorStance[index] === currentTweet.stance)?'primary':'secondary'} 
                                    style={{margin:'5px'}} 
                                    onClick={()=>{
                                        if(authorStance[index] === 'No Claim')
                                            updateKey(props,'claim',authorStance[index])
                                        else if(currentTweet.stance === 'No Claim')
                                            updateKey(props,'claim','')

                                        updateKey(props,'stance',authorStance[index])
                                    }}
                                    >
                                    {stance}                
                                </Button>
                    })
                }
            </div>

}


export default IndividualTweet
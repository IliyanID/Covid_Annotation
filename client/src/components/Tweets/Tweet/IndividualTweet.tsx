import React, { useEffect, useRef } from 'react'
import { tweet } from '../../../propTypes'
import { Button } from 'reactstrap'
import { BsFillSkipForwardFill } from 'react-icons/bs'
export type IndividualTweetType = {
    tweets:tweet[],
    setTweets:(a:tweet[])=>void
    index:number,
}

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

const HandleSkip = (props:any) =>{
    props.showMessage(`Skipped Tweet #${props.index + 1}`)
    let temp = [...props.tweets]
    temp.splice(props.index,1)
    console.log(temp)
    props.setTweets(temp)

}

const IndividualTweet = (props:IndividualTweetType) =>{
    let currentTweet = props.tweets[props.index]
    const ref = useRef<HTMLParagraphElement>(null)
    const indivRef = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        if(ref.current !== null && indivRef.current !== null){
            let width = (document.getElementsByClassName('IndividualTweet')[0] as any)
            indivRef.current.style.width = width.clientWidth + 'px!important';
            console.log(width.clientWidth)
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
                    Tweet #{props.index+1}
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
import React, { useEffect, useRef } from 'react'
import { Button, Tooltip } from 'reactstrap'
import { BsFillSkipForwardFill } from 'react-icons/bs'
import { AiFillInfoCircle } from 'react-icons/ai'
import { tweetContainerAllPackages } from '../TweetContainer'
import { API_Tweets } from '../../../utils/API/APIMain'
import useToggle from '../../../hooks/useToggle'

let api:API_Tweets

type PropsType = {
    index:number,
}
type IndividualTweetType = tweetContainerAllPackages & PropsType

let authorStance = [
    'Agree',
    'Neutral',
    'Disagree',
    "All Claim",
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
    api.SKIP_TWEET(props.eid,data,(res:any)=>{
        props.showMessage(`Skipped Tweet #${props.tweets[props.index].id}`)
        props.setTweets(temp)
    })
}

const IndividualTweet = (props:IndividualTweetType) =>{
    api = new API_Tweets(props.showMessage)

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
                updateKey(props,"stance","")
            })
        }
    // eslint-disable-next-line
    },[])

    if (currentTweet.claim !== '' && currentTweet.stance !== ''){
        if(!currentTweet.complete)
            updateKey(props,'complete',true)
    }
    else if(currentTweet.complete)
        updateKey(props,'complete',false)
    
    if(currentTweet.claim && currentTweet.claim.length === currentTweet.tweet_content.length && currentTweet.stance !== 'All Claim'){
        updateKey(props,'stance','All Claim')
    }

    const [popover,togglePopover] = useToggle(false);

    return  <div ref={indivRef} className='IndividualTweet'>
                <h3 style={{position:'relative'}}>
                    Tweet #{currentTweet.id}
                    <div onClick={()=>HandleSkip(props)} style={{fontSize:'15px',position:'absolute',top:'5px',right:'10px',cursor:'pointer'}}>
                        Skip
                        <BsFillSkipForwardFill style={{marginLeft:'5px'}}/>
                    </div>
                </h3>
                <p ref={ref} className='tweetText'>{currentTweet.tweet_content}</p>

                <div>
                    <h5>
                        Author's Claim 
                        <AiFillInfoCircle style={{marginLeft:'10px',marginBottom:'3px'}} id={`claim-${currentTweet.id}`}/>
                        <Tooltip isOpen={popover} toggle={togglePopover} target={`claim-${currentTweet.id}`}>
                            To select the Author's Claim click and drag over the text above or use the All Claim or No Claim Buttons below.
                        </Tooltip>
                    </h5>
                    <p className='selectedClaim'>{currentTweet.claim}</p>
                </div>
                
                <br/>
                <div className='authorsStance'>
                    <h5>Author's Stance</h5>
                    {
                        authorStance.map((stance,index)=>{
                            let unique = `Button-author-stance-${props.index}-${index}`

                            let button_is_disabled = () =>{
                                if(currentTweet.claim === "" && authorStance[index] !== "No Claim" && authorStance[index] !== "All Claim")
                                    return true;
                                if(currentTweet.claim === "No Claim" && authorStance[index] !== "No Claim")
                                    return true;
                                if(currentTweet.claim !== "" && (authorStance[index] === "No Claim" || authorStance[index] === "All Claim"))
                                    return true;
                                if(currentTweet.claim === currentTweet.tweet_content && authorStance[index] !== 'All Claim')
                                    return true;
   
                            }

                            

                            return <Button 
                                        key={unique}
                                        color={(authorStance[index] === currentTweet.stance)?'primary':'secondary'} 
                                        style={{margin:'5px'}} 
                                        disabled={button_is_disabled()}
                                        onClick={()=>{
                                            if(authorStance[index] === "All Claim")
                                                updateKey(props,'claim',currentTweet.tweet_content)
                                            if(authorStance[index] === "No Claim")
                                                updateKey(props,'claim',"No Claim")

                                            updateKey(props,'stance',authorStance[index])
                                        }}
                                        >
                                        {stance}                
                                    </Button>
                        })
                    }
                </div>
            </div>

}


export default IndividualTweet
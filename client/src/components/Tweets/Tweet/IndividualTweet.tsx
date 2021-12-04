import React, { useEffect, useRef } from 'react'
import { Button } from 'reactstrap'

export type IndividualTweetType = {
    tweetText:string,
    claim:string[],
    setClaim:(a:string[])=>void,

    authorStance:string[],
    setAuthorStance:(a:string[])=>void,
    index:number
}

let authorStance = [
    'Approve',
    'Revoke',
    'Neutral'
]

const IndividualTweet = (props:IndividualTweetType) =>{
    const ref = useRef<HTMLParagraphElement>(null)
    useEffect(()=>{
        if(ref.current !== null)
            ref.current.addEventListener('mouseup',(e)=>{
                if(ref.current === null)
                    return
                let obj = window.getSelection()
                if(obj === null)
                    return
                let selected = obj.toString()
                let temp = [...props.claim]
                temp[props.index] = selected.trim()
                props.setClaim(temp)
            })
    },[props])
    return  <div className='IndividualTweet'>
                <h3>Tweet</h3>
                <p ref={ref} className='tweetText'>{props.tweetText}</p>
                { 
                    <div>
                        <h5>Selected Claim</h5>
                        <p className='selectedClaim'>{props.claim[props.index]}</p>
                    </div>
                }
                {
                    authorStance.map((stance,index)=>{
                        return <Button 
                                    key={`Button author-stance-${props.index}-${index}`}
                                    color={(authorStance[index] === props.authorStance[props.index])?'primary':'secondary'} 
                                    style={{margin:'5px'}} 
                                    onClick={()=>{
                                        let temp = [...props.authorStance]
                                        temp[props.index] = authorStance[index]
                                        props.setAuthorStance(temp)
                                    }}
                                    >
                                    {stance}
                                </Button>
                    })
                }
                <br/>
                {
                    (props.claim[props.index] !== '' && props.authorStance[props.index] !== '')?
                        <Button color='success'>Submit</Button>:<></>
                }
            </div>

}


export default IndividualTweet
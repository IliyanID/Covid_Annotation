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

const setAtIndex = (arr:string[],setArr:(a:string[])=>void,index:number,value:string) =>{
    let tempClaim = [...arr]
    tempClaim[index] = value;
    setArr(tempClaim)
}


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
                    (props.claim[props.index] !== '')?
                    <div>
                        <h5>Selected Claim</h5>
                        <p className='selectedClaim'>{props.claim[props.index]}</p>
                    </div>
                    :<></>
                }
                {
                    authorStance.map(stance=>{
                        return <Button style={{margin:'5px'}}>{stance}</Button>
                    })
                }
                                <br/>
                <Button color='success'>Submit</Button>

            </div>

}


export default IndividualTweet
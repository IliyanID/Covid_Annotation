import React, { useState } from 'react';
import { useMultiToggle } from '../../hooks/useToggle';
import { completeTweetsConfig, IncompleteTweetsConfig, skippedTweetsConfig } from '../../static/config/filterConfig';
import { API_Skipped_Tweets, API_Annotated_Tweets, API_Incomplete_Tweets } from '../../utils/API/APIStatisitcs';

import '../../static/css/Statistics/Admin/AnnotatedTweets.css'


import { MdOutlineFilterList } from 'react-icons/md';
import ReactFilterEasy, { ICondition, IField } from 'react-filter-easy'
import Slider, { SliderTooltip } from 'rc-slider'
import { BsPencilSquare } from 'react-icons/bs';
import { Button, Collapse } from 'reactstrap';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { BsArrow90DegRight } from 'react-icons/bs'

type inputTweets = {
    tweet_created:string,
    tweet_content:string,
    id:number,
    eid1?:number,
    claim1?:string,
    stance1?:string,
    validated_time1?:string,
    eid2?:number,
    claim2?:string,
    stance2?:string,
    validated_time2?:string,                                                       
}[]

type context = 'annotatedTweets'|'skippedTweets'|'incompleteTweets'

type props = {
    updateTweets:()=>void
    inputTweets:inputTweets,
    context:context,
    filter:ICondition[],
    setFilter:any,
    limit:number
    setLimit:any,
    api:any
}


export const DisplayStoredTweets = (props:props) =>{
    const handle = (props:any) => {
        const { Handle } = Slider;
        
            const { value, dragging, index, ...restProps } = props;
            return (
              <SliderTooltip
                prefixCls="rc-slider-tooltip"
                overlay={`${value} Results`}
                visible={dragging}
                placement="bottom"
                key={index}
              >
                <Handle value={value} {...restProps} />
              </SliderTooltip>
            );
          };


    let selectedFields:IField[];
    let header = ''
    //This is used for the other windows
    //Calculates what screen is active
    switch(props.context){
        case 'annotatedTweets':
            selectedFields = completeTweetsConfig
            header = 'Annotated'
            break;
        case 'incompleteTweets':
            selectedFields = IncompleteTweetsConfig
            header = 'Incomplete'
            break;
        case 'skippedTweets':
            selectedFields = skippedTweetsConfig
            header = 'Skipped'
            break;
    }

    const [openArr,toggleOpenArr] = useMultiToggle(false,props.inputTweets.length)
    const [update,setUpdate] = useState(false)
    return  <div>
                <h3 className='FilterHeader'><MdOutlineFilterList/>Filter {header} Tweets</h3>
                <ReactFilterEasy
                    fields={selectedFields}
                    conditions={props.filter}
                    onChange={props.setFilter}
                    className='filterTweets'
                />
                <Slider 
                    min={0} 
                    max={20} 
                    defaultValue={props.limit} 
                    handle={handle} 
                    onChange={(e)=>props.setLimit(e)}
                   style={{width:'calc(100% - 100px)',margin:'auto'}}
                    />

                    <ul>
                        {props.inputTweets.map((tweet:any,index)=>{
                            return  <li className='annotatedTweetRow'>
                                        <div className='annotatedId'>#{tweet.id}</div>
                                        <div>{tweet.tweet_content.substring(0,document.body.clientWidth * .06)} ...</div>
                                        <div 
                                            className='icons' 
                                            onClick={()=>toggleOpenArr(index)}>
                                                {/*<BsPencilSquare/>*/}
                                                {openArr[index]?<RiArrowUpSLine/>:<RiArrowDownSLine/>}
                                        </div>
                                        <Collapse isOpen={openArr[index]}>
                                            <td className='CollapseAnnotated' colSpan={3}>
                                                {Object.keys(tweet).map(key=>{
                                                    if(tweet[key] === null)
                                                        return <></>
                                                    return  <tr>
                                                                <td className='collapseKey'>{key}</td>
                                                                <td>{tweet[key]}</td>
                                                            </tr>
                                                })}
                                            </td>
                                            {props.context === 'skippedTweets'?<Button onClick={()=>{
                                                props.api.DELETE_TWEET(tweet.id,()=>{
                                                    props.updateTweets(); 
                                                })
                                            }}>
                                                    Dismiss Tweet
                                                    <BsArrow90DegRight style={{marginLeft:'10px'}}/>
                                                    </Button>:<></>}
                                        </Collapse>
                                    </li>         
                        })}
                    </ul>
                    
                    <small className='FilterHeader'>Displaying {props.inputTweets.length} Results</small>
                
            </div>
}



export default DisplayStoredTweets
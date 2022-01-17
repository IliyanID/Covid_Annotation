import React from 'react'
import Admin from './Admin'
import Validator from './Validator'
import { globalProps } from '../../common_types'
export const StatisticsContainer = (props:globalProps) =>{
    return <div>
        {
            (props.account_type === 'admin')?
                <Admin {...props}/>
            :
                <Validator {...props}/>

        }
    </div>
}
export default StatisticsContainer
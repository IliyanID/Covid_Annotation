import React from 'react'
import Admin from './Admin'
import { globalProps } from '../../common_types'
export const StatisticsContainer = (props:globalProps) =>{
    return <div>
        <Admin {...props}/>
    </div>
}
export default StatisticsContainer
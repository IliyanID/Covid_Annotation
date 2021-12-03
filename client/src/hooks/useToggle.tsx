import { useState } from 'react'

export const useToggle = (initial:any) =>{
    const [value,setValue] = useState(initial)
    const toggleFunc = ():void =>{
        setValue(!value)
    }
    return [value,toggleFunc]
}

export default useToggle
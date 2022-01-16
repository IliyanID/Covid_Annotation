import { useState } from 'react'

export const useToggle = (initial:any) =>{
    const [value,setValue] = useState(initial)
    const toggleFunc = ():void =>{
        setValue(!value)
    }
    return [value,toggleFunc]
}

export const useMultiToggle:any = (initial:any,size:number) =>{
    const arr = new Array(size).fill(initial)
    const [valArr,setValArr] = useState(arr)
    const toggleFunc = (index:number):void =>{
        let temp = [...valArr]
        temp[index] = !temp[index]
        setValArr(temp)
    }
    return [valArr,toggleFunc]
}

export default useToggle
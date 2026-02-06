import { useEffect, useState } from "react"



export const useDebouncer = <T,>(debounceValue:T,delay=500) => {
    const [value,setValue]=useState(debounceValue)
    useEffect(()=>{
        const timer=setTimeout(() => {
            setValue(debounceValue)
            // console.log(debounceValue)
        }, delay);
        return(()=>{
            clearTimeout(timer);
        })
    })
  return value
}




import { useState } from "react"


export const useLocalStorage = <T,>(key:string,data:T):readonly [T,(value:T)=>void]=> {
       
    const [value,setValue]=useState<T>(()=>{
           const cache=localStorage.getItem(key)
           if(cache){
            return JSON.parse(cache)
           }
           else{
            return (data)
           }
       });
       
       
       function changeValue(input:T){
               setValue(input)
               localStorage.setItem(key,JSON.stringify(input))
               
       }
      
      
       return [value,changeValue]as const

}
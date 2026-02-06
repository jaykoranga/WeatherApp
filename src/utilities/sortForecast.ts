import type { ForecastItem } from "../types/forecastType"
export const sortForecast=(list:ForecastItem[])=>{
    if(!list)return 
    
   const newList= list.filter((element)=>{
        const timeNow=new Date().getDate()
         const compareTime=new Date(element.dt_txt).getDate()
         return timeNow!==compareTime
    })
    const result=[...newList]
    
    
    console.log(result[0].dt_txt,"-",result[1].dt_txt,"-",result[2].dt_txt,"-",result[3].dt_txt,"-",result[4].dt_txt,"-",)
    return result;

}
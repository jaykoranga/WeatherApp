import type { CurrentWeather } from "../types/currentWeatherType" 
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

export function getMyLocation(setHeroLoading:React.Dispatch<React.SetStateAction<boolean>>):Promise<CurrentWeather>{
     return new Promise((resolve,reject)=>{
             if(!navigator.geolocation){
                console.log("failed to get the navigator.geolocation() ,browser not allowing geolocation")
                reject(new Error("geolocation not supported by this browser."))
                return;
             }
             
             try {
                navigator.geolocation.getCurrentPosition(async(position)=>{
                try {
                    const {latitude,longitude}=position.coords;
                    console.log("users coordinates are fetched :",latitude,"|",longitude)
                    console.log("calling the API to fetch user city .....")
                    const result= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
                    
                    if(!result.ok){
                        throw new Error("failed to fetch the weather data for the user's current location")
                    }
                    const data:CurrentWeather=await result.json()
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
             },()=>{
                
                alert("please allow location to enable location search")
                setHeroLoading(false)
             })
             } catch (error) {
               
               console.log(error)
             }
             finally{
                 
             }
             
     },)
 }

    
   

    
    


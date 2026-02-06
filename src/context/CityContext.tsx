import { createContext, useState, type ReactNode,useContext } from "react";
import type { City } from "../types/citiesType";
import type { cityContextType } from "../types/cityContextType";

import { useLocalStorage } from "../hooks/useLocalStorage";
export const CityContext=createContext<cityContextType|null>(null)
export const CityProvider = ({children}:{children:ReactNode})=>{
    const [selectedCity,setSelectedCity]=useState<City|null>(null)
    const [displayCity,setDisplayCity]=useState<City|null>(null)
    const [favCities,setFavCities]=useLocalStorage<City[]>("fav-cities",[])

    return (
        <CityContext.Provider value={{selectedCity,setSelectedCity,displayCity,setDisplayCity,favCities,setFavCities}} >
        {children}
        </CityContext.Provider>
    )

}
export const useCity = () => {
  const context = useContext(CityContext)

  if (!context) {
    throw new Error("useCity must be used inside ThemeProvider")
  }

  return context
}
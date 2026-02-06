import type { City } from "./citiesType";

export interface cityContextType{
    selectedCity:City | null,
    setSelectedCity:React.Dispatch<React.SetStateAction<City | null>>
    displayCity:City| null,
    setDisplayCity:React.Dispatch<React.SetStateAction<City | null>>
    favCities:City[]
    setFavCities:(input:City[])=>void
}
import { useEffect, useState } from "react"
const apiKey = import.meta.env.VITE_WEATHER_API_KEY
import { useCity } from "../../context/CityContext"
import { useTheme } from "../../context/ThemeContext"
import { useFetch } from "../../hooks/useFetch"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import type { CurrentWeather } from "../../types/currentWeatherType"
import WeatherSkeleton from "./WeatherSkeleton"
import { useThemeClasses } from "../../hooks/useThemeClasses"


const DisplayCurrentWeather = () => {
  const { displayCity } = useCity()
  const { theme } = useTheme()
  const [isFavourite, setIsFavourite] = useState(false)
  const { favCities, setFavCities } = useCity()
   const { bgClass, borderClass,textClass,cardBgClass,textSecondaryClass,iconBgClass } = useThemeClasses(theme)

  const { data, loading,error } = useFetch<CurrentWeather>(`https://api.openweathermap.org/data/2.5/weather?q=${displayCity?.name}&appid=${apiKey}`
  )
  const [cacheWeather, setCacheWeather] = useLocalStorage<CurrentWeather | null>("weather", data);
  useEffect(() => {
    console.log("the data object from displaycurrent weather :", data)
    setCacheWeather(data);
    console.log("the cache weather from local storage is :", cacheWeather);
    setIsFavourite(false)
    favCities.forEach((e) => {
      if (e.name ===displayCity?.name) {
        setIsFavourite(true);
        


      }
    })

    return () => {
      localStorage.removeItem('weather')
    }
  }, [data])

  //function to set a city to favouritise
  function handleFavouriteCity() {

    let favCitiesArr = [...favCities]
    
    if (isFavourite) {
      let result = favCities.filter((e) => {
        return (e.name !== displayCity?.name)
      })
      setFavCities(result);
      setIsFavourite(false);
    }

    else {
      if (displayCity) favCitiesArr.push(displayCity)

      setFavCities(favCitiesArr)
      setIsFavourite(true);

    }
  }
  // Convert Kelvin to Celsius
  const kelvinToCelsius = (kelvin: number) => (kelvin - 273.15).toFixed(1)

  if (loading) {
    return (
      <WeatherSkeleton></WeatherSkeleton>
    )
  }
  // console.log("data fetched for the display weather is ", data)

  if (!data || data.cod !== 200  ) {
    return (
      <div className={`${bgClass} rounded-xl shadow-lg p-4 border ${borderClass} text-center`}>
        <p className={`text-sm ${textClass}`}>⚠️ No weather data available</p>
      </div>
    )
  }
  if (data?.cod === 200) {
    console.log("display city from displaycurrent weather :", displayCity?.name)
  }
  if(error){
    return(
      <div className={`${bgClass} rounded-xl shadow-lg p-4 border ${borderClass} text-center`}>
        <p className={`text-sm ${textClass}`}>⚠️ error in fetching the current weather </p>
      </div>
    )
  }

  return (
    <div className={`display-container ${bgClass} rounded-xl shadow-xl p-3 md:p-4 border ${borderClass} transition-all duration-300`}>
      {/* Location Header - Compact */}
      <div className="text-center mb-3 flex justify-center items-center gap-5">
        <h2 className={`text-xl md:text-2xl font-bold ${textClass}`}>
          {data.name} ,{} {data.sys.country ? data.sys.country : ""}
        </h2>
        <button className="text-2xl md:text-4xl font-bold cursor-pointer" onClick={handleFavouriteCity}>{isFavourite ? `❤️` : `🤍`}</button>
      </div>

      {/* Main Weather Display - Compact */}
      <div className={`${cardBgClass} backdrop-blur-sm rounded-lg p-3 md:p-4 mb-3 border ${borderClass} shadow-md transition-all duration-300 hover:scale-[1.01]`}>
        <div className="flex items-center justify-around gap-3">
          {/* Weather Icon & Description */}
          <div className="flex flex-col items-center">
            <div className={`${iconBgClass} rounded-full p-1 shadow-md`}>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].main==='Clear'?'01d':data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
                className="w-16 h-16 md:w-20 md:h-20"
              />
            </div>
            <p className={`text-xs md:text-sm font-medium ${textClass} mt-1 capitalize text-center`}>
              {data.weather[0].description}
            </p>
          </div>

          {/* Temperature Display */}
          <div className="text-center">
            <div className={`text-4xl md:text-5xl font-bold ${textClass}`}>
              {kelvinToCelsius(data.main.temp)}°
            </div>
            <p className={`text-xs md:text-sm ${textSecondaryClass} mt-1`}>
              Feels like {kelvinToCelsius(data.main.feels_like)}°C
            </p>
          </div>
        </div>
      </div>

      {/* Weather Details Grid - Compact */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {/* Humidity Card */}
        <div className={`${cardBgClass} backdrop-blur-sm rounded-lg p-3 border ${borderClass} shadow-sm transition-all duration-300 hover:scale-105`}>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl mb-1">💧</span>
            <p className={`text-xs ${textSecondaryClass} font-medium`}>Humidity</p>
            <p className={`text-lg md:text-xl font-bold ${textClass}`}>{data.main.humidity}%</p>
          </div>
        </div>

        {/* Pressure Card */}
        <div className={`${cardBgClass} backdrop-blur-sm rounded-lg p-3 border ${borderClass} shadow-sm transition-all duration-300 hover:scale-105`}>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl mb-1">🌡️</span>
            <p className={`text-xs ${textSecondaryClass} font-medium`}>Pressure</p>
            <p className={`text-lg md:text-xl font-bold ${textClass}`}>{data.main.pressure}</p>
            <p className={`text-[10px] ${textSecondaryClass}`}>hPa</p>
          </div>
        </div>

        {/* Visibility Card */}
        <div className={`${cardBgClass} backdrop-blur-sm rounded-lg p-3 border ${borderClass} shadow-sm transition-all duration-300 hover:scale-105`}>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl mb-1">👁️</span>
            <p className={`text-xs ${textSecondaryClass} font-medium`}>Visibility</p>
            <p className={`text-lg md:text-xl font-bold ${textClass}`}>{(data.visibility / 1000).toFixed(1)}</p>
            <p className={`text-[10px] ${textSecondaryClass}`}>km</p>
          </div>
        </div>

        {/* Wind Speed Card */}
        <div className={`${cardBgClass} backdrop-blur-sm rounded-lg p-3 border ${borderClass} shadow-sm transition-all duration-300 hover:scale-105`}>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl mb-1">💨</span>
            <p className={`text-xs ${textSecondaryClass} font-medium`}>Wind Speed</p>
            <p className={`text-lg md:text-xl font-bold ${textClass}`}>{data.wind.speed}</p>
            <p className={`text-[10px] ${textSecondaryClass}`}>m/s</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayCurrentWeather
import { useTheme } from "../../context/ThemeContext"
import { useThemeClasses } from "../../hooks/useThemeClasses"
import type { ForecastItem } from "../../types/forecastType"

const WeatherForecastCard = ({
  main,
  weather,
  clouds,
  wind,
  visibility,
  dt_txt,
}: ForecastItem) => {
  const { theme } = useTheme()
  const{bgClass,textClass,textSecondaryClass,borderClass,iconBgClass}=useThemeClasses(theme)

  

  const kelvinToCelsius = (kelvin: number) => (kelvin - 273.15).toFixed(1)

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className={`${bgClass} ${borderClass} border backdrop-blur-sm rounded-lg p-4 flex flex-col gap-3 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}>
      
      {/* Time Header */}
      <div className={`${textClass} text-center pb-2 border-b ${borderClass}`}>
        <p className="text-xl font-bold">{formatTime(dt_txt)}</p>
      </div>

      {/* Weather Icon & Description */}
      <div className="flex items-center gap-3">
        <div className={`${iconBgClass} rounded-full p-2`}>
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt={weather[0].description}
            className="w-12 h-12"
          />
        </div>
        <div className="flex-1">
          <p className={`font-semibold text-base ${textClass}`}>{weather[0].main}</p>
          <p className={`text-xs ${textSecondaryClass} capitalize`}>{weather[0].description}</p>
        </div>
      </div>

      {/* Temperature */}
      <div className={`${iconBgClass} rounded-md p-3 text-center`}>
        <p className={`text-2xl font-bold ${textClass}`}>{kelvinToCelsius(main.temp)}°C</p>
        <p className={`text-xs ${textSecondaryClass}`}>
          Feels like {kelvinToCelsius(main.feels_like)}°C
        </p>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className={`${bgClass} rounded p-2 border ${borderClass}`}>
          <p className={`${textSecondaryClass} text-[10px]`}>Humidity</p>
          <p className={`font-semibold ${textClass}`}>💧 {main.humidity}%</p>
        </div>
        
        <div className={`${bgClass} rounded p-2 border ${borderClass}`}>
          <p className={`${textSecondaryClass} text-[10px]`}>Clouds</p>
          <p className={`font-semibold ${textClass}`}>☁️ {clouds.all}%</p>
        </div>
        
        <div className={`${bgClass} rounded p-2 border ${borderClass}`}>
          <p className={`${textSecondaryClass} text-[10px]`}>Wind</p>
          <p className={`font-semibold ${textClass}`}>💨 {wind.speed} m/s</p>
        </div>
        
        <div className={`${bgClass} rounded p-2 border ${borderClass}`}>
          <p className={`${textSecondaryClass} text-[10px]`}>Visibility</p>
          <p className={`font-semibold ${textClass}`}>👁️ {(visibility / 1000).toFixed(1)} km</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherForecastCard
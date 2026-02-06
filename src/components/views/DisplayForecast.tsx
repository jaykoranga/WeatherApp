import { useFetch } from "../../hooks/useFetch"
const apiKey = import.meta.env.VITE_WEATHER_API_KEY
import { useCity } from "../../context/CityContext"
import { useTheme } from "../../context/ThemeContext"
import type { ForecastWeatherResponse } from "../../types/forecastType"
import WeatherForecastCard from "./../cards/WeatherForecastCard"
import type { ForecastItem } from '../../types/forecastType'
import WeatherSkeleton from "./WeatherSkeleton"
import { useMemo, useState } from "react"

const DisplayForecast = () => {
  const { theme } = useTheme()
  const { displayCity} = useCity()
  
  // Fetch forecast data directly in this component
  const { data, loading, error } = useFetch<ForecastWeatherResponse>(
    `https://api.openweathermap.org/data/2.5/forecast?q=${displayCity?.name}&appid=${apiKey}`
  )

  // Extract forecast list from API response
  const forecastData: ForecastItem[] = data?.list || []

  // Group forecast data by date
  const groupedByDay = useMemo(() => {
    const groups: { [key: string]: ForecastItem[] } = {}
    
    forecastData.forEach((item) => {
      const date = new Date(item.dt_txt)
      const dateKey = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      })
      
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(item)
    })
    
    return groups
  }, [forecastData])

  // Get sorted array of dates
  const sortedDates = useMemo(() => {
    return Object.keys(groupedByDay).sort((a, b) => 
      new Date(a).getTime() - new Date(b).getTime()
    )
  }, [groupedByDay])

  // State for selected day (default to first day)
  const [selectedDay, setSelectedDay] = useState<string>(sortedDates[0] || '')

  // Update selectedDay when sortedDates changes (e.g., city change)
  useMemo(() => {
    if (sortedDates.length > 0 && !sortedDates.includes(selectedDay)) {
      setSelectedDay(sortedDates[0])
    }
  }, [sortedDates, selectedDay])

  // Get forecasts for selected day
  const selectedDayForecasts = groupedByDay[selectedDay] || []

  // Theme classes
  const bgClass = theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-800'
  const borderClass = theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
  const activeBgClass = theme === 'dark' 
    ? 'bg-blue-600 text-white' 
    : 'bg-blue-500 text-white'
  const inactiveBgClass = theme === 'dark'
    ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'

  // Format date for display
  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }

  // Handle loading state
  if (loading) {
    return <WeatherSkeleton />
  }

  // Handle error state
  if (error) {
    return (
      <div className={`${bgClass} ${borderClass} border rounded-lg p-6 text-center`}>
        <p className="text-red-500 font-semibold">Error in loading forecast data</p>
        <p className={`${textClass} text-sm mt-2`}>{error.message}</p>
      </div>
    )
  }

  // Handle no data
  if (sortedDates.length === 0) {
    return (
      <div className={`${bgClass} ${borderClass} border rounded-lg p-6 text-center`}>
        <p className={textClass}>No forecast data available</p>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      {/* Day Selector */}
      <div className={`${bgClass} ${borderClass} border backdrop-blur-sm rounded-lg p-4`}>
        <h3 className={`${textClass} text-lg font-semibold mb-4`}>
          Select a Day
        </h3>
        
        {/* Desktop: Horizontal tabs */}
        <div className="hidden md:flex gap-2 flex-wrap">
          {sortedDates.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDay(date)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${selectedDay === date ? activeBgClass : inactiveBgClass}
              `}
            >
              <div className="text-sm">{formatDisplayDate(date)}</div>
              <div className="text-xs opacity-80">
                {groupedByDay[date].length} forecasts
              </div>
            </button>
          ))}
        </div>

        {/* Mobile: Dropdown */}
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className={`
            md:hidden w-full px-4 py-2 rounded-lg font-medium
            ${bgClass} ${textClass} ${borderClass} border
            focus:outline-none focus:ring-2 focus:ring-blue-500
          `}
        >
          {sortedDates.map((date) => (
            <option key={date} value={date}>
              {formatDisplayDate(date)} ({groupedByDay[date].length} forecasts)
            </option>
          ))}
        </select>
      </div>

      {/* Weather Cards for Selected Day */}
      <div>
        <h4 className={`${textClass} text-xl font-semibold mb-4`}>
          {formatDisplayDate(selectedDay)} - Hourly Forecast
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {selectedDayForecasts.map((forecast, index) => (
            <WeatherForecastCard
              key={`${forecast.dt_txt}-${index}`}
              {...forecast}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DisplayForecast
import { useCity } from "../../context/CityContext"
import { useTheme } from "../../context/ThemeContext"
import { useThemeClasses } from "../../hooks/useThemeClasses"

import DisplayCurrentWeather from './DisplayCurrentWeather'
import DisplayForecast from "./DisplayForecast"
import WeatherSkeleton from "./WeatherSkeleton"

interface HeroProps {
  searchInputRef: React.RefObject<HTMLInputElement | null>
  heroLoading: boolean
  setHeroLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Hero = ({ searchInputRef, heroLoading, setHeroLoading }: HeroProps) => {
  const { displayCity } = useCity()
  const { theme } = useTheme()
  const { bgClass, borderClass, textClass, emptyStateClass } = useThemeClasses(theme)
  

  if (heroLoading) {
    return (<WeatherSkeleton></WeatherSkeleton>)
  }

  if (displayCity) {
    setHeroLoading(false);
  }

  return (
    <main className={`main-hero-container ${bgClass} ${borderClass} border-2 rounded-2xl shadow-2xl flex flex-col items-center justify-center mx-2 my-4 md:mx-4 md:my-3 p-4 md:p-6 lg:p-8 min-h-[500px] md:min-h-[500px] transition-all duration-300 backdrop-blur-sm`}>
      {displayCity ? (
        <div className="w-full max-w-8xl space-y-6 md:space-y-8">
          {/* Current Weather - Takes full viewport height */}
          <div className="min-h-[calc(100vh-400px)] flex items-center justify-center animate-fadeIn">
            <DisplayCurrentWeather />
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-2 py-4 animate-bounce">
            <p className={`text-sm ${textClass} opacity-70`}>Scroll for forecast</p>
            <svg 
              className={`w-6 h-6 ${textClass} opacity-70`}
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>

          {/* Forecast - Appears on scroll */}
          <div className="min-h-screen animate-fadeIn">
            <DisplayForecast />
          </div>
        </div>
      ) : (
        <div 
          className={`flex flex-col items-center justify-center gap-4 md:gap-6 my-auto p-8 md:p-12 rounded-2xl ${emptyStateClass} border-2 border-dashed shadow-lg transition-all duration-300 hover:scale-105 hover:cursor-pointer`} 
          onClick={() => {
            searchInputRef.current?.focus()
            console.log("focus code working but not the focus call")
          }}
        >
          <div className="text-6xl md:text-8xl">
            {theme === "dark" ? `👆🏻` : `👆🏾`}
          </div>

          <p className={`text-base md:text-lg lg:text-xl font-medium text-center ${textClass} max-w-md`}>
            Select a city to display its weather
          </p>

          <div className="flex gap-2 mt-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></span>
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></span>
          </div>
        </div>
      )}
    </main>
  )
}

export default Hero
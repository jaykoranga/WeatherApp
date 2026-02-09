import React, { useEffect, useState } from "react"
import { useDebouncer } from "../../hooks/useDebouncer"
import { fetchCities } from "../../api/fetchCities"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import type { City } from "../../types/citiesType"
import { useCity } from "../../context/CityContext"
import { useTheme } from "../../context/ThemeContext"
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useThemeClasses } from "../../hooks/useThemeClasses"
import toast from "react-hot-toast"
interface SearchBarProps {
  searchInputRef: React.RefObject<HTMLInputElement | null>
}

const SearchBar = ({ searchInputRef }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState("")
  const finalInput = useDebouncer(searchInput, 600)
  const [cities, setCities] = useState<City[]>([])
  const { selectedCity, setSelectedCity } = useCity()
  const { displayCity, setDisplayCity } = useCity()
  const { theme } = useTheme()
  const { bgClass, borderClass, buttonClass, cityDisplayClass } = useThemeClasses(theme)
  const { recentCities, } = useCity()


  const autocompleteOptions = cities.length > 0
    ? cities
    : searchInput.trim() === ""
      ? recentCities
      : [];




  // Create MUI theme based on current theme
  const muiTheme = createTheme({
    palette: {
      mode: theme === 'dark' ? 'dark' : 'light',
      primary: {
        main: theme === 'dark' ? '#60a5fa' : '#3b82f6',
      },
      background: {
        paper: theme === 'dark' ? '#1f2937' : '#ffffff',
      },
    },
  })

  function handleSubmitInput(city?: City | null) {
    const cityToUse = city ?? selectedCity
    if (!cityToUse){
      toast.error("please select a city to fetch")
      return
    } 

    console.log("Search weather for:", cityToUse)

    setDisplayCity(cityToUse)
    

    setSelectedCity(null)
    setSearchInput("")   // ✅ clear input
    setCities([])        // ✅ close dropdown
    
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return
    e.preventDefault()

    handleSubmitInput()
  }

  useEffect(() => {

    if (!finalInput) {
      setCities([])
      return
    }

    const getCities = async () => {

      try {

        const result = await fetchCities(finalInput)
        if(result.length===0){
          toast.error("no such city exists")
        }
        console.log("result is ", result)
        setCities(result)

      }

      catch (err) {

        console.error(err)
      }

    }

    getCities()
    return () => {
      setCities([])
    }

  }, [finalInput])

  return (
    <div className={`flex flex-col md:flex-row justify-center items-center px-4 py-6 md:p-4 gap-3 md:gap-4 w-full max-w-5xl mx-auto mt-3 mb-0 ${bgClass} rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300`}>
      <div className="w-full md:w-auto md:flex-1 max-w-md my-auto">
        <ThemeProvider theme={muiTheme}>
          <Autocomplete<City, false, false, false>
            noOptionsText={null}
            options={autocompleteOptions}
            value={selectedCity}
            inputValue={searchInput}

            onInputChange={(_, newInputValue) => {
              setSearchInput(newInputValue)
              setCities([])
            }}
            onChange={(_, newValue) => {
              if (!newValue) return

              setSelectedCity(newValue)
              handleSubmitInput(newValue)
            }}

            getOptionLabel={(option) => {


              return `${option.name ? `${option.name}` : `loading the option....`}${option.state ? ` (${option.state})` : ""}, ${option.country}`
            }
            }
            getOptionKey={(option) => `${option.lat}${option.lon}`}
            isOptionEqualToValue={(option, value) =>
              option.lat === value.lat && option.lon === value.lon
            }
            renderInput={(params) => (
              <TextField
                onKeyDown={handleKeyDown}
                {...params}
                inputRef={searchInputRef}
                label="🔍 Search city"
                variant="outlined"
                fullWidth
              />
            )}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme === 'dark'
                    ? '0 4px 12px rgba(96, 165, 250, 0.3)'
                    : '0 4px 12px rgba(59, 130, 246, 0.2)',
                },
              },
            }}
          />
        </ThemeProvider>
      </div>

      <button
        className={`w-full md:w-auto px-6 py-3 md:px-8 md:py-3.5 rounded-xl font-semibold text-sm md:text-base ${buttonClass} shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap`}
        onClick={() => { handleSubmitInput() }}
      >
        Search
      </button>

      {displayCity && (
        <div className={`w-full md:w-auto px-4 py-2 md:px-5 md:py-2.5 rounded-lg ${cityDisplayClass} font-medium text-sm md:text-base border ${borderClass} shadow-md transition-all duration-300 text-center md:text-left`}>
          <span className="hidden md:inline"> </span>
          {displayCity.name}
        </div>
      )}
    </div>
  )
}

export default SearchBar
import { useState } from "react";
import { useCity } from "../../context/CityContext";
import { useTheme } from "../../context/ThemeContext";
import { getMyLocation } from "../../api/getMyLocation";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useThemeClasses } from "../../hooks/useThemeClasses";

interface HeaderProps {
  heroLoading: boolean;
  setHeroLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setHeroLoading }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const { setDisplayCity, favCities } = useCity();
  const [showFavCitiesDropDown, setShowFavCitiesDropDown] = useState(false);
  const {bgClass,textClass,borderClass,buttonClass}=useThemeClasses(theme)

  
  async function handleUseMyLocation() {
    setHeroLoading(true);
    try {
      const weather = await getMyLocation(setHeroLoading);
      setDisplayCity({
        name: weather.name,
        lat: weather.coord.lat,
        lon: weather.coord.lon,
        country: weather.sys.country,
        
      });
      setHeroLoading(false);
    } catch (error) {
      console.error("failed to fetch the user location data.");
      setHeroLoading(false);
    }
  }

  return (
    <header className={`flex border-b-2 ${borderClass} px-4 py-7 md:px-6 md:py-8 items-center w-full relative ${bgClass} shadow-md transition-all duration-300`}>
      <button 
        className={`${buttonClass} absolute right-40 md:right-45 px-2 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer`} 
        onClick={handleUseMyLocation}
      >
        {`📍`}Location
      </button>

      <h1 className={`absolute left-20 md:left-1/2 -translate-x-1/2 text-xl md:text-2xl lg:text-3xl font-bold tracking-wide ${textClass} transition-colors duration-300`}>
        WEATHER APP
      </h1>

      <div className="absolute right-20 md:right-25 flex flex-col items-end">
        <button
          onClick={() => setShowFavCitiesDropDown((prev) => !prev)}
          className={`${buttonClass} cursor-pointer px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out`}
        >
          {`❤️`}
        </button>

        {showFavCitiesDropDown && (
          <div className="absolute top-full mt-2 right-0 z-50 w-[280px] md:w-[320px]">
            <Autocomplete
              open={showFavCitiesDropDown}
              onClose={() => setShowFavCitiesDropDown(false)}
              options={favCities}
              getOptionLabel={(option) => `${option.name},${option.country}`}
              onChange={(_, newValue) => {
                if (!newValue) return;

                setDisplayCity({
                  name: newValue.name,
                  lat: newValue.lat,
                  lon: newValue.lon,
                  country: newValue.country,
                });

                setShowFavCitiesDropDown(false);
              }}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  color: theme === 'dark' ? '#ffffff' : '#000000',
                  '& fieldset': {
                    borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                  },
                  '&:hover fieldset': {
                    borderColor: theme === 'dark' ? '#6b7280' : '#9ca3af',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme === 'dark' ? '#60a5fa' : '#3b82f6',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                  '&.Mui-focused': {
                    color: theme === 'dark' ? '#60a5fa' : '#3b82f6',
                  },
                },
                '& .MuiAutocomplete-popupIndicator': {
                  color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                },
                '& .MuiAutocomplete-clearIndicator': {
                  color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                },
              }}
              componentsProps={{
                paper: {
                  sx: {
                    backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                    color: theme === 'dark' ? '#ffffff' : '#000000',
                    '& .MuiAutocomplete-option': {
                      '&:hover': {
                        backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6',
                      },
                      '&[aria-selected="true"]': {
                        backgroundColor: theme === 'dark' ? '#4b5563' : '#e5e7eb',
                      },
                    },
                    '& .MuiAutocomplete-noOptions': {
                      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                    },
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Favourite Cities"
                  placeholder="Search your favorites..."
                  autoFocus
                />
              )}
            />
          </div>
        )}
      </div>

      <button
        onClick={toggleTheme}
        className={`absolute right-2 md:right-5 px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold text-sm md:text-base ${buttonClass} cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
      >
        {theme === "dark" ? '🌙' : '☀️'}
      </button>
    </header>
  );
};

export default Header;
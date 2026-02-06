const apiKey = import.meta.env.VITE_WEATHER_API_KEY

export async function fetchCities(city:string) {
    let data;
    try {
        let result = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
         data = await result.json()
        console.log("data from api :", data)

    } catch (error) {
        console.error(error)
    }
    return data;
}


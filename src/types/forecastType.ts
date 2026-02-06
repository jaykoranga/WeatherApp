

export interface ForecastWeatherResponse {
  cod: string
  message: number
  cnt: number
  list: ForecastItem[]
}

export interface ForecastItem {
  dt: number
  main: MainWeather
  weather: Weather[]
  clouds: Clouds
  wind: Wind
  visibility: number
  pop: number
  sys: Sys
  dt_txt: string
}

export interface MainWeather {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  sea_level: number
  grnd_level: number
  humidity: number
  temp_kf: number
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Clouds {
  all: number
}

export interface Wind {
  speed: number
  deg: number
  gust: number
}

export interface Sys {
  pod: "d" | "n"
}

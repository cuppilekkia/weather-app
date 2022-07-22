import { useState } from 'react';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import Search from './components/search/search';
import Forecast from './components/forecast/forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecastWeather, setForecastWeather] = useState(null)

  const handleOnSearchChange = ({value, label}) => {
    const {lat, lon} = value

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([
      currentWeatherFetch,
      forecastWeatherFetch
    ]).then(async (response) => {
      const currentResponse = await response[0].json()
      const forecastResponse = await response[1].json()

      setCurrentWeather({
        city: label,
        ...currentResponse,
      })
      setForecastWeather({
        city: label,
        ...forecastResponse
      })
    }).catch(e => {
      console.error(e)
    })
  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecastWeather && <Forecast data={forecastWeather}/>}
    </div>
  );
}

export default App;

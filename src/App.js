import React, { useState, useEffect } from "react";
import "./App.css";
import cloudy from "./images/cloudy.png";

function App() {

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e33e780b8732637f1aa5e3a535af6fa1`;
        const response = await fetch(url);

        if (!response.ok) {
          setError("City not found");
          setWeatherData(null);
          return;
        }

        const data = await response.json();
        setWeatherData(data);
        setError(null);

      } catch (error) {
        setError("Error fetching weather data");
        setWeatherData(null);
      }
    };

    if (city) {
      fetchApi();
    }
  }, [city]);

  return (
    <div className="App">
      <header className="main-container">
        <div className="weather-app">
          <h1>Weather in</h1>
          <input
            className="inputfield"
            type="text"
            placeholder="Enter city name..."
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="app-mini-container">
            {error ? (
              <p className="error-message">{error}</p>
            ) : (
              <>
                <h2>{city}</h2>
                {weatherData && weatherData.main ? (
                  <>
                    <div className="temperature-div">
                      <span className="degree">{weatherData.main.temp}°C</span>
                      <h3>{weatherData.weather[0].description}</h3>
                    </div>
                    <div className="temperature-range">
                      <span>Max: {weatherData.main.temp_max}°C</span>
                      <span>Min: {weatherData.main.temp_min}°C</span>
                    </div>
                    <div className="weather-img">
                      <img src={cloudy} alt="Image" />
                    </div>
                    <div className="weather-condition">
                      <div className="condition">
                        <span className="measure">
                          {weatherData.main.feels_like}°C
                        </span>
                        <span>feels like</span>
                      </div>
                      <div className="condition">
                        <span className="measure">
                          {weatherData.main.humidity}%
                        </span>
                        <span>humidity</span>
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;


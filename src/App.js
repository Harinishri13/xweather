import React, { useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

const API_KEY = "2e0d50297d7a4c3a96a123608250511"; // Replace with your actual API key
const API_URL = "https://api.weatherapi.com/v1/current.json";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(
        `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchWeather();
  };

  return (
    <div className="container">
      <h1 className="app-title">Weather Application</h1>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p className="loading-message">Loading data...</p>}

      {weatherData && (
        <div className="weather-cards">
          <WeatherCard
            title="Temperature"
            value={`${weatherData.current.temp_c}°C`}
            icon="🌡️"
          />
          <WeatherCard
            title="Humidity"
            value={`${weatherData.current.humidity}%`}
            icon="💧"
          />
          <WeatherCard
            title="Condition"
            value={weatherData.current.condition.text}
            icon="☁️"
          />
          <WeatherCard
            title="Wind Speed"
            value={`${weatherData.current.wind_kph} kph`}
            icon="💨"
          />
        </div>
      )}

      {!weatherData && !loading && (
        <div className="initial-state">
          <p>Search for a city to get weather information</p>
        </div>
      )}
    </div>
  );
}

export default App;

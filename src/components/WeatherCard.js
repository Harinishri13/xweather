import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ title, value, icon }) => {
  return (
    <div className="weather-card">
      <div className="weather-card-icon">{icon}</div>
      <h3 className="weather-card-title">{title}</h3>
      <p className="weather-card-value">{value}</p>
    </div>
  );
};

export default WeatherCard;

import weatherService from '../services/weather';
import React, { useState, useEffect } from 'react';

const Country = ({ info }) => {
  const [weather, setWeather] = useState({
    weather: [{ icon: '01d' }],
    main: { temp: 0 },
    wind: { speed: 0 },
  });

  useEffect(() => {
    weatherService.getWeather(info).then(response => {
      console.log(response);
      setWeather(response);
    });
  }, [info]);

  const iconLink = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <>
      <h1>{info.name.common}</h1>
      <h3>languages</h3>
      <p>Capital: {info.capital[0]}</p>
      <p>Area: {info.area}</p>
      <ul>
        {Object.values(info.languages).map(language => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <div>
        <img
          src={info.flags.png}
          alt={info.flags.alt}
        />
      </div>
      <div>
        <h2>Current weather in {info.capital}</h2>
        <p>Temperature: {weather.main.temp} &#176;F</p>
        <img
          src={iconLink}
          alt={weather.weather[0].description}
        />
        <p>{weather.weather[0].description}</p>
        <p>Wind: {weather.wind.speed} mi/hr</p>
      </div>
    </>
  );
};

export default Country;

import axios from 'axios';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';

const getWeather = info => {
  const request = axios.get(
    `${baseUrl}lat=${info.latlng[0]}&lon=${info.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
  );
  return request.then(response => response.data);
};

const weatherService = { getWeather };

export default weatherService;

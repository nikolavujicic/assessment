import axios from 'axios'

const API_KEY = '73d9c7f9fc5a20dde75a2ba59d1af24f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherByCity = async (city: string) => {
    const response = await axios.get(BASE_URL, {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric'
        }
    })
    return response.data
}
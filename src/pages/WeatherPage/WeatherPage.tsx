import { useState } from 'react';
import useWeatherData from '../../hooks/useWeatherData';
import {
    WeatherContainer,
    WeatherHeader,
    CityInput,
    WeatherData,
    ErrorMessage,
    LoadingMessage,
} from './WeatherPage.styles';

const WeatherPage = () => {
    const [city, setCity] = useState('Frankfurt');
    const { data, error, isLoading } = useWeatherData(city);

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    return (
        <WeatherContainer>
            <WeatherHeader>Weather Widget</WeatherHeader>
            <CityInput
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Enter city"
            />
            {isLoading && <LoadingMessage>Loading...</LoadingMessage>}
            {error && <ErrorMessage>Error fetching weather</ErrorMessage>}
            {data && (
                <WeatherData>
                    <h4>{data.name}</h4>
                    <p>{data.weather[0].description}</p>
                    <p>{data.main.temp}°C</p>
                </WeatherData>
            )}
        </WeatherContainer>
    );
};

export default WeatherPage;

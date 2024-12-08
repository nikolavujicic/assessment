import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { getWeatherByCity } from '../services/weather'

function useWeatherData(city: string) {
    const [debouncedCity, setDebouncedCity] = useState(city);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedCity(city)
        }, 1000)

        return () => clearTimeout(timeout);
    }, [city])
    const data = useQuery({
        queryKey: ['weather', debouncedCity],
        queryFn: () => getWeatherByCity(debouncedCity),
        enabled: !!debouncedCity
    });
    return data;
}

export default useWeatherData;
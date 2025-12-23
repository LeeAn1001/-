
import { WeatherInfo, ForecastDay } from '../types';

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherInfo> => {
  try {
    // Fetching current weather and 3-day forecast
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    const data = await response.json();
    
    const weatherCode = data.current_weather.weathercode;
    const temp = data.current_weather.temperature;
    
    // WMO Weather interpretation codes for rain/drizzle
    const rainyCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82];
    const isRainy = rainyCodes.includes(weatherCode);
    
    const currentHour = new Date().getHours();
    const isPerfectTime = currentHour >= 21 || currentHour <= 2;
    
    let statusText: 'OPTIMAL' | 'SUB-OPTIMAL' | 'CRITICAL' = 'SUB-OPTIMAL';
    if (isRainy || isPerfectTime) {
      statusText = 'OPTIMAL';
    } else if (currentHour >= 18 || currentHour <= 5) {
       statusText = 'SUB-OPTIMAL';
    } else {
       statusText = 'CRITICAL';
    }

    // Process 3 days of forecast
    const forecast: ForecastDay[] = data.daily.time.slice(0, 3).map((time: string, index: number) => {
      const code = data.daily.weathercode[index];
      const isDayRainy = rainyCodes.includes(code);
      return {
        date: time,
        maxTemp: data.daily.temperature_2m_max[index],
        minTemp: data.daily.temperature_2m_min[index],
        condition: isDayRainy ? 'Rainy' : 'Clear',
        isRainy: isDayRainy
      };
    });

    return {
      temp,
      condition: isRainy ? 'Rainy' : 'Clear',
      isRainy,
      isPerfectTime,
      statusText,
      forecast
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return {
      temp: 22,
      condition: 'Unknown',
      isRainy: false,
      isPerfectTime: false,
      statusText: 'SUB-OPTIMAL',
      forecast: []
    };
  }
};

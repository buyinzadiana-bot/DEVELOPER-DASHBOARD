import React, { useEffect, useState } from 'react';

interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
}

const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    // update time every second
    const t = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // try to get user's location
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        await fetchWeather(latitude, longitude);
      },
      async () => {
        // fallback: Kigali
        await fetchWeather(-1.94995, 30.0588);
      }
    );
  }, []);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      const data = await res.json();
      setWeather(data.current_weather);
    } catch (err) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow text-center">Loading...</div>;
  if (error) return <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow text-center transition">
      <h2 className="text-xl font-semibold mb-2">Current Weather</h2>
      <p className="text-sm text-gray-500 mb-4">{time}</p>
      {weather && (
        <div>
          <p className="text-lg">🌡️ Temperature: {weather.temperature}°C</p>
          <p>💨 Wind Speed: {weather.windspeed} km/h</p>
          <p>⛅ Condition Code: {weather.weathercode}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
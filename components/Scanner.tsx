
import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/weatherService';
import { WeatherInfo } from '../types';

const Scanner: React.FC = () => {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const data = await fetchWeatherData(
            position.coords.latitude,
            position.coords.longitude
          );
          setWeather(data);
          setLoading(false);
        },
        () => {
          setLoading(false);
          const h = new Date().getHours();
          setWeather({
            temp: 20,
            condition: 'Offline',
            isRainy: false,
            isPerfectTime: h >= 21 || h <= 2,
            statusText: (h >= 21 || h <= 2) ? 'OPTIMAL' : 'SUB-OPTIMAL',
            forecast: []
          });
        }
      );
    }

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPTIMAL': return 'text-green-500';
      case 'SUB-OPTIMAL': return 'text-yellow-500';
      case 'CRITICAL': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: any = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('zh-TW', options);
  };

  return (
    <section id="scanner" className="relative group">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xl font-bold text-green-500 border-b-2 border-green-500 pb-1">
         <h2 className="text-xl font-bold text-green-500 border-b-2 border-green-500 pb-1">
  &gt; 環境掃描儀 / STATUS
</h2>
        </h2>
        <div className="flex-1 h-px bg-green-900/50"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Card */}
        <div className="bg-green-500/5 border border-green-500/20 p-6 relative overflow-hidden h-full">
          <div className="absolute top-0 right-0 p-2 text-[8px] opacity-30">SCANNING_TIME_NODE</div>
          <p className="text-xs text-green-500/60 uppercase mb-2 tracking-widest">Local System Time</p>
          <div className="text-4xl font-bold font-mono tracking-tighter">
            {currentTime.toLocaleTimeString('en-US', { hour12: false })}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${weather?.isPerfectTime ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="text-[10px] tracking-wider text-white/70">
              {weather?.isPerfectTime ? 'TIME_VECTOR_SYNCED' : 'AWAITING_NIGHTFALL'}
            </span>
          </div>
        </div>

        {/* Current Weather Card */}
        <div className="bg-green-500/5 border border-green-500/20 p-6 relative overflow-hidden h-full">
          <div className="absolute top-0 right-0 p-2 text-[8px] opacity-30">SCANNING_ENV_ATMOSPHERE</div>
          <p className="text-xs text-green-500/60 uppercase mb-2 tracking-widest">Atmospheric Condition</p>
          
          {loading ? (
            <div className="animate-pulse flex flex-col gap-2">
              <div className="h-8 w-32 bg-green-900/20 rounded"></div>
              <div className="h-4 w-24 bg-green-900/20 rounded"></div>
            </div>
          ) : (
            <>
              <div className="text-4xl font-bold font-mono tracking-tighter">
                {weather?.temp}°C <span className="text-lg font-normal opacity-50">/ {weather?.condition}</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${weather?.isRainy ? 'bg-cyan-500 shadow-[0_0_8px_cyan]' : 'bg-gray-500'}`}></div>
                <span className="text-[10px] tracking-wider text-white/70">
                  {weather?.isRainy ? 'PRECIPITATION_DETECTED: IRIDESCENCE_CHANCE_HIGH' : 'DRY_ENVIRONMENT: VISUAL_ARTIFACTS_STABLE'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Weather Report / Forecast Section */}
      <div className="mt-6 bg-black border border-green-500/10 p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-green-500 font-mono tracking-widest uppercase opacity-70">
            // 天氣預報 / ATMOSPHERIC_PROJECTION
          </p>
          <div className="text-[8px] text-green-900 font-mono">PREDICTIVE_GLITCH_ANALYSIS_V4</div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-3 gap-4 animate-pulse">
            <div className="h-20 bg-green-900/10 rounded"></div>
            <div className="h-20 bg-green-900/10 rounded"></div>
            <div className="h-20 bg-green-900/10 rounded"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {weather?.forecast.map((day, idx) => (
              <div key={day.date} className={`p-3 border ${day.isRainy ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-green-500/10 bg-green-500/5'} transition-all hover:border-green-500/40`}>
                <p className="text-[10px] text-white/40 mb-1">{idx === 0 ? 'TODAY' : formatDate(day.date)}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold font-mono text-white">
                    {Math.round(day.minTemp)}° — {Math.round(day.maxTemp)}°
                  </span>
                  <span className="text-xl">
                    {day.isRainy ? '🌧️' : '🌑'}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                   <span className={`text-[9px] font-bold px-1 ${day.isRainy ? 'text-cyan-400 bg-cyan-400/10' : 'text-green-500 bg-green-500/10'}`}>
                     {day.isRainy ? 'RAIN_GLITCH: HIGH' : 'SIGNAL: CLEAR'}
                   </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 p-4 border-2 border-dashed border-green-500/20 text-center">
        <span className="text-xs text-white/50 tracking-[0.2em] uppercase">Current Hunting Suggestion:</span>
        <div className={`text-2xl font-black mt-2 tracking-[0.5em] ${weather ? getStatusColor(weather.statusText) : 'text-gray-500'}`}>
          [{weather?.statusText || 'ANALYZING...'}]
        </div>
      </div>
    </section>
  );
};

export default Scanner;

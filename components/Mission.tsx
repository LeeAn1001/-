
import React, { useState, useEffect } from 'react';

const Mission: React.FC = () => {
  // Set target date for the next hunting window
  // For demo purposes, we set it to a date in late 2024 as per the app's theme
  const targetDate = new Date('2024-12-31T21:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const CountdownBox = ({ label, value }: { label: string, value: number }) => (
    <div className="flex flex-col items-center justify-center bg-green-500/10 border border-green-500/30 p-3 min-w-[70px]">
      <span className="text-2xl md:text-3xl font-black font-mono text-green-500">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[9px] uppercase tracking-widest text-green-500/50 mt-1">{label}</span>
    </div>
  );

  return (
    <section id="mission" className="space-y-12">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-green-500 border-b-2 border-green-500 pb-1">
         <h2 className="text-xl font-bold text-green-500 border-b-2 border-green-500 pb-1">
  &gt; 任務情資 / MISSION BRIEFING
</h2>
        </h2>
        <div className="flex-1 h-px bg-green-900/50"></div>
      </div>

      {/* Countdown Section */}
      <div className="relative p-6 border-2 border-green-500/20 bg-green-500/5 overflow-hidden">
        <div className="absolute top-0 left-0 bg-green-500 text-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-tighter">
          Countdown to Next Window
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 py-4">
          <CountdownBox label="Days" value={timeLeft.days} />
          <div className="text-2xl text-green-500/30 font-mono animate-pulse">:</div>
          <CountdownBox label="Hours" value={timeLeft.hours} />
          <div className="text-2xl text-green-500/30 font-mono animate-pulse">:</div>
          <CountdownBox label="Minutes" value={timeLeft.minutes} />
          <div className="text-2xl text-green-500/30 font-mono animate-pulse">:</div>
          <CountdownBox label="Seconds" value={timeLeft.seconds} />
        </div>
        <div className="mt-2 text-center">
          <p className="text-[10px] font-mono text-green-500/40 uppercase tracking-[0.3em]">
            SYSTEM_STATUS: STANDBY_FOR_SYNC
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
           <div className="border-l-4 border-green-500 pl-6 space-y-2">
             <h3 className="text-green-500 font-bold uppercase tracking-widest text-sm">時間 / SYNC TIME</h3>
             <p className="text-white text-lg">任意雨後的深夜</p>
             <p className="text-green-500/60 font-mono text-sm">21:00 — 03:00 (GMT+8)</p>
           </div>

           <div className="border-l-4 border-green-500 pl-6 space-y-2">
             <h3 className="text-green-500 font-bold uppercase tracking-widest text-sm">地點 / VECTOR</h3>
             <p className="text-white text-lg">舊工業遺址 / 底層住宅巷弄</p>
             <p className="text-green-500/60 font-mono text-sm">CITY_EDGE_GRID: AREA_42</p>
           </div>
           
           <div className="bg-red-500/10 border border-red-500/20 p-4 text-xs text-red-500 font-mono">
             [WARNING] 偵測到極低光源與非正規訊號。請隨時保持警戒，並與現實座標保持適度脫離。
           </div>
        </div>

        <div className="relative aspect-video bg-green-900/10 border border-green-500/30 overflow-hidden flex items-center justify-center">
          {/* Mock Map Visual */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, #00ff00 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          <div className="z-10 text-center">
            <div className="inline-block w-4 h-4 border-2 border-green-500 mb-4 animate-ping"></div>
            <div className="font-mono text-[10px] text-green-500 animate-pulse">
              CALCULATING_OPTIMAL_COORDINATES...<br/>
              [LAT: 25.0330 | LON: 121.5654]
            </div>
          </div>
          {/* Cyber Frames */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-green-500/50"></div>
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-green-500/50"></div>
        </div>
      </div>

      <div className="bg-green-500/5 border border-green-500/20 p-8">
        <h3 className="text-green-500 font-bold mb-6 text-center tracking-widest">行為準則 / PROTOCOL</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-center">
          <li className="space-y-2">
            <div className="text-2xl">🎧</div>
            <p className="font-bold">佩戴耳機</p>
            <p className="text-white/60 text-xs italic">沉浸於信號隔離層</p>
          </li>
          <li className="space-y-2">
            <div className="text-2xl">🤫</div>
            <p className="font-bold">保持安靜</p>
            <p className="text-white/60 text-xs italic">不要干擾數據提取</p>
          </li>
          <li className="space-y-2">
            <div className="text-2xl">🔋</div>
            <p className="font-bold">充足電力</p>
            <p className="text-white/60 text-xs italic">系統運作需要高功耗</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Mission;

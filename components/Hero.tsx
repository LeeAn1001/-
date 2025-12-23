
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[80vh] flex flex-col items-center justify-center bg-black overflow-hidden border-b border-green-900/30">
      {/* Background Static Simulation */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uWUicKg5GDmoM6/giphy.gif')] bg-cover"></div>
      
      <div className="z-10 text-center space-y-6 px-4">
        <div className="relative inline-block">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase glitch-text leading-none">
            CYBER<br/>HUNT
          </h1>
          <div className="absolute -bottom-2 right-0 bg-green-500 text-black px-2 py-1 text-[10px] font-bold tracking-[0.2em]">
            V.2024.0.ALPHA
          </div>
        </div>
        
        <p className="text-green-500 text-lg md:text-xl font-mono tracking-[0.3em] uppercase opacity-80">
          // 城市邊界狩獵行動 //
        </p>
        
        <div className="mt-12 max-w-lg mx-auto p-4 border-l-2 border-green-500 bg-green-500/5 backdrop-blur-sm">
          <p className="text-green-400/90 text-sm md:text-base leading-relaxed text-left font-light">
            這是一場針對城市遺傳物質的狩獵。拋棄導航地圖，深入那些被演算法忽略的「現實錯誤 (Glitch)」。我們不只是在觀察，我們是在霓虹燈爍與鐵鏽腐蝕的縫隙中，提取城市的原始底層代碼。
          </p>
        </div>
        
        <div className="pt-8 flex justify-center items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[10px] text-red-500 tracking-widest font-bold">REALITY BUG DETECTED</span>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-16 bg-gradient-to-b from-green-500 to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;

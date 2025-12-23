
import React from 'react';

const Footer: React.FC = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Cyber Hunt | 城市邊界狩獵行動',
        text: '一起參與現實 Bug 的非線性狩獵行動',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('複製連結成功：' + window.location.href);
    }
  };

  return (
    <section id="gear-up" className="pt-24 pb-12 border-t border-green-900/30">
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black text-white tracking-widest uppercase flicker">
            READY TO HUNT?
          </h2>
          <p className="text-green-500/60 font-mono text-sm uppercase">裝備整備完畢，即刻前往邊界。</p>
        </div>

        {/* Mock Audio Player */}
        <div className="bg-green-500/5 border-2 border-green-500/30 p-6 space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
               <h4 className="text-xs font-bold text-green-500 uppercase">Mission Audio Track</h4>
               <p className="text-sm text-white/80">Ambient_Signal_09.wav</p>
            </div>
            <div className="text-[10px] text-green-500/40 font-mono">BITRATE: 1411kbps</div>
          </div>

          <div className="flex items-center gap-4">
             <button className="w-12 h-12 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-black transition-all">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
             </button>
             <div className="flex-1 h-1 bg-green-900/30 relative">
               <div className="absolute left-0 top-0 h-full w-1/3 bg-green-500"></div>
               <div className="absolute left-[33%] -top-1 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#00ff00]"></div>
             </div>
             <span className="text-[10px] text-green-500 font-mono">03:12 / 10:45</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="#" 
            className="group flex items-center justify-center gap-3 py-4 border-2 border-green-500 text-green-500 font-bold hover:bg-green-500 hover:text-black transition-all uppercase tracking-widest text-sm"
          >
            <span>下載任務音頻</span>
            <svg className="w-4 h-4 fill-current group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          </a>
          <button 
            onClick={handleShare}
            className="group flex items-center justify-center gap-3 py-4 border-2 border-white text-white font-bold hover:bg-white hover:text-black transition-all uppercase tracking-widest text-sm"
          >
            <span>傳輸任務座標</span>
            <svg className="w-4 h-4 fill-current group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>

        <div className="text-center pt-20">
          <p className="text-[10px] text-green-500/20 tracking-[1em] uppercase">
            © 2024 CYBER HUNT PROJECT. ALL RIGHTS RESERVED.
          </p>
          <div className="mt-4 font-mono text-[8px] text-green-500/10">
            LOC_VER: 25.03, 121.56 | SYS_AUTH: ACCESS_GRANTED | ERROR_DETECTED: TRUE
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;

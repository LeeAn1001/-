
import React, { useState, useEffect, useCallback } from 'react';
import Hero from './components/Hero';
import Scanner from './components/Scanner';
import Mission from './components/Mission';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [bootLog, setBootLog] = useState<string[]>([]);

  const handleInitialize = () => {
    const logs = [
      "ACCESSING CORE SYSTEMS...",
      "BYPASSING LOCAL SECURITY...",
      "DECRYPTING MISSION DATA...",
      "CALIBRATING OPTICAL SENSORS...",
      "SYSTEM STABILIZED.",
      "WELCOME TO THE BORDER."
    ];
    
    logs.forEach((log, index) => {
      setTimeout(() => {
        setBootLog(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setTimeout(() => setIsInitialized(true), 1000);
        }
      }, index * 400);
    });
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full border-2 border-green-500/30 p-8 relative">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>
          
          <h1 className="text-4xl font-bold text-green-500 mb-8 tracking-widest text-center animate-pulse">
            CYBER HUNT
          </h1>
          
          <div className="space-y-2 mb-10 h-32 overflow-hidden">
            {bootLog.map((log, i) => (
  <p key={i} className="text-green-500/80 text-xs font-mono">
    [SYSTEM] &gt; {log}
  </p>
))}
            {bootLog.length === 0 && (
              <p className="text-green-500/40 text-xs font-mono animate-blink">
                _ WAITING FOR USER INPUT...
              </p>
            )}
          </div>

          <button 
            onClick={handleInitialize}
            disabled={bootLog.length > 0}
            className={`w-full py-4 border-2 border-green-500 text-green-500 font-bold hover:bg-green-500 hover:text-black transition-all duration-300 tracking-widest uppercase disabled:opacity-50`}
          >
            {bootLog.length > 0 ? "INITIALIZING..." : "Initialize System"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in transition-opacity duration-1000">
      <Hero />
      <div className="container mx-auto px-4 py-12 space-y-24 max-w-4xl">
        <Scanner />
        <Mission />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default App;


import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'IDLE' | 'TRANSMITTING' | 'SENT' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    playerId: '',
    frequency: '',
    content: ''
  });

  const GAS_URL = 'https://script.google.com/macros/s/AKfycbyeJ_en5hMG9m9YTD4d2RCPrLUZ1JzE3ZWmhplmnFQ1J8iE9VDL8oCD2F0A2-3zSonF/exec';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('TRANSMITTING');
    setErrorMessage('');
    
    try {
      // 由於 GAS 不支援標準的 CORS JSON 預檢請求，
      // 我們使用 'text/plain' 格式發送，後端腳本中已有 JSON.parse 處理
      const response = await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors', // 使用 no-cors 模式確保請求能成功發出至 GAS
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData),
      });

      // 注意：在 no-cors 模式下，我們無法讀取回應內容 (response.json())
      // 但只要請求發出且沒有 catch 到錯誤，通常代表已送達。
      // 為了優化體驗，我們模擬一個短暫延遲後顯示成功。
      setTimeout(() => {
        setStatus('SENT');
        setFormData({ playerId: '', frequency: '', content: '' });
        
        // 5秒後重置回初始狀態
        setTimeout(() => setStatus('IDLE'), 5000);
      }, 1500);

    } catch (error) {
      console.error('Transmission Error:', error);
      setStatus('ERROR');
      setErrorMessage('傳輸通道遭到干擾，請稍後再試。');
      setTimeout(() => setStatus('IDLE'), 4000);
    }
  };

  return (
    <section id="contact" className="space-y-12">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-green-500 border-b-2 border-green-500 pb-1">
          > 聯絡基地 / SIGNAL TRANSMISSION
        </h2>
        <div className="flex-1 h-px bg-green-900/50"></div>
      </div>

      <div className="relative">
        {/* Decorative corner accents */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-green-500 z-10"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-green-500 z-10"></div>

        <form 
          onSubmit={handleSubmit}
          className={`bg-green-500/5 border border-green-500/20 p-8 space-y-8 relative overflow-hidden transition-all duration-500 ${
            status === 'SENT' ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {/* 傳輸中遮罩 */}
          {status === 'TRANSMITTING' && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-green-500 font-mono text-sm tracking-[0.3em] animate-pulse">ENCRYPTING_PACKETS...</p>
            </div>
          )}

          {/* 成功遮罩 */}
          {status === 'SENT' && (
            <div className="absolute inset-0 bg-green-500/10 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-4">
              <div className="text-4xl">📡</div>
              <p className="text-green-500 font-bold text-xl tracking-widest uppercase">Signal Accepted</p>
              <p className="text-white/60 text-xs font-mono uppercase">Data merged with the border grid successfully.</p>
            </div>
          )}

          {/* 錯誤遮罩 */}
          {status === 'ERROR' && (
            <div className="absolute inset-0 bg-red-500/10 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-4">
              <div className="text-4xl text-red-500">⚠️</div>
              <p className="text-red-500 font-bold text-xl tracking-widest uppercase">Transmission Failed</p>
              <p className="text-white/60 text-xs font-mono uppercase">{errorMessage}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-[10px] text-green-500 font-mono uppercase tracking-[0.2em]">
                // 玩家ID / PLAYER_ID
              </label>
              <input 
                type="text" 
                required
                value={formData.playerId}
                onChange={(e) => setFormData({...formData, playerId: e.target.value})}
                placeholder="HUNTER_#8824"
                className="w-full bg-black border-b border-green-500/30 focus:border-green-500 outline-none p-3 text-white font-mono transition-colors placeholder:text-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] text-green-500 font-mono uppercase tracking-[0.2em]">
                // 通訊頻率 / SIGNAL_CHANNEL (Email)
              </label>
              <input 
                type="email" 
                required
                value={formData.frequency}
                onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                placeholder="hunter@border.net"
                className="w-full bg-black border-b border-green-500/30 focus:border-green-500 outline-none p-3 text-white font-mono transition-colors placeholder:text-white/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] text-green-500 font-mono uppercase tracking-[0.2em]">
              // 傳輸內容 / RAW_DATA_PAYLOAD
            </label>
            <textarea 
              rows={4}
              required
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="REPORTING_OBSERVATION_HERE..."
              className="w-full bg-black border border-green-500/30 focus:border-green-500 outline-none p-4 text-white font-mono transition-colors resize-none placeholder:text-white/10"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
            <div className="space-y-1">
               <p className="text-[9px] text-white/30 font-mono max-w-xs leading-relaxed uppercase">
                 * BY CLICKING TRANSMIT, YOU ACKNOWLEDGE THAT YOUR SIGNAL WILL BE RECORDED IN THE PERMANENT ARCHIVE.
               </p>
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                 <p className="text-[9px] text-green-500/50 font-mono uppercase tracking-wider">
                   Secure Link: Active
                 </p>
               </div>
            </div>
            <button 
              type="submit"
              disabled={status !== 'IDLE'}
              className="w-full sm:w-auto px-10 py-4 bg-green-500 text-black font-black uppercase tracking-[0.2em] hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'IDLE' ? 'Transmit Signal' : 'Processing...'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;

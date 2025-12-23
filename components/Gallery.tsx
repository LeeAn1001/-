
import React from 'react';

const Gallery: React.FC = () => {
  const items = [
    {
      id: '01',
      title: '故障招牌',
      subtitle: 'FAULTY_SIGN',
      desc: '頻率不穩的霓虹信號，隱藏著城市的原始脈衝。',
      img: 'https://picsum.photos/seed/neon/600/400'
    },
    {
      id: '02',
      title: '虹光水窪',
      subtitle: 'IRIDESCENT_PUDDLE',
      desc: '機油與雨水混和後的色彩偏移，是空間撕裂的視覺證據。',
      img: 'https://picsum.photos/seed/oil/600/400'
    },
    {
      id: '03',
      title: '畸形植物',
      subtitle: 'GLITCH_ORGANISM',
      desc: '在水泥縫隙中受電子輻射影響，產生幾何變異的生命體。',
      img: 'https://picsum.photos/seed/plant/600/400'
    }
  ];

  return (
    <section id="gallery" className="space-y-12">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-green-500 border-b-2 border-green-500 pb-1">
          &gt;錯誤圖鑑 / BUG GALLERY
        </h2>
        <div className="flex-1 h-px bg-green-900/50"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="group relative overflow-hidden bg-black border border-green-500/20 hover:border-green-500 transition-all duration-500">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              {/* Scanline Overlay on card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              
              {/* Glitch Overlay (Visible on Hover) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none flex flex-col items-center justify-center bg-green-500/10">
                 <div className="text-[40px] font-black text-green-500 -skew-x-12 animate-glitch">EXTRACTING</div>
              </div>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-green-500/50 font-mono">CODE: {item.id}</span>
                <span className="text-[10px] bg-green-500 text-black px-1 font-bold">TYPE: {item.subtitle}</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-green-500 transition-colors">{item.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>

            {/* Corner Deco */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-green-500 transition-all"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;

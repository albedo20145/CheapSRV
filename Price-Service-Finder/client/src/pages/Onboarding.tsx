import React from 'react';
import { useLocation } from 'wouter';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useStore } from '@/lib/store';

const slides = [
  {
    title: "Best Prices for OTT",
    desc: "Compare prices for Netflix, Prime, and more. Find the cheapest shared plans instantly.",
    icon: <Zap size={64} className="text-cyan-400" />,
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    title: "AI Tools at Fraction Cost",
    desc: "Get access to ChatGPT, Midjourney, and other premium AI tools without breaking the bank.",
    icon: <CheckCircle2 size={64} className="text-purple-400" />,
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Safe & Verified",
    desc: "We only list trusted providers. No scams, just savings. Information only.",
    icon: <ShieldCheck size={64} className="text-emerald-400" />,
    color: "from-emerald-500/20 to-green-500/20"
  }
];

export default function Onboarding() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [, setLocation] = useLocation();
  const setHasSeenOnboarding = useStore(state => state.setHasSeenOnboarding);

  React.useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const handleNext = () => {
    if (selectedIndex < slides.length - 1) {
      emblaApi?.scrollNext();
    } else {
      setHasSeenOnboarding(true);
      setLocation('/auth');
    }
  };

  return (
    <div className="h-screen bg-[#0f172a] text-white flex flex-col">
      <div className="flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 flex flex-col items-center justify-center p-8 relative">
              <div className={`absolute inset-0 bg-gradient-to-b ${slide.color} opacity-30`} />
              
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative z-10 w-40 h-40 rounded-full bg-slate-800/50 border border-white/10 flex items-center justify-center mb-10 shadow-2xl"
              >
                {slide.icon}
              </motion.div>

              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl font-bold text-center mb-4 font-display"
              >
                {slide.title}
              </motion.h2>

              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 text-center leading-relaxed max-w-xs"
              >
                {slide.desc}
              </motion.p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 flex items-center justify-between z-20 bg-[#0f172a]/80 backdrop-blur-sm">
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <div 
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${idx === selectedIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700'}`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="w-14 h-14 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 transition-transform"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}

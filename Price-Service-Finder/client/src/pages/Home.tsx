import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Search, Tv, Music, Video, Zap, Palette, PlayCircle, Instagram, Youtube } from 'lucide-react';
import { categories, services } from '@/data/db';
import { ServiceCard } from '@/components/ServiceCard';
import { AdMobMock } from '@/components/ads/AdMobMock';
import { PageTransition, staggerContainer, staggerItem } from '@/components/layout/PageTransition';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Instagram': return Instagram;
    case 'Youtube': return Youtube;
    case 'Music': return Music;
    case 'Tv': return Tv;
    case 'Video': return Video;
    case 'Zap': return Zap;
    case 'Palette': return Palette;
    case 'PlayCircle': return PlayCircle;
    default: return Tv;
  }
};

export default function Home() {
  const popularServices = services.filter(s => s.popular);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0f172a] pb-24">
        {/* Header */}
        <div className="p-6 pt-8 flex items-center justify-between sticky top-0 bg-[#0f172a]/80 backdrop-blur-xl z-20 border-b border-white/5">
          <div>
            <h1 className="text-2xl font-bold text-white font-display">Cheap<span className="text-cyan-400">SRV</span></h1>
            <p className="text-xs text-slate-400">Best deals updated daily</p>
          </div>
          <Link href="/explore">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-colors hover:bg-slate-700"
            >
              <Search size={20} />
            </motion.button>
          </Link>
        </div>

        <motion.div 
          className="p-6 space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Categories */}
          <motion.div 
            variants={staggerItem}
            className="grid grid-cols-3 gap-3"
          >
            {categories.map((cat, idx) => {
              const Icon = getIcon(cat.icon);
              return (
                <Link key={cat.id} href={`/services/${cat.id}`}>
                  <motion.div 
                    whileTap={{ scale: 0.95 }}
                    className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 flex flex-col items-center gap-3 cursor-pointer hover:bg-slate-800 transition-colors group"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg`}
                    >
                      <Icon size={24} />
                    </motion.div>
                    <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors text-center leading-tight">{cat.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>

          <motion.div variants={staggerItem}>
            <AdMobMock type="banner" className="rounded-xl" />
          </motion.div>

          {/* Featured */}
          <motion.section variants={staggerItem}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Trending Now</h2>
              <Link href="/explore">
                <motion.span whileTap={{ scale: 0.95 }} className="text-xs text-cyan-400 font-medium cursor-pointer">View All</motion.span>
              </Link>
            </div>
            
            <motion.div 
              className="space-y-4"
              variants={staggerContainer}
            >
              {popularServices.map((item) => (
                <ServiceCard key={item.id} item={item} />
              ))}
            </motion.div>
          </motion.section>

          <motion.div variants={staggerItem}>
            <AdMobMock type="native" />
          </motion.div>

          {/* Recent */}
          <motion.section variants={staggerItem}>
            <h2 className="text-lg font-bold text-white mb-4">New Arrivals</h2>
            <motion.div 
              className="space-y-4"
              variants={staggerContainer}
            >
              {services.filter(s => !s.popular).slice(0, 3).map((item) => (
                <ServiceCard key={item.id} item={item} />
              ))}
            </motion.div>
          </motion.section>
        </motion.div>
      </div>
    </PageTransition>
  );
}

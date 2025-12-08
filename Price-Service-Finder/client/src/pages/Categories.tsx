import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram, Youtube, Music, Tv, Video, Zap, Palette, PlayCircle } from 'lucide-react';
import { categories } from '@/data/db';
import { PageTransition, staggerContainer, staggerItem } from '@/components/layout/PageTransition';
import { AdMobMock } from '@/components/ads/AdMobMock';

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

export default function Categories() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0f172a] pb-24">
        {/* Header */}
        <div className="p-6 pt-8 flex items-center gap-4 sticky top-0 bg-[#0f172a]/90 backdrop-blur-xl z-20 border-b border-slate-800">
          <Link href="/home">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-colors hover:bg-slate-700"
            >
              <ArrowLeft size={20} />
            </motion.button>
          </Link>
          <h1 className="text-xl font-bold text-white">Categories</h1>
        </div>

        <motion.div 
          className="p-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={staggerItem} className="mb-6">
            <h2 className="text-lg font-bold text-white mb-1">All Services</h2>
            <p className="text-sm text-slate-400">Select a category to browse services</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat, idx) => {
              const Icon = getIcon(cat.icon);
              return (
                <Link key={cat.id} href={`/services/${cat.id}`}>
                  <motion.div 
                    variants={staggerItem}
                    whileTap={{ scale: 0.95 }}
                    className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex flex-col items-center gap-4 cursor-pointer hover:bg-slate-800 transition-colors group relative overflow-hidden"
                  >
                    {/* Background glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg z-10`}
                    >
                      <Icon size={32} />
                    </motion.div>
                    <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors text-center z-10">{cat.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <motion.div variants={staggerItem} className="mt-8">
            <AdMobMock type="banner" className="rounded-xl" />
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

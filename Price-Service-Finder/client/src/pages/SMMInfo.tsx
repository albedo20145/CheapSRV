import React from 'react';
import { motion } from 'framer-motion';
import { Info, BookOpen, TrendingUp, AlertCircle } from 'lucide-react';
import { AdMobMock } from '@/components/ads/AdMobMock';
import { PageTransition, staggerContainer, staggerItem } from '@/components/layout/PageTransition';

export default function SMMInfo() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0f172a] pb-24">
        <div className="p-6 pt-12">
          <h1 className="text-2xl font-bold text-white font-display mb-2">SMM Guide</h1>
          <p className="text-slate-400 text-sm">Educational resources about Social Media Marketing services.</p>
        </div>

        <motion.div 
          className="px-6 space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            variants={staggerItem}
            className="p-5 bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/30 rounded-2xl"
          >
            <div className="flex items-start gap-3">
              <Info className="text-violet-400 shrink-0" size={24} />
              <div>
                <h3 className="text-white font-bold mb-2">What is SMM?</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Social Media Marketing (SMM) panels are services that provide engagement (likes, followers, views) for various social platforms to help boost visibility.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <AdMobMock type="banner" />
          </motion.div>

          <motion.div 
            variants={staggerItem}
            className="space-y-4"
          >
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen size={20} className="text-cyan-400" />
              Key Terminology
            </h2>
            
            <motion.div 
              variants={staggerItem}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
            >
              <h4 className="text-cyan-400 font-bold text-sm mb-1">Refill</h4>
              <p className="text-slate-400 text-xs">If followers drop, the provider will add them back within the guarantee period.</p>
            </motion.div>

            <motion.div 
              variants={staggerItem}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
            >
              <h4 className="text-cyan-400 font-bold text-sm mb-1">Non-Drop</h4>
              <p className="text-slate-400 text-xs">High-quality services that are less likely to be removed by the platform.</p>
            </motion.div>

            <motion.div 
              variants={staggerItem}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
            >
              <h4 className="text-cyan-400 font-bold text-sm mb-1">Drip Feed</h4>
              <p className="text-slate-400 text-xs">Delivering the service gradually over time instead of all at once to look natural.</p>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <AdMobMock type="native" />
          </motion.div>

          <motion.div 
            variants={staggerItem}
            className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex gap-3"
          >
              <AlertCircle className="text-rose-500 shrink-0" size={24} />
              <div>
                <h4 className="text-rose-500 font-bold text-sm mb-1">Important Warning</h4>
                <p className="text-rose-200/80 text-xs leading-relaxed">
                  CheapSRV provides this information for educational purposes only. Buying engagement is against the Terms of Service of most social platforms. Use at your own risk.
                </p>
              </div>
            </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

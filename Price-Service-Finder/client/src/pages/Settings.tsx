import React, { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Moon, Globe, Smartphone } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { PageTransition, staggerContainer, staggerItem } from '@/components/layout/PageTransition';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0f172a] pb-24">
        <div className="p-6 pt-8 flex items-center gap-4 sticky top-0 bg-[#0f172a]/90 backdrop-blur-xl z-20 border-b border-slate-800">
          <Link href="/profile">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-colors hover:bg-slate-700"
            >
              <ArrowLeft size={20} />
            </motion.button>
          </Link>
          <h1 className="text-xl font-bold text-white">App Preferences</h1>
        </div>

        <motion.div 
          className="p-6 space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Appearance */}
          <motion.section variants={staggerItem} className="space-y-4">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Appearance</h2>
            
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3">
                <Moon size={20} className="text-slate-400" />
                <div>
                  <p className="text-slate-200 font-medium text-sm">Dark Mode</p>
                  <p className="text-slate-500 text-xs">Always on for this theme</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} disabled />
            </div>
          </motion.section>

          {/* System */}
          <motion.section variants={staggerItem} className="space-y-4">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">System</h2>
            
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-slate-400" />
                <div>
                  <p className="text-slate-200 font-medium text-sm">Language</p>
                  <p className="text-slate-500 text-xs">English (US)</p>
                </div>
              </div>
            </div>

             <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3">
                <Smartphone size={20} className="text-slate-400" />
                <div>
                  <p className="text-slate-200 font-medium text-sm">Version</p>
                  <p className="text-slate-500 text-xs">v1.0.0 (Build 104)</p>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </PageTransition>
  );
}

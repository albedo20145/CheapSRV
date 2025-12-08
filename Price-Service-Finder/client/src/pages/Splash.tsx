import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import logo from '@assets/generated_images/neon_cyan_abstract_geometric_logo_on_dark_blue.png';

export default function Splash() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    const timer = setTimeout(() => {
      setLocation('/home');
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [setLocation]);

  return (
    <div className="h-screen w-full bg-[#0f172a] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-cyan-500/5" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-cyan-400/20 rounded-2xl blur-xl animate-pulse" />
          <img 
            src={logo} 
            alt="CheapSRV Logo" 
            className="w-28 h-28 rounded-2xl shadow-2xl shadow-cyan-500/30 relative z-10 border border-cyan-500/20" 
          />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-4xl font-bold font-display text-white tracking-tight mt-6"
        >
          Cheap<span className="text-cyan-400">SRV</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-slate-400 mt-2 font-mono text-xs tracking-widest uppercase"
        >
          Price & Service Finder
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 160 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mt-8 h-1 bg-slate-700/50 rounded-full overflow-hidden"
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="text-slate-500 text-xs mt-3 font-medium"
        >
          Loading...
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="absolute bottom-8 text-center"
      >
        <p className="text-slate-600 text-[10px] font-mono tracking-wider">
          v1.0.0
        </p>
        <p className="text-slate-700 text-[9px] mt-1">
          Secure & Safe • No Data Collection
        </p>
      </motion.div>
    </div>
  );
}

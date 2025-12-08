import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ServiceItem } from '@/data/db';
import { ArrowRight, Sparkles } from 'lucide-react';
import { staggerItem } from '@/components/layout/PageTransition';

interface ServiceCardProps {
  item: ServiceItem;
}

export function ServiceCard({ item }: ServiceCardProps) {
  return (
    <Link href={`/detail/${item.id}`}>
      <motion.div 
        variants={staggerItem}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className="glass-card rounded-2xl p-4 relative overflow-hidden group cursor-pointer"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Ripple Effect Container (simulated with CSS for simplicity or framer-motion layoutId) */}
        
        <div className="relative z-10 flex justify-between items-start">
          <div className="flex-1 pr-2">
            {item.popular && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-400 mb-2"
              >
                <Sparkles size={10} />
                POPULAR
              </motion.div>
            )}
            <h3 className="text-lg font-bold text-white leading-tight mb-1 font-display">{item.name}</h3>
            <p className="text-xs text-slate-400">{item.provider}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xl font-bold text-cyan-400 font-mono">{item.price}</div>
            {item.originalPrice && (
              <div className="text-xs text-slate-500 line-through decoration-slate-500/50">{item.originalPrice}</div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {item.features.slice(0, 2).map((feature, idx) => (
              <span key={idx} className="text-[10px] px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
                {feature}
              </span>
            ))}
          </div>
          <motion.div 
            whileHover={{ x: 5 }}
            className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors"
          >
            <ArrowRight size={16} />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

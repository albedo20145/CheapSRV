import React from 'react';
import { Link, useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { services, categories } from '@/data/db';
import { AdMobMock } from '@/components/ads/AdMobMock';
import { PageTransition, staggerContainer, staggerItem } from '@/components/layout/PageTransition';

export default function ServiceList() {
  const [match, params] = useRoute('/services/:categoryId');
  const categoryId = params?.categoryId;
  const category = categories.find(c => c.id === categoryId);
  const items = services.filter(s => s.category === categoryId);

  if (!category) return <div>Category not found</div>;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0f172a] pb-24">
        {/* Header */}
        <div className="p-6 pt-8 flex items-center gap-4 sticky top-0 bg-[#0f172a]/90 backdrop-blur-xl z-20 border-b border-slate-800">
          <Link href="/categories">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-colors hover:bg-slate-700"
            >
              <ArrowLeft size={20} />
            </motion.button>
          </Link>
          <h1 className="text-xl font-bold text-white flex-1">{category.name}</h1>
        </div>

        <motion.div 
          className="p-6 space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            variants={staggerItem}
            className={`p-6 rounded-2xl bg-gradient-to-r ${category.color} relative overflow-hidden shadow-lg`}
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2 font-display">{category.name} Services</h2>
              <p className="text-white/80 text-sm">
                {category.type === 'social' 
                  ? 'Boost your presence with real engagement.' 
                  : 'Premium subscriptions at unbeatable prices.'}
              </p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          </motion.div>

          <div className="space-y-3">
            {items.map((item, idx) => (
              <React.Fragment key={item.id}>
                <Link href={`/detail/${item.id}`}>
                  <motion.div 
                    variants={staggerItem}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 cursor-pointer group hover:bg-slate-800 transition-colors relative overflow-hidden"
                  >
                    {item.tag && (
                      <div className="absolute top-0 right-0 bg-cyan-500/20 text-cyan-400 text-[9px] font-bold px-2 py-1 rounded-bl-xl border-l border-b border-cyan-500/20 tracking-wider">
                        {item.tag}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-3 pr-6">
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors line-clamp-1">{item.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><Clock size={10} /> {item.deliveryTime || 'Instant'}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <div className="text-lg font-bold text-cyan-400 font-mono">{item.price}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-slate-700/50 pt-3">
                      <p className="text-xs text-slate-400 line-clamp-1 flex-1 mr-2">{item.description}</p>
                      <div className="text-cyan-400">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
                {idx === 2 && (
                  <motion.div variants={staggerItem}>
                    <AdMobMock type="native" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>

          {items.length === 0 && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-center py-20 text-slate-500"
             >
               No services available at the moment.
             </motion.div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
}

import React from 'react';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter } from 'lucide-react';
import { services, categories } from '@/data/db';
import { ServiceCard } from '@/components/ServiceCard';
import { AdMobMock } from '@/components/ads/AdMobMock';
import { PageTransition, staggerContainer, staggerItem } from '@/components/layout/PageTransition';

export default function CategoryList() {
  const [match, params] = useRoute('/category/:id');
  const categoryId = params?.id;
  const category = categories.find(c => c.id === categoryId);
  const items = services.filter(s => s.category === categoryId);

  if (!category) return <div>Category not found</div>;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0f172a] pb-24">
        {/* Header */}
        <div className="p-6 pt-8 flex items-center gap-4 sticky top-0 bg-[#0f172a]/80 backdrop-blur-xl z-20 border-b border-white/5">
          <Link href="/home">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-colors hover:bg-slate-700"
            >
              <ArrowLeft size={20} />
            </motion.button>
          </Link>
          <h1 className="text-xl font-bold text-white flex-1">{category.name}</h1>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-colors hover:bg-slate-700"
          >
            <Filter size={18} />
          </motion.button>
        </div>

        <motion.div 
          className="p-6 space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            variants={staggerItem}
            className={`p-6 rounded-2xl bg-gradient-to-r ${category.color} relative overflow-hidden`}
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2 font-display">{category.name} Deals</h2>
              <p className="text-white/80 text-sm">Best prices for {category.name} services verified daily.</p>
            </div>
            {/* Abstract Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          </motion.div>

          <motion.div variants={staggerItem}>
            <AdMobMock type="banner" />
          </motion.div>

          <div className="space-y-4">
            {items.map((item, idx) => (
              <React.Fragment key={item.id}>
                <ServiceCard item={item} />
                {idx === 1 && (
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
               No items found in this category yet.
             </motion.div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
}

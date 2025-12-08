import React, { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Filter, X } from 'lucide-react';
import { services, categories } from '@/data/db';
import { ServiceCard } from '@/components/ServiceCard';
import { AdMobMock } from '@/components/ads/AdMobMock';
import { PageTransition, staggerContainer, staggerItem } from '@/components/layout/PageTransition';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'ALL'>('ALL');

  const filteredItems = useMemo(() => {
    return services.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0f172a] pb-24">
        {/* Header with Search */}
        <div className="p-4 pt-8 sticky top-0 bg-[#0f172a]/90 backdrop-blur-xl z-20 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/home">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-colors hover:bg-slate-700"
              >
                <ArrowLeft size={20} />
              </motion.button>
            </Link>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                autoFocus
                type="text" 
                placeholder="Search services..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-full py-2.5 pl-10 pr-10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Categories Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === 'ALL' ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
            >
              All
            </motion.button>
            {categories.map(cat => (
              <motion.button 
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === cat.id ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div 
          className="p-4 space-y-4"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <React.Fragment key={item.id}>
                <ServiceCard item={item} />
                {idx === 2 && (
                  <motion.div variants={staggerItem}>
                    <AdMobMock type="native" />
                  </motion.div>
                )}
              </React.Fragment>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-slate-600" />
              </div>
              <h3 className="text-slate-300 font-bold mb-1">No results found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
}

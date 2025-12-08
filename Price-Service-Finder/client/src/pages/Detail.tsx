import React, { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Heart, ExternalLink, ShieldCheck, AlertTriangle, Clock, FileText, Zap, Tag, MessageCircle } from 'lucide-react';
import { services, categories } from '@/data/db';
import { useStore } from '@/lib/store';
import { AdMobMock } from '@/components/ads/AdMobMock';
import { useToast } from '@/hooks/use-toast';
import { PageTransition, staggerContainer, staggerItem } from '@/components/layout/PageTransition';

export default function Detail() {
  const [match, params] = useRoute('/detail/:id');
  const item = services.find(s => s.id === params?.id);
  const category = item ? categories.find(c => c.id === item.category) : null;
  const { isBookmarked, toggleBookmark } = useStore();
  const { toast } = useToast();

  if (!item) return <div>Item not found</div>;

  const bookmarked = isBookmarked(item.id);

  const handleBuy = () => {
    window.open(item.link, '_blank');
  };

  const handleBookmark = () => {
    toggleBookmark(item.id);
    toast({
      description: bookmarked ? "Removed from bookmarks" : "Added to bookmarks",
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: item.name,
      text: `Check out ${item.name} on CheapSRV - ${item.price}`,
      url: window.location.href,
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        toast({ description: "Share cancelled" });
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ description: "Link copied to clipboard!" });
    }
  };

  const handleContact = () => {
    window.open('https://wa.me/917982457724', '_blank');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0f172a] pb-32">
         {/* Header */}
         <div className="p-6 pt-8 flex items-center justify-between sticky top-0 bg-[#0f172a]/80 backdrop-blur-xl z-20 border-b border-white/5">
          <Link href={category ? `/services/${category.id}` : '/home'}>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-colors hover:bg-slate-700"
            >
              <ArrowLeft size={20} />
            </motion.button>
          </Link>
          <div className="flex gap-2">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleBookmark}
              className={`w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center transition-colors hover:bg-slate-700 ${bookmarked ? 'text-red-500' : 'text-slate-300'}`}
            >
              <Heart size={20} fill={bookmarked ? "currentColor" : "none"} />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-colors hover:bg-slate-700"
            >
              <Share2 size={20} />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleContact}
              className="w-10 h-10 rounded-full bg-green-600 border border-green-500 flex items-center justify-center text-white transition-colors hover:bg-green-500"
            >
              <MessageCircle size={20} />
            </motion.button>
          </div>
        </div>

        <div className="p-6">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Title Section */}
            <motion.div variants={staggerItem}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-slate-800 text-cyan-400 border border-slate-700`}>
                  {category?.name || 'Service'}
                </span>
                {item.tag && (
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {item.tag}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-white font-display mb-2 leading-tight">{item.name}</h1>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>By {item.provider}</span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="flex items-center gap-1 text-emerald-400"><ShieldCheck size={14} /> Verified</span>
              </div>
            </motion.div>

            {/* Price Card */}
            <motion.div 
              variants={staggerItem}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex items-center justify-between relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category?.color || 'from-cyan-500 to-blue-500'} opacity-10`} />
              <div className="relative z-10">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Total Price</p>
                <div className="text-3xl font-bold text-cyan-400 font-mono mt-1">{item.price}</div>
              </div>
            </motion.div>

            <motion.div variants={staggerItem}>
              <AdMobMock type="banner" />
            </motion.div>

            {/* Key Info Grid */}
            <motion.div variants={staggerItem} className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-3">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Clock size={14} />
                  <span className="text-xs font-medium uppercase">Delivery</span>
                </div>
                <p className="text-white text-sm font-medium">{item.deliveryTime || 'Instant'}</p>
              </div>
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-3">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <FileText size={14} />
                  <span className="text-xs font-medium uppercase">Requires</span>
                </div>
                <p className="text-white text-sm font-medium truncate">{item.requirements || 'None'}</p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={staggerItem}>
              <h3 className="text-lg font-bold text-white mb-3">Description</h3>
              <p className="text-slate-300 leading-relaxed text-sm bg-slate-800/20 p-4 rounded-xl border border-slate-700/50">
                {item.description}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div variants={staggerItem}>
              <h3 className="text-lg font-bold text-white mb-3">Features Included</h3>
              <div className="grid grid-cols-1 gap-3">
                {item.features.map((feature, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={staggerItem}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 border border-slate-700/50"
                  >
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                      <Zap size={12} fill="currentColor" />
                    </div>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={staggerItem}>
              <AdMobMock type="native" />
            </motion.div>

            {/* Disclaimer */}
            <motion.div 
              variants={staggerItem}
              className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3"
            >
              <AlertTriangle className="text-amber-500 shrink-0" size={24} />
              <div>
                <h4 className="text-amber-500 font-bold text-sm mb-1">Disclaimer</h4>
                <p className="text-amber-200/80 text-xs leading-relaxed">
                  CheapSRV is an information-only app. We do not sell subscriptions directly. 
                  All purchases happen on the provider's external website.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Action Bar */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-[#0f172a] border-t border-slate-800 z-30 pb-safe"
        >
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={handleBuy}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2"
          >
            Order Now <ExternalLink size={18} />
          </motion.button>
        </motion.div>
      </div>
    </PageTransition>
  );
}

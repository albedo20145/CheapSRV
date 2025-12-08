import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Settings, Heart, ChevronRight, Shield, FileText, Mail, MessageCircle, Send } from 'lucide-react';
import { useStore } from '@/lib/store';
import { services } from '@/data/db';
import { ServiceCard } from '@/components/ServiceCard';
import { PageTransition, staggerContainer, staggerItem } from '@/components/layout/PageTransition';

export default function Profile() {
  const { bookmarks } = useStore();

  const bookmarkedItems = services.filter(s => bookmarks.includes(s.id));

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0f172a] pb-24">
        <div className="p-6 pt-12 mb-2">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white font-display"
          >
            Cheap<span className="text-cyan-400">SRV</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-sm"
          >
            Your Price & Service Finder
          </motion.p>
        </div>

        <motion.div 
          className="px-6 space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Settings */}
          <motion.section variants={staggerItem} className="space-y-3">
            <h2 className="text-lg font-bold text-white mb-4">Settings</h2>
            
            <Link href="/settings">
              <motion.button 
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Settings size={20} className="text-slate-400" />
                  <span className="text-slate-200">App Preferences</span>
                </div>
                <ChevronRight size={18} className="text-slate-500" />
              </motion.button>
            </Link>

            <Link href="/legal/privacy">
              <motion.button 
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-slate-400" />
                  <span className="text-slate-200">Privacy Policy</span>
                </div>
                <ChevronRight size={18} className="text-slate-500" />
              </motion.button>
            </Link>

            <Link href="/legal/terms">
              <motion.button 
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-slate-400" />
                  <span className="text-slate-200">Terms of Service</span>
                </div>
                <ChevronRight size={18} className="text-slate-500" />
              </motion.button>
            </Link>
          </motion.section>

          {/* Contact Us */}
          <motion.section variants={staggerItem} className="space-y-3">
            <h2 className="text-lg font-bold text-white mb-4">Contact Us</h2>
            
            <motion.a 
              href="mailto:hydramagic1@gmail.com"
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:bg-cyan-900/20 hover:border-cyan-500/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <span className="text-slate-200 block">Email</span>
                  <span className="text-cyan-400 text-sm">hydramagic1@gmail.com</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-500" />
            </motion.a>

            <motion.a 
              href="https://wa.me/917982457724"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:bg-green-900/20 hover:border-green-500/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <MessageCircle size={18} className="text-white" />
                </div>
                <div>
                  <span className="text-slate-200 block">WhatsApp</span>
                  <span className="text-green-400 text-sm">+91 7982457724</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-500" />
            </motion.a>

            <motion.a 
              href="https://t.me/Monarch7t8"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:bg-blue-900/20 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <Send size={18} className="text-white" />
                </div>
                <div>
                  <span className="text-slate-200 block">Telegram</span>
                  <span className="text-blue-400 text-sm">@Monarch7t8</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-500" />
            </motion.a>
          </motion.section>

          {/* Saved Items - At Bottom */}
          <motion.section variants={staggerItem}>
            <div className="flex items-center gap-2 mb-4">
              <Heart size={18} className="text-rose-500" fill="currentColor" />
              <h2 className="text-lg font-bold text-white">Saved Items</h2>
            </div>
            
            {bookmarkedItems.length > 0 ? (
              <div className="space-y-4">
                {bookmarkedItems.map(item => (
                  <ServiceCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-800/30 rounded-2xl border border-slate-700/50 border-dashed">
                <p className="text-slate-500 text-sm">No saved items yet.</p>
              </div>
            )}
          </motion.section>

          <div className="text-center text-slate-600 text-xs pb-8">
            CheapSRV v1.0.0
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

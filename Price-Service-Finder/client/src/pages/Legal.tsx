import React from 'react';
import { Link, useRoute } from 'wouter';
import { ArrowLeft, Shield, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageTransition, staggerContainer, staggerItem } from '@/components/layout/PageTransition';

export default function Legal() {
  const [match, params] = useRoute('/legal/:type');
  const type = params?.type; // 'privacy' or 'terms'

  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';
  const Icon = isPrivacy ? Shield : FileText;

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
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>

        <motion.div 
          className="p-6 text-slate-300 space-y-6 leading-relaxed text-sm"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={staggerItem} className="flex justify-center py-6">
             <div className="w-20 h-20 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
               <Icon size={40} />
             </div>
          </motion.div>

          {isPrivacy ? (
            <>
              <motion.div variants={staggerItem}>
                <h3 className="text-white font-bold text-lg">1. Information Collection</h3>
                <p>CheapSRV does not collect personal identifying information. We use local storage on your device to save your bookmarks and preferences.</p>
              </motion.div>
              
              <motion.div variants={staggerItem}>
                <h3 className="text-white font-bold text-lg">2. Third-Party Links</h3>
                <p>Our app contains links to external websites. We are not responsible for the privacy practices or content of these third-party sites.</p>
              </motion.div>
              
              <motion.div variants={staggerItem}>
                <h3 className="text-white font-bold text-lg">3. Advertising</h3>
                <p>We use Google AdMob to display advertisements. AdMob may use cookies and advertising identifiers to serve personalized ads based on your interests.</p>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div variants={staggerItem}>
                <h3 className="text-white font-bold text-lg">1. Acceptance of Terms</h3>
                <p>By accessing and using CheapSRV, you accept and agree to be bound by the terms and provision of this agreement.</p>
              </motion.div>
              
              <motion.div variants={staggerItem}>
                <h3 className="text-white font-bold text-lg">2. Disclaimer</h3>
                <p>CheapSRV is an informational platform only. We do not sell any services directly. All transactions occur on third-party provider websites.</p>
              </motion.div>
              
              <motion.div variants={staggerItem}>
                <h3 className="text-white font-bold text-lg">3. Accuracy of Information</h3>
                <p>While we strive to keep prices updated, we cannot guarantee the accuracy of all listings as providers may change prices without notice.</p>
              </motion.div>
            </>
          )}

          <motion.div variants={staggerItem} className="mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
            Last updated: December 2024
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

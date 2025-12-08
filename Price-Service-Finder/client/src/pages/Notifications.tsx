import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Bell, Tag, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageTransition, staggerContainer, staggerItem } from '@/components/layout/PageTransition';

const notifications = [
  {
    id: 1,
    title: 'Price Drop Alert! 📉',
    message: 'Netflix Premium prices have dropped by 20% this week. Check out the new deals now!',
    time: '2 hours ago',
    icon: Tag,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    read: false,
  },
  {
    id: 2,
    title: 'New AI Tool Added 🤖',
    message: 'Midjourney V6 shared access is now available in our listings.',
    time: '1 day ago',
    icon: Bell,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    read: true,
  },
  {
    id: 3,
    title: 'Security Update 🛡️',
    message: 'We have updated our verification process for SMM providers to ensure better safety.',
    time: '2 days ago',
    icon: ShieldAlert,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    read: true,
  }
];

export default function Notifications() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0f172a] pb-24">
        <div className="p-6 pt-8 flex items-center gap-4 sticky top-0 bg-[#0f172a]/90 backdrop-blur-xl z-20 border-b border-slate-800">
          <Link href="/home">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-colors hover:bg-slate-700"
            >
              <ArrowLeft size={20} />
            </motion.button>
          </Link>
          <h1 className="text-xl font-bold text-white">Notifications</h1>
        </div>

        <motion.div 
          className="p-4 space-y-3"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              variants={staggerItem}
              className={`p-4 rounded-2xl border ${notif.read ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-800/80 border-slate-700'} flex gap-4`}
            >
              <div className={`w-10 h-10 rounded-full ${notif.bg} flex items-center justify-center shrink-0`}>
                <notif.icon size={20} className={notif.color} />
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-sm ${notif.read ? 'text-slate-300' : 'text-white'}`}>{notif.title}</h3>
                  <span className="text-[10px] text-slate-500">{notif.time}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{notif.message}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}

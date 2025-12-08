import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, User, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Layers, label: 'Categories', path: '/categories' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  if (location === '/' || location === '/onboarding' || location === '/auth') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 pb-6 pt-3 px-6 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location === item.path || (item.path === '/categories' && location.startsWith('/services'));
          
          return (
            <Link key={item.path} href={item.path}>
              <motion.div 
                className="flex flex-col items-center cursor-pointer"
                whileTap={{ scale: 0.9 }}
              >
                {isActive ? (
                  <motion.div
                    layoutId="nav-active-bg"
                    className="flex flex-col items-center px-5 py-2 rounded-xl"
                    style={{
                      backgroundColor: '#00C8FF',
                      boxShadow: '0 0 20px rgba(0, 200, 255, 0.6), 0 0 40px rgba(0, 200, 255, 0.3)'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <item.icon size={22} strokeWidth={2.5} color="#000" />
                    <span className="text-[10px] font-semibold text-black mt-1">{item.label}</span>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center px-5 py-2">
                    <item.icon size={22} strokeWidth={2} className="text-slate-400" />
                    <span className="text-[10px] font-medium text-slate-400 mt-1">{item.label}</span>
                  </div>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

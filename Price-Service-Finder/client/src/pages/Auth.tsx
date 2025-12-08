import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Lock, Mail, Smartphone, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import logo from '@assets/generated_images/neon_cyan_abstract_geometric_logo_on_dark_blue.png';

export default function Auth() {
  const [, setLocation] = useLocation();
  const login = useStore(state => state.login);
  const { toast } = useToast();
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login();
      setLoading(false);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
      });
      setLocation('/home');
    }, 1500);
  };

  return (
    <div className="h-screen bg-[#0f172a] p-6 flex flex-col justify-center relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 w-full max-w-sm mx-auto"
      >
        <div className="text-center mb-10">
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-xl mx-auto mb-4 shadow-lg shadow-cyan-500/20" />
          <h1 className="text-3xl font-bold text-white font-display">Get Started</h1>
          <p className="text-slate-400 mt-2">Sign in to access price alerts & bookmarks</p>
        </div>

        <div className="flex p-1 bg-slate-800 rounded-xl mb-8">
          <button 
            onClick={() => setMethod('email')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${method === 'email' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400'}`}
          >
            Email
          </button>
          <button 
            onClick={() => setMethod('phone')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${method === 'phone' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400'}`}
          >
            Phone
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 ml-1">
              {method === 'email' ? 'Email Address' : 'Phone Number'}
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                {method === 'email' ? <Mail size={18} /> : <Smartphone size={18} />}
              </div>
              <input 
                type={method === 'email' ? 'email' : 'tel'} 
                required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder={method === 'email' ? 'john@example.com' : '+91 98765 43210'}
              />
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-xs font-medium text-slate-400 ml-1">Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-6"
          >
            {loading ? 'Signing in...' : (
              <>
                Sign In <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-slate-500 text-xs mt-6">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}

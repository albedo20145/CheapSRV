import React from 'react';

interface AdProps {
  type: 'banner' | 'native' | 'interstitial';
  className?: string;
}

export function AdMobMock({ type, className = '' }: AdProps) {
  if (type === 'banner') {
    return (
      <div className={`w-full h-[50px] bg-slate-800 border-y border-slate-700 flex flex-col items-center justify-center overflow-hidden ${className}`}>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border border-slate-600 px-1 rounded mb-1">Ad</span>
        <span className="text-xs text-slate-400 font-medium">Banner Ad Space (320x50)</span>
      </div>
    );
  }

  if (type === 'native') {
    return (
      <div className={`w-full bg-slate-800/50 rounded-xl border border-slate-700 p-4 flex items-center gap-3 ${className}`}>
        <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
          <span className="text-[10px] text-slate-500">AD</span>
        </div>
        <div className="flex-1">
          <div className="h-3 w-24 bg-slate-700 rounded mb-2" />
          <div className="h-2 w-full bg-slate-700/50 rounded" />
        </div>
        <div className="px-3 py-1 bg-cyan-900/30 text-cyan-400 text-xs rounded border border-cyan-900">
          Open
        </div>
      </div>
    );
  }

  return null;
}

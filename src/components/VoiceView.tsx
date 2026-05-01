import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mic, Globe, Languages, Bot, Calendar, Droplets, CheckCircle, Share2, Lightbulb, Bug } from 'lucide-react';

export default function VoiceView() {
  const [isListening, setIsListening] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const toggleListen = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setShowResponse(true);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 space-y-12 relative z-10">
      <div className="text-center space-y-6">
        <div className="flex flex-col items-center justify-center space-y-2">
            <h3 className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Neural Interface</h3>
            <h2 className="text-2xl font-black text-white leading-relaxed max-w-sm">
                इस मौसम में गेहूं के लिए मुझे कितना उर्वरक डालना चाहिए?
            </h2>
            <p className="text-xs text-slate-400 font-mono uppercase tracking-widest italic opacity-60">
                "How much fertilizer should I add for wheat in this weather?"
            </p>
        </div>

        {isListening && (
           <div className="flex items-center justify-center gap-1.5 h-12 mt-4">
             {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8].map((delay) => (
               <motion.div
                 key={delay}
                 animate={{ height: [12, 48, 12] }}
                 transition={{ repeat: Infinity, duration: 1.2, delay }}
                 className="w-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
               />
             ))}
           </div>
        )}
      </div>

      <button 
        onClick={toggleListen}
        className={`relative flex items-center justify-center w-40 h-40 rounded-full transition-all duration-500 shadow-2xl ${
          isListening 
            ? 'glass-panel bg-emerald-500/20 text-emerald-400 mic-pulse scale-110 border-emerald-500/30' 
            : 'glass-panel text-slate-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <Mic className={`w-16 h-16 ${isListening ? 'fill-emerald-400/20' : ''}`} />
        <div className="absolute -bottom-16 whitespace-nowrap">
          <span className="text-[10px] font-black text-emerald-400 tracking-[0.2em] uppercase">
            {isListening ? 'Synchronizing State...' : 'Tap for Voice AI'}
          </span>
        </div>
      </button>

      {showResponse && !isListening && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass-panel p-8 space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Bot className="w-32 h-32" />
          </div>
          <div className="flex items-start gap-5 relative z-10">
            <div className="bg-emerald-500/20 p-3 rounded-2xl text-emerald-400 border border-emerald-500/30">
              <Bot className="w-6 h-6" />
            </div>
            <div className="flex-grow">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">AgriGuard Intelligence</h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                Based on humidity <span className="text-emerald-400 font-bold">65%</span> and soil moisture, apply <span className="text-emerald-400 font-bold underline underline-offset-4 decoration-emerald-500/30">45kg Urea/acre</span>. Avoid rain window (6h).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 relative z-10">
            <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4 border border-white/5">
              <Calendar className="w-5 h-5 text-blue-400" />
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Window</span>
                <span className="text-[10px] font-bold text-white uppercase font-mono">Next 48H</span>
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4 border border-white/5">
              <Droplets className="w-5 h-5 text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Method</span>
                <span className="text-[10px] font-bold text-white uppercase font-mono">Top Dress</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 relative z-10">
            <button className="flex-grow bg-emerald-500 text-slate-900 font-black text-xs uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/20">
              <CheckCircle className="w-4 h-4" />
              CONFIRM
            </button>
            <button className="glass-panel p-4 text-slate-400 hover:text-white transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      <section className="w-full">
        <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Neural Query Fragments</h4>
        <div className="flex flex-wrap gap-3">
          <SuggestionChip icon={<Bug className="w-3 h-3" />} label="Pest control for cotton" />
          <SuggestionChip icon={<Droplets className="w-3 h-3" />} label="Weekly rain forecast" />
          <SuggestionChip icon={<Globe className="w-3 h-3" />} label="Market price for Rice" />
        </div>
      </section>
    </div>
  );
}

function SuggestionChip({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="glass-panel px-6 py-2.5 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 transition-all flex items-center gap-2 group shadow-lg">
      <div className="text-slate-500 group-hover:text-emerald-400 transition-colors">
        {icon}
      </div>
      {label}
    </button>
  );
}

import React, { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Leaf, Droplets, Sun, Bug, Download, ArrowRight, Activity } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-4 space-y-6">
      <section>
        <h3 className="text-xs text-slate-400 uppercase tracking-[0.2em] font-bold mb-1">Commercial Monitoring</h3>
        <h2 className="text-4xl font-black text-white tracking-tight">Growth Intelligence</h2>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Growth Stage Card */}
        <section className="lg:col-span-8 glass-panel p-8">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Current Phase</h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Vegetative</span>
            </div>
          </div>

          <div className="relative pt-8 pb-4 px-4">
            <div className="absolute top-[52px] left-0 w-full h-1 bg-white/5 rounded-full"></div>
            <div className="absolute top-[52px] left-0 w-[45%] h-1 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all"></div>
            <div className="flex justify-between relative z-10">
              <StageItem icon={<Activity className="w-4 h-4" />} label="Seed" active />
              <StageItem icon={<Leaf className="w-4 h-4" />} label="Growth" active highlighted />
              <StageItem icon={<Sun className="w-4 h-4" />} label="Bloom" />
              <StageItem icon={<Download className="w-4 h-4" />} label="Yield" />
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex gap-8">
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Phase Duration</p>
              <p className="text-xl font-bold text-emerald-400 font-mono tracking-tighter">14d <span className="text-xs text-slate-400 font-normal">Remaining</span></p>
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Thermal Window</p>
              <p className="text-xl font-bold text-slate-200 font-mono tracking-tighter">22-26<span className="text-xs text-slate-400 font-normal ml-1">°C</span></p>
            </div>
          </div>
        </section>

        {/* Risk Profile */}
        <section className="lg:col-span-4 bg-emerald-500/10 border border-emerald-500/20 glass-panel p-8 flex flex-col justify-between group overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Risk Assessment</h3>
            <h2 className="text-2xl font-black text-white">Crop Stability</h2>
          </div>
          
          <div className="relative flex flex-col items-center py-6">
            <div className="relative w-40 h-24 overflow-hidden">
              <svg className="w-40 h-40 transform -rotate-180">
                <circle cx="80" cy="80" fill="transparent" r="72" stroke="rgba(255,255,255,0.05)" strokeDasharray="226" strokeDashoffset="0" strokeWidth="12"></circle>
                <circle cx="80" cy="80" fill="transparent" r="72" stroke="#10b981" strokeDasharray="226" strokeDashoffset="34" strokeWidth="12" className="shadow-[0_0_10px_rgba(16,185,129,0.5)]"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                <span className="text-3xl font-black text-white">85%</span>
                <span className="text-[9px] uppercase font-bold text-slate-500 tracking-tighter">Stability Index</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 border-t border-white/5 pt-6">
            <div className="flex-1">
              <span className="block font-bold text-sm text-emerald-400">Low</span>
              <span className="text-[9px] uppercase font-bold text-slate-500">Pathogens</span>
            </div>
            <div className="w-px h-6 bg-white/5 self-center"></div>
            <div className="flex-1">
              <span className="block font-bold text-sm text-blue-400">Mid</span>
              <span className="text-[9px] uppercase font-bold text-slate-500">Moisture</span>
            </div>
          </div>
          <Activity className="absolute -right-12 -bottom-12 w-48 h-48 opacity-5 text-emerald-500 group-hover:scale-110 transition-transform duration-700" />
        </section>
      </div>

      {/* Grid Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sensor Block */}
        <div className="glass-panel p-6 flex flex-col justify-between h-48">
          <div className="flex items-center gap-3 text-slate-500">
            <Droplets className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Soil Saturation</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">64%</span>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Optimal</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">Zone B-4 • Last Ping: 3m ago</p>
          </div>
        </div>

        <div className="glass-panel p-6 flex flex-col justify-between h-48">
          <div className="flex items-center gap-3 text-slate-500">
            <Sun className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Light Intensity</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">8.2</span>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">High UV</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">Max Par: 1240 μmol/m²/s</p>
          </div>
        </div>

        {/* Health Report Mini */}
        <div className="glass-panel p-6 border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all cursor-pointer group flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
              <Download className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full uppercase tracking-widest">Ready</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Audit Health Report</h4>
            <div className="flex items-center justify-between mt-2">
               <p className="text-[10px] text-slate-500 leading-tight pr-4">Complete PDF analysis of growth metrics and diagnostics.</p>
               <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StageItem({ icon, label, active = false, highlighted = false }: { icon: ReactNode, label: string, active?: boolean, highlighted?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
        active 
          ? highlighted ? 'bg-primary text-white scale-110 shadow-lg ring-4 ring-primary/20' : 'bg-primary text-white' 
          : 'bg-stone-100 text-stone-400'
      }`}>
        {icon}
      </div>
      <span className={`text-[10px] font-bold ${active ? 'text-primary' : 'text-stone-400'}`}>{label}</span>
    </div>
  );
}

function SensorCard({ icon, label, value, status, color = 'text-stone-700' }: { icon: ReactNode, label: string, value: string, status?: string, color?: string }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
      <div className={`flex items-center gap-2 mb-2 text-stone-400`}>
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
      </div>
      <p className={`text-xl font-bold ${color}`}>
        {value}
        {status && <span className="text-[10px] font-normal ml-1 opacity-70">{status}</span>}
      </p>
    </div>
  );
}

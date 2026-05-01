/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Scan, 
  History, 
  Mic, 
  Settings, 
  Stethoscope as MedicalServices,
  Bell,
  Leaf as PottedPlant
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import ScanView from './components/ScanView';
import HistoryView from './components/HistoryView';
import VoiceView from './components/VoiceView';
import RemedyView from './components/RemedyView';

type Tab = 'home' | 'scan' | 'history' | 'voice' | 'remedies' | 'settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Dashboard />;
      case 'scan': return <ScanView />;
      case 'history': return <HistoryView />;
      case 'voice': return <VoiceView />;
      case 'remedies': return <RemedyView />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mesh Gradient Background */}
      <div className="mesh-gradient">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]"></div>
      </div>

      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 h-16 glass-nav px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <PottedPlant className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">AgriGuard <span className="text-emerald-400 text-xs font-mono">v4.2</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest leading-none">Edge AI: Active</span>
          </div>
          <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoDDS50WosEZMhWZ71FEgr2O6tYZjQrZ8id4PgC52g02abT71SlKEnMEt8P20x6W5yrYta0QDRbYcPGexN5ru2XorMBXjAJcxK82bRyJi8v0OW1P878GhXpZIqBFI_rVHGI8utQE0oi522XWPchQ3FWUXkw3c2SQAO2nlkeEgRl9ifg0Mr-2OvF9QoIHD_f3G48jWBY8TTBWmFEJb7DyLAQjdJJfX106ucZ8yblwBFM3T8heOum7HF7wOogcfchXb4I8Gub9EU4cmU" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow pt-20 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-7xl mx-auto px-6"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm glass-nav px-4 py-3 flex justify-around items-center shadow-2xl rounded-3xl z-50">
        <NavButton 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
          icon={<LayoutDashboard className="w-5 h-5" />} 
          label="Home" 
        />
        <NavButton 
          active={activeTab === 'scan'} 
          onClick={() => setActiveTab('scan')} 
          icon={<Scan className="w-5 h-5" />} 
          label="Scan" 
        />
        <NavButton 
          active={activeTab === 'voice'} 
          onClick={() => setActiveTab('voice')} 
          icon={<Mic className="w-6 h-6" />} 
          label="Voice" 
          isCenter
        />
        <NavButton 
          active={activeTab === 'remedies'} 
          onClick={() => setActiveTab('remedies')} 
          icon={<MedicalServices className="w-5 h-5" />} 
          label="Meds" 
        />
        <NavButton 
          active={activeTab === 'history'} 
          onClick={() => setActiveTab('history')} 
          icon={<History className="w-5 h-5" />} 
          label="Log" 
        />
      </nav>

      {/* Global Status Footer (Desktop) */}
      <footer className="hidden md:flex fixed bottom-0 w-full z-40 h-8 bg-black/20 backdrop-blur-sm px-8 items-center justify-between border-t border-white/5">
        <div className="flex gap-6">
          <div className="flex items-center gap-2 text-[8px] font-mono text-slate-500 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]"></span>
            GPS: 45.42°N, 75.69°W
          </div>
          <div className="flex items-center gap-2 text-[8px] font-mono text-slate-500 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            Inference: 142ms
          </div>
        </div>
        <div className="text-[8px] text-slate-400 font-mono uppercase tracking-widest">
          TENSORFLOW LITE RUNTIME 2.15 • COREML ACCELERATED
        </div>
      </footer>
    </div>
  );
}

function NavButton({ 
  active, 
  onClick, 
  icon, 
  label, 
  isCenter = false 
}: { 
  active: boolean, 
  onClick: () => void, 
  icon: ReactNode, 
  label: string,
  isCenter?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center transition-all duration-300 ${
        active 
          ? isCenter 
            ? 'text-emerald-400 bg-emerald-500/10 rounded-2xl p-2.5 shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-500/30' 
            : 'text-emerald-400' 
          : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      <div className={`transition-all duration-300 ${active ? 'scale-110 mb-0.5' : 'scale-100'}`}>
        {icon}
      </div>
      <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all ${active ? 'opacity-100 mt-1' : 'opacity-60 mt-0.5'}`}>
        {label}
      </span>
    </button>
  );
}


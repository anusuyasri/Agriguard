import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, Loader2, CheckCircle, AlertTriangle, XCircle, Info, Calculator, ShoppingCart, ChevronRight, Leaf as PottedPlant } from 'lucide-react';
import { analyzeCrop } from '../services/geminiService';
import { CropStatus, CropScan, WeatherData, SoilData } from '../types';

export default function ScanView() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null); // Simplified for now
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mocked sensor context (in a real app, these would come from APIs/GPS)
  const weather: WeatherData = { temp: 28, humidity: 82, rainfall: 4.5 };
  const soil: SoilData = { npk: [40, 20, 20], ph: 6.5, moisture: 64 };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      setImage(reader.result as string);
      setIsAnalyzing(true);
      try {
        const analysis = await analyzeCrop(base64, weather, soil);
        setResult(analysis);
      } catch (error) {
        console.error(error);
        alert('Analysis failed. Please check your API key.');
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (result) {
    return (
      <div className="p-4 space-y-6 pb-20">
        <header className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-white tracking-tight">Treatment Plan</h2>
            <button onClick={() => {setResult(null); setImage(null);}} className="text-emerald-400 font-bold text-xs uppercase tracking-widest">New Scan</button>
        </header>

        {/* Prescription Summary */}
        <section className="glass-panel p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Calculator className="w-32 h-32" />
          </div>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold mb-3 border ${
                  result.status === 'Healthy' 
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
              }`}>
                {result.status === 'Healthy' ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                {result.status === 'Critical' ? 'CRITICAL ACTION REQUIRED' : result.status.toUpperCase()}
              </span>
              <h3 className="text-3xl font-black text-white leading-tight">Digital Prescription:<br/>{result.disease?.name || 'Healthy Crop'}</h3>
              <p className="text-sm text-slate-400 mt-4 leading-relaxed max-w-lg">{result.xaiExplanation}</p>
            </div>
          </div>

          {/* Dosage Calculator */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/5 relative z-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2 mb-4">
              <Calculator className="w-4 h-4 text-emerald-500" />
              Dosage Intelligence
            </h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow relative">
                <input type="number" placeholder="Field Size (Acres)" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500/50" />
                <span className="absolute right-4 top-3.5 text-[10px] font-bold text-slate-500">AC</span>
              </div>
              <button className="bg-emerald-500 text-slate-900 px-8 py-3 rounded-xl text-sm font-black shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
                CALCULATE
              </button>
            </div>
          </div>
        </section>

        {/* Remedy Selection */}
        {result.disease && (
          <div className="space-y-8">
            <section className="space-y-6">
              <div className="px-2">
                <h3 className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Curated Solutions</h3>
                <h4 className="text-xl font-black text-white flex items-center gap-2 mt-1">
                  <Leaf className="text-emerald-500 w-5 h-5" />
                  ORGANIC REGIMEN
                </h4>
              </div>
              <SolutionCard 
                title={result.disease.organicTreatment.product}
                description={result.disease.organicTreatment.description}
                price={result.disease.organicTreatment.price}
                dosage={result.disease.organicTreatment.dosage}
                badge="Certified Bio"
                image="https://images.unsplash.com/photo-1615485240384-58aa3b13f9c6?auto=format&fit=crop&q=80&w=400"
              />
            </section>

            <section className="space-y-6 pb-12">
              <div className="px-2">
                <h3 className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Critical Recovery</h3>
                <h4 className="text-xl font-black text-white flex items-center gap-2 mt-1">
                  <Info className="text-orange-500 w-5 h-5" />
                  CHEMICAL INTERVENTION
                </h4>
              </div>
              <SolutionCard 
                title={result.disease.chemicalTreatment.product}
                description={result.disease.chemicalTreatment.description}
                price={result.disease.chemicalTreatment.price}
                dosage={result.disease.chemicalTreatment.dosage}
                badge="High Efficacy"
                isChemical
                image="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=400"
              />
            </section>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-[70vh] space-y-12 relative z-10">
      <div className="text-center space-y-3">
        <h3 className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Sensory Input</h3>
        <h2 className="text-4xl font-black text-white tracking-tight leading-none">Crop Diagnostics</h2>
        <p className="text-slate-400 text-sm font-medium opacity-80">Instant pathogen detection via Edge AI.</p>
      </div>

      <div className="w-full max-w-sm aspect-square relative glass-panel flex flex-col items-center justify-center p-8 group hover:border-emerald-500/30 transition-all overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 pointer-events-none"></div>
        {image ? (
          <img src={image} alt="Target" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <>
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
              <Camera className="w-10 h-10" />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Align specimen in center</p>
          </>
        )}

        {isAnalyzing && (
            <div className="absolute inset-0 bg-[#0a1d13]/80 backdrop-blur-md flex flex-col items-center justify-center text-white p-6 text-center space-y-6">
                <Loader2 className="w-16 h-16 animate-spin text-emerald-400" />
                <div className="space-y-1">
                    <h3 className="text-lg font-black uppercase tracking-widest text-emerald-400">Analyzing Spectrum</h3>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed max-w-[200px]">Correlating visual data with multimodal environmental telemetry...</p>
                </div>
                <div className="flex gap-3 mt-4">
                    <span className="text-[9px] font-mono px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300 tracking-tighter uppercase whitespace-nowrap">TMP: {weather.temp}°C</span>
                    <span className="text-[9px] font-mono px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300 tracking-tighter uppercase whitespace-nowrap">HUM: {weather.humidity}%</span>
                </div>
            </div>
        )}
      </div>

      <div className="w-full max-w-xs space-y-4">
        <button 
          disabled={isAnalyzing}
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-5 bg-emerald-500 text-slate-900 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/30 flex items-center justify-center gap-3 active:scale-95 transition-all text-xs"
        >
          <Camera className="w-5 h-5" />
          Capture Specimen
        </button>
        <button 
          disabled={isAnalyzing}
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-5 glass-panel text-slate-300 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white/5 hover:text-white transition-all text-xs"
        >
          <Upload className="w-5 h-5" />
          Upload Dataset
        </button>
      </div>

      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileUpload}
      />

      <div className="text-center">
          <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3">
            <Info className="w-3 h-3 text-emerald-500" />
            Neural Engine: Edge-v2.1
          </p>
      </div>
    </div>
  );
}

function SolutionCard({ title, description, price, dosage, badge, isChemical = false, image }: any) {
  return (
    <div className="glass-panel overflow-hidden hover:translate-y-[-8px] transition-all duration-500">
      <div className="h-48 relative">
        <img src={image} className="w-full h-full object-cover" alt={title} />
        <div className={`absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10 ${isChemical ? 'text-orange-400' : 'text-emerald-400'}`}>
          {badge}
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <h4 className="text-lg font-black text-white leading-tight">{title}</h4>
          <span className={`text-xl font-mono font-black ${isChemical ? 'text-orange-400' : 'text-emerald-400'}`}>${price}</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
        <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Prescribed Regimen</p>
          <p className="text-sm text-slate-200 font-medium">{dosage}</p>
        </div>
        <button className={`w-full py-4 rounded-xl border-2 font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${
            isChemical 
                ? 'border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white' 
                : 'border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-slate-900'
        }`}>
          <ShoppingCart className="w-4 h-4" />
          Acquire
        </button>
      </div>
    </div>
  );
}

function Leaf(props: any) {
    return <PottedPlant {...props} />;
}

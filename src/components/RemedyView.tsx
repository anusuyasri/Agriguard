import { ShoppingCart, Heart, Search, Filter, Info, Star } from 'lucide-react';

export default function RemedyView() {
  const remedies = [
    {
      id: 1,
      name: 'Pure Neem Concentrate',
      category: 'Organic',
      price: 24.99,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1615485240384-58aa3b13f9c6?auto=format&fit=crop&q=80&w=400',
      badge: 'Bestseller'
    },
    {
        id: 2,
        name: 'Copper Fungicide',
        category: 'Chemical',
        price: 34.50,
        rating: 4.5,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=400',
        badge: 'High Efficacy'
    },
    {
        id: 3,
        name: 'Nitrogen Rich Fertilizer',
        category: 'Fertilizer',
        price: 15.20,
        rating: 4.2,
        reviews: 210,
        image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=400',
    }
  ];

  return (
    <div className="p-4 space-y-10">
      <header>
        <h3 className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-1">Remedy Marketplace</h3>
        <h2 className="text-4xl font-black text-white tracking-tight leading-none uppercase tracking-tighter">Supplies & Meds</h2>
      </header>

      <div className="flex gap-4 items-center">
          <div className="flex-grow relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
            <input type="text" placeholder="Search curated remedies..." className="w-full glass-panel bg-white/5 border-white/10 pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-emerald-500/50" />
          </div>
          <button className="p-4 glass-panel hover:bg-white/10 transition-colors shrink-0">
            <Filter className="w-5 h-5 text-slate-400" />
          </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {remedies.map(item => (
            <div key={item.id} className="glass-panel overflow-hidden hover:translate-y-[-8px] transition-all duration-500 flex flex-col group">
                <div className="relative aspect-video overflow-hidden border-b border-white/5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <button className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:text-emerald-400 transition-colors border border-white/10">
                        <Heart className="w-4 h-4" />
                    </button>
                    {item.badge && (
                        <span className="absolute bottom-4 left-4 px-3 py-1 bg-emerald-500 text-slate-900 text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-emerald-500/20">{item.badge}</span>
                    )}
                </div>
                <div className="p-6 space-y-4 flex-grow flex flex-col">
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">{item.category}</p>
                        <h4 className="text-lg font-black text-white tracking-tight leading-tight uppercase tracking-tighter">{item.name}</h4>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'fill-emerald-500 text-emerald-500' : 'text-slate-600'}`} />
                            ))}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-400">{item.rating}</span>
                        <span className="text-[10px] text-slate-500 font-mono">[{item.reviews}]</span>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                        <span className="text-2xl font-mono font-black text-white tracking-tighter">${item.price}</span>
                        <button className="p-3 bg-emerald-500 text-slate-900 rounded-xl active:scale-95 transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/30">
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        ) )}
      </div>

      <section className="glass-panel p-10 relative overflow-hidden group mb-10">
          <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors pointer-events-none"></div>
          <div className="relative z-10 space-y-4 max-w-lg">
              <h3 className="text-3xl font-black text-white leading-tight uppercase tracking-tighter">Tele-Agronomist Support</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">Hyper-personalized advice. Connect with a certified agronomist for specialized diagnostic audits and customized farm plans.</p>
              <button className="mt-6 px-10 py-4 bg-emerald-500 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/30 active:scale-95 transition-all">
                  BOOK CONSULTATION
              </button>
          </div>
          <Info className="absolute -right-16 -bottom-16 w-64 h-64 opacity-5 text-emerald-500 group-hover:scale-110 transition-transform duration-1000" />
      </section>
    </div>
  );
}

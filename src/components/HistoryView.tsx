import { Search, CheckCircle, AlertTriangle, Info, ChevronRight } from 'lucide-react';

export default function HistoryView() {
  const categories = ['All Crops', 'Tomato', 'Potato', 'Corn', 'Wheat'];

  const historyItems = [
    {
      id: '1',
      crop: 'Tomato',
      status: 'Healthy',
      confidence: 98,
      date: '14:32 • Field A',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiHPAaj_SzSdW7V4n8SvGkkeDG-G8EHg8ZQ_vWKUrHUuZTsGTlrcSZSKcESgCVkQWYc2vrIOYvaju36t1-2MxvzqaxGkR2jRj5arfW1csTHNPkCqg492bFp-Xcu3SQbXx9lui3xtlnVWJh3ieIO3nIMOIqkSA3OhLBTluQceBrvU7LcYllmSXHhxvkm-FmQyPHRXJsWBSZsFfCaenv68vNw5uN7PYSOxG2y86x6njy9uhF1QGvOYh1or-BegJ_b-Xa6pzTZC5fuxxb',
      group: 'Today'
    },
    {
      id: '2',
      crop: 'Potato',
      status: 'Late Blight',
      confidence: 91,
      date: '09:15 • West Plot',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ_AKazb9mNMel78IV1zZtfYsb9pM60I8SLLL9mq2DzuqNNn20KC-nX0Mz1DFpq14n3UixLKEnnUBcvjuAAwCz89pHMIi7g_2BO3pgrZxkAiKrJdWEu36xIOfprCpWJ2PhUVNOAA6ZWyqRw7mlceKn75dvgQWsRPkeCtCSgSe8ENMqlABbYhDyndvIWPdTeCEsFtmu0l-Ia7pulXUVuT_T_SgaKqDr4rMwScx1cWp7lzRkxgnb8Cbz6AYlg_ADspkqILaslSxaiuZV',
      group: 'Today'
    },
    {
      id: '3',
      crop: 'Corn',
      status: 'Healthy',
      confidence: 94,
      date: 'Yesterday • Greenhouse 2',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAX-C0BEY31zRFxRYF0BSnigEEaT7yD-Ns4DtsVPvngy1bM08x-CSjdSfbicjRt3TqNjGbJ2uB7byLc7M2-jagNzGiwlvXBQEdG8Dv2eXULFRumP3qd1kJts16FSU76J36DXJORf7QWWxO5diP8TftG3PFUDp_1AUr7GYLw571XRokfmfNTUE260w8pEZLD5_khJbPOu0lpRUR0jByibKvwT6tqL2PyymeLeTjBbSR8YjcWvKTRI74e9sJXCyyejQPr1u-Yzn_Va4km',
      group: 'Yesterday'
    }
  ];

  return (
    <div className="p-4 space-y-8">
      {/* Search and Filters */}
      <section className="space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search diagnostic archive..." 
            className="w-full pl-12 pr-4 py-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all font-medium text-sm"
          />
        </div>
        
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat, i) => (
                <button 
                    key={cat} 
                    className={`px-8 py-2.5 rounded-full whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${
                        i === 0 ? 'bg-emerald-500 text-slate-900 shadow-xl shadow-emerald-500/20' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </section>

      {/* History List */}
      <div className="space-y-10 pb-10">
        <HistoryGroup title="Recent Diagnostic Output" items={historyItems.filter(i => i.group === 'Today')} />
        <HistoryGroup title="Neural Archive" items={historyItems.filter(i => i.group === 'Yesterday')} />
      </div>
    </div>
  );
}

function HistoryGroup({ title, items }: { title: string, items: any[] }) {
    if (items.length === 0) return null;
    return (
        <section className="space-y-4">
            <h2 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-2 leading-none">{title}</h2>
            <div className="space-y-4">
                {items.map(item => (
                    <HistoryItem key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}

function HistoryItem({ item }: { item: any }) {
    const isHealthy = item.status === 'Healthy';
    return (
        <div className="glass-panel p-5 flex items-center gap-6 hover:bg-white/10 transition-all cursor-pointer group">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                <img src={item.image} alt={item.crop} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-black text-white tracking-tight leading-none">{item.crop}</h3>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${isHealthy ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                        {isHealthy ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        {item.status}
                    </div>
                </div>
                <div className="flex justify-between items-end mt-4 pt-2">
                    <div className="space-y-1">
                        <p className="text-[10px] font-mono text-slate-500 tracking-tighter">CONFIDENCE: <span className="text-emerald-400 font-bold">{item.confidence}%</span></p>
                        <p className="text-[10px] text-slate-500 font-mono tracking-tighter uppercase">{item.date}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        </div>
    );
}

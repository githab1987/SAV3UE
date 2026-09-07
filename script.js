const { useState, useEffect } = React;

// ICONS (simple SVG)
function IconUpload() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
}

function IconCheck() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>;
}

function IconArrowRight() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
}

// LOGO
function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#logoGrad)" opacity="0.1" stroke="url(#logoGrad)" strokeWidth="1.5"/>
      <rect x="8" y="11" width="16" height="3" rx="1.5" fill="url(#logoGrad)" />
      <path d="M8 20.5h9.5L24 14" stroke="url(#logoGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// HOME SCREEN - Hero Section
function HomeScreen({ onStart }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => { 
    const timer = setTimeout(() => setIsLoaded(true), 100); 
    return () => clearTimeout(timer); 
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-screen opacity-20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-screen opacity-20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl" style={{
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)"
      }}>
        
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs font-medium text-teal-300">Enterprise Audit Engine</span>
        </div>
        
        {/* Logo + Title */}
        <div className="mb-4 inline-block">
          <Logo size={56} />
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Special Ali
        </h1>
        
        <p className="mt-4 text-lg sm:text-xl text-slate-400 max-w-lg leading-relaxed">
          Autonomous auditor untuk keuangan & pajak. Berbasis PSAK, DJP-compliant, zero-compromise accounting.
        </p>
        
        {/* Features Grid */}
        <div className="mt-10 grid grid-cols-3 gap-4 mb-10 text-sm">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-2">
              <IconCheck />
            </div>
            <span className="text-slate-400">PSAK Native</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-2">
              <IconCheck />
            </div>
            <span className="text-slate-400">DJP Ready</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-2">
              <IconCheck />
            </div>
            <span className="text-slate-400">Zero-Approx</span>
          </div>
        </div>
        
        {/* CTA Button */}
        <button 
          onClick={onStart}
          className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span>Mulai Audit</span>
          <IconArrowRight />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-400 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity" />
        </button>
        
        {/* Footer text */}
        <p className="mt-8 text-xs text-slate-500">
          Enterprise Edition • SPECIAL ALI v3.0-UE • Production Ready
        </p>
      </div>
    </div>
  );
}

// DASHBOARD SCREEN
function DashboardScreen({ onBack }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const stats = [
    { label: "Transaksi", value: "1,284", change: "+24%", color: "from-blue-500 to-cyan-500" },
    { label: "Status", value: "PASS", change: "Ready to Close", color: "from-emerald-500 to-teal-500" },
    { label: "Penyesuaian", value: "3", change: "Tertunda", color: "from-amber-500 to-orange-500" },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Dashboard</h2>
              <p className="text-xs text-slate-500">Audit Execution</p>
            </div>
          </div>
          <button 
            onClick={onBack}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            ← Kembali
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow" style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(10px)",
              transition: `all 0.5s ease-out ${i * 100}ms`
            }}>
              <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
              <h3 className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </h3>
              <p className="text-xs text-slate-500">{stat.change}</p>
            </div>
          ))}
        </div>
        
        {/* Pipeline Stages */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Tahapan Audit</h3>
          
          <div className="space-y-4">
            {[
              { name: "Ingestion & Parsing", desc: "Baca dokumen, struktur data", status: "done" },
              { name: "Reconciliation", desc: "Cocokkan mutasi bank & kas", status: "done" },
              { name: "Tax & Adjustment", desc: "Hitung PPN/PPh, usulan jurnal", status: "active" },
              { name: "Export DJP", desc: "Generate e-Faktur & e-Bupot", status: "pending" },
            ].map((stage, i) => (
              <div key={i} className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-colors ${
                stage.status === "done" ? "bg-emerald-50 border-emerald-200" :
                stage.status === "active" ? "bg-amber-50 border-amber-300" :
                "bg-slate-50 border-slate-200"
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  stage.status === "done" ? "bg-emerald-500 text-white" :
                  stage.status === "active" ? "bg-amber-500 text-white" :
                  "bg-slate-300 text-slate-700"
                }`}>
                  {stage.status === "done" ? "✓" : i + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900">{stage.name}</h4>
                  <p className="text-sm text-slate-600">{stage.desc}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  stage.status === "done" ? "bg-emerald-100 text-emerald-700" :
                  stage.status === "active" ? "bg-amber-100 text-amber-700" :
                  "bg-slate-100 text-slate-700"
                }`}>
                  {stage.status === "done" ? "Selesai" : stage.status === "active" ? "Berjalan" : "Menunggu"}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Next Action */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-lg p-6">
          <h3 className="font-semibold text-teal-900 mb-2">Langkah Berikutnya</h3>
          <p className="text-teal-800 text-sm mb-4">
            Silakan upload dokumen transaksi (CSV, XLSX, PDF) atau terhubung ke sumber data eksternal untuk memulai audit.
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
            <IconUpload />
            Upload Dokumen
          </button>
        </div>
      </div>
    </div>
  );
}

// MAIN APP
function App() {
  const [screen, setScreen] = useState("home");
  
  return (
    <>
      {screen === "home" ? (
        <HomeScreen onStart={() => setScreen("dashboard")} />
      ) : (
        <DashboardScreen onBack={() => setScreen("home")} />
      )}
    </>
  );
}

// RENDER
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

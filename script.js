const { useState, useEffect } = React;

// ============= ICONS =============
function IconCheck() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-teal-600"><polyline points="20 6 9 17 4 12"/></svg>;
}

function IconArrowRight() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
}

function IconUpload() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
}

function IconMail() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
}

function IconDrive() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12l3.5-7h9l3.5 7-3.5 7h-9z"/></svg>;
}

function IconLink() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
}

function IconRotate() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36M20.49 15a9 9 0 0 1-14.85 3.36"/></svg>;
}

function IconTrash() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;
}

function IconX() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}

// ============= LOGO =============
function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#logoGrad)" opacity="0.15" stroke="url(#logoGrad)" strokeWidth="2"/>
      <rect x="12" y="16" width="24" height="4" rx="2" fill="url(#logoGrad)" />
      <path d="M12 30.5h14.5L36 20" stroke="url(#logoGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ============= LANDING PAGE =============
function LandingPage({ onGetStarted }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div 
        className="flex flex-col items-center text-center max-w-2xl"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
      >
        {/* Logo + Name */}
        <div className="mb-8 inline-block">
          <Logo size={64} />
        </div>

        <h1 className="text-5xl sm:text-6xl font-800 tracking-tight text-slate-900 mb-4">
          Special Ali
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-slate-600 font-medium mb-2">
          Rekan kerja akuntansi yang teliti dan bisa dipercaya.
        </p>

        <p className="text-base text-slate-500 max-w-lg leading-relaxed mb-10">
          Audit keuangan & pajak otomatis berbasis PSAK & DJP. Zero-compromise accounting untuk bisnis Indonesia yang berkembang.
        </p>

        {/* Features Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-full">
            <IconCheck />
            <span className="text-sm font-medium text-teal-700">PSAK Native</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 border border-cyan-200 rounded-full">
            <IconCheck />
            <span className="text-sm font-medium text-cyan-700">DJP Ready</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full">
            <IconCheck />
            <span className="text-sm font-medium text-emerald-700">Zero-Approx</span>
          </div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={onGetStarted}
          className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300 hover:scale-105 transition-all active:scale-95"
        >
          <span>Mulai Audit</span>
          <IconArrowRight />
        </button>

        {/* Footer */}
        <p className="mt-12 text-xs text-slate-400">
          Enterprise Edition • SPECIAL ALI v3.0-UE • Production Ready
        </p>
      </div>
    </div>
  );
}

// ============= AUTH MODAL =============
function AuthModal({ onClose, onSuccess }) {
  const [mode, setMode] = useState("signin"); // "signin" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (email && password) {
      onSuccess(email);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 border border-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <span className="text-sm font-semibold text-slate-900">Special Ali</span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <IconX />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 mb-1">
          {mode === "signin" ? "Masuk" : "Buat Akun"}
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          {mode === "signin" ? "Akses workspace audit Anda" : "Mulai dengan akun baru"}
        </p>

        {/* Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@perusahaan.com"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Kata Sandi</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={!email || !password}
          className="w-full px-4 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mode === "signin" ? "Masuk" : "Daftar"}
        </button>

        {/* Toggle Mode */}
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full mt-4 text-sm text-slate-600 hover:text-teal-600 transition-colors font-medium"
        >
          {mode === "signin" ? "Belum punya akun? Daftar di sini" : "Sudah punya akun? Masuk di sini"}
        </button>
      </div>
    </div>
  );
}

// ============= SELECTION SCREEN =============
function SelectionScreen({ isGuest, onSelectWorkspace, onSelectIngestion, onShowAuth }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (type) => {
    if (isGuest) {
      onShowAuth();
    } else {
      type === "workspace" ? onSelectWorkspace() : onSelectIngestion();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div 
        className="flex flex-col items-center text-center w-full"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out"
        }}
      >
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-800 text-slate-900 mb-2">
            Pilih Mode Kerja
          </h2>
          <p className="text-slate-500">Lanjutkan dengan audit atau masukkan data baru</p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl w-full mb-8">
          
          {/* Workspace Card */}
          <div
            onClick={() => handleCardClick("workspace")}
            onMouseEnter={() => setHoveredCard("workspace")}
            onMouseLeave={() => setHoveredCard(null)}
            className={`cursor-pointer group p-8 rounded-2xl border-2 transition-all duration-300 ${
              hoveredCard === "workspace" 
                ? "bg-teal-50 border-teal-300 shadow-lg" 
                : "bg-white border-slate-200 hover:border-teal-200"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-colors ${
              hoveredCard === "workspace"
                ? "bg-teal-600 text-white"
                : "bg-teal-100 text-teal-600"
            }`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Workspace</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Lanjutkan audit yang sudah dimulai, lihat hasil, dan kelola jurnal penyesuaian.
            </p>
            <div className="mt-4 flex items-center justify-center text-sm font-semibold text-teal-600 group-hover:gap-2 transition-all gap-1">
              <span>Masuk</span>
              <IconArrowRight />
            </div>
          </div>

          {/* Ingestion Card */}
          <div
            onClick={() => handleCardClick("ingestion")}
            onMouseEnter={() => setHoveredCard("ingestion")}
            onMouseLeave={() => setHoveredCard(null)}
            className={`cursor-pointer group p-8 rounded-2xl border-2 transition-all duration-300 ${
              hoveredCard === "ingestion" 
                ? "bg-cyan-50 border-cyan-300 shadow-lg" 
                : "bg-white border-slate-200 hover:border-cyan-200"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-colors ${
              hoveredCard === "ingestion"
                ? "bg-cyan-600 text-white"
                : "bg-cyan-100 text-cyan-600"
            }`}>
              <IconUpload />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ingestion Data</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Masukkan dokumen baru: CSV, Excel, PDF, foto nota, atau sumber eksternal.
            </p>
            <div className="mt-4 flex items-center justify-center text-sm font-semibold text-cyan-600 group-hover:gap-2 transition-all gap-1">
              <span>Mulai</span>
              <IconArrowRight />
            </div>
          </div>

        </div>

        {/* Guest Badge */}
        {isGuest && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-medium text-amber-700">Mode Tamu • Login untuk akses penuh</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ============= INGESTION SCREEN =============
function IngestionScreen({ onBack }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const sources = [
    { key: "local", label: "File Lokal / OCR", icon: IconUpload, color: "teal", formats: "CSV • XLSX • PDF • JSON • Foto" },
    { key: "gmail", label: "Gmail", icon: IconMail, color: "red", formats: "Lampiran email" },
    { key: "gdrive", label: "Google Drive", icon: IconDrive, color: "blue", formats: "Folder tersambung" },
    { key: "url", label: "URL", icon: IconLink, color: "purple", formats: "Tautan dokumen" },
  ];

  const colorClasses = {
    teal: "bg-teal-50 border-teal-200 text-teal-700 hover:border-teal-400",
    red: "bg-red-50 border-red-200 text-red-700 hover:border-red-400",
    blue: "bg-blue-50 border-blue-200 text-blue-700 hover:border-blue-400",
    purple: "bg-purple-50 border-purple-200 text-purple-700 hover:border-purple-400",
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* Header */}
      <div className="border-b border-slate-100 px-6 py-4">
        <button 
          onClick={onBack}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-2"
        >
          ← Kembali
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div 
          className="w-full max-w-3xl"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease-out"
          }}
        >
          
          {/* Title */}
          <h2 className="text-3xl font-800 text-slate-900 text-center mb-2">
            Ingestion Data
          </h2>
          <p className="text-slate-500 text-center mb-10">
            Pilih sumber dokumen untuk audit Anda
          </p>

          {/* Sources Grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {sources.map((source) => {
              const Icon = source.icon;
              return (
                <div 
                  key={source.key}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${colorClasses[source.color]}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      source.color === "teal" ? "bg-teal-600 text-white" :
                      source.color === "red" ? "bg-red-600 text-white" :
                      source.color === "blue" ? "bg-blue-600 text-white" :
                      "bg-purple-600 text-white"
                    }`}>
                      <Icon />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-slate-900 mb-1">{source.label}</h3>
                      <p className="text-xs text-slate-600">{source.formats}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center flex-wrap">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors text-sm">
              <IconRotate />
              Reset Data
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors text-sm border border-red-200">
              <IconTrash />
              Hapus Data
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// ============= WORKSPACE "LET'S WORK" SCREEN =============
function WorkspaceScreen({ onBack }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div 
        className="text-center"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease-out"
        }}
      >
        <p className="text-slate-500 text-lg mb-3">Selamat datang,</p>
        <h1 className="text-5xl sm:text-6xl font-800 text-slate-900 mb-6">
          Let's work.
        </h1>
        <p className="text-slate-400 max-w-md">
          Workspace Anda siap. Klik di bawah untuk melanjutkan ke dashboard audit.
        </p>
        
        <div className="mt-8">
          <button 
            onClick={onBack}
            className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Lanjut ke Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}

// ============= MAIN APP =============
function App() {
  const [screen, setScreen] = useState("landing"); // landing, selection, ingestion, workspace, workspace-ready
  const [isGuest, setIsGuest] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const handleGetStarted = () => {
    setScreen("selection");
  };

  const handleSelectWorkspace = () => {
    setScreen("workspace");
  };

  const handleSelectIngestion = () => {
    setScreen("ingestion");
  };

  const handleShowAuth = () => {
    setShowAuth(true);
  };

  const handleAuthSuccess = (email) => {
    setIsGuest(false);
    setUserEmail(email);
    setShowAuth(false);
    setScreen("selection");
  };

  const handleBack = () => {
    setScreen("selection");
  };

  const handleWorkspaceReady = () => {
    setScreen("workspace-ready");
  };

  return (
    <>
      {showAuth && (
        <AuthModal 
          onClose={() => setShowAuth(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {screen === "landing" && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}

      {screen === "selection" && (
        <SelectionScreen 
          isGuest={isGuest}
          onSelectWorkspace={handleSelectWorkspace}
          onSelectIngestion={handleSelectIngestion}
          onShowAuth={handleShowAuth}
        />
      )}

      {screen === "ingestion" && (
        <IngestionScreen onBack={handleBack} />
      )}

      {screen === "workspace" && (
        <WorkspaceScreen onBack={handleWorkspaceReady} />
      )}

      {screen === "workspace-ready" && (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-500 mb-2">Dashboard siap</p>
            <h1 className="text-3xl font-bold text-slate-900 mb-6">
              Ini tempat dashboard akan ditampilkan
            </h1>
            <button 
              onClick={() => setScreen("selection")}
              className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Kembali ke Selection
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ============= RENDER =============
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

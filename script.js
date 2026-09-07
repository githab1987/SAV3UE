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

function IconMenu() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
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
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#logoGrad)" opacity="0.15" stroke="url(#logoGrad)" strokeWidth="2" filter="url(#glow)"/>
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
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-cyan-50 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      
      {/* Animated Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-200 to-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <div 
        className="flex flex-col items-center text-center max-w-2xl relative z-10"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
      >
        {/* Logo */}
        <div className="mb-8 inline-block">
          <Logo size={72} />
        </div>

        {/* Main Title */}
        <h1 className="text-6xl sm:text-7xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-teal-700 to-cyan-600 bg-clip-text text-transparent mb-4">
          Special Ali
        </h1>

        {/* Taglines */}
        <p className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
          Your Trusted Accounting Partner
        </p>

        <p className="text-lg text-slate-600 max-w-lg leading-relaxed mb-10">
          Automated financial audit & tax compliance based on PSAK & DJP standards. Zero-compromise accounting for growing Indonesian businesses.
        </p>

        {/* Features Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { label: "PSAK Native", color: "from-teal-400 to-teal-600" },
            { label: "DJP Ready", color: "from-cyan-400 to-cyan-600" },
            { label: "Zero-Approx", color: "from-blue-400 to-cyan-500" },
          ].map((feature, i) => (
            <div 
              key={i}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r ${feature.color} text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105`}
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.6s ease-out ${i * 100}ms`
              }}
            >
              <IconCheck />
              <span>{feature.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button 
          onClick={onGetStarted}
          className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-xl shadow-xl shadow-teal-300/40 hover:shadow-2xl hover:shadow-teal-400/50 hover:scale-105 transition-all active:scale-95 text-lg"
        >
          <span>Start Audit</span>
          <IconArrowRight />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-cyan-100 opacity-0 group-hover:opacity-20 transition-opacity" />
        </button>

        {/* Footer */}
        <p className="mt-12 text-xs text-slate-400 font-semibold tracking-wide">
          ENTERPRISE EDITION • SPECIAL ALI v3.0-UE • PRODUCTION READY
        </p>
      </div>
    </div>
  );
}

// ============= AUTH MODAL =============
function AuthModal({ onClose, onSuccess }) {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (email && password) {
      onSuccess(email);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 backdrop-blur-md">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 border border-white/20 relative overflow-hidden">
        
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-cyan-50 opacity-50" />
        <div className="relative z-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Logo size={32} />
              <span className="text-sm font-bold text-slate-900">Special Ali</span>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors hover:bg-slate-100 p-1.5 rounded-lg"
            >
              <IconX />
            </button>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-black text-slate-900 mb-1">
            {mode === "signin" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            {mode === "signin" ? "Access your audit workspace" : "Start auditing with PSAK compliance"}
          </p>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={!email || !password}
            className="w-full px-4 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>

          {/* Toggle Mode */}
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="w-full mt-4 text-sm text-slate-600 hover:text-teal-600 transition-colors font-semibold"
          >
            {mode === "signin" ? "Don't have account? Sign up" : "Already have account? Sign in"}
          </button>

        </div>
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
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-cyan-50 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      
      <div 
        className="flex flex-col items-center text-center w-full relative z-10"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out"
        }}
      >
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-2">
            Choose Your Mode
          </h2>
          <p className="text-slate-600 text-lg">Continue audit or import new data</p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl w-full mb-8">
          
          {/* Workspace Card */}
          <div
            onClick={() => handleCardClick("workspace")}
            onMouseEnter={() => setHoveredCard("workspace")}
            onMouseLeave={() => setHoveredCard(null)}
            className={`cursor-pointer group p-8 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
              hoveredCard === "workspace" 
                ? "bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-300 shadow-2xl shadow-teal-200/50" 
                : "bg-white/80 border-slate-200 hover:border-teal-200 shadow-lg hover:shadow-xl"
            }`}
          >
            <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center transition-all ${
              hoveredCard === "workspace"
                ? "bg-gradient-to-br from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-200/50"
                : "bg-gradient-to-br from-teal-100 to-cyan-100 text-teal-700"
            }`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Workspace</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Continue your audits, review results, and manage adjusting entries.
            </p>
            <div className="mt-4 flex items-center justify-center text-sm font-bold text-teal-600 group-hover:gap-2 transition-all gap-1">
              <span>Access</span>
              <IconArrowRight />
            </div>
          </div>

          {/* Ingestion Card */}
          <div
            onClick={() => handleCardClick("ingestion")}
            onMouseEnter={() => setHoveredCard("ingestion")}
            onMouseLeave={() => setHoveredCard(null)}
            className={`cursor-pointer group p-8 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
              hoveredCard === "ingestion" 
                ? "bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-300 shadow-2xl shadow-cyan-200/50" 
                : "bg-white/80 border-slate-200 hover:border-cyan-200 shadow-lg hover:shadow-xl"
            }`}
          >
            <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center transition-all ${
              hoveredCard === "ingestion"
                ? "bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-200/50"
                : "bg-gradient-to-br from-cyan-100 to-blue-100 text-cyan-700"
            }`}>
              <IconUpload />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Ingestion</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Import documents: CSV, Excel, PDF, receipts, or connect external data sources.
            </p>
            <div className="mt-4 flex items-center justify-center text-sm font-bold text-cyan-600 group-hover:gap-2 transition-all gap-1">
              <span>Start</span>
              <IconArrowRight />
            </div>
          </div>

        </div>

        {/* Guest Badge */}
        {isGuest && (
          <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-full shadow-sm">
            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 animate-pulse" />
            <span className="text-xs font-bold text-amber-700">Guest Mode • Sign in for full access</span>
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
    { key: "local", label: "Local Files / OCR", icon: IconUpload, color: "from-teal-400 to-teal-600", bgColor: "from-teal-50 to-cyan-50", formats: "CSV • XLSX • PDF • JSON • Photos" },
    { key: "gmail", label: "Gmail", icon: IconMail, color: "from-red-400 to-pink-600", bgColor: "from-red-50 to-pink-50", formats: "Email attachments" },
    { key: "gdrive", label: "Google Drive", icon: IconDrive, color: "from-blue-400 to-blue-600", bgColor: "from-blue-50 to-cyan-50", formats: "Connected folders" },
    { key: "url", label: "URL", icon: IconLink, color: "from-purple-400 to-purple-600", bgColor: "from-purple-50 to-pink-50", formats: "Document links" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-cyan-50 flex flex-col">
      
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <button 
          onClick={onBack}
          className="text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors inline-flex items-center gap-2 hover:bg-slate-100 px-3 py-2 rounded-lg"
        >
          ← Back
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
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 text-center mb-2">
            Data Ingestion
          </h2>
          <p className="text-slate-600 text-center text-lg mb-10">
            Select your document source to start audit
          </p>

          {/* Sources Grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {sources.map((source) => {
              const Icon = source.icon;
              return (
                <div 
                  key={source.key}
                  className={`p-6 rounded-2xl border-2 border-slate-200 cursor-pointer transition-all hover:shadow-xl bg-gradient-to-br ${source.bgColor} hover:border-slate-300 group`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${source.color} text-white shadow-lg group-hover:scale-110 transition-all`}>
                      <Icon />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-slate-900 mb-1 text-lg">{source.label}</h3>
                      <p className="text-xs text-slate-600 font-semibold">{source.formats}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center flex-wrap">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-sm shadow-sm">
              <IconRotate />
              Reset Data
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 font-bold rounded-lg hover:border-red-300 transition-all text-sm shadow-sm">
              <IconTrash />
              Delete Data
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
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-cyan-50 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>

      <div 
        className="text-center relative z-10"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease-out"
        }}
      >
        <p className="text-slate-500 text-lg mb-3 font-semibold">Welcome,</p>
        <h1 className="text-6xl sm:text-7xl font-black text-slate-900 mb-6">
          Let's work.
        </h1>
        <p className="text-slate-600 max-w-md text-lg mb-8">
          Your workspace is ready. Click below to access your audit dashboard.
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <button 
            onClick={onBack}
            className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg shadow-md transition-all hover:scale-105 active:scale-95"
          >
            Go to Dashboard →
          </button>
          <button 
            onClick={onBack}
            className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

// ============= MAIN APP =============
function App() {
  const [screen, setScreen] = useState("landing");
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
    setScreen("dashboard");
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

      {screen === "dashboard" && (
        <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-cyan-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-600 mb-2 font-semibold">Dashboard Ready</p>
            <h1 className="text-4xl font-black text-slate-900 mb-6">
              Dashboard will appear here in Step 3
            </h1>
            <button 
              onClick={() => setScreen("selection")}
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Back to Selection
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

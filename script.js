const { useState, useEffect } = React;

// LOGO
function Logo({ size = 22, tone = "light" }) {
  const stroke = tone === "light" ? "#2dd4bf" : "white";
  const bg = tone === "light" ? "transparent" : "#0f766e";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {bg !== "transparent" && <rect width="32" height="32" rx="8" fill={bg} />}
      <rect x="8" y="11" width="16" height="3" rx="1.5" fill={stroke} />
      <path d="M8 20.5h9.5L24 14" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// HOME SCREEN
function HomeScreen({ onStart }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => { 
    const timer = setTimeout(() => setIsLoaded(true), 100); 
    return () => clearTimeout(timer); 
  }, []);
  
  return (
    <div className="h-screen bg-slate-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{ 
        background: "radial-gradient(600px circle at 50% 40%, rgba(45,212,191,0.12), transparent 70%)" 
      }} />
      
      <div className="relative flex flex-col items-center text-center" style={{
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.7s ease-out"
      }}>
        <Logo size={40} tone="light" />
        
        <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          Special Ali
        </h1>
        
        <p className="mt-3 text-slate-400 text-base max-w-xs">
          Rekan kerja akuntansi yang teliti dan bisa dipercaya.
        </p>
        
        <button 
          onClick={onStart}
          className="mt-9 bg-teal-500 text-slate-950 font-semibold px-7 py-2.5 rounded-full hover:bg-teal-400 transition-colors cursor-pointer"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

// WELCOME SCREEN
function WelcomeScreen({ onBack }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center" style={{
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.5s ease-out"
      }}>
        <Logo size={40} tone="light" />
        
        <h1 className="mt-6 text-2xl font-semibold text-slate-900">
          Selamat datang!
        </h1>
        
        <p className="mt-3 text-slate-600 text-sm leading-relaxed">
          Sistem audit keuangan & pajak Indonesia siap membantu Anda. Dengan engine berbasis PSAK dan aturan DJP.
        </p>
        
        <div className="mt-8 space-y-3">
          <button className="w-full bg-teal-600 text-white font-medium py-2.5 rounded-lg hover:bg-teal-700 transition-colors">
            Mulai Audit
          </button>
          <button 
            onClick={onBack}
            className="w-full border border-slate-200 text-slate-700 font-medium py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Kembali
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
        <HomeScreen onStart={() => setScreen("welcome")} />
      ) : (
        <WelcomeScreen onBack={() => setScreen("home")} />
      )}
    </>
  );
}

// RENDER
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

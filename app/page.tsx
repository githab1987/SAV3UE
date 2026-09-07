"use client";

import { useState, useEffect } from "react";
import {
// ✅ BENAR
  X, Home, UploadCloud, ArrowLeftRight, Scale, FileSpreadsheet,
  AlertTriangle, Settings, CheckCircle2, ChevronRight,
  Mail, HardDrive, Link2, BatteryCharging, LayoutGrid,
} from "lucide-react";

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
// ✅ BENAR
function HomeScreen({ onStart }: { onStart: () => void }) { 
    const t = setTimeout(() => setIn(true), 80); 
    return () => clearTimeout(t); 
  }, []);
  
  return (
    <div className="h-screen bg-slate-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(600px circle at 50% 40%, rgba(45,212,191,0.12), transparent 70%)" }} />
      <div className="relative transition-all duration-700 ease-out flex flex-col items-center text-center"
        style={{ opacity: in_ ? 1 : 0, transform: in_ ? "translateY(0)" : "translateY(12px)" }}>
        <Logo size={40} tone="light" />
        <h1 className="mt-5 text-3xl sm:text-4xl font-medium tracking-tight text-white">Special Ali</h1>
        <p className="mt-3 text-slate-400 text-base max-w-xs">Rekan kerja akuntansi yang teliti dan bisa dipercaya.</p>
        <button onClick={onStart} className="mt-9 bg-teal-500 text-slate-950 font-medium px-7 py-2.5 rounded-full hover:bg-teal-400 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  const [start, setStart] = useState(false);
  
  return (
    <div className="font-sans">
      {start ? (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-500">Loading workspace...</p>
          </div>
        </div>
      ) : (
        <HomeScreen onStart={() => setStart(true)} />
      )}
    </div>
  );
}


// app/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  X, Home, UploadCloud, GitCompareArrows, Scale, FileSpreadsheet,
  AlertTriangle, Settings, ArrowLeft, CheckCircle2, ChevronRight,
  Mail, HardDrive, Link2, RefreshCw, Trash2, RotateCcw, FileText,
  Image as ImageIcon, FileJson, BatteryCharging, LayoutGrid, LogOut,
} from "lucide-react";

/* LOGO — "=" (Debit=Kredit) dengan ujung memanjang jadi centang */
function Logo({ size = 22, tone = "light" }) {
  const stroke = tone === "light" ? "#2dd4bf" : "white"; // teal-400 on dark, white on teal chip
  const bg = tone === "light" ? "transparent" : "#0f766e";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {bg !== "transparent" && <rect width="32" height="32" rx="8" fill={bg} />}
      <rect x="8" y="11" width="16" height="3" rx="1.5" fill={stroke} />
      <path d="M8 20.5h9.5L24 14" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ... [PASTE SEMUA KOMPONEN LAIN DI SINI] ...

// Main App
export default function App() {
  const [screen, setScreen] = useState("home");
  const [auth, setAuth] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ open: false });
  const [fading, setFading] = useState(false);

  const handleStartClick = () => {
    setFading(true);
    setTimeout(() => {
      setScreen("auth");
      setFading(false);
    }, 300);
  };

  const fireToast = (type) => {
    const messages = {
      success: "Beres — debit dan kredit akur.",
      approve: "Jurnal disetujui, catat di buku besar!",
      refresh: "Menjalankan ulang audit…",
      reset: "Data contoh dikembalikan seperti semula.",
      delete: "Data terhapus. Tidak ada jalan kembali.",
    };
    setToast({ type, message: messages[type] });
    setTimeout(() => setToast(null), 2500);
  };

  if (screen === "home") return <HomeScreen onStart={handleStartClick} />;
  if (screen === "auth") return <AuthModal mode="signin" onClose={() => setScreen("home")} onSuccess={() => { setAuth("user@example.com"); setScreen("select"); }} onSwitch={() => {}} />;
  if (screen === "select") return <SelectScreen onPick={(k) => { setFading(true); setTimeout(() => { setScreen(k === "workspace" ? "workspace" : "ingestion"); setFading(false); }, 300); }} fading={fading} />;

  return (
    <div className="min-h-screen bg-white">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <div className="p-6">
        <p>Screen aktif: {screen}</p>
      </div>
    </div>
  );
}

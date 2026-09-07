
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

const MENU = [
  { key: "overview", label: "Ringkasan", icon: Home },
  { key: "upload", label: "Unggah", icon: UploadCloud },
  { key: "rekon", label: "Rekonsiliasi", icon: GitCompareArrows },
  { key: "pajak", label: "Pajak & Jurnal", icon: Scale },
  { key: "ekspor", label: "Ekspor DJP", icon: FileSpreadsheet },
  { key: "unresolved", label: "Perlu Ditinjau", icon: AlertTriangle },
  { key: "hasil", label: "Hasil Proses", icon: LayoutGrid },
  { key: "pengaturan", label: "Pengaturan", icon: Settings },
];

const ALERTS = {
  loading: ["Membaca dokumen…", "Mencocokkan angka…", "Menghitung pajak…", "Merapikan buku besar…"],
  success: ["Beres — debit dan kredit akur.", "Selesai, semua angka sudah sepakat."],
  approve: ["Jurnal disetujui, catat di buku besar!", "Sip, satu jurnal lagi aman."],
  refresh: ["Menjalankan ulang audit…"],
  reset: ["Data contoh dikembalikan seperti semula."],
  delete: ["Data terhapus. Tidak ada jalan kembali."],
};
const QUIPS = [
  "Tiga jurnal menunggu tanda tangan Anda.",
  "Tidak ada nota yang tercecer hari ini.",
  "Buku besar terlihat rapi hari ini.",
];
function rupiah(n) { return "Rp " + n.toLocaleString("id-ID"); }
function greeting() {
  const h = new Date().getHours();
  if (h < 11) return "Selamat pagi"; if (h < 15) return "Selamat siang";
  if (h < 18) return "Selamat sore"; return "Selamat malam";
}

/* ---------- TOAST & CONFIRM ---------- */
function Toast({ toast, onClose }) {
  if (!toast) return null;
  const bg = toast.type === "delete" ? "bg-rose-700" : toast.type === "reset" ? "bg-slate-700" : "bg-teal-700";
  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 ${bg} text-white pl-3.5 pr-2.5 py-2.5 rounded-lg shadow-lg max-w-xs`}>
      <CheckCircle2 size={16} className="shrink-0" />
      <span className="text-sm leading-snug">{toast.message}</span>
      <button onClick={onClose} className="ml-1 opacity-70 hover:opacity-100 shrink-0"><X size={14} /></button>
    </div>
  );
}
function ConfirmModal({ open, danger, title, description, confirmLabel, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-lg max-w-sm w-full p-5 border border-slate-200">
        <h3 className="font-medium text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
        <div className="mt-5 flex justify-end gap-2.5">
          <button onClick={onCancel} className="px-3.5 py-2 text-sm rounded-md text-slate-600 hover:bg-slate-50">Batal</button>
          <button onClick={onConfirm} className={`px-3.5 py-2 text-sm rounded-md text-white ${danger ? "bg-rose-700 hover:bg-rose-800" : "bg-slate-900 hover:bg-slate-800"}`}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- 1. HOME — hanya logo, nama, tagline, satu tombol ---------- */
function HomeScreen({ onStart }) {
  const [in_, setIn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setIn(true), 80); return () => clearTimeout(t); }, []);
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

/* ---------- 2. SELECT — Workspace / Ingestion, guest kecil di bawah ---------- */
function SelectScreen({ onPick, fading }) {
  const [in_, setIn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setIn(true), 60); return () => clearTimeout(t); }, []);
  const tiles = [
    { key: "workspace", label: "Workspace", desc: "Ringkasan, jurnal, dan pajak" },
    { key: "ingestion", label: "Ingestion", desc: "Masukkan dokumen baru" },
  ];
  return (
    <div className="h-screen bg-slate-950 flex flex-col items-center justify-center px-6">
      <div className="flex flex-col sm:flex-row gap-4 transition-all duration-500"
        style={{ opacity: in_ && !fading ? 1 : 0, transform: in_ && !fading ? "translateY(0)" : "translateY(8px)" }}>
        {tiles.map((t) => (
          <button key={t.key} onClick={() => onPick(t.key)}
            className="w-64 border border-slate-800 hover:border-teal-500/60 bg-slate-900/60 rounded-xl px-6 py-8 text-left transition-colors group">
            <div className="text-white font-medium text-lg group-hover:text-teal-400 transition-colors">{t.label}</div>
            <div className="text-slate-500 text-sm mt-1.5">{t.desc}</div>
          </button>
        ))}
      </div>
      <span className="mt-6 text-xs text-slate-600">Tamu</span>
    </div>
  );
}

/* ---------- Transisi: tile pindah ke tengah lalu fade ---------- */
function TransitionScreen({ target }) {
  const [showText, setShowText] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShowText(true), 250); return () => clearTimeout(t); }, []);
  return (
    <div className="h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="transition-all duration-500" style={{ opacity: showText ? 1 : 0, transform: showText ? "scale(1)" : "scale(0.92)" }}>
        {target === "workspace" ? (
          <div className="text-center">
            <div className="text-slate-500 text-sm">{greeting()},</div>
            <div className="text-3xl font-medium text-white mt-1">Let's work.</div>
          </div>
        ) : (
          <div className="text-center">
            <Logo size={28} tone="light" />
            <div className="text-xl font-medium text-white mt-3">Menyiapkan Ingestion…</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- AUTH — kotak modal ---------- */
function AuthModal({ mode, onSwitch, onClose, onSuccess }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2"><Logo size={18} tone="light" /><span className="text-sm text-white">Special Ali</span></div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300"><X size={16} /></button>
        </div>
        <h2 className="mt-6 text-lg font-medium text-white">{mode === "signin" ? "Masuk" : "Buat akun"}</h2>
        <div className="mt-5 space-y-3">
          <input type="email" placeholder="Email" className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500" />
          <input type="password" placeholder="Kata sandi" className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500" />
          <button onClick={onSuccess} className="w-full bg-teal-500 text-slate-950 font-medium rounded-md py-2.5 text-sm hover:bg-teal-400">
            {mode === "signin" ? "Masuk" : "Daftar"}
          </button>
        </div>
        <button onClick={onSwitch} className="mt-4 text-xs text-slate-500 hover:text-slate-300 w-full text-center">
          {mode === "signin" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"}
        </button>
      </div>
    </div>
  );
}

/* ---------- INGESTION — standalone, kotak-kotak sumber ---------- */
function IngestionScreen({ onUpload }) {
  const [in_, setIn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setIn(true), 60); return () => clearTimeout(t); }, []);
  const sources = [
    { key: "local", label: "File Lokal / OCR", icon: UploadCloud, formats: "CSV · Sheet · PDF · JSON · Foto Nota" },
    { key: "gmail", label: "Gmail", icon: Mail, formats: "Lampiran email" },
    { key: "gdrive", label: "Google Drive", icon: HardDrive, formats: "Folder tersambung" },
    { key: "url", label: "URL", icon: Link2, formats: "Tautan dokumen" },
  ];
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16">
      <div className="transition-all duration-500 w-full max-w-2xl" style={{ opacity: in_ ? 1 : 0, transform: in_ ? "translateY(0)" : "translateY(10px)" }}>
        <h1 className="text-xl font-medium text-slate-900 text-center">Ingestion</h1>
        <p className="text-sm text-slate-500 text-center mt-1.5">Pilih sumber dokumen Anda.</p>
        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          {sources.map((s) => {
            const Icon = s.icon;
            return (
              <button key={s.key} onClick={() => onUpload(s.label)}
                className="text-left border border-slate-200 hover:border-teal-600 rounded-lg p-5 transition-colors">
                <Icon size={18} className="text-teal-700" />
                <div className="mt-3 text-sm font-medium text-slate-900">{s.label}</div>
                <div className="text-xs text-slate-400 mt-1">{s.formats}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- PROSES — animasi seperti mengisi daya ---------- */
function ProcessingScreen({ sourceLabel, onDone }) {
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState(ALERTS.loading[0]);
  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += 4 + Math.random() * 6;
      if (p >= 100) { p = 100; clearInterval(iv); setTimeout(onDone, 500); }
      setProgress(p);
      setMsg(ALERTS.loading[Math.floor((p / 100) * (ALERTS.loading.length - 1))]);
    }, 160);
    return () => clearInterval(iv);
  }, [onDone]);
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <BatteryCharging size={26} className="text-teal-700" />
      <div className="mt-6 w-56 h-3 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full bg-teal-600 transition-all duration-150 ease-linear rounded-full" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-3 text-sm font-mono text-slate-500">{Math.round(progress)}%</div>
      <p className="mt-4 text-sm text-slate-500">{msg}</p>
      <p className="text-xs text-slate-400 mt-1">Memproses dari {sourceLabel}</p>
    </div>
  );
}

/* ---------- Konten tiap menu workspace ---------- */
function OverviewMenu() {
  const [quip] = useState(() => QUIPS[Math.floor(Math.random() * QUIPS.length)]);
  return (
    <div>
      <h1 className="text-xl font-medium text-slate-900">{greeting()}.</h1>
      <p className="mt-1 text-sm text-slate-500">{quip}</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{ l: "Transaksi diproses", v: "1.284" }, { l: "Perlu ditinjau", v: "6" }, { l: "Jurnal menunggu approve", v: "3" }].map((s, i) => (
          <div key={i} className="border border-slate-200 rounded-lg p-4">
            <div className="text-xs text-slate-500">{s.l}</div>
            <div className="mt-1.5 text-2xl font-mono text-slate-900">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function UploadMenu({ onGoIngestion }) {
  return (
    <div>
      <h1 className="text-xl font-medium text-slate-900">Unggah</h1>
      <p className="mt-1 text-sm text-slate-500">Gunakan alur Ingestion untuk memasukkan dokumen baru.</p>
      <button onClick={onGoIngestion} className="mt-5 bg-slate-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800">Buka Ingestion</button>
    </div>
  );
}
function RekonMenu({ onOpenSub }) {
  const rows = [{ v: "PT Sumber Makmur", n: 15000000, s: "Cocok" }, { v: "CV Cahaya Abadi", n: 4200000, s: "Selisih tanggal" }, { v: "Bank Transfer #8821", n: 900000, s: "Menggantung" }];
  return (
    <div>
      <h1 className="text-xl font-medium text-slate-900">Rekonsiliasi</h1>
      <p className="mt-1 text-sm text-slate-500">Mutasi bank vs buku kas.</p>
      <div className="mt-6 divide-y divide-slate-100 border border-slate-200 rounded-lg">
        {rows.map((r, i) => (
          <button key={i} onClick={() => onOpenSub(r.v)} className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-slate-50">
            <div><div className="text-sm text-slate-900">{r.v}</div><div className="text-xs text-slate-400 mt-0.5 font-mono">{rupiah(r.n)}</div></div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${r.s === "Cocok" ? "bg-teal-50 text-teal-700" : "bg-amber-50 text-amber-700"}`}>{r.s}</span>
              <ChevronRight size={15} className="text-slate-300" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
function PajakMenu({ fireToast }) {
  const [status, setStatus] = useState("pending");
  const rows = [{ akun: "Beban Jasa Konsultan", debit: 15000000, kredit: 0 }, { akun: "PPh 23 Terutang", debit: 0, kredit: 300000 }, { akun: "Kas/Bank", debit: 0, kredit: 14700000 }];
  return (
    <div>
      <h1 className="text-xl font-medium text-slate-900">Pajak & Jurnal</h1>
      <p className="mt-1 text-sm text-slate-500">Angka berasal dari mesin kalkulasi, bukan tebakan model bahasa.</p>
      <div className="mt-6 border border-slate-200 rounded-lg overflow-hidden">
        <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
          <span className="text-sm text-slate-700">AJE-001 — Jasa Konsultan</span>
          <span className={`text-xs px-2 py-1 rounded-full ${status === "approved" ? "bg-teal-50 text-teal-700" : "bg-amber-50 text-amber-700"}`}>{status === "approved" ? "Disetujui" : "Menunggu"}</span>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-slate-400 text-xs"><th className="px-4 py-2 font-normal">Akun</th><th className="px-4 py-2 font-normal text-right">Debit</th><th className="px-4 py-2 font-normal text-right">Kredit</th></tr></thead>
          <tbody className="font-mono text-[13px]">
            {rows.map((r, i) => (<tr key={i} className="border-t border-slate-100"><td className="px-4 py-2.5 font-sans">{r.akun}</td><td className="px-4 py-2.5 text-right">{r.debit ? rupiah(r.debit) : "—"}</td><td className="px-4 py-2.5 text-right">{r.kredit ? rupiah(r.kredit) : "—"}</td></tr>))}
          </tbody>
        </table>
        {status === "pending" && (
          <div className="px-4 py-3 border-t border-slate-100 flex gap-2 justify-end">
            <button onClick={() => setStatus("rejected")} className="px-3.5 py-1.5 text-sm rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50">Tolak</button>
            <button onClick={() => { setStatus("approved"); fireToast("approve"); }} className="px-3.5 py-1.5 text-sm rounded-md bg-teal-700 text-white hover:bg-teal-800">Setujui</button>
          </div>
        )}
      </div>
    </div>
  );
}
function EksporMenu({ fireToast }) {
  const items = [{ t: "e-Faktur PPN", f: ".csv" }, { t: "e-Bupot Unifikasi", f: ".json" }];
  return (
    <div>
      <h1 className="text-xl font-medium text-slate-900">Ekspor DJP</h1>
      <p className="mt-1 text-sm text-slate-500">Divalidasi terhadap skema resmi sebelum diunduh.</p>
      <div className="mt-6 space-y-3">
        {items.map((it, i) => (
          <div key={i} className="border border-slate-200 rounded-lg p-4 flex items-center justify-between">
            <div><div className="text-sm text-slate-900 font-medium">{it.t} <span className="text-slate-400 font-normal">{it.f}</span></div><div className="text-xs text-teal-700 mt-1 flex items-center gap-1"><CheckCircle2 size={12} /> Tervalidasi skema DJP</div></div>
            <button onClick={() => fireToast("success")} className="bg-slate-900 text-white px-3.5 py-2 rounded-md text-sm shrink-0">Unduh</button>
          </div>
        ))}
      </div>
    </div>
  );
}
function UnresolvedMenu({ onOpenSub }) {
  const rows = [{ v: "Nota buram — Toko ATK Jaya", m: "Nominal tidak terbaca OCR" }, { v: "Transfer tanpa keterangan", m: "Vendor tidak teridentifikasi" }];
  return (
    <div>
      <h1 className="text-xl font-medium text-slate-900">Perlu Ditinjau</h1>
      <p className="mt-1 text-sm text-slate-500">Tidak menghambat data lain yang sudah bersih.</p>
      <div className="mt-6 divide-y divide-slate-100 border border-slate-200 rounded-lg">
        {rows.map((r, i) => (
          <button key={i} onClick={() => onOpenSub(r.v)} className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-slate-50">
            <div><div className="text-sm text-slate-900">{r.v}</div><div className="text-xs text-slate-400 mt-0.5">{r.m}</div></div>
            <ChevronRight size={15} className="text-slate-300" />
          </button>
        ))}
      </div>
    </div>
  );
}
function HasilMenu() {
  const rows = [{ v: "45 transaksi diproses", s: "Selesai" }, { v: "3 memerlukan tinjauan", s: "Perlu aksi" }, { v: "PPN & PPh terhitung otomatis", s: "Selesai" }];
  return (
    <div>
      <h1 className="text-xl font-medium text-slate-900">Hasil Proses Data</h1>
      <p className="mt-1 text-sm text-slate-500">Ringkasan dari dokumen yang baru saja diproses.</p>
      <div className="mt-6 divide-y divide-slate-100 border border-slate-200 rounded-lg">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3.5">
            <span className="text-sm text-slate-900">{r.v}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${r.s === "Selesai" ? "bg-teal-50 text-teal-700" : "bg-amber-50 text-amber-700"}`}>{r.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function PengaturanMenu({ fireToast, openConfirm }) {
  return (
    <div>
      <h1 className="text-xl font-medium text-slate-900">Pengaturan</h1>
      <div className="mt-6 border border-slate-200 rounded-lg p-4 flex items-center justify-between">
        <div><div className="text-sm font-medium text-slate-900">Jalankan ulang audit</div><p className="text-xs text-slate-500 mt-0.5">Aman, tidak menghapus apa pun.</p></div>
        <button onClick={() => fireToast("refresh")} className="flex items-center gap-1.5 border border-slate-200 px-3.5 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-50 shrink-0"><RefreshCw size={14} /> Refresh</button>
      </div>
      <div className="mt-6 border border-rose-200 rounded-lg p-4">
        <div className="text-sm font-medium text-rose-700">Zona berbahaya</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-slate-900">Reset ke data contoh</div>
          <button onClick={() => openConfirm("reset")} className="flex items-center gap-1.5 border border-slate-200 px-3.5 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-50 shrink-0"><RotateCcw size={14} /> Reset</button>
        </div>
        <div className="mt-4 pt-4 border-t border-rose-100 flex items-center justify-between">
          <div className="text-sm text-slate-900">Hapus semua data</div>
          <button onClick={() => openConfirm("delete")} className="flex items-center gap-1.5 bg-rose-700 text-white px-3.5 py-2 rounded-md text-sm hover:bg-rose-800 shrink-0"><Trash2 size={14} /> Hapus</button>
        </div>
      </div>
    </div>
  );
}
function SubDetail({ title, onBack }) {
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5"><ArrowLeft size={15} /> Kembali</button>
      <h1 className="text-xl font-medium text-slate-900">{title}</h1>
      <div className="mt-6 border border-slate-200 rounded-lg p-5 space-y-3 text-sm">
        <div className="flex justify-between"><span className="text-slate-500">Status</span><span>Menunggu tinjauan manual</span></div>
        <div className="flex justify-between"><span className="text-slate-500">Saran tindakan</span><span>Minta ulang dokumen dari vendor</span></div>
      </div>
    </div>
  );
}

/* ---------- WORKSPACE — header horizontal, bukan sidebar ---------- */
function Workspace({ activeMenu, setActiveMenu, onGoIngestion, onLogout }) {
  const [sub, setSub] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const timerRef = useRef(null);

  function fireToast(type) {
    const pool = ALERTS[type];
    setToast({ type, message: pool[Math.floor(Math.random() * pool.length)] });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast(null), 3000);
  }

  const content = {
    overview: <OverviewMenu />,
    upload: <UploadMenu onGoIngestion={onGoIngestion} />,
    rekon: <RekonMenu onOpenSub={setSub} />,
    pajak: <PajakMenu fireToast={fireToast} />,
    ekspor: <EksporMenu fireToast={fireToast} />,
    unresolved: <UnresolvedMenu onOpenSub={setSub} />,
    hasil: <HasilMenu />,
    pengaturan: <PengaturanMenu fireToast={fireToast} openConfirm={setConfirm} />,
  }[activeMenu];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <header className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2 shrink-0"><Logo size={20} /><span className="text-sm font-medium">Special Ali</span></div>
          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {MENU.map((m) => {
              const Icon = m.icon; const active = activeMenu === m.key;
              return (
                <button key={m.key} onClick={() => { setActiveMenu(m.key); setSub(null); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${active ? "bg-teal-50 text-teal-800" : "text-slate-500 hover:bg-slate-50"}`}>
                  <Icon size={14} /> {m.label}
                </button>
              );
            })}
          </nav>
          <button onClick={onLogout} className="text-slate-400 hover:text-slate-700 shrink-0"><LogOut size={16} /></button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto w-full px-6 py-8 flex-1">
        {sub ? <SubDetail title={sub} onBack={() => setSub(null)} /> : content}
      </main>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <ConfirmModal open={!!confirm} danger={confirm === "delete"}
        title={confirm === "delete" ? "Hapus semua data?" : "Reset ke data contoh?"}
        description={confirm === "delete" ? "Tidak bisa dibatalkan." : "Data demo kembali ke kondisi awal."}
        confirmLabel={confirm === "delete" ? "Ya, hapus" : "Ya, reset"}
        onCancel={() => setConfirm(null)}
        onConfirm={() => { fireToast(confirm); setConfirm(null); }} />
    </div>
  );
}

/* ---------- ROOT: state machine alur ---------- */
export default function App() {
  const [phase, setPhase] = useState("home"); // home, select, auth, toTarget, ingestion, processing, workspace
  const [authed, setAuthed] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [pendingTarget, setPendingTarget] = useState(null);
  const [activeMenu, setActiveMenu] = useState("overview");
  const [sourceLabel, setSourceLabel] = useState("");

  function handlePick(target) {
    if (!authed) { setPendingTarget(target); setPhase("auth"); return; }
    goTo(target);
  }
  function goTo(target) {
    setPendingTarget(target);
    setPhase("toTarget");
    setTimeout(() => {
      if (target === "workspace") { setActiveMenu("overview"); setPhase("workspace"); }
      else setPhase("ingestion");
    }, 1100);
  }
  function handleAuthSuccess() { setAuthed(true); goTo(pendingTarget); }
  function handleUpload(label) { setSourceLabel(label); setPhase("processing"); }
  function handleProcessingDone() { setActiveMenu("hasil"); setPhase("workspace"); }

  return (
    <>
      {phase === "home" && <HomeScreen onStart={() => setPhase("select")} />}
      {phase === "select" && <SelectScreen onPick={handlePick} />}
      {phase === "auth" && (
        <AuthModal mode={authMode} onClose={() => setPhase("select")}
          onSwitch={() => setAuthMode((m) => (m === "signin" ? "signup" : "signin"))}
          onSuccess={handleAuthSuccess} />
      )}
      {phase === "toTarget" && <TransitionScreen target={pendingTarget} />}
      {phase === "ingestion" && <IngestionScreen onUpload={handleUpload} />}
      {phase === "processing" && <ProcessingScreen sourceLabel={sourceLabel} onDone={handleProcessingDone} />}
      {phase === "workspace" && (
        <Workspace activeMenu={activeMenu} setActiveMenu={setActiveMenu}
          onGoIngestion={() => setPhase("ingestion")}
          onLogout={() => { setAuthed(false); setPhase("home"); }} />
      )}
    </>
  );
}

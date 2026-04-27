"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity, ShieldCheck, ShieldAlert, AlertTriangle, RefreshCw,
  Radar, Database, Cpu, ArrowUpRight, CircleDot, ChevronRight, BarChart3
} from "lucide-react";

type RiskStatus = "SAFE" | "WARN" | "DANGER" | "UNKNOWN";

type Token = {
  address: string;
  symbol: string;
  name: string;
  logoURI?: string;
  rank?: number;
  price: number;
  liquidity: number;
  volume24h: number;
  marketcap: number;
  risk: { status: RiskStatus; flags: string[]; score: number };
};

// --- UTILS ---
const fmtUSD = (n: number) => {
  if (!Number.isFinite(n) || n === 0) return "—";
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
  if (n < 0.0001) return `$${n.toExponential(2)}`;
  if (n < 1) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(2)}`;
};
const fmtAddr = (a: string) => `${a.slice(0, 4)}…${a.slice(-4)}`;

export default function Page() {
  const [view, setView] = useState<"landing" | "dashboard">("landing");
  const [tokens, setTokens] = useState<Token[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [scannedAt, setScannedAt] = useState<number | null>(null);

  async function load() {
    setRefreshing(true);
    setError(null);
    try {
      const res = await fetch("/api/birdeye", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Fetch failed");
      setTokens(data.tokens ?? []);
      setScannedAt(data.scannedAt ?? Date.now());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setRefreshing(false);
    }
  }

  // Effect to load data only when entering dashboard
  useEffect(() => {
    if (view === "dashboard" && !tokens) {
      load();
    }
  }, [view]);

  const stats = useMemo(() => {
    if (!tokens) return { total: 0, safe: 0, danger: 0, volume: 0 };
    return tokens.reduce(
      (a, t) => ({
        total: a.total + 1,
        safe: a.safe + (t.risk.status === "SAFE" ? 1 : 0),
        danger: a.danger + (t.risk.status === "DANGER" ? 1 : 0),
        volume: a.volume + (t.volume24h || 0),
      }),
      { total: 0, safe: 0, danger: 0, volume: 0 }
    );
  }, [tokens]);

  if (view === "landing") {
    return <LandingPage onEnter={() => setView("dashboard")} />;
  }

  return (
    <main className="relative min-h-screen bg-[#050814] text-slate-200 font-mono overflow-x-hidden">
      <GridBackground />
      <Navbar onRefresh={load} refreshing={refreshing} scannedAt={scannedAt} onBack={() => setView("landing")} />

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-10">
        <Hero />
        <StatsRow stats={stats} loading={!tokens && !error} />
        <Panel tokens={tokens} loading={!tokens && !error} error={error} />
        <Footer />
      </section>
    </main>
  );
}

/* ─────────────────────────── LANDING PAGE ─────────────────────────── */

function LandingPage({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="relative min-h-screen bg-[#050814] text-slate-200 font-mono overflow-hidden flex flex-col items-center justify-center">
      <GridBackground />
      
      {/* Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 text-center px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-[10px] uppercase tracking-[0.3em] text-cyan-400 mb-8 animate-pulse">
          <Radar className="h-3 w-3" /> System Status: Operational
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
          SENTINEL<span className="text-cyan-400">X</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed mb-10">
          The industry's first autonomous risk telemetry engine for the Solana network. 
          Cross-referencing momentum against on-chain authority constraints in real-time.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button 
            onClick={onEnter}
            className="group relative flex items-center gap-3 bg-cyan-500 text-black font-bold px-8 py-4 rounded-md overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 uppercase tracking-widest text-xs">Launch Terminal</span>
            <ChevronRight className="relative z-10 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>
          
          <a href="https://docs.birdeye.so" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-8 py-4 rounded-md border border-slate-700 text-slate-400 uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors">
            View Protocol Docs
          </a>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto opacity-60">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-cyan-400" />
            <span className="text-[10px] uppercase tracking-widest">Risk Auditing</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-400" />
            <span className="text-[10px] uppercase tracking-widest">Real-time Telemetry</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            <span className="text-[10px] uppercase tracking-widest">Market Analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── DASHBOARD COMPONENTS ─────────────────────────── */

function GridBackground() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.5) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
    </>
  );
}

function Navbar({
  onRefresh, refreshing, scannedAt, onBack
}: { onRefresh: () => void; refreshing: boolean; scannedAt: number | null; onBack: () => void }) {
  return (
    <header className="relative z-10 border-b border-cyan-500/10 bg-[#050814]/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
          <div className="relative flex h-9 w-9 items-center justify-center rounded-md border border-cyan-400/30 bg-cyan-400/5">
            <Radar className="h-4 w-4 text-cyan-300" />
            <span className="absolute inset-0 animate-ping rounded-md border border-cyan-400/20" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-[0.18em] text-cyan-300">
              SENTINEL<span className="text-slate-200">X</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
              Risk Terminal v1.0
            </div>
          </div>
        </div>

        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="group flex items-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/5 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-cyan-200 transition hover:bg-cyan-400/10 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Scanning" : "Re-scan"}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-cyan-400/80">
        <span className="h-px w-8 bg-cyan-400/40" />
        Live Network Feed
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
        On-chain telemetry for trending Solana assets.
      </h1>
    </div>
  );
}

function StatsRow({ stats, loading }: { stats: any; loading: boolean }) {
  const cards = [
    { label: "Assets Scanned", value: loading ? "—" : String(stats.total), icon: Database, tint: "cyan" as const },
    { label: "Cleared / Safe", value: loading ? "—" : String(stats.safe), icon: ShieldCheck, tint: "emerald" as const },
    { label: "Flagged / Danger", value: loading ? "—" : String(stats.danger), icon: ShieldAlert, tint: "red" as const },
    { label: "Volume Tracked", value: loading ? "—" : fmtUSD(stats.volume), icon: Activity, tint: "cyan" as const },
  ];
  const tintMap: any = {
    cyan: "text-cyan-300 border-cyan-400/20 bg-cyan-400/[0.03]",
    emerald: "text-emerald-300 border-emerald-400/20 bg-emerald-400/[0.03]",
    red: "text-red-300 border-red-400/20 bg-red-400/[0.03]",
  };
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className={`relative overflow-hidden rounded-lg border ${tintMap[c.tint]} px-4 py-3.5`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400">{c.label}</span>
            <c.icon className="h-3.5 w-3.5 opacity-70" />
          </div>
          <div className="mt-2 font-mono text-2xl tracking-tight text-slate-50">{c.value}</div>
        </div>
      ))}
    </div>
  );
}

function Panel({ tokens, loading, error }: { tokens: Token[] | null; loading: boolean; error: string | null }) {
  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-cyan-500/10 bg-[#070b1c]/80 shadow-[0_0_60px_-30px_rgba(34,211,238,0.4)]">
      <div className="flex items-center justify-between border-b border-cyan-500/10 px-5 py-3">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cyan-300">
          <Cpu className="h-3.5 w-3.5" /> Live Screening Feed
        </div>
      </div>
      {loading && <Loader />}
      {error && <ErrorState message={error} />}
      {!loading && !error && tokens && <TokenTable tokens={tokens} />}
    </div>
  );
}

function TokenTable({ tokens }: { tokens: Token[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] text-sm">
        <thead>
          <tr className="border-b border-cyan-500/10 text-[10px] uppercase tracking-[0.25em] text-slate-500">
            <th className="px-5 py-3 text-left font-normal">#</th>
            <th className="px-5 py-3 text-left font-normal">Asset</th>
            <th className="px-5 py-3 text-right font-normal">Price</th>
            <th className="px-5 py-3 text-right font-normal">24h Volume</th>
            <th className="px-5 py-3 text-right font-normal">Risk Status</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((t, i) => (
            <tr key={t.address} className="group border-b border-cyan-500/[0.06] transition hover:bg-cyan-400/[0.02]">
              <td className="px-5 py-4 text-slate-500">{String(i + 1).padStart(2, "0")}</td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <TokenAvatar token={t} />
                  <div className="leading-tight">
                    <div className="font-semibold text-slate-100">{t.symbol}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{fmtAddr(t.address)}</div>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-right font-mono text-slate-100">{fmtUSD(t.price)}</td>
              <td className="px-5 py-4 text-right font-mono text-slate-200">{fmtUSD(t.volume24h)}</td>
              <td className="px-5 py-4 text-right"><RiskBadge status={t.risk.status} flags={t.risk.flags} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TokenAvatar({ token }: { token: Token }) {
  const initials = token.symbol?.slice(0, 2).toUpperCase() ?? "??";
  return (
    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md border border-cyan-500/20 bg-cyan-500/5">
      {token.logoURI ? (
        <img src={token.logoURI} alt={token.symbol} className="h-full w-full object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-[10px] font-semibold text-cyan-200">{initials}</span>
      )}
    </div>
  );
}

function RiskBadge({ status, flags }: { status: RiskStatus; flags: string[] }) {
  const cfg: any = {
    SAFE: { label: "Safe", cls: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300", Icon: ShieldCheck },
    WARN: { label: "Caution", cls: "border-amber-400/30 bg-amber-400/10 text-amber-300", Icon: AlertTriangle },
    DANGER: { label: "Danger", cls: "border-red-400/30 bg-red-400/10 text-red-300", Icon: ShieldAlert },
    UNKNOWN: { label: "Unknown", cls: "border-slate-500/30 bg-slate-500/10 text-slate-300", Icon: AlertTriangle },
  };
  const { label, cls, Icon } = cfg[status];
  return (
    <div className="inline-flex flex-col items-end gap-1">
      <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${cls}`}>
        <Icon className="h-3 w-3" />{label}
      </span>
      {flags.length > 0 && <span className="text-[9px] text-slate-500">{flags[0]}</span>}
    </div>
  );
}

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-20">
      <Radar className="h-6 w-6 animate-spin text-cyan-400" />
      <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-300">Synchronizing Telemetry…</span>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
      <ShieldAlert className="h-6 w-6 text-red-400" />
      <div className="text-sm text-slate-200">Connection Failed</div>
      <div className="font-mono text-[10px] text-red-300/80">{message}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 w-full py-8 border-t border-cyan-500/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="flex items-center gap-2 text-cyan-300/60">
          <Radar className="h-4 w-4" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest">SentinelX Labs © 2026</span>
        </div>
        <a 
          href="https://docs.birdeye.so" 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500 transition hover:text-cyan-300"
        >
          <span>Powered by Birdeye Network</span>
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </footer>
  );
}
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SentinelX · Solana Risk & Momentum Screener",
  description: "Institutional-grade on-chain telemetry for trending Solana assets.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark bg-[#050814]">
      <body className="bg-[#050814] text-slate-200 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
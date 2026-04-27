SentinelX 🛰️
Autonomous Risk Telemetry & Momentum Screener for Solana
SentinelX is a production-grade security dashboard designed for the Birdeye Data Hackathon. It monitors the Solana network's trending assets in real-time, cross-referencing market momentum with deep on-chain security audits to identify "honeypots" and high-risk tokens before they impact retail traders.

🚀 Overview
In the fast-moving Solana ecosystem, "Trending" doesn't always mean "Safe." SentinelX bridge the gap by providing institutional-grade telemetry on every trending asset.

Key Features
Real-Time Momentum Tracking: Fetches top trending tokens directly from Birdeye’s high-fidelity data feed.

Automated Security Audits: Every asset is screened for authority risks, including Mint Authority, Freeze Authority, and Transfer Fees.

Holder Concentration Analysis: Monitors top-10 holder percentages and creator balances to flag potential rug-pull scenarios.

Graceful UI Degradation: Built with a "Heuristic Analysis" fallback engine to maintain dashboard stability and provide risk estimates even during high-traffic API rate-limiting periods.

🛠️ Tech Stack
Framework: Next.js 16 (App Router & Turbopack)

Styling: Tailwind CSS v4

Icons: Lucide React

Data Provider: Birdeye API

📊 API Integration
SentinelX leverages three core Birdeye endpoints to build its risk profile:

defi/token_trending: To identify high-velocity assets on the Solana network.

defi/token_security: To audit authority controls and ownership distribution.

defi/v3/token/market-data: To fetch real-time pricing, liquidity, and volume metrics.

Note: This project has successfully logged 250+ API calls during development and stress testing to satisfy hackathon requirements.

💻 Getting Started
Prerequisites
Node.js 18+

A Birdeye API Key (Get one here)

Installation
Clone the repo:

Bash
git clone https://github.com/YOUR_USERNAME/sentinelx.git
cd sentinelx
Install dependencies:

Bash
npm install
Configure Environment:
Create a .env.local file in the root directory:

Code snippet
BIRDEYE_API_KEY=your_api_key_here
Run Development Server:

Bash
npm run dev
Open http://localhost:3000 to view the terminal.

⚖️ Disclaimer
SentinelX is a decision-support tool. While it uses real-time data and heuristic analysis to flag risks, it does not constitute financial advice. Always verify on-chain data independently.
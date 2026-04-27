# SentinelX 🛰️
### **Autonomous Risk Telemetry & Momentum Screener for Solana**

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-cyan.svg)](https://GitHub.com/aakash029-coder/sentinelx/graphs/commit-activity)
[![Solana](https://img.shields.io/badge/Network-Solana-blueviolet.svg)](https://solana.com/)
[![API](https://img.shields.io/badge/Data-Birdeye%20API-yellow.svg)](https://docs.birdeye.so/)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2016-white.svg)](https://nextjs.org/)

**SentinelX** is an institutional-grade security dashboard engineered for the **Birdeye Data Hackathon**. It provides real-time monitoring of the Solana network's high-velocity assets, cross-referencing market momentum with deep on-chain security audits to identify "honeypots" and high-risk tokens before they impact retail liquidity.

---

## 🚀 The Vision

In the hyper-speed Solana ecosystem, **"Trending" ≠ "Safe."** SentinelX bridges this intelligence gap by providing autonomous telemetry on every trending asset, ensuring that alpha doesn't come at the cost of safety.

### 🛡️ Core Capabilities
* **Real-Time Momentum Tracking:** Instant ingestion of top trending tokens directly from Birdeye’s high-fidelity feed.
* **Deep Security Audits:** Automated screening for authority risks, including **Mint Authority**, **Freeze Authority**, and **Transfer Fees**.
* **Holder concentration Analytics:** Real-time monitoring of top-10 holder percentages and creator balances to flag potential rug-pull patterns.
* **Graceful UI Degradation:** Features a custom **Heuristic Analysis** fallback engine to maintain dashboard stability and provide risk estimates even during high-traffic API rate-limiting periods.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router & Turbopack) |
| **Styling** | Tailwind CSS v4 |
| **Icons** | Lucide React |
| **Data Engine** | Birdeye Data APIs |

---

## 📊 Birdeye API Integration

SentinelX is built on the backbone of Birdeye's professional data endpoints:

1.  **`defi/token_trending`**: Aggregating high-velocity assets.
2.  **`defi/token_security`**: Auditing authority controls and ownership distribution.
3.  **`defi/v3/token/market-data`**: Precision pricing, liquidity, and volume metrics.

> [!IMPORTANT]
> **Hackathon Compliance:** This project has successfully logged **250+ API calls** during development and stress testing to satisfy and exceed hackathon requirements.

---

## 💻 Getting Started

### **Prerequisites**
* **Node.js 18+**
* **Birdeye API Key** ([Acquire one at bds.birdeye.so](https://bds.birdeye.so/))

### **Installation**

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/aakash029-coder/sentinelx.git](https://github.com/aakash029-coder/sentinelx.git)
    cd sentinelx
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory:
    ```env
    BIRDEYE_API_KEY=your_real_api_key_here
    ```

4.  **Launch Terminal**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to access the telemetry feed.

---

## ⚖️ Disclaimer
SentinelX is a decision-support tool. While it leverages real-time data and heuristic analysis to flag risks, it does not constitute financial advice. **Always verify on-chain data independently.**

---
<p align="center">
  Built with ⚡ by <b>Aakash Goswami</b> for the <b>Birdeye Data Hackathon</b> · 2026
</p>
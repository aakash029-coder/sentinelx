# SentinelX 🛰️
### **Autonomous Risk Telemetry & Momentum Screener for Solana**

[![BIP Competition](https://img.shields.io/badge/Competition-Birdeye%20BIP-orange.svg)](https://earn.superteam.fun/)
[![Sprint](https://img.shields.io/badge/Sprint-2-cyan.svg)](https://earn.superteam.fun/)
[![Solana](https://img.shields.io/badge/Network-Solana-blueviolet.svg)](https://solana.com/)
[![Data](https://img.shields.io/badge/Powered%20By-Birdeye%20Data-yellow.svg)](https://docs.birdeye.so/)

**SentinelX** is a high-performance risk intelligence terminal engineered for the **Birdeye Data 4-Week BIP Competition (Sprint 2)**. It provides autonomous monitoring of the Solana network's high-velocity assets, auditing real-time market momentum against deep on-chain security constraints.

---

## 🚀 The Vision

In the rapid-fire Solana ecosystem, speed often compromises safety. SentinelX is built to solve this by providing institutional-grade telemetry on trending assets, ensuring that builders and traders can identify "honeypots" and high-risk configurations before they impact liquidity.

### 🛡️ Core Capabilities
* **Dynamic Momentum Tracking:** Instant ingestion of high-velocity tokens directly from Birdeye’s professional-grade data streams.
* **On-Chain Security Scans:** Automated screening for authority risks, including **Mint Authority**, **Freeze Authority**, and **Transfer Fees**.
* **Concentration Analytics:** Real-time monitoring of holder distribution and creator balances to flag potential rug-pull patterns.
* **Heuristic Analysis Fallback:** A custom-built engine designed to maintain dashboard stability and provide risk estimates even during high-traffic API periods.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router & Turbopack) |
| **Styling** | Tailwind CSS v4 |
| **Icons** | Lucide React |
| **Data Engine** | Birdeye Data APIs |

---

## 📊 Birdeye BIP Integration

SentinelX leverages Birdeye’s comprehensive data infrastructure to build its risk profiles:

1.  **`defi/token_trending`**: Monitoring market-wide momentum.
2.  **`defi/token_security`**: Detailed audits of authority and ownership.
3.  **`defi/v3/token/market-data`**: Institutional-grade pricing and liquidity metrics.

> [!TIP]
> **BIP Performance:** This project has successfully logged **250+ API calls** during development to ensure rigorous stress-testing of the data integration.

---

## 💻 Getting Started

### **Prerequisites**
* **Node.js 18+**
* **Birdeye API Key** ([bds.birdeye.so](https://bds.birdeye.so/))

### **Installation**

1.  **Clone & Enter**
    ```bash
    git clone [https://github.com/aakash029-coder/sentinelx.git](https://github.com/aakash029-coder/sentinelx.git)
    cd sentinelx
    ```

2.  **Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory:
    ```env
    BIRDEYE_API_KEY=your_api_key_here
    ```

4.  **Launch Terminal**
    ```bash
    npm run dev
    ```

---

## ⚖️ Disclaimer
SentinelX is a decision-support tool. While it leverages real-time data to flag risks, it does not constitute financial advice. **Always verify on-chain data independently.**

---
<p align="center">
  Built by <b>Aakash Goswami</b> for the <b>Birdeye Data BIP Competition</b> · Sprint 2
</p>
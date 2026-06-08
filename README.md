# SuiSecureDrop 🛡️

[![Sui](https://img.shields.io/badge/Sui-Blockchain-4DA2FF?style=for-the-badge&logo=sui&logoColor=white)](https://sui.io/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Move](https://img.shields.io/badge/Move-Smart_Contract-green?style=for-the-badge)](https://move-language.github.io/move/)

> The first reversible, PIN-protected transfer protocol on Sui — designed for total peace of mind.

---

## 📖 Overview

**SuiSecureDrop** is a non-custodial, decentralized protocol built on the [Sui blockchain](https://sui.io/) that introduces a secure **"Pending State"** for asset transfers. Instead of sending SUI or NFTs directly to a recipient, assets are locked inside a smart-contract-controlled vault object. The recipient must provide a secret PIN to claim them, and the sender retains the power to recall unclaimed assets at any time.

This eliminates the risk of irreversible mistakes — wrong addresses, typos, or simply changing your mind.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🔒 **Vault Encapsulation** | Assets are held in an on-chain `Drop` object — never sent directly to a recipient. |
| 🔑 **PIN Protection** | Claims require a secret PIN, hashed on-chain with **SHA3-256** for cryptographic security. |
| ↩️ **Atomic Recalls** | Senders can instantly recall funds and items as long as the drop remains unclaimed. |
| ⚔️ **NFT Support** | Send up to **2 Sword artifacts** (Move objects) alongside SUI in a single secure drop. |
| 📱 **Responsive UI** | A sleek, modern dashboard optimized for both desktop browsers and mobile wallet apps. |
| ⚡ **Near-Instant Finality** | Leverages Sui's object-centric architecture for sub-second transaction confirmation. |

---

## 🏗️ Architecture

```
SuiSecureDrop/
├── move/                         # Smart contract layer
│   └── secure_drop/
│       ├── Move.toml             # Move package manifest
│       └── sources/
│           └── secure_drop.move  # Core protocol logic
│
├── src/                          # Frontend application
│   ├── main.jsx                  # App entry — providers & wallet setup
│   ├── App.jsx                   # Router configuration
│   ├── constants.js              # Package ID & module name
│   ├── Pages/                    # Route-level page components
│   │   ├── Landing.jsx           # Public landing page
│   │   ├── Dashboard.jsx         # Main app dashboard (send/receive/recall)
│   │   ├── CreateDrop.jsx        # New secure drop creation form
│   │   ├── Receiver.jsx          # Claim incoming drops
│   │   ├── History.jsx           # Transaction history view
│   │   ├── HowItWorks.jsx        # Informational page
│   │   ├── Docs.jsx              # Protocol documentation
│   │   ├── Security.jsx          # Security details page
│   │   ├── Terms.jsx             # Terms of service
│   │   └── Privacy.jsx           # Privacy policy
│   ├── components/
│   │   └── MobileGuide.jsx       # Mobile wallet connection guide
│   └── hooks/                    # Custom React hooks for blockchain ops
│       ├── useCreateDrop.js      # Build & sign create_drop transactions
│       ├── useClaimDrop.js       # Build & sign claim_drop transactions
│       ├── useRecallDrop.js      # Build & sign recall_drop transactions
│       ├── useIncomingDrops.js   # Query drops addressed to the user
│       ├── useOutgoingDrops.js   # Query drops sent by the user
│       └── useMyInventory.js     # Fetch user's Sword NFTs
│
├── index.html                    # HTML entry point
├── vite.config.js                # Vite + Tailwind CSS plugin config
├── vercel.json                   # Vercel deployment (SPA rewrite rules)
└── package.json                  # Dependencies & scripts
```

---

## 📜 Smart Contract

The protocol logic lives in a single **Sui Move** module: [`secure_drop.move`](move/secure_drop/sources/secure_drop.move).

### On-Chain Objects

| Object | Description |
| :--- | :--- |
| `Drop` | Shared object that holds a SUI balance, up to 2 `Sword` items, sender/recipient addresses, and a SHA3-256 PIN hash. |
| `Sword` | A demo NFT artifact with `name` and `description` fields. Has `key` + `store` abilities for transferability. |

### Entry Functions

| Function | Who Calls | What It Does |
| :--- | :--- | :--- |
| `create_drop` | Sender | Splits SUI from the sender's coin, packs items + balance into a shared `Drop` object, and emits a `DropCreated` event. |
| `claim_drop` | Recipient | Verifies the SHA3-256 hash of the provided PIN against the stored hash. On success, transfers the balance and all items to the caller. |
| `recall_drop` | Sender | Asserts that the caller is the original sender, then unpacks the `Drop`, returns all assets, and deletes the object. |
| `mint_sword` | Anyone | Mints a demo `Sword` NFT for testing purposes. |

### Error Codes

| Code | Constant | Meaning |
| :--- | :--- | :--- |
| `0` | `EInvalidPin` | The PIN provided during claim does not match. |
| `1` | `ENotSender` | Only the original sender can recall a drop. |
| `2` | `ETooManyItems` | A drop can contain a maximum of 2 items. |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ and npm (or [pnpm](https://pnpm.io/))
- A Sui-compatible wallet browser extension (e.g., [Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil))
- (Optional) [Sui CLI](https://docs.sui.io/build/install) — only needed if redeploying the Move contract

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Emafido/Suiproject.git
   cd Suiproject
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

### Contract Configuration

The app is pre-configured to interact with the deployed contract on **Sui Devnet**. If you redeploy the Move package, update the constants in [`src/constants.js`](src/constants.js):

```javascript
export const PACKAGE_ID = "0xfd8f81488f21da9346b634f1a0a568ddd291745b9e1bd372c9d9b37d34c703de";
export const MODULE_NAME = "secure_drop";
```

### Deploying the Smart Contract

```bash
cd move/secure_drop
sui client publish --gas-budget 100000000
```

After publishing, copy the new package ID into `src/constants.js`.

---

## 📚 Usage

### 1. Connect Your Wallet
Launch the app and connect your Sui Wallet. On mobile, open the dApp URL inside your wallet's built-in browser.

### 2. Create a Secure Drop
- Navigate to **New Drop** from the dashboard.
- Enter the recipient's Sui address and the SUI amount to lock.
- (Optional) Select up to 2 artifacts from your inventory to include.
- Set a secret **4-digit PIN** and click **Encrypt & Send**.
- The assets are locked on-chain — share the PIN with the recipient privately.

### 3. Claim a Package
As a recipient, visit **Claim** to view incoming drops. Enter the PIN shared by the sender and click **Unlock** to transfer the assets into your wallet.

### 4. Recall Funds
Changed your mind? Go to your **Dashboard**, locate the active drop, and click **Recall Funds**. The transaction is atomic — everything is returned to your wallet instantly.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| [React](https://react.dev/) | 19 | Component-based UI architecture |
| [Vite](https://vitejs.dev/) | 7 | Lightning-fast dev server & build tool |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first responsive styling |
| [Sui Move](https://sui.io/) | Devnet | Smart contract language & runtime |
| [@mysten/dapp-kit](https://sdk.mystenlabs.com/dapp-kit) | 0.19+ | Wallet connection & transaction signing |
| [@mysten/sui](https://www.npmjs.com/package/@mysten/sui) | 1.45+ | Sui TypeScript SDK for building transactions |
| [TanStack Query](https://tanstack.com/query) | 5 | Async state management & data caching |
| [React Router](https://reactrouter.com/) | 7 | Client-side SPA routing |
| [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) | 1.9+ | Celebratory animations on successful actions |

---

## 📂 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## 🌐 Deployment

The project includes a [`vercel.json`](vercel.json) configured for single-page application routing on [Vercel](https://vercel.com/). To deploy:

1. Push your code to GitHub.
2. Import the repository on [Vercel](https://vercel.com/new).
3. Vercel auto-detects Vite — no additional configuration needed.

---

## 🤝 Contributing

Contributions are welcome and appreciated!

- 📥 **Report Bugs** — Open an issue with a detailed description and steps to reproduce.
- 💡 **Request Features** — Suggest improvements or new protocol capabilities.
- 🔧 **Submit PRs** — Fork the repo, create a feature branch, and open a pull request.

---

## 👥 Authors

**Emmanuel Emafido**
- Twitter: [@EmmanuelEmafido](https://x.com/EmmanuelEmafido)
- LinkedIn: [emmanuel-emafido](https://www.linkedin.com/in/emmanuel-emafido/)
- Portfolio: [emafido-emmanuel.vercel.app](https://emafido-emmanuel.vercel.app/)

**Ogunyemi Aliyah**

---

## 📄 License

This project is open source. See the repository for license details.

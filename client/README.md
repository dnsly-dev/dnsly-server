# DNSly Web Showcase & Landing Page 🌐⚡

> **Official showcase web application and landing page for DNSly.**

A high-performance, responsive web application built with **Vue 3**, **TypeScript**, **Vite**, and **TailwindCSS** to showcase DNSly's features, benchmarks, speed tests, and privacy comparisons.

---

## ✨ Features

- **🚀 Hero Section**: Interactive introduction with call-to-action buttons for downloading the Android APK.
- **⚡ Live Speed & Latency Benchmarks**: Interactive charts and comparisons demonstrating DNSly's ultra-low latency against standard ISP resolvers.
- **🛡️ Feature Highlights Grid**: Detailed breakdown of DNS encryption (DoH/DoT), ad/malware blocking, battery optimization, and on-device privacy.
- **⚖️ Side-by-Side Comparison**: Comprehensive feature matrix comparing DNSly against traditional VPNs, browser extensions, and standard DNS.
- **🔐 Dedicated Admin Console (`/admin`)**:
  - **Auth Gate**: JWT Bearer token authentication with configurable target API endpoints.
  - **Ecosystem KPI Analytics**: Real-time overview of active devices (DAU/WAU), total queries, threat block rates, and upstream provider distribution.
  - **Device Fleet Management**: Searchable, paginated inventory of connected mobile clients with hardware, OS, country badges, and raw telemetry inspection.
  - **DNS Upstream Server Configuration**: Remote management of curated DoH/DoT resolvers.
  - **Threat Blocklist Manager**: Remote management of ad, tracking, malware, and content blocklists.
  - **Live Telemetry Stream**: Real-time incoming heartbeat stream with auto-polling and JSON payload inspector.
- **📱 Fully Responsive**: Fluid, mobile-first design with smooth micro-interactions and dark mode aesthetics.
- **✨ Phosphor Icons**: Clean, modern iconography using `@phosphor-icons/vue`.

---

## 🛠️ Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API with `<script setup>`)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
- **Icons**: [@phosphor-icons/vue](https://phosphoricons.com/)

---

## 📂 Project Structure

```
DNSly-frontend/
├── src/
│   ├── assets/              # Static media, SVG icons, and imagery
│   ├── components/          # Modular Vue components
│   │   ├── HeaderNav.vue          # Top navigation bar
│   │   ├── HeroSection.vue        # Primary banner and call-to-actions
│   │   ├── FeaturesGrid.vue       # Interactive feature cards
│   │   ├── SpeedSection.vue       # Latency comparison benchmarks
│   │   ├── HowItWorksSection.vue  # Flow explanation of local DNS VPN
│   │   ├── ComparisonSection.vue  # DNSly vs Traditional tools table
│   │   ├── CtaBottom.vue          # Final conversion section
│   │   └── FooterNav.vue          # Site footer and links
│   ├── styles/              # Global Tailwind and CSS stylesheets
│   ├── App.vue              # Root application component
│   └── main.ts              # Application bootstrap entry point
├── public/                  # Public static assets
├── index.html               # Main HTML entry point
├── vite.config.ts           # Vite bundler configuration
└── tailwind.config.js       # Tailwind theme and custom tokens
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **Package Manager**: `npm`, `yarn`, or `pnpm`

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### 4. Build for Production
```bash
# Type-check and compile optimized bundle
npm run build
```
Production assets are generated in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📄 License

Licensed under the MIT License.

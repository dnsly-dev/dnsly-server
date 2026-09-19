# DNSly Server (NestJS Backend & Telemetry) 🚀🛡️

> **Official backend API, remote configuration service, and telemetry aggregation engine for the DNSly ecosystem.**

Built with **NestJS**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**, this service handles client heartbeat ingestion, dynamic DNS upstream and blocklist feed distribution, and administrative analytics.

---

## ✨ Features

- **📊 Anonymized Telemetry Ingestion**: Ingests periodic client device heartbeats (`totalQueries`, `blockedQueries`, `selectedProvider`, `shieldEnabled`, `appVersion`).
- **⚙️ Dynamic Remote Configuration**: Endpoints serving curated DNS upstream servers and blocklist source URLs directly to connected Android clients.
- **📈 Admin Analytics Dashboard API**: Aggregates Daily Active Users (DAU), Weekly Active Users (WAU), threat block rate, provider market share, and app version distribution.
- **🔒 API Key & JWT Authentication**: Client-side authentication via `x-api-key` header and secure JWT session handling for administrator routes.
- **⚡ Rate Limiting & Throttling**: Built-in protection using NestJS Throttler to safeguard endpoints against spam and abuse (default: 120 req/min).
- **🗄️ Prisma ORM & PostgreSQL**: Type-safe database queries, schema migrations, and automated seeding scripts.
- **📖 Interactive API Documentation**: Integrated [Scalar](https://scalar.com/) API reference available at `/reference` (or `/docs`).

---

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) (Node.js backend framework)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via Docker)
- **Documentation**: [Scalar OpenAPI Reference](https://github.com/scalar/scalar)
- **Containerization**: [Docker Compose](https://docs.docker.com/compose/)

---

## 📂 Project Structure

```
DNSLy-server/
├── prisma/
│   ├── schema.prisma        # Database schema definitions & models
│   └── seed.ts              # Initial database seed script (admin + feeds)
├── src/
│   ├── admin/               # Admin authentication, session management & analytics
│   ├── analytics/           # Device analytics calculation & aggregation services
│   ├── common/              # Guards, decorators, filters, and interceptors
│   ├── config/              # Remote DNS & blocklist config controllers & services
│   ├── database/            # PrismaService database module
│   ├── telemetry/           # Client heartbeat ingestion endpoints
│   ├── app.module.ts        # Root NestJS application module
│   └── main.ts              # Server bootstrap and documentation setup
├── docker-compose.yml       # Local PostgreSQL database container configuration
├── package.json
└── tsconfig.json
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and verify database credentials:
```bash
cp .env.example .env
```

Key environment variables:
```env
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dnsly?schema=public"
JWT_SECRET="your-super-secure-jwt-secret"
CLIENT_API_KEY="cf1a5804f6a44c45da05b04dda52f8bc75242cdf0c827db5fa2aa94dd8bce8a7"
```

### 3. Start PostgreSQL Database
```bash
docker compose up -d
```

### 4. Run Prisma Migrations & Seed Default Data
```bash
# Push schema to PostgreSQL database
npx prisma db push

# Generate Prisma Client types
npx prisma generate

# Seed initial admin account & default DNS/blocklist feeds
npm run prisma:seed
```

### 5. Start the Server
```bash
# Development Mode (auto-reload on file changes)
npm run start:dev

# Production Build & Execution
npm run build
npm run start:prod
```

---

## 📡 API Reference & Endpoints

Interactive documentation is available at: **`http://localhost:3000/reference`**

### 1. Telemetry Ingestion
- **`POST /api/v1/telemetry/heartbeat`**
  - **Headers**: `x-api-key: <CLIENT_API_KEY>`
  - **Payload**:
    ```json
    {
      "deviceId": "anon-device-uuid-1234",
      "appVersion": "1.0.0-beta",
      "selectedProvider": "Cloudflare (Default)",
      "shieldEnabled": true,
      "totalQueries": 1420,
      "blockedQueries": 180
    }
    ```

### 2. Remote Configuration
- **`GET /api/v1/config/dns-servers`** — Returns list of verified DoH/DoT upstream providers.
- **`GET /api/v1/config/blocklists`** — Returns list of active ad/tracker blocklist URLs.
  - **Headers**: `x-api-key: <CLIENT_API_KEY>`

### 3. Administrator Management & Analytics
- **`POST /api/v1/admin/auth/login`** — Authenticate admin credentials and receive JWT.
  - **Default Email**: `admin@dnsly.app`
  - **Default Password**: `Admin@DNSly2026`
- **`GET /api/v1/admin/analytics/overview`** — Aggregate dashboard stats (DAU, queries blocked, total traffic).
- **`GET /api/v1/admin/analytics/devices`** — Device breakdown by app version and DNS provider.

---

## 📄 License

Licensed under the MIT License.

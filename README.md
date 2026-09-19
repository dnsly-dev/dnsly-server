# DNSly Server (NestJS Backend)

The official backend for the DNSly Android app. Handles anonymous telemetry ingestion, device heartbeats, remote configurations (DNS servers and blocklists), and provides an admin analytics dashboard.

---

## Features
- **Telemetry Ingestion**: Ingests anonymous client heartbeats (`totalQueries`, `blockedQueries`, `selectedProvider`, `shieldEnabled`, `appVersion`).
- **Remote Configuration**: Endpoints delivering curated DNS servers and blocklist feeds to the Android client.
- **Admin Analytics API**: Overview metrics, active devices (DAU/WAU), threat block rate, provider distribution, and version breakdown.
- **Client Security & Rate Limiting**: `x-api-key` header verification and NestJS Throttler rate limiting (120 req/min).
- **Prisma & PostgreSQL**: Robust schema with auto-migrations and seeds.
- **Scalar API Reference**: Modern interactive API documentation at `/reference` (or `/docs`).

---

## Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start PostgreSQL Database
```bash
docker compose up -d
```

### 3. Run Prisma Migrations & Seed Default Data
```bash
# Push schema to PostgreSQL
npx prisma db push

# (Optional) Generate Prisma Client
npx prisma generate

# Seed admin account & default DNS/blocklist feeds
npm run prisma:seed
```

### 4. Start the Server
```bash
# Development Mode with auto-reload
npm run start:dev

# Production Build
npm run build
npm run start:prod
```

---

## Default Credentials & Endpoints

- **Scalar API Reference**: `http://localhost:3000/reference`
- **Admin Login Endpoint**: `POST /api/v1/admin/auth/login`
  - **Email**: `admin@dnsly.app`
  - **Password**: `Admin@DNSly2026`
- **Client API Key Header**: `x-api-key: cf1a5804f6a44c45da05b04dda52f8bc75242cdf0c827db5fa2aa94dd8bce8a7`

---

## API Reference

### Telemetry
- `POST /api/v1/telemetry/heartbeat` (Requires `x-api-key`)
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

### Remote Config
- `GET /api/v1/config/dns-servers` (Requires `x-api-key`)
- `GET /api/v1/config/blocklists` (Requires `x-api-key`)

### Admin Management
- `POST /api/v1/admin/auth/login`
- `GET /api/v1/admin/analytics/overview` (Requires JWT Bearer / Cookie)
- `GET /api/v1/admin/analytics/devices` (Requires JWT Bearer / Cookie)

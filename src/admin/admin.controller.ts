import { Controller, Get, Res, Req } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('admin')
export class AdminController {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Get()
  @ApiExcludeEndpoint()
  async getDashboard(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies?.admin_token;
    let isAuthenticated = false;

    if (token) {
      try {
        this.jwtService.verify(token, {
          secret: this.configService.get<string>('JWT_SECRET', 'dnsly-admin-super-secret-jwt-key-2026'),
        });
        isAuthenticated = true;
      } catch (e) {
        isAuthenticated = false;
      }
    }

    // Render clean standalone HTML dashboard
    res.type('html').send(getDashboardHtml(isAuthenticated));
  }
}

function getDashboardHtml(isAuthenticated: boolean): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DNSly Admin Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0c0e12;
      --card-bg: #14171f;
      --card-border: #232734;
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --accent: #10b981;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --danger: #ef4444;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      background: var(--card-bg);
      border-bottom: 1px solid var(--card-border);
      padding: 16px 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.25rem;
      font-weight: 700;
      color: #fff;
    }
    .logo-badge {
      background: rgba(59, 130, 246, 0.2);
      color: var(--primary);
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 0.75rem;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 28px 20px;
      width: 100%;
      flex: 1;
    }
    .grid-kpi {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .kpi-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      padding: 20px;
    }
    .kpi-title {
      font-size: 0.85rem;
      color: var(--text-muted);
      font-weight: 500;
      margin-bottom: 8px;
    }
    .kpi-value {
      font-size: 1.85rem;
      font-weight: 700;
      color: #fff;
    }
    .kpi-sub {
      font-size: 0.75rem;
      color: var(--accent);
      margin-top: 4px;
    }
    .grid-charts {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }
    @media (max-width: 860px) {
      .grid-charts { grid-template-columns: 1fr; }
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      padding: 20px;
    }
    .card-title {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 16px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid var(--card-border);
    }
    th {
      color: var(--text-muted);
      font-weight: 500;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    td code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      background: rgba(255, 255, 255, 0.05);
      padding: 2px 6px;
      border-radius: 4px;
    }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .badge-active { background: rgba(16, 185, 129, 0.2); color: #34d399; }
    .badge-inactive { background: rgba(156, 163, 175, 0.2); color: #9ca3af; }
    
    /* Login Modal Overlay */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 32px;
      width: 100%;
      max-width: 400px;
    }
    .input-field {
      width: 100%;
      padding: 12px 14px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      color: #fff;
      font-size: 0.9rem;
      margin-top: 6px;
      margin-bottom: 16px;
    }
    .input-field:focus {
      outline: none;
      border-color: var(--primary);
    }
    .btn {
      width: 100%;
      padding: 12px;
      background: var(--primary);
      border: none;
      border-radius: 8px;
      color: #fff;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
    }
    .btn:hover { background: var(--primary-hover); }
    .btn-logout {
      background: transparent;
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      padding: 6px 14px;
      border-radius: 6px;
      cursor: pointer;
    }
    .btn-logout:hover { color: #fff; border-color: #fff; }
  </style>
</head>
<body>
  <header>
    <div class="logo">
      <span>🛡️ DNSly Admin</span>
      <span class="logo-badge">NestJS API</span>
    </div>
    <div>
      ${isAuthenticated ? '<button class="btn-logout" onclick="logout()">Logout</button>' : '<a href="/api/docs" style="color:var(--primary); text-decoration:none; font-size:0.9rem;">Swagger Docs →</a>'}
    </div>
  </header>

  <div class="container">
    <div class="grid-kpi">
      <div class="kpi-card">
        <div class="kpi-title">Active Devices (24h)</div>
        <div class="kpi-value" id="kpi-dau">-</div>
        <div class="kpi-sub" id="kpi-total-devices">Total Registered: -</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Total DNS Queries (7d)</div>
        <div class="kpi-value" id="kpi-queries">-</div>
        <div class="kpi-sub">Aggregated telemetries</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Threat Block Rate</div>
        <div class="kpi-value" id="kpi-block-rate">-%</div>
        <div class="kpi-sub" id="kpi-blocked-count">- blocked</div>
      </div>
    </div>

    <div class="grid-charts">
      <div class="card">
        <div class="card-title">DNS Provider Usage Breakdown</div>
        <div style="height: 240px;"><canvas id="providerChart"></canvas></div>
      </div>
      <div class="card">
        <div class="card-title">App Version Distribution</div>
        <div style="height: 240px;"><canvas id="versionChart"></canvas></div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Recent Client Devices</div>
      <table>
        <thead>
          <tr>
            <th>Device UUID</th>
            <th>Model / Hardware</th>
            <th>OS / Country</th>
            <th>App Version</th>
            <th>Active Provider</th>
            <th>Shield</th>
            <th>Last Seen</th>
          </tr>
        </thead>
        <tbody id="devicesTableBody">
          <tr><td colspan="7" style="text-align:center; color:var(--text-muted);">Loading devices...</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  ${
    !isAuthenticated
      ? `
  <div class="modal-overlay" id="loginModal">
    <div class="modal-card">
      <h2 style="font-size: 1.3rem; margin-bottom: 6px;">Admin Authentication</h2>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 18px;">Sign in with your admin credentials to access DNSly metrics.</p>
      
      <form onsubmit="handleLogin(event)">
        <label style="font-size: 0.8rem; color: var(--text-muted);">Email Address</label>
        <input type="email" id="email" class="input-field" value="admin@dnsly.app" required>
        
        <label style="font-size: 0.8rem; color: var(--text-muted);">Password</label>
        <input type="password" id="password" class="input-field" value="Admin@DNSly2026" required>
        
        <div id="loginError" style="color: var(--danger); font-size: 0.8rem; margin-bottom: 12px; display: none;"></div>
        
        <button type="submit" class="btn">Sign In to Dashboard</button>
      </form>
    </div>
  </div>
  `
      : ''
  }

  <script>
    async function loadData() {
      try {
        const [overviewRes, devicesRes] = await Promise.all([
          fetch('/api/v1/admin/analytics/overview'),
          fetch('/api/v1/admin/analytics/devices?limit=10')
        ]);

        if (overviewRes.status === 401) {
          return;
        }

        const overview = await overviewRes.json();
        const devices = await devicesRes.json();

        // Update KPIs
        document.getElementById('kpi-dau').innerText = overview.devices.active24h.toLocaleString();
        document.getElementById('kpi-total-devices').innerText = 'Total Registered: ' + overview.devices.total.toLocaleString();
        document.getElementById('kpi-queries').innerText = overview.queries.total7d.toLocaleString();
        document.getElementById('kpi-block-rate').innerText = overview.queries.blockRatePercent + '%';
        document.getElementById('kpi-blocked-count').innerText = overview.queries.blocked7d.toLocaleString() + ' blocked';

        // Render Providers Chart
        const providerLabels = Object.keys(overview.providerDistribution);
        const providerData = Object.values(overview.providerDistribution);
        new Chart(document.getElementById('providerChart'), {
          type: 'doughnut',
          data: {
            labels: providerLabels.length ? providerLabels : ['No Data'],
            datasets: [{
              data: providerData.length ? providerData : [1],
              backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#64748b']
            }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af' } } } }
        });

        // Render Versions Chart
        const versionLabels = overview.versionDistribution.map(v => v.version);
        const versionData = overview.versionDistribution.map(v => v.count);
        new Chart(document.getElementById('versionChart'), {
          type: 'bar',
          data: {
            labels: versionLabels.length ? versionLabels : ['1.0.0-beta'],
            datasets: [{
              label: 'Devices',
              data: versionData.length ? versionData : [1],
              backgroundColor: '#3b82f6'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: '#9ca3af' }, grid: { display: false } },
              y: { ticks: { color: '#9ca3af' }, grid: { color: '#232734' } }
            }
          }
        });

        // Render Devices Table
        const tbody = document.getElementById('devicesTableBody');
        if (devices.devices.length === 0) {
          tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:var(--text-muted);">No client devices have connected yet.</td></tr>';
        } else {
          tbody.innerHTML = devices.devices.map(d => \`
            <tr>
              <td><code>\${d.id}</code></td>
              <td>\${d.deviceModel}</td>
              <td>\${d.osVersion} \${d.countryCode !== 'N/A' ? '• ' + d.countryCode : ''}</td>
              <td>\${d.appVersion}</td>
              <td>\${d.lastHeartbeat ? d.lastHeartbeat.selectedProvider : 'N/A'}</td>
              <td><span class="badge \${d.lastHeartbeat && d.lastHeartbeat.shieldEnabled ? 'badge-active' : 'badge-inactive'}">\${d.lastHeartbeat && d.lastHeartbeat.shieldEnabled ? 'Active' : 'Inactive'}</span></td>
              <td>\${new Date(d.lastSeenAt).toLocaleString()}</td>
            </tr>
          \`).join('');
        }
      } catch (err) {
        console.error('Failed to load metrics:', err);
      }
    }

    async function handleLogin(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errBox = document.getElementById('loginError');

      try {
        const res = await fetch('/api/v1/admin/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
          window.location.reload();
        } else {
          errBox.innerText = data.message || 'Login failed';
          errBox.style.display = 'block';
        }
      } catch (err) {
        errBox.innerText = 'Network error connecting to server';
        errBox.style.display = 'block';
      }
    }

    async function logout() {
      await fetch('/api/v1/admin/auth/logout', { method: 'POST' });
      window.location.reload();
    }

    window.onload = loadData;
  </script>
</body>
</html>`;
}

<script setup lang="ts">
import { PhShieldCheck, PhLock, PhDatabase, PhDeviceMobile, PhCpu, PhEnvelopeSimple, PhArrowLeft, PhCheckCircle } from '@phosphor-icons/vue'
import FooterNav from '../components/FooterNav.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
    <!-- Top Bar Navigation -->
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="/" class="inline-flex items-center gap-2.5 no-underline group select-none">
          <img
            src="/logo.png"
            alt="DNSly Logo"
            class="w-9 h-9 rounded-xl object-contain shadow-xs group-hover:scale-105 transition-transform"
          />
          <span class="text-xl font-black text-slate-900 tracking-tight">
            DNS<span class="text-blue-600">ly</span>
          </span>
        </a>

        <a
          href="/"
          class="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors py-2 px-3 rounded-lg hover:bg-slate-100"
        >
          <PhArrowLeft class="w-4 h-4" />
          <span>Back to Home</span>
        </a>
      </div>
    </header>

    <!-- Header Banner -->
    <section class="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-16 sm:py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/40 text-blue-100 border border-blue-400/30 text-xs font-semibold mb-6 shadow-xs">
          <PhShieldCheck class="w-4 h-4 text-blue-200" />
          <span>Google Play Compliant & Zero-Logging</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
          Privacy Policy
        </h1>
        <p class="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto font-normal leading-relaxed">
          At DNSly, your privacy is our core architecture. We do not track, log, sell, or inspect your browsing history. Period.
        </p>
        <div class="mt-6 text-xs text-blue-200/80 font-medium">
          Effective Date: September 21, 2026 • Version 1.0.1
        </div>
      </div>
    </section>

    <!-- Main Content Container -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <!-- Quick Highlights Card -->
      <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs mb-12">
        <h2 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <PhLock class="w-5 h-5 text-blue-600" />
          Privacy at a Glance
        </h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <PhCheckCircle class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 class="text-sm font-bold text-slate-900">100% On-Device Processing</h3>
              <p class="text-xs text-slate-600 mt-0.5">DNS filtering and ad-blocking rules run locally on your phone without cloud interception.</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <PhCheckCircle class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 class="text-sm font-bold text-slate-900">Zero Browsing Logs</h3>
              <p class="text-xs text-slate-600 mt-0.5">We do not operate proxy servers that inspect your web traffic or build advertising profiles.</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <PhCheckCircle class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 class="text-sm font-bold text-slate-900">Encrypted DNS Protocols</h3>
              <p class="text-xs text-slate-600 mt-0.5">Native support for modern DNS-over-HTTPS (DoH) and DNS-over-TLS (DoT) to safeguard against ISP snooping.</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <PhCheckCircle class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 class="text-sm font-bold text-slate-900">Full Data Sovereignty</h3>
              <p class="text-xs text-slate-600 mt-0.5">All activity logs remain inside your device's local database and can be cleared with one tap.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Legal Content Sections -->
      <article class="prose prose-slate max-w-none space-y-10">
        <!-- 1. Introduction -->
        <section class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <h2 class="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            1. Introduction & Overview
          </h2>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            This Privacy Policy describes how <strong>DNSly</strong> ("the Application", "we", "us", or "our"), developed by <strong>Md. Minaruzzaman Shovon</strong>, handles user data. DNSly is designed as a standalone, privacy-first local DNS firewall and threat prevention utility for Android. We believe privacy is an essential human right, which is why our architecture ensures your personal browsing queries never pass through proprietary servers for commercial monetization or surveillance.
          </p>
        </section>

        <!-- 2. Android VpnService Disclosure (Crucial for Google Play) -->
        <section class="bg-white rounded-2xl p-6 sm:p-8 border-2 border-blue-100 shadow-xs">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold mb-3">
            <PhDeviceMobile class="w-4 h-4" />
            <span>Google Play Policy Disclosure</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900 mb-3">
            2. Android VpnService Usage & Local Loopback Tunnel
          </h2>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
            DNSly utilizes the Android <code>VpnService</code> API (<a href="https://developer.android.com/reference/android/net/VpnService" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">android.net.VpnService</a>) to establish a <strong>local on-device loopback interface</strong>.
          </p>
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 space-y-2 mb-4">
            <p><strong>How DNSly uses VpnService:</strong></p>
            <ul class="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li>It captures outbound DNS requests (UDP port 53) generated by apps on your device.</li>
              <li>It matches queried domain names against your local offline blocklists in real time.</li>
              <li>Blocked tracking/ad domains are rejected instantly on-device with zero network latency.</li>
              <li>Legitimate domains are forwarded directly to your chosen encrypted upstream resolver (e.g. Cloudflare, Quad9, Google, or your custom DoH/DoT server).</li>
            </ul>
          </div>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold text-slate-900">
            What DNSly does NOT do:
          </p>
          <p class="text-sm text-slate-600 leading-relaxed mt-1">
            DNSly is <strong>not a remote VPN server</strong>. Your device's web traffic, HTTPS payloads, credentials, file downloads, or personal messages are <strong>never redirected</strong> to external VPN nodes or proxies. Only DNS resolution traffic is processed locally.
          </p>
        </section>

        <!-- 3. Information Collection & Usage -->
        <section class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <h2 class="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <PhDatabase class="w-5 h-5 text-blue-600" />
            3. Information We Collect (Or Do Not Collect)
          </h2>
          <div class="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            <p>
              <strong>Personal Information:</strong> We do not ask for, collect, or store your name, email, phone number, contacts, location, or accounts within the Android application.
            </p>
            <p>
              <strong>Browsing History & Query Logs:</strong> When you enable the DNS filter, query logs (domain name, timestamp, response time, block status) are persisted strictly in your device's private SQLite database storage. These logs never leave your phone. You can wipe this data at any time via the in-app settings or the Android "Clear Data" option.
            </p>
            <p>
              <strong>Optional Heartbeat / Telemetry:</strong> If you intentionally configure your client to connect to an enterprise or personal DNSly server instance, the client may send periodic health heartbeats (e.g., active status, device OS version, query count). No personal identifiers or individual visited website URLs are ever included.
            </p>
          </div>
        </section>

        <!-- 4. Third-Party Services & Upstream DNS -->
        <section class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <h2 class="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <PhCpu class="w-5 h-5 text-blue-600" />
            4. Third-Party Upstream DNS Resolvers
          </h2>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
            When allowed domains require resolution, DNSly communicates directly with the upstream DNS provider selected by the user. DNSly provides default configurations for reputable privacy-respecting resolvers:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-sm text-slate-600">
            <li><strong>Cloudflare DNS (1.1.1.1)</strong> — Subject to <a href="https://developers.cloudflare.com/1.1.1.1/privacy/public-dns-resolver-privacy-policy/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">Cloudflare Public DNS Privacy Policy</a>.</li>
            <li><strong>Quad9 (9.9.9.9)</strong> — Non-profit Swiss foundation; subject to <a href="https://www.quad9.net/privacy/policy/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">Quad9 Privacy Policy</a>.</li>
            <li><strong>Google Public DNS (8.8.8.8)</strong> — Subject to <a href="https://developers.google.com/speed/public-dns/privacy" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">Google Public DNS Privacy Policy</a>.</li>
            <li><strong>Custom Upstream:</strong> Users may supply any private DNS-over-HTTPS (DoH) or DNS-over-TLS (DoT) server URL of their choice.</li>
          </ul>
        </section>

        <!-- 5. Android Permissions -->
        <section class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <h2 class="text-xl font-bold text-slate-900 mb-3">
            5. Device Permissions & System Rights
          </h2>
          <div class="overflow-x-auto">
            <table class="min-w-full text-left text-sm text-slate-600">
              <thead class="border-b border-slate-200 text-xs font-bold text-slate-900 uppercase">
                <tr>
                  <th class="py-3 px-4">Permission</th>
                  <th class="py-3 px-4">Technical Name</th>
                  <th class="py-3 px-4">Purpose</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-xs sm:text-sm">
                <tr>
                  <td class="py-3 px-4 font-semibold text-slate-900">VPN Service</td>
                  <td class="py-3 px-4 font-mono text-xs">android.permission.BIND_VPN_SERVICE</td>
                  <td class="py-3 px-4">Creates local loopback tunnel to inspect port 53 DNS requests.</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-semibold text-slate-900">Internet Access</td>
                  <td class="py-3 px-4 font-mono text-xs">android.permission.INTERNET</td>
                  <td class="py-3 px-4">Forwards permitted DNS queries to the chosen encrypted upstream resolver.</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-semibold text-slate-900">Notifications</td>
                  <td class="py-3 px-4 font-mono text-xs">android.permission.POST_NOTIFICATIONS</td>
                  <td class="py-3 px-4">Displays persistent foreground service notification indicating active DNS protection.</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-semibold text-slate-900">Boot Completed</td>
                  <td class="py-3 px-4 font-mono text-xs">android.permission.RECEIVE_BOOT_COMPLETED</td>
                  <td class="py-3 px-4">Optionally restores DNS protection automatically after device reboot if enabled.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 6. Children's Privacy -->
        <section class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <h2 class="text-xl font-bold text-slate-900 mb-3">
            6. Children's Privacy & COPPA Compliance
          </h2>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            DNSly does not knowingly collect or solicit any personal information from children under the age of 13 (or 16 in the European Union). The app does not require account registration or social media logins. If you believe any personal data has inadvertently been provided, please contact us and we will promptly ensure it is erased.
          </p>
        </section>

        <!-- 7. Security & Retention -->
        <section class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <h2 class="text-xl font-bold text-slate-900 mb-3">
            7. Data Security & Retention
          </h2>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            Because DNSly operates locally on your device, your data is shielded by Android's sandbox security model. All local logs are capped in size and automatically rotate. You can permanently delete all local cache and database records at any time by opening <strong>Android Settings > Apps > DNSly > Storage > Clear Data</strong>.
          </p>
        </section>

        <!-- 8. Updates to Policy -->
        <section class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <h2 class="text-xl font-bold text-slate-900 mb-3">
            8. Changes to This Privacy Policy
          </h2>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            We may update our Privacy Policy periodically to reflect new software capabilities or regulatory updates. Any changes will be published directly on this page with an updated revision date.
          </p>
        </section>

        <!-- 9. Contact Us -->
        <section class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <h2 class="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <PhEnvelopeSimple class="w-5 h-5 text-blue-600" />
            9. Contact Us
          </h2>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
            If you have questions, feedback, or concerns regarding this Privacy Policy or your data, please contact the developer directly:
          </p>
          <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-sm text-slate-700 space-y-1.5">
            <p><strong>Developer:</strong> Md. Minaruzzaman Shovon</p>
            <p><strong>Email:</strong> <a href="mailto:hello@shovon.bd" class="text-blue-600 hover:underline">hello@shovon.bd</a> / <a href="mailto:minar.svn@gmail.com" class="text-blue-600 hover:underline">minar.svn@gmail.com</a></p>
            <p><strong>Website:</strong> <a href="https://dnsly.shovon.bd" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://dnsly.shovon.bd</a></p>
            <p><strong>GitHub Organization:</strong> <a href="https://github.com/dnsly-dev" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">dnsly-dev</a></p>
          </div>
        </section>
      </article>
    </main>

    <FooterNav />
  </div>
</template>

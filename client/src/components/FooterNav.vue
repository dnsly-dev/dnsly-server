<script setup lang="ts">
import { PhShieldCheck, PhGithubLogo, PhEnvelope } from '@phosphor-icons/vue'

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

const productLinks: FooterLink[] = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Performance', href: '#speed' },
  { label: 'Comparison', href: '#comparison' },
  { label: 'Download APK', href: '#download' },
]

const openSourceLinks: FooterLink[] = [
  { label: 'GitHub Repository', href: 'https://github.com/dnsly-dev/dnsly-app', external: true },
  { label: 'Releases & Changelog', href: 'https://github.com/dnsly-dev/dnsly-app/releases', external: true },
  { label: 'Issue Tracker', href: 'https://github.com/dnsly-dev/dnsly-app/issues', external: true },
  { label: 'Security Advisories', href: 'https://github.com/dnsly-dev/dnsly-app/security', external: true },
]

const legalLinks: FooterLink[] = [
  { label: 'Admin Management Portal', href: '/admin' },
  { label: 'MIT Open-Source License', href: 'https://github.com/dnsly-dev/dnsly-app/blob/main/LICENSE', external: true },
  { label: 'Privacy Policy', href: '#about' },
  { label: 'Zero-Telemetry Promise', href: '#how-it-works' },
  { label: 'Responsible Disclosure', href: 'mailto:security@dnsly.app' },
]
</script>

<template>
  <footer class="w-full bg-white border-t border-slate-100/90 pt-20 pb-12">
    <div class="section-container">
      <!-- Footer Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
        <!-- Brand Column -->
        <div class="sm:col-span-2 lg:col-span-4">
          <a href="/" class="flex items-center gap-2.5 mb-4 no-underline select-none">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-xs">
              <PhShieldCheck :size="20" class="text-white" weight="fill" />
            </div>
            <span class="text-xl font-extrabold text-slate-900 tracking-tight">
              DNS<span class="text-primary-600">ly</span>
            </span>
          </a>
          <p class="text-sm text-slate-500 leading-relaxed max-w-sm mb-6">
            The next-generation on-device DNS firewall and adblock engine. Sinkholes threats, malware, and surveillance trackers with zero latency overhead.
          </p>

          <!-- System Status Badge -->
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>All Threat Feeds Synchronized</span>
          </div>
        </div>

        <!-- Product Links -->
        <div class="lg:col-span-2 lg:col-start-6">
          <h3 class="text-xs font-extrabold uppercase tracking-widest text-slate-900 mb-4">Product</h3>
          <ul class="space-y-3">
            <li v-for="link in productLinks" :key="link.label">
              <a
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                class="text-sm text-slate-500 hover:text-primary-600 transition-colors font-medium"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Open Source -->
        <div class="lg:col-span-3">
          <h3 class="text-xs font-extrabold uppercase tracking-widest text-slate-900 mb-4">Open Source</h3>
          <ul class="space-y-3">
            <li v-for="link in openSourceLinks" :key="link.label">
              <a
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                class="text-sm text-slate-500 hover:text-primary-600 transition-colors font-medium"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal & Trust -->
        <div class="lg:col-span-2">
          <h3 class="text-xs font-extrabold uppercase tracking-widest text-slate-900 mb-4">Trust & Legal</h3>
          <ul class="space-y-3">
            <li v-for="link in legalLinks" :key="link.label">
              <a
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                class="text-sm text-slate-500 hover:text-primary-600 transition-colors font-medium"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-xs text-slate-400 font-medium">
          © {{ new Date().getFullYear() }} DNSly Project. Free & Open-Source under the MIT License.
        </div>
        <div class="flex items-center gap-3">
          <a
            href="https://github.com/dnsly-dev/dnsly-app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="DNSly GitHub"
            class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-primary-50 text-slate-400 hover:text-primary-600 flex items-center justify-center transition-all border border-slate-100"
          >
            <PhGithubLogo :size="18" weight="bold" />
          </a>
          <a
            href="mailto:hello@dnsly.app"
            aria-label="Contact DNSly Team"
            class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-primary-50 text-slate-400 hover:text-primary-600 flex items-center justify-center transition-all border border-slate-100"
          >
            <PhEnvelope :size="18" weight="bold" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

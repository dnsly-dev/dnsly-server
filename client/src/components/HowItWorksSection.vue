<script setup lang="ts">
import {
  PhSparkle,
  PhDownloadSimple,
  PhToggleRight,
  PhShieldCheck,
  PhArrowRight,
  PhCheckCircle,
  PhCpu,
  PhLockKey,
  PhLightning
} from '@phosphor-icons/vue'

const steps = [
  {
    step: '01',
    title: 'Download Free APK',
    description: 'Grab the lightweight open-source APK directly from GitHub Releases. No account, no credit card, and zero telemetry required.',
    tag: 'No Account Needed',
    tagClass: 'bg-primary-50 text-primary-700 border-primary-100',
    icon: PhDownloadSimple,
    iconBg: 'bg-primary-600 text-white shadow-brand',
  },
  {
    step: '02',
    title: 'One-Tap Local Shield',
    description: 'Turn on protection with a single tap. DNSly establishes an on-device local firewall to filter DNS traffic before packets leave your hardware.',
    tag: 'Zero Cloud Overhead',
    tagClass: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    icon: PhToggleRight,
    iconBg: 'bg-emerald-600 text-white shadow-md',
  },
  {
    step: '03',
    title: 'Browse Free of Ads & Threats',
    description: 'Intrusive ads, tracking cookies, phishing links, and malware are sinkholed silently across browsers and all native Android apps.',
    tag: '22+ Threat Feeds',
    tagClass: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    icon: PhShieldCheck,
    iconBg: 'bg-indigo-600 text-white shadow-md',
  },
]

const trustBadges = [
  { text: 'No Root Required', icon: PhCheckCircle },
  { text: '100% On-Device (0 Cloud Logs)', icon: PhLockKey },
  { text: 'Sub-Millisecond Query Cache', icon: PhLightning },
  { text: '100% Open Source (MIT)', icon: PhCpu },
]
</script>

<template>
  <section class="section-wrapper bg-surface-100 overflow-hidden" id="how-it-works">
    <div class="section-container">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <div class="section-label justify-center">
          <PhSparkle :size="14" weight="fill" />
          <span>Simple 3-Step Setup</span>
        </div>
        <h2 class="section-title">
          How DNSly protects you<br />
          <span class="text-primary-600">in less than 60 seconds</span>
        </h2>
        <p class="section-subtitle">
          No complex VPN server configurations, no subscriptions, and zero cloud dependencies.
          Instant system-wide defense right out of the box.
        </p>
      </div>

      <!-- 3 Steps Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14 relative">
        <div
          v-for="(item, idx) in steps"
          :key="item.step"
          class="relative card-base flex flex-col justify-between group"
        >
          <!-- Top step badge and number -->
          <div>
            <div class="flex items-center justify-between mb-6">
              <div
                class="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                :class="item.iconBg"
              >
                <component :is="item.icon" :size="24" weight="bold" />
              </div>
              <span class="text-3xl font-black tracking-tighter text-slate-200 group-hover:text-primary-300 transition-colors">
                {{ item.step }}
              </span>
            </div>

            <div class="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full border mb-3.5" :class="item.tagClass">
              {{ item.tag }}
            </div>

            <h3 class="text-xl font-bold text-slate-900 mb-3 tracking-tight">
              {{ item.title }}
            </h3>

            <p class="text-sm text-slate-500 leading-relaxed">
              {{ item.description }}
            </p>
          </div>

          <!-- Bottom step indicator line -->
          <div class="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Step {{ idx + 1 }} of 3</span>
            <span class="text-primary-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Ready <PhArrowRight :size="12" weight="bold" />
            </span>
          </div>
        </div>
      </div>

      <!-- Trust Badges Bar -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle flex flex-wrap items-center justify-around gap-6 text-center">
        <div
          v-for="badge in trustBadges"
          :key="badge.text"
          class="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700"
        >
          <component :is="badge.icon" :size="18" weight="fill" class="text-primary-600 flex-shrink-0" />
          <span>{{ badge.text }}</span>
        </div>
      </div>

      <!-- Action CTA -->
      <div class="mt-12 text-center">
        <a
          href="https://github.com/dnsly-dev/dnsly-app/releases"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary"
        >
          Download DNSly APK
          <PhArrowRight :size="16" weight="bold" />
        </a>
      </div>
    </div>
  </section>
</template>

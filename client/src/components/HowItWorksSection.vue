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
    description: 'Grab the lightweight open-source APK directly from GitHub Releases. No account, no credit card, and zero tracking telemetry required.',
    tag: 'No Account Needed',
    tagClass: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: PhDownloadSimple,
    iconBg: 'bg-blue-600 text-white shadow-md',
  },
  {
    step: '02',
    title: 'One-Tap Local Shield',
    description: 'Turn on protection with a single tap. DNSly establishes an on-device local loopback firewall to filter DNS traffic before packets ever leave your hardware.',
    tag: 'Zero Cloud Overhead',
    tagClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: PhToggleRight,
    iconBg: 'bg-emerald-600 text-white shadow-md',
  },
  {
    step: '03',
    title: 'Browse Free of Ads & Threats',
    description: 'Intrusive ads, tracking cookies, phishing links, and malware are sinkholed silently across all mobile browsers and installed apps.',
    tag: '22+ Threat Feeds',
    tagClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
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
  <section class="py-20 sm:py-24 bg-slate-50 overflow-hidden" id="how-it-works" aria-labelledby="how-it-works-heading">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
          <PhSparkle :size="15" weight="fill" />
          <span>Simple 3-Step Setup</span>
        </div>
        <h2 id="how-it-works-heading" class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          How DNSly Protects You in Seconds
        </h2>
        <p class="text-sm sm:text-base text-slate-500 leading-relaxed">
          No complex VPN server configurations, no paid subscriptions, and zero cloud dependencies.
          Instant system-wide defense right out of the box.
        </p>
      </div>

      <!-- 3 Steps Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 relative">
        <div
          v-for="(item, idx) in steps"
          :key="item.step"
          class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <!-- Top step badge and number -->
          <div>
            <div class="flex items-center justify-between mb-5">
              <div
                class="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105"
                :class="item.iconBg"
              >
                <component :is="item.icon" :size="22" weight="bold" />
              </div>
              <span class="text-3xl font-black tracking-tighter text-slate-200 group-hover:text-blue-300 transition-colors font-mono">
                {{ item.step }}
              </span>
            </div>

            <div class="inline-block text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border mb-3" :class="item.tagClass">
              {{ item.tag }}
            </div>

            <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 tracking-tight">
              {{ item.title }}
            </h3>

            <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {{ item.description }}
            </p>
          </div>

          <!-- Bottom step indicator line -->
          <div class="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Step {{ idx + 1 }} of 3</span>
            <span class="text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
              Ready <PhArrowRight :size="12" weight="bold" />
            </span>
          </div>
        </div>
      </div>

      <!-- Trust Badges Bar -->
      <div class="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-around gap-4 text-center">
        <div
          v-for="badge in trustBadges"
          :key="badge.text"
          class="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700"
        >
          <component :is="badge.icon" :size="18" weight="fill" class="text-blue-600 shrink-0" />
          <span>{{ badge.text }}</span>
        </div>
      </div>

      <!-- Action CTA -->
      <div class="mt-10 text-center">
        <a
          href="https://github.com/dnsly-dev/dnsly-app/releases"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5"
        >
          <span>Download Free DNSly APK</span>
          <PhArrowRight :size="15" weight="bold" />
        </a>
      </div>
    </div>
  </section>
</template>

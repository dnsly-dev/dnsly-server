<script setup lang="ts">
import { PhShieldCheck, PhCheck, PhX, PhBrowser, PhCloud, PhShieldWarning, PhSparkle } from '@phosphor-icons/vue'

const features = [
  { name: 'Ad & Tracker blocking', dnsly: true, extension: true, cloud: true, vpn: true },
  { name: 'Malware & Phishing protection', dnsly: true, extension: false, cloud: true, vpn: true },
  { name: 'System-wide protection (all apps & browsers)', dnsly: true, extension: false, cloud: true, vpn: true },
  { name: 'On-device sinkhole (Zero latency 0 ms)', dnsly: true, extension: true, cloud: false, vpn: false },
  { name: 'Zero cloud telemetry & zero data logging', dnsly: true, extension: true, cloud: false, vpn: false },
  { name: 'Zero battery drain & no VPN battery tax', dnsly: true, extension: true, cloud: true, vpn: false },
  { name: 'Custom DNS-over-HTTPS (DoH) switching', dnsly: true, extension: false, cloud: false, vpn: false },
  { name: 'Parental controls & adult NSFW filter', dnsly: true, extension: false, cloud: true, vpn: false },
  { name: 'Save mobile data by blocking payloads', dnsly: true, extension: false, cloud: true, vpn: false },
  { name: 'Custom Denylist & Allowlist with wildcards', dnsly: true, extension: true, cloud: false, vpn: false },
  { name: '100% Free & Open-Source (MIT)', dnsly: true, extension: false, cloud: false, vpn: false },
]
</script>

<template>
  <section class="section-wrapper bg-white" id="comparison">
    <div class="max-w-5xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-14">
        <div class="section-label justify-center">
          <PhShieldCheck :size="14" weight="fill" />
          <span>Feature Comparison</span>
        </div>
        <h2 class="section-title">
          Why Choose DNSly?
        </h2>
        <p class="section-subtitle max-w-2xl">
          See how DNSly’s on-device zero-latency architecture compares to browser extensions, cloud resolvers, and battery-draining VPNs.
        </p>
      </div>

      <!-- Comparison Table Container (Flat, No outer card box) -->
      <div class="overflow-x-auto">
        <div class="min-w-[680px]">
          <!-- Table Header -->
          <div class="grid grid-cols-[1.8fr_1.15fr_1fr_1fr_1fr] items-end">
            <!-- Col 1: Features label -->
            <div class="px-5 py-3 border-b-2 border-slate-100">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Features & Capabilities</span>
            </div>

            <!-- Col 2: DNSly Highlighted Header (FIRST) -->
            <div class="px-4 pt-3.5 pb-3 text-center bg-primary-50/70 rounded-t-2xl border-t-2 border-x-2 border-primary-200/80 flex flex-col items-center justify-end">
              <div class="inline-flex items-center gap-1 bg-primary-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs mb-2">
                <PhSparkle :size="10" weight="fill" />
                <span>Best Choice</span>
              </div>
              <div class="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center shadow-sm mb-1.5">
                <PhShieldCheck :size="18" class="text-white" weight="fill" />
              </div>
              <span class="text-sm font-extrabold text-primary-700">DNSly</span>
            </div>
            
            <!-- Col 3: Browser Extensions -->
            <div class="px-3 py-3 text-center border-b-2 border-slate-100">
              <div class="flex flex-col items-center gap-1.5">
                <div class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
                  <PhBrowser :size="16" class="text-slate-600" weight="duotone" />
                </div>
                <span class="text-xs font-bold text-slate-600 leading-tight">Browser<br/>Extensions</span>
              </div>
            </div>

            <!-- Col 4: Cloud DNS -->
            <div class="px-3 py-3 text-center border-b-2 border-slate-100">
              <div class="flex flex-col items-center gap-1.5">
                <div class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
                  <PhCloud :size="16" class="text-slate-600" weight="duotone" />
                </div>
                <span class="text-xs font-bold text-slate-600 leading-tight">Cloud<br/>DNS</span>
              </div>
            </div>

            <!-- Col 5: VPN Adblockers -->
            <div class="px-3 py-3 text-center border-b-2 border-slate-100">
              <div class="flex flex-col items-center gap-1.5">
                <div class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
                  <PhShieldWarning :size="16" class="text-slate-600" weight="duotone" />
                </div>
                <span class="text-xs font-bold text-slate-600 leading-tight">VPN<br/>Adblockers</span>
              </div>
            </div>
          </div>

          <!-- Table Body Rows -->
          <div
            v-for="(feat, index) in features"
            :key="feat.name"
            class="grid grid-cols-[1.8fr_1.15fr_1fr_1fr_1fr] transition-colors"
          >
            <!-- Feature Name -->
            <div
              class="px-5 py-3.5 text-sm font-medium text-slate-700 flex items-center border-b border-slate-100/80"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'"
            >
              {{ feat.name }}
            </div>

            <!-- DNSly Column (FIRST, Highlighted) -->
            <div
              class="px-4 py-3.5 flex items-center justify-center bg-primary-50/70 border-x-2 border-primary-200/80"
              :class="index === features.length - 1 ? 'rounded-b-2xl border-b-2' : ''"
            >
              <div class="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center shadow-xs">
                <PhCheck :size="13" weight="bold" class="text-white" />
              </div>
            </div>
            
            <!-- Browser Extensions -->
            <div
              class="px-3 py-3.5 flex items-center justify-center border-b border-slate-100/80"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'"
            >
              <div v-if="feat.extension" class="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                <PhCheck :size="13" weight="bold" class="text-emerald-600" />
              </div>
              <div v-else class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                <PhX :size="12" weight="bold" class="text-slate-400" />
              </div>
            </div>

            <!-- Cloud DNS -->
            <div
              class="px-3 py-3.5 flex items-center justify-center border-b border-slate-100/80"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'"
            >
              <div v-if="feat.cloud" class="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                <PhCheck :size="13" weight="bold" class="text-emerald-600" />
              </div>
              <div v-else class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                <PhX :size="12" weight="bold" class="text-slate-400" />
              </div>
            </div>

            <!-- VPN Adblockers -->
            <div
              class="px-3 py-3.5 flex items-center justify-center border-b border-slate-100/80"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'"
            >
              <div v-if="feat.vpn" class="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                <PhCheck :size="13" weight="bold" class="text-emerald-600" />
              </div>
              <div v-else class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                <PhX :size="12" weight="bold" class="text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

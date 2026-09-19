<script setup lang="ts">
import { PhShieldCheck, PhCheck, PhX, PhBrowser, PhCloud, PhShieldWarning } from '@phosphor-icons/vue'

const features = [
  { name: 'Ad & Tracker Blocking', dnsly: true, extension: true, cloud: true, vpn: true },
  { name: 'Malware & Phishing Protection', dnsly: true, extension: false, cloud: true, vpn: true },
  { name: 'System-Wide Coverage (All Apps)', dnsly: true, extension: false, cloud: true, vpn: true },
  { name: 'On-Device Sinkhole (0 ms Latency)', dnsly: true, extension: true, cloud: false, vpn: false },
  { name: 'Zero Cloud Logging & Privacy', dnsly: true, extension: true, cloud: false, vpn: false },
  { name: 'No Battery Drain (No VPN Tunnel)', dnsly: true, extension: true, cloud: true, vpn: false },
  { name: 'Custom DNS-over-HTTPS (DoH)', dnsly: true, extension: false, cloud: false, vpn: false },
  { name: 'Parental Controls & SafeSearch', dnsly: true, extension: false, cloud: true, vpn: false },
  { name: 'Mobile Data Savings', dnsly: true, extension: false, cloud: true, vpn: false },
  { name: 'Custom Allowlist & Denylist', dnsly: true, extension: true, cloud: false, vpn: false },
  { name: 'Zero Subscriptions or Accounts', dnsly: true, extension: false, cloud: false, vpn: false },
]
</script>

<template>
  <section class="py-20 sm:py-24 bg-white" id="comparison" aria-labelledby="comparison-heading">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
          <PhShieldCheck :size="15" weight="fill" />
          <span>Feature Comparison</span>
        </div>
        <h2 id="comparison-heading" class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          How DNSly Compares
        </h2>
        <p class="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          See how DNSly’s on-device architecture compares against browser extensions, cloud resolvers, and battery-heavy VPN apps.
        </p>
      </div>

      <!-- Comparison Table Container -->
      <div class="border border-slate-200/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
            <caption class="sr-only">Detailed feature comparison between DNSly, Browser Extensions, Cloud DNS, and VPN Adblockers</caption>
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/80">
                <th scope="col" class="py-4 px-5 text-xs font-bold uppercase tracking-wider text-slate-500 w-2/5">
                  Capability
                </th>
                <!-- DNSly Highlighted Col -->
                <th scope="col" class="py-4 px-4 text-center bg-blue-50/80 border-x border-blue-200/80 w-1/5">
                  <div class="font-extrabold text-blue-700 text-sm">DNSly</div>
                </th>
                <th scope="col" class="py-4 px-3 text-center w-1/5 text-slate-600 font-bold text-xs">
                  <div class="flex flex-col items-center gap-1">
                    <PhBrowser :size="16" class="text-slate-500" />
                    <span>Extensions</span>
                  </div>
                </th>
                <th scope="col" class="py-4 px-3 text-center w-1/5 text-slate-600 font-bold text-xs">
                  <div class="flex flex-col items-center gap-1">
                    <PhCloud :size="16" class="text-slate-500" />
                    <span>Cloud DNS</span>
                  </div>
                </th>
                <th scope="col" class="py-4 px-3 text-center w-1/5 text-slate-600 font-bold text-xs">
                  <div class="flex flex-col items-center gap-1">
                    <PhShieldWarning :size="16" class="text-slate-500" />
                    <span>VPN Apps</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="(feat, index) in features"
                :key="feat.name"
                class="hover:bg-slate-50/60 transition-colors"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'"
              >
                <!-- Feature Name -->
                <th scope="row" class="py-3.5 px-5 font-semibold text-slate-700 text-xs sm:text-sm">
                  {{ feat.name }}
                </th>

                <!-- DNSly Column (Highlighted) -->
                <td class="py-3.5 px-4 text-center bg-blue-50/80 border-x border-blue-200/80">
                  <div class="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mx-auto text-white shadow-2xs">
                    <PhCheck :size="13" weight="bold" aria-label="Yes, supported" />
                  </div>
                </td>

                <!-- Browser Extensions -->
                <td class="py-3.5 px-3 text-center">
                  <div v-if="feat.extension" class="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <PhCheck :size="13" weight="bold" aria-label="Yes, supported" />
                  </div>
                  <div v-else class="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <PhX :size="12" weight="bold" aria-label="No, not supported" />
                  </div>
                </td>

                <!-- Cloud DNS -->
                <td class="py-3.5 px-3 text-center">
                  <div v-if="feat.cloud" class="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <PhCheck :size="13" weight="bold" aria-label="Yes, supported" />
                  </div>
                  <div v-else class="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <PhX :size="12" weight="bold" aria-label="No, not supported" />
                  </div>
                </td>

                <!-- VPN Apps -->
                <td class="py-3.5 px-3 text-center">
                  <div v-if="feat.vpn" class="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <PhCheck :size="13" weight="bold" aria-label="Yes, supported" />
                  </div>
                  <div v-else class="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <PhX :size="12" weight="bold" aria-label="No, not supported" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  PhShieldCheck, PhEyeSlash, PhBaby, PhLightning,
  PhGlobeHemisphereWest, PhListBullets, PhArrowRight, PhSparkle
} from '@phosphor-icons/vue'
</script>

<template>
  <section class="section-wrapper bg-white" id="features">
    <div class="section-container">
      <div class="text-center mb-14">
        <div class="section-label justify-center">
          <PhSparkle :size="14" weight="fill" />
          <span>Core Capabilities</span>
        </div>
        <h2 class="section-title">
          Everything you need for<br />complete protection
        </h2>
        <p class="section-subtitle">
          22+ curated threat feeds, encrypted DNS, and on-device filtering — all packaged in one lightweight, battery-friendly engine.
        </p>
      </div>

      <!-- Bento Box Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Large Card 1: Threat Protection (2 cols) -->
        <div class="md:col-span-2 bg-slate-950 rounded-3xl p-8 sm:p-9 relative overflow-hidden group shadow-card hover:shadow-2xl transition-all duration-300 border border-slate-800/80 flex flex-col justify-between">
          <!-- Abstract Ambient Mesh Glow -->
          <div class="absolute -right-20 -top-20 w-80 h-80 bg-primary-600/25 blur-3xl rounded-full group-hover:bg-primary-500/35 transition-colors pointer-events-none"></div>
          
          <div class="relative z-10">
            <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/15 mb-6 shadow-inner">
              <PhShieldCheck :size="30" class="text-white" weight="duotone" />
            </div>
            
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs font-bold uppercase tracking-wider mb-4 border border-primary-500/30">
              Multi-Source Threat Intelligence
            </div>

            <h3 class="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
              Threat Protection & Malware Sinkhole
            </h3>
            <p class="text-slate-300 leading-relaxed max-w-xl text-sm sm:text-base font-normal">
              Block malware, phishing campaigns, ransomware C2 infrastructure, botnets, and cryptojacking scripts. Domains are sinkholed at the socket level before payloads can ever reach your system.
            </p>
          </div>

          <!-- Feature Tags -->
          <div class="relative z-10 flex flex-wrap gap-2 pt-6 mt-6 border-t border-slate-800">
            <span class="text-xs px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 border border-white/10 font-medium">22+ Threat Feeds</span>
            <span class="text-xs px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 border border-white/10 font-medium">C2 Botnet Blocking</span>
            <span class="text-xs px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 border border-white/10 font-medium">Phishing Sinkhole</span>
            <span class="text-xs px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 border border-white/10 font-medium">Zero Cloud Logging</span>
          </div>
        </div>

        <!-- Medium Card 2: Ad & Tracker Blocking (1 col) -->
        <div class="md:col-span-1 bg-surface-50 rounded-3xl p-7 sm:p-8 border border-slate-100 shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center mb-6">
              <PhEyeSlash :size="24" class="text-violet-600" weight="duotone" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Ad & Tracker Blocking</h3>
            <p class="text-sm text-slate-500 leading-relaxed">
              Sinkhole intrusive advertising networks, tracking telemetry SDKs, and CNAME-cloaked third-party surveillance scripts.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
            <span class="font-bold text-violet-700">99.8% Sinkhole Accuracy</span>
            <span class="text-slate-400">All Apps</span>
          </div>
        </div>

        <!-- Small Card 3: Parental Controls (1 col) -->
        <div class="md:col-span-1 bg-surface-50 rounded-3xl p-7 sm:p-8 border border-slate-100 shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center mb-6">
              <PhBaby :size="24" class="text-pink-600" weight="duotone" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Parental & Family Controls</h3>
            <p class="text-sm text-slate-500 leading-relaxed">
              Block adult NSFW content, gambling, and violent sites. Automatically enforce Google SafeSearch and YouTube Restricted Mode.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
            <span class="font-bold text-pink-700">SafeSearch Enforced</span>
            <span class="text-slate-400">Custom Filters</span>
          </div>
        </div>

        <!-- Small Card 4: Zero Latency Engine (1 col) -->
        <div class="md:col-span-1 bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-7 sm:p-8 shadow-card hover:-translate-y-1 hover:shadow-brand transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <!-- Lightning Watermark -->
          <div class="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
            <PhLightning :size="150" class="text-white" weight="fill" />
          </div>
          <div class="relative z-10">
            <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20">
              <PhLightning :size="24" class="text-white" weight="duotone" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Zero Latency Engine</h3>
            <p class="text-sm text-primary-100 leading-relaxed">
              Direct in-memory sinkholing with 0 ms query latency. No remote round-trips, no VPN encapsulation overhead.
            </p>
          </div>
          <div class="relative z-10 mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white">
            <span class="font-bold bg-white/20 px-2 py-0.5 rounded-md">&lt; 0.2 ms Latency</span>
            <span class="text-primary-200">Instant Drop</span>
          </div>
        </div>

        <!-- Small Card 5: DNS-over-HTTPS (1 col) -->
        <div class="md:col-span-1 bg-surface-50 rounded-3xl p-7 sm:p-8 border border-slate-100 shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
              <PhGlobeHemisphereWest :size="24" class="text-emerald-600" weight="duotone" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Encrypted DNS-over-HTTPS</h3>
            <p class="text-sm text-slate-500 leading-relaxed">
              Switch seamlessly between Cloudflare, Quad9, AdGuard, and Mullvad — or specify your own private upstream endpoint.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 flex-wrap">
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">Cloudflare</span>
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">Quad9</span>
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">AdGuard</span>
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">Custom</span>
          </div>
        </div>

        <!-- Wide Card 6: Custom Blocklists (3 cols) -->
        <div class="md:col-span-3 bg-surface-50 rounded-3xl p-7 sm:p-8 border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col md:flex-row items-center gap-7 group">
          <div class="flex-shrink-0 w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center">
            <PhListBullets :size="28" class="text-cyan-700" weight="duotone" />
          </div>
          <div class="flex-grow text-center md:text-left">
            <h3 class="text-xl font-bold text-slate-900 mb-2">Custom Blocklists & Wildcard Rule Engine</h3>
            <p class="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl">
              Import third-party hosts files, subscribe to external security feeds, and create individual allowlist/denylist rules with full subdomain wildcard (*.domain.com) support.
            </p>
          </div>
          <a
            href="https://github.com/dnsly-dev/dnsly-app"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 hover:border-primary-300 text-xs font-bold text-slate-700 group-hover:text-primary-600 group-hover:bg-primary-50 transition-all shadow-xs"
          >
            <span>Learn More</span>
            <PhArrowRight :size="14" weight="bold" class="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  PhShieldCheck, PhEyeSlash, PhBaby, PhLightning,
  PhGlobeHemisphereWest, PhListBullets, PhArrowRight, PhSparkle
} from '@phosphor-icons/vue'
</script>

<template>
  <section class="py-20 sm:py-24 bg-white" id="features" aria-labelledby="features-heading">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
          <PhSparkle :size="15" weight="fill" />
          <span>Features</span>
        </div>
        <h2 id="features-heading" class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Complete Device Protection
        </h2>
        <p class="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Curated threat feeds, encrypted DNS switching, and local filtering built directly into a lightweight engine.
        </p>
      </div>

      <!-- Bento Box Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Large Card 1: Threat Protection (2 cols on md+) -->
        <div class="md:col-span-2 bg-slate-950 rounded-3xl p-6 sm:p-9 relative overflow-hidden group shadow-xl border border-slate-800 flex flex-col justify-between">
          <!-- Abstract Ambient Mesh Glow -->
          <div class="absolute -right-20 -top-20 w-72 h-72 bg-blue-600/25 blur-3xl rounded-full group-hover:bg-blue-500/35 transition-colors pointer-events-none" aria-hidden="true"></div>
          
          <div class="relative z-10">
            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/15 mb-5 shadow-inner text-white">
              <PhShieldCheck :size="28" weight="duotone" />
            </div>
            
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold uppercase tracking-wider mb-3.5 border border-blue-500/30">
              Threat Intelligence
            </div>

            <h3 class="text-xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
              Malware & Phishing Protection
            </h3>
            <p class="text-slate-300 leading-relaxed max-w-xl text-xs sm:text-sm font-normal">
              Block malware, phishing campaigns, ransomware infrastructure, botnets, and cryptojacking scripts. Domains are sinkholed at the socket level before payloads can reach your device.
            </p>
          </div>

          <!-- Feature Tags -->
          <div class="relative z-10 flex flex-wrap gap-2 pt-6 mt-6 border-t border-slate-800 text-xs">
            <span class="px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 border border-white/10 font-semibold">Automated Security Feeds</span>
            <span class="px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 border border-white/10 font-semibold">Botnet Blocking</span>
            <span class="px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 border border-white/10 font-semibold">Phishing Sinkhole</span>
            <span class="px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 border border-white/10 font-semibold">Zero Cloud Logging</span>
          </div>
        </div>

        <!-- Medium Card 2: Ad & Tracker Blocking (1 col) -->
        <div class="md:col-span-1 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center mb-5 text-violet-600">
              <PhEyeSlash :size="24" weight="duotone" />
            </div>
            <h3 class="text-base sm:text-lg font-bold text-slate-900 mb-2">Ad & Tracker Blocking</h3>
            <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Sinkhole intrusive advertising networks, tracking telemetry SDKs, and third-party surveillance scripts across all installed applications.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold">
            <span class="text-violet-700 font-bold">System-Wide</span>
            <span class="text-slate-400">All Apps</span>
          </div>
        </div>

        <!-- Small Card 3: Parental Controls (1 col) -->
        <div class="md:col-span-1 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center mb-5 text-pink-600">
              <PhBaby :size="24" weight="duotone" />
            </div>
            <h3 class="text-base sm:text-lg font-bold text-slate-900 mb-2">Parental & Family Safety</h3>
            <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Block adult NSFW content, gambling, and dangerous sites. Automatically enforce SafeSearch and YouTube Restricted Mode.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold">
            <span class="text-pink-700 font-bold">SafeSearch Enforced</span>
            <span class="text-slate-400">Custom Filters</span>
          </div>
        </div>

        <!-- Small Card 4: Zero Latency Engine (1 col) -->
        <div class="md:col-span-1 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden group text-white">
          <div class="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none" aria-hidden="true">
            <PhLightning :size="140" weight="fill" />
          </div>
          <div class="relative z-10">
            <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-5 border border-white/20">
              <PhLightning :size="24" weight="duotone" />
            </div>
            <h3 class="text-base sm:text-lg font-bold mb-2">Local Processing Engine</h3>
            <p class="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Direct in-memory sinkholing with sub-millisecond query evaluation. No remote round-trips or VPN tunneling bottlenecks.
            </p>
          </div>
          <div class="relative z-10 mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs">
            <span class="font-bold bg-white/20 px-2 py-0.5 rounded-md">&lt; 0.2 ms Latency</span>
            <span class="text-blue-200 font-semibold">Instant Drop</span>
          </div>
        </div>

        <!-- Small Card 5: DNS-over-HTTPS (1 col) -->
        <div class="md:col-span-1 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-5 text-emerald-600">
              <PhGlobeHemisphereWest :size="24" weight="duotone" />
            </div>
            <h3 class="text-base sm:text-lg font-bold text-slate-900 mb-2">Encrypted DNS-over-HTTPS</h3>
            <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Switch seamlessly between Cloudflare, Quad9, AdGuard, and NextDNS — or specify your own custom upstream resolver.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-1.5 flex-wrap">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">Cloudflare</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">Quad9</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">AdGuard</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">Custom</span>
          </div>
        </div>

        <!-- Wide Card 6: Custom Blocklists (3 cols on md+) -->
        <div class="md:col-span-3 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6 group">
          <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
            <PhListBullets :size="26" weight="duotone" />
          </div>
          <div class="text-center md:text-left flex-1">
            <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-2">Custom Blocklists & Wildcard Rules</h3>
            <p class="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
              Import hosts files, subscribe to security feeds, and create individual allowlist/denylist rules with full subdomain wildcard matching.
            </p>
          </div>
          <a
            href="#download"
            class="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-all shadow-2xs"
          >
            <span>Download APK</span>
            <PhArrowRight :size="14" weight="bold" class="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

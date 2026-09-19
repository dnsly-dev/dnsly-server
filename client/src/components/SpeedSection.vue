<script setup lang="ts">
import { PhRocketLaunch, PhCheck, PhLightning, PhTimer } from '@phosphor-icons/vue'
</script>

<template>
  <section class="py-20 sm:py-24 bg-slate-50 overflow-hidden" id="speed" aria-labelledby="speed-heading">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Left: Speed Illustration & Benchmark Widget -->
        <div class="lg:col-span-6 flex justify-center order-2 lg:order-1">
          <div class="relative w-full max-w-sm sm:max-w-md">
            <!-- Illustration with subtle rounded shadow -->
            <div class="overflow-hidden rounded-3xl shadow-xl border border-slate-200/80 bg-white">
              <img
                src="/speed-illustration.jpg"
                alt="Browsing Speed Performance with DNSly"
                width="480"
                height="320"
                loading="lazy"
                class="w-full h-auto object-cover select-none"
              />
            </div>

            <!-- Floating Speed Badge (Bottom-Left) -->
            <div class="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-4 flex items-center gap-3 pr-4 pl-3.5 py-2.5 sm:py-3 bg-white/95 backdrop-blur-md shadow-lg rounded-2xl border border-slate-200/80">
              <div class="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                <PhRocketLaunch :size="20" weight="fill" />
              </div>
              <div>
                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Browsing Speed</div>
                <div class="text-xs sm:text-sm font-black text-emerald-600 flex items-center gap-1">
                  <span>+150%</span>
                  <span class="text-[11px] font-semibold text-slate-600">Faster Loading</span>
                </div>
              </div>
            </div>

            <!-- Floating Latency Benchmark Card (Top-Right) -->
            <div class="absolute -top-4 -right-2 sm:-top-6 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-200/80 w-44 sm:w-48">
              <div class="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-700">
                <PhTimer :size="14" class="text-blue-600" weight="bold" />
                <span>DNS Query Latency</span>
              </div>
              <!-- DNSly -->
              <div class="flex items-center justify-between text-xs mb-1 font-bold">
                <span class="text-blue-600 font-bold">DNSly</span>
                <span class="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-extrabold">0.2 ms</span>
              </div>
              <!-- Cloud DNS -->
              <div class="flex items-center justify-between text-[11px] mb-1 text-slate-500 font-medium">
                <span>Cloud DNS</span>
                <span class="text-slate-700">28 ms</span>
              </div>
              <!-- VPN -->
              <div class="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>VPN Tunnel</span>
                <span class="text-slate-600">65 ms</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Text Content -->
        <div class="lg:col-span-6 order-1 lg:order-2 text-left">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <PhLightning :size="15" weight="fill" />
            <span>Performance</span>
          </div>

          <h2 id="speed-heading" class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Faster Browsing with Less Data Usage
          </h2>

          <p class="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 max-w-lg">
            By blocking trackers and bandwidth-heavy ad scripts before they even begin downloading,
            DNSly dramatically cuts payload weight, accelerating web render times across your entire device.
          </p>

          <p class="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 max-w-lg">
            Unlike cloud-based DNS that forces every query over cell towers, DNSly evaluates
            domain blocklists instantly in-memory with near-zero latency overhead.
          </p>

          <ul class="space-y-3 mb-8" role="list">
            <li class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <PhCheck :size="13" weight="bold" />
              </div>
              <span class="text-xs sm:text-sm text-slate-700 font-semibold">0 ms local sinkhole latency with instant packet drop</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <PhCheck :size="13" weight="bold" />
              </div>
              <span class="text-xs sm:text-sm text-slate-700 font-semibold">40–60% reduction in background network telemetry requests</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <PhCheck :size="13" weight="bold" />
              </div>
              <span class="text-xs sm:text-sm text-slate-700 font-semibold">Zero battery tax — no heavy VPN cryptography tunnels</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

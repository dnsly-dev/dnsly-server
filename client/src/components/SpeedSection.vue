<script setup lang="ts">
import { PhRocketLaunch, PhCheck, PhLightning, PhTimer } from '@phosphor-icons/vue'
</script>

<template>
  <section class="section-wrapper bg-surface-100" id="speed">
    <div class="section-container">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Left: Speed Illustration & Benchmark Widget -->
        <div class="lg:col-span-6 flex justify-center order-2 lg:order-1">
          <div class="relative w-full max-w-md">
            <!-- Illustration with subtle rounded shadow -->
            <div class="overflow-hidden rounded-3xl shadow-float border border-slate-100 bg-white">
              <img
                src="/speed-illustration.jpg"
                alt="Browsing Speed Improvement"
                class="w-full h-auto object-cover select-none"
              />
            </div>

            <!-- Floating Speed Badge (Bottom-Left) -->
            <div class="absolute -bottom-5 -left-4 floating-card animate-float-delayed flex items-center gap-3.5 pr-5 pl-4 py-3 bg-white/95 backdrop-blur-md shadow-card border border-slate-100">
              <div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                <PhRocketLaunch :size="20" weight="fill" class="text-primary-600" />
              </div>
              <div>
                <div class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Browsing Speed</div>
                <div class="text-sm font-extrabold text-emerald-600 flex items-center gap-1">
                  <span>+150%</span>
                  <span class="text-xs font-semibold text-slate-600">Faster Loading</span>
                </div>
              </div>
            </div>

            <!-- Floating Latency Benchmark Card (Top-Right) -->
            <div class="absolute -top-6 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-float border border-slate-100 hidden sm:block animate-float w-48">
              <div class="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-slate-100 text-[11px] font-bold text-slate-700">
                <PhTimer :size="14" class="text-primary-600" weight="bold" />
                <span>DNS Query Latency</span>
              </div>
              <!-- DNSly -->
              <div class="flex items-center justify-between text-xs mb-1.5 font-bold">
                <span class="text-primary-600">DNSly</span>
                <span class="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px]">0.2 ms</span>
              </div>
              <!-- Cloud DNS -->
              <div class="flex items-center justify-between text-xs mb-1 text-slate-500">
                <span>Cloud DNS</span>
                <span class="text-slate-600 text-[11px]">28 ms</span>
              </div>
              <!-- VPN -->
              <div class="flex items-center justify-between text-xs text-slate-400">
                <span>VPN Tunnel</span>
                <span class="text-slate-500 text-[11px]">65 ms</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Text Content -->
        <div class="lg:col-span-6 order-1 lg:order-2">
          <div class="section-label">
            <PhLightning :size="15" weight="fill" />
            <span>High Performance</span>
          </div>

          <h2 class="section-title">
            Boost your<br />browsing speed
          </h2>

          <p class="section-subtitle max-w-lg mb-5">
            By blocking trackers and bandwidth-heavy ad scripts before they even begin downloading,
            DNSly dramatically cuts page payload weight, speeding up page render times across your device.
          </p>

          <p class="text-base text-slate-500 leading-relaxed mb-8 max-w-lg">
            Unlike cloud-based DNS that forces every query over the cellular network, DNSly evaluates
            domain blocklists instantly in-memory with near-zero latency overhead.
          </p>

          <ul class="space-y-3.5 mb-8">
            <li class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <PhCheck :size="12" weight="bold" class="text-emerald-600" />
              </div>
              <span class="text-sm text-slate-700 font-medium">0 ms local sinkhole latency with instant packet drop</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <PhCheck :size="12" weight="bold" class="text-emerald-600" />
              </div>
              <span class="text-sm text-slate-700 font-medium">40–60% reduction in background network telemetry requests</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <PhCheck :size="12" weight="bold" class="text-emerald-600" />
              </div>
              <span class="text-sm text-slate-700 font-medium">Zero battery drain — no power-hungry VPN encapsulation loops</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

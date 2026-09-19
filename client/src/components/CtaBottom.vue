<script setup lang="ts">
import { PhDownloadSimple, PhShieldCheck, PhCheckCircle } from '@phosphor-icons/vue'
</script>

<template>
  <section class="w-full relative overflow-hidden" id="download" aria-labelledby="cta-heading">
    <!-- Brand Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900"></div>

    <!-- Ambient Glows -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="absolute -top-24 -right-24 w-80 sm:w-[450px] h-80 sm:h-[450px] rounded-full bg-blue-400/20 blur-3xl"></div>
      <div class="absolute -bottom-24 -left-24 w-80 sm:w-[400px] h-80 sm:h-[400px] rounded-full bg-indigo-500/20 blur-3xl"></div>
    </div>

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
      <!-- Shield Icon Badge -->
      <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-xl text-white">
        <PhShieldCheck :size="32" weight="fill" />
      </div>

      <h2 id="cta-heading" class="text-2xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-white tracking-tight mb-4 leading-tight">
        Protect Your Device Today
      </h2>
      <p class="text-base sm:text-lg text-blue-100/90 mb-8 max-w-xl mx-auto leading-relaxed font-normal">
        Protect your mobile device against intrusive ads, surveillance telemetry, phishing, and malware threats in seconds.
      </p>

      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 mb-8">
        <a
          href="https://github.com/dnsly-dev/dnsly-app/releases"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold bg-white text-blue-700 shadow-xl hover:bg-slate-50 transition-all hover:-translate-y-0.5 active:translate-y-0 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <PhDownloadSimple :size="18" weight="bold" />
          <span>Download Android APK</span>
        </a>
      </div>

      <!-- Trust Features Row -->
      <div class="flex items-center justify-center gap-x-6 gap-y-2.5 flex-wrap text-xs sm:text-sm text-blue-100 font-medium">
        <div class="flex items-center gap-1.5">
          <PhCheckCircle :size="16" weight="fill" class="text-blue-300" />
          <span>No Account Required</span>
        </div>
        <div class="flex items-center gap-1.5">
          <PhCheckCircle :size="16" weight="fill" class="text-blue-300" />
          <span>On-Device Processing</span>
        </div>
        <div class="flex items-center gap-1.5">
          <PhCheckCircle :size="16" weight="fill" class="text-blue-300" />
          <span>Zero Telemetry Logs</span>
        </div>
      </div>
    </div>
  </section>
</template>

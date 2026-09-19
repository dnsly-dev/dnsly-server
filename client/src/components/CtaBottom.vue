<script setup lang="ts">
import { PhDownloadSimple, PhGithubLogo, PhShieldCheck, PhCheckCircle } from '@phosphor-icons/vue'
</script>

<template>
  <section class="w-full relative overflow-hidden" id="download">
    <!-- Brand Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900"></div>

    <!-- Ambient Glows -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="absolute -top-24 -right-24 w-[450px] h-[450px] rounded-full bg-primary-400/20 blur-3xl"></div>
      <div class="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-primary-500/20 blur-3xl"></div>
    </div>

    <div class="relative max-w-4xl mx-auto px-6 py-20 sm:py-24 lg:py-28 text-center">
      <!-- Shield Icon Badge -->
      <div class="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-7 border border-white/20 shadow-float">
        <PhShieldCheck :size="34" class="text-white" weight="fill" />
      </div>

      <h2 class="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-white tracking-tight mb-4 leading-tight">
        Ready to reclaim your browsing privacy?
      </h2>
      <p class="text-base sm:text-lg text-primary-100/90 mb-9 max-w-xl mx-auto leading-relaxed font-normal">
        Protect your device against intrusive ads, invasive telemetry, phishing, and malware threats in seconds. Free forever.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-9">
        <a
          href="https://github.com/dnsly-dev/dnsly-app/releases"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold bg-white text-primary-700 shadow-float hover:shadow-xl hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 select-none"
        >
          <PhDownloadSimple :size="18" weight="bold" />
          Download Android APK
        </a>

        <a
          href="https://github.com/dnsly-dev/dnsly-app"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full sm:w-auto btn-white flex items-center justify-center gap-2.5 px-7 py-4"
        >
          <PhGithubLogo :size="18" weight="bold" />
          View Source Code
        </a>
      </div>

      <!-- Trust Features Row -->
      <div class="flex items-center justify-center gap-6 flex-wrap text-xs text-primary-100 font-medium">
        <div class="flex items-center gap-2">
          <PhCheckCircle :size="15" weight="fill" class="text-primary-300" />
          <span>No Account Required</span>
        </div>
        <div class="flex items-center gap-2">
          <PhCheckCircle :size="15" weight="fill" class="text-primary-300" />
          <span>100% Open-Source (MIT)</span>
        </div>
        <div class="flex items-center gap-2">
          <PhCheckCircle :size="15" weight="fill" class="text-primary-300" />
          <span>Zero Telemetry Logs</span>
        </div>
      </div>
    </div>
  </section>
</template>

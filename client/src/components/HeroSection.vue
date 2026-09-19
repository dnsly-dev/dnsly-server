<script setup lang="ts">
import { PhArrowRight, PhDownloadSimple, PhCheckCircle, PhSparkle } from '@phosphor-icons/vue'
</script>

<template>
  <section class="relative overflow-hidden" id="about">
    <!-- Brand Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900"></div>

    <!-- Ambient Decorative Blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div class="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-primary-400/20 blur-3xl"></div>
      <div class="absolute top-1/3 -right-32 w-[520px] h-[520px] rounded-full bg-primary-300/15 blur-3xl"></div>
      <div class="absolute -bottom-20 left-1/3 w-[360px] h-[360px] rounded-full bg-primary-500/15 blur-3xl"></div>
    </div>

    <div class="relative section-container pt-32 pb-32 sm:pt-36 sm:pb-36 lg:pt-40 lg:pb-44">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <!-- Left: Text Content -->
        <div class="text-left lg:col-span-7">
          <!-- Release / Version Badge -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 select-none">
            <PhSparkle :size="14" class="text-primary-200" weight="fill" />
            <span class="text-xs font-semibold text-white tracking-wide">Next-Gen On-Device DNS Firewall</span>
            <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white/20 text-white uppercase tracking-wider">v1.0 Free</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.12] tracking-tight mb-6">
            Surf The Web<br />Without<br />
            <span class="text-primary-200">Annoying Ads</span>
          </h1>

          <p class="text-base sm:text-lg text-primary-100/90 leading-relaxed max-w-xl mb-9 font-normal">
            DNSly protects you from security threats, blocks ads and surveillance trackers across every app,
            and provides a safe, lightning-fast browsing experience — directly on your device.
          </p>

          <!-- CTA Buttons -->
          <div class="flex items-center gap-4 flex-wrap mb-8">
            <a
              href="https://github.com/dnsly-dev/dnsly-app/releases"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-sm font-bold bg-white text-primary-700 shadow-float hover:shadow-xl hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none"
            >
              <PhDownloadSimple :size="18" weight="bold" />
              Download Free APK
              <PhArrowRight :size="15" weight="bold" />
            </a>

            <a
              href="#features"
              class="btn-white"
            >
              Explore Features
            </a>
          </div>

          <!-- Feature Trust Highlights -->
          <div class="flex items-center gap-6 flex-wrap text-xs text-primary-100 font-medium pt-2">
            <div class="flex items-center gap-2">
              <PhCheckCircle :size="16" weight="fill" class="text-primary-300" />
              <span>100% Free & Open-Source</span>
            </div>
            <div class="flex items-center gap-2">
              <PhCheckCircle :size="16" weight="fill" class="text-primary-300" />
              <span>Zero Latency (0 ms)</span>
            </div>
            <div class="flex items-center gap-2">
              <PhCheckCircle :size="16" weight="fill" class="text-primary-300" />
              <span>Zero Cloud Logs</span>
            </div>
          </div>
        </div>

        <!-- Right: Hero Illustration -->
        <div class="hidden lg:flex justify-center items-center relative lg:col-span-5">
          <div class="relative w-full max-w-md">
            <img
              src="/hero-illustration.png"
              alt="DNSly Protection"
              class="w-full h-auto object-contain drop-shadow-2xl animate-float select-none pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Wave bottom divider seamlessly connected to surface-100 -->
    <div class="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" class="block w-full h-12 sm:h-20 text-surface-100 -mb-0.5">
        <path d="M0 80L48 74.7C96 69.3 192 58.7 288 53.3C384 48 480 48 576 53.3C672 58.7 768 69.3 864 69.3C960 69.3 1056 58.7 1152 53.3C1248 48 1344 48 1392 48H1440V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V80Z" fill="currentColor"/>
      </svg>
    </div>
  </section>
</template>

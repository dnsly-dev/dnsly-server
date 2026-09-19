<script setup lang="ts">
import { PhArrowRight, PhDownloadSimple, PhCheckCircle, PhShieldCheck } from '@phosphor-icons/vue'
</script>

<template>
  <section class="relative overflow-hidden" id="about" aria-labelledby="hero-title">
    <!-- Brand Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900"></div>

    <!-- Ambient Decorative Blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div class="absolute -top-24 -left-24 w-96 sm:w-[480px] h-96 sm:h-[480px] rounded-full bg-blue-400/20 blur-3xl"></div>
      <div class="absolute top-1/3 -right-32 w-96 sm:w-[520px] h-96 sm:h-[520px] rounded-full bg-indigo-300/15 blur-3xl"></div>
      <div class="absolute -bottom-20 left-1/3 w-80 sm:w-[360px] h-80 sm:h-[360px] rounded-full bg-blue-500/15 blur-3xl"></div>
    </div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-24 sm:pt-36 sm:pb-36 lg:pt-40 lg:pb-40">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <!-- Left: Text Content -->
        <div class="text-left lg:col-span-7">
          <!-- Release / Version Badge -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 select-none">
            <PhShieldCheck :size="15" class="text-blue-200" weight="fill" />
            <span class="text-xs font-semibold text-white tracking-wide">Next-Gen On-Device DNS Firewall</span>
            <span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-white/20 text-white uppercase tracking-wider">v1.0 Free</span>
          </div>

          <h1 id="hero-title" class="text-3xl sm:text-5xl lg:text-[3.4rem] font-black text-white leading-[1.12] tracking-tight mb-5">
            Surf The Web Without<br class="hidden sm:inline" />
            <span class="text-blue-200">Annoying Ads & Threats</span>
          </h1>

          <p class="text-sm sm:text-base lg:text-lg text-blue-50/90 leading-relaxed max-w-xl mb-8 font-normal">
            DNSly shields your entire device from malware, phishing attacks, and surveillance trackers across every app.
            Enjoy instant 0ms query filtering with zero cloud logging.
          </p>

          <!-- CTA Buttons (Full-width on mobile, flex-row on sm+) -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
            <a
              href="https://github.com/dnsly-dev/dnsly-app/releases"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-xs sm:text-sm font-extrabold bg-white text-blue-700 shadow-xl hover:bg-slate-50 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <PhDownloadSimple :size="18" weight="bold" />
              <span>Download Free Android APK</span>
              <PhArrowRight :size="15" weight="bold" />
            </a>

            <a
              href="#features"
              class="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Explore Features</span>
            </a>
          </div>

          <!-- Feature Trust Highlights -->
          <div class="flex items-center gap-x-6 gap-y-2 flex-wrap text-xs text-blue-100 font-semibold pt-1">
            <div class="flex items-center gap-2">
              <PhCheckCircle :size="16" weight="fill" class="text-blue-300 shrink-0" />
              <span>100% Free & Open-Source (MIT)</span>
            </div>
            <div class="flex items-center gap-2">
              <PhCheckCircle :size="16" weight="fill" class="text-blue-300 shrink-0" />
              <span>Zero Latency (0 ms Sinkhole)</span>
            </div>
            <div class="flex items-center gap-2">
              <PhCheckCircle :size="16" weight="fill" class="text-blue-300 shrink-0" />
              <span>Zero Cloud Data Logging</span>
            </div>
          </div>
        </div>

        <!-- Right: Hero Illustration Preview -->
        <div class="flex justify-center items-center relative lg:col-span-5">
          <div class="relative w-full max-w-sm sm:max-w-md">
            <img
              src="/hero-illustration.png"
              alt="DNSly on-device DNS firewall and adblocker interface mockup"
              width="440"
              height="440"
              loading="eager"
              class="w-full h-auto object-contain drop-shadow-2xl animate-float select-none"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Wave bottom divider seamlessly connected to background -->
    <div class="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" class="block w-full h-10 sm:h-16 text-slate-50 -mb-0.5">
        <path d="M0 80L48 74.7C96 69.3 192 58.7 288 53.3C384 48 480 48 576 53.3C672 58.7 768 69.3 864 69.3C960 69.3 1056 58.7 1152 53.3C1248 48 1344 48 1392 48H1440V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V80Z" fill="currentColor"/>
      </svg>
    </div>
  </section>
</template>

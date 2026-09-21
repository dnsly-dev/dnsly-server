<script setup lang="ts">
</script>

<template>
  <footer class="w-full bg-slate-50 border-t border-slate-200/80 pt-14 pb-12" role="contentinfo">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex flex-col md:flex-row md:items-start justify-between gap-10 sm:gap-12 mb-12">
        <!-- Brand Column -->
        <div class="max-w-md">
          <a href="/" class="inline-flex items-center gap-2.5 mb-3.5 no-underline select-none" aria-label="DNSly Home">
            <img
              src="/logo.png"
              alt="DNSly Logo"
              class="w-9 h-9 rounded-xl object-contain shadow-xs"
            />
            <span class="text-xl font-black text-slate-900 tracking-tight">
              DNS<span class="text-blue-600">ly</span>
            </span>
          </a>
          <p class="text-sm text-slate-600 leading-relaxed font-normal">
            On-device DNS firewall and tracker blocking engine for Android. Zero latency, 0 cloud logging, and instant threat protection.
          </p>
        </div>

        <!-- Product Navigation Links -->
        <div class="flex flex-col sm:flex-row gap-10 sm:gap-16">
          <div>
            <h3 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
              Navigation
            </h3>
            <ul class="space-y-3 text-sm" role="list">
              <li><a href="#about" class="text-slate-600 hover:text-blue-600 transition-colors font-medium">About</a></li>
              <li><a href="#how-it-works" class="text-slate-600 hover:text-blue-600 transition-colors font-medium">How It Works</a></li>
              <li><a href="#features" class="text-slate-600 hover:text-blue-600 transition-colors font-medium">Features</a></li>
              <li><a href="#speed" class="text-slate-600 hover:text-blue-600 transition-colors font-medium">Performance</a></li>
              <li><a href="#comparison" class="text-slate-600 hover:text-blue-600 transition-colors font-medium">Comparison</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
              Download
            </h3>
            <ul class="space-y-3 text-sm" role="list">
              <li><a href="#download" class="text-slate-600 hover:text-blue-600 transition-colors font-medium">Android APK</a></li>
              <li><a href="#features" class="text-slate-600 hover:text-blue-600 transition-colors font-medium">Supported Protocols</a></li>
              <li><a href="#speed" class="text-slate-600 hover:text-blue-600 transition-colors font-medium">Benchmarks</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
              Legal & Privacy
            </h3>
            <ul class="space-y-3 text-sm" role="list">
              <li><router-link to="/privacy" class="text-slate-600 hover:text-blue-600 transition-colors font-medium">Privacy Policy</router-link></li>
              <li><span class="text-slate-400 font-normal">Terms of Service</span></li>
              <li><span class="text-slate-400 font-normal">Zero-Log Guarantee</span></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-sm text-slate-500 font-medium">
        <div>
          © {{ new Date().getFullYear() }} DNSly. All rights reserved.
        </div>
        <div class="flex items-center gap-4">
          <router-link to="/privacy" class="text-slate-600 hover:text-blue-600 transition-colors">Privacy Policy</router-link>
          <span>•</span>
          <span>On-Device Privacy & Security</span>
        </div>
      </div>
    </div>
  </footer>
</template>

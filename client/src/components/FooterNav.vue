<script setup lang="ts">
import { PhShieldCheck, PhGithubLogo, PhArrowSquareOut } from '@phosphor-icons/vue'
</script>

<template>
  <footer class="w-full bg-white border-t border-slate-200/80 pt-12 pb-10" role="contentinfo">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-10">
        <!-- Brand Column -->
        <div class="sm:col-span-2 md:col-span-2">
          <a href="/" class="inline-flex items-center gap-2.5 mb-3 no-underline select-none" aria-label="DNSly Home">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-xs text-white">
              <PhShieldCheck :size="20" weight="fill" />
            </div>
            <span class="text-lg font-black text-slate-900 tracking-tight">
              DNS<span class="text-blue-600">ly</span>
            </span>
          </a>
          <p class="text-xs text-slate-500 leading-relaxed max-w-sm mb-4">
            On-device DNS firewall and ad-blocking engine for Android. Zero latency, 0 cloud logging.
          </p>

          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Gateway Online</span>
          </div>
        </div>

        <!-- Product Links -->
        <div class="sm:col-span-1 md:col-span-1">
          <h3 class="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 mb-3">Product</h3>
          <ul class="space-y-2 text-xs" role="list">
            <li><a href="#how-it-works" class="text-slate-500 hover:text-blue-600 transition-colors font-medium">How It Works</a></li>
            <li><a href="#features" class="text-slate-500 hover:text-blue-600 transition-colors font-medium">Features</a></li>
            <li><a href="#speed" class="text-slate-500 hover:text-blue-600 transition-colors font-medium">Performance</a></li>
            <li><a href="#comparison" class="text-slate-500 hover:text-blue-600 transition-colors font-medium">Comparison</a></li>
            <li><a href="#download" class="text-slate-500 hover:text-blue-600 transition-colors font-medium">Download APK</a></li>
          </ul>
        </div>

        <!-- Management & API Links -->
        <div class="sm:col-span-1 md:col-span-1">
          <h3 class="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 mb-3">Platform</h3>
          <ul class="space-y-2 text-xs" role="list">
            <li>
              <router-link to="/admin" class="text-slate-500 hover:text-blue-600 transition-colors font-semibold">
                Admin Console
              </router-link>
            </li>
            <li>
              <a href="/reference" target="_blank" class="text-slate-500 hover:text-blue-600 transition-colors font-semibold inline-flex items-center gap-1">
                <span>Scalar API Docs</span>
                <PhArrowSquareOut :size="12" class="text-slate-400" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-slate-400 font-medium">
        <div>
          © {{ new Date().getFullYear() }} DNSly. Open-source under MIT License.
        </div>
        <div>
          <a
            href="https://github.com/dnsly-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="DNSly GitHub Organization"
            class="w-8 h-8 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 inline-flex items-center justify-center transition-colors border border-slate-200"
          >
            <PhGithubLogo :size="16" weight="bold" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

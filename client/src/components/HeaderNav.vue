<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { PhShieldCheck, PhList, PhX, PhDownloadSimple, PhArrowRight } from '@phosphor-icons/vue'

const isScrolled = ref(false)
const isMobileOpen = ref(false)

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
    isScrolled.value = scrollPos > 10
  }
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
  }
  document.body.style.overflow = ''
})

watch(isMobileOpen, (open) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

const links = [
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Performance', href: '#speed' },
  { label: 'Comparison', href: '#comparison' },
]
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 bg-blue-600/95 backdrop-blur-md border-b border-blue-500/40 transition-all duration-300"
    :class="isScrolled ? 'shadow-lg shadow-blue-900/20 py-1' : 'shadow-sm py-2'"
    role="banner"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <!-- Logo -->
      <a
        href="/"
        class="flex items-center gap-2.5 no-underline group select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-xl p-1"
        aria-label="DNSly Home"
      >
        <img
          src="/logo.png"
          alt="DNSly Logo"
          class="w-9 h-9 rounded-xl object-contain shadow-xs group-hover:scale-105 transition-transform"
        />
        <span class="text-xl font-black tracking-tight text-white">
          DNS<span class="text-blue-200">ly</span>
        </span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-7" aria-label="Main Navigation">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          class="text-sm font-semibold tracking-wide text-white/90 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-lg px-2 py-1"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- Right Action Items -->
      <div class="flex items-center gap-2.5">
        <a
          href="#download"
          class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-blue-700 bg-white hover:bg-slate-50 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <PhDownloadSimple :size="16" weight="bold" />
          <span>Download APK</span>
        </a>

        <!-- Mobile Toggle Button (Min 44x44px Touch Target) -->
        <button
          class="md:hidden min-w-[44px] min-h-[44px] p-2 rounded-xl transition-colors text-white hover:bg-white/20 active:scale-95 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          @click="isMobileOpen = true"
          aria-expanded="false"
          aria-controls="mobile-fullscreen-navigation"
          aria-label="Open navigation menu"
        >
          <PhList :size="26" weight="bold" />
        </button>
      </div>
    </div>

    <!-- Full-Screen Mobile Navigation Modal -->
    <Transition name="fullscreen-menu">
      <div
        v-if="isMobileOpen"
        id="mobile-fullscreen-navigation"
        class="fixed inset-0 z-50 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-8 md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <!-- Background Ambient Glow -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div class="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl"></div>
          <div class="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl"></div>
        </div>

        <!-- Top Bar with Brand & Close Button -->
        <div class="relative z-10 flex items-center justify-between pb-5 border-b border-white/10">
          <div class="flex items-center gap-2.5 select-none">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 border border-white/20">
              <PhShieldCheck :size="24" weight="fill" />
            </div>
            <span class="text-2xl font-black text-white tracking-tight">
              DNS<span class="text-blue-400">ly</span>
            </span>
          </div>

          <button
            @click="isMobileOpen = false"
            class="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Close navigation menu"
          >
            <PhX :size="22" weight="bold" />
          </button>
        </div>

        <!-- Middle: Nav Links (Clean Card Style with High Contrast) -->
        <nav class="relative z-10 flex flex-col my-auto py-5 space-y-2.5">
          <a
            v-for="(link, idx) in links"
            :key="link.label"
            :href="link.href"
            class="group py-3.5 px-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/[0.08] active:scale-[0.99] transition-all flex items-center justify-between text-decoration-none"
            @click="isMobileOpen = false"
          >
            <div class="flex items-center gap-3.5">
              <span class="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-mono text-xs font-black border border-blue-400/30 group-hover:bg-blue-500 group-hover:text-white transition-all">
                0{{ idx + 1 }}
              </span>
              <span class="text-lg sm:text-xl font-extrabold text-white group-hover:text-blue-300 transition-colors tracking-tight">
                {{ link.label }}
              </span>
            </div>
            <div class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-300 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-400 transition-all">
              <PhArrowRight :size="16" weight="bold" class="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>
        </nav>

        <!-- Bottom: High-Contrast Crisp CTA Button & Tagline -->
        <div class="relative z-10 pt-5 border-t border-white/10 space-y-3.5">
          <a
            href="#download"
            class="w-full py-4 px-6 rounded-2xl text-center text-sm font-extrabold bg-white hover:bg-slate-100 text-blue-700 shadow-xl shadow-blue-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer select-none"
            @click="isMobileOpen = false"
          >
            <PhDownloadSimple :size="18" weight="bold" class="text-blue-700" />
            <span>Download Android APK</span>
          </a>

          <div class="text-center text-xs font-semibold text-blue-200/80">
            🛡️ Local On-Device DNS Privacy & Ad Blocker
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.fullscreen-menu-enter-active,
.fullscreen-menu-leave-active {
  transition: opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}
.fullscreen-menu-enter-from,
.fullscreen-menu-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>

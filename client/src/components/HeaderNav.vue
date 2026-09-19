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
        <div class="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all shadow-xs text-white">
          <PhShieldCheck :size="22" weight="fill" />
        </div>
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
        class="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <!-- Top Bar with Brand & Close Button -->
        <div class="flex items-center justify-between pb-6 border-b border-white/10">
          <div class="flex items-center gap-2.5 select-none">
            <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <PhShieldCheck :size="24" weight="fill" />
            </div>
            <span class="text-2xl font-black text-white tracking-tight">
              DNS<span class="text-blue-400">ly</span>
            </span>
          </div>

          <button
            @click="isMobileOpen = false"
            class="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Close navigation menu"
          >
            <PhX :size="24" weight="bold" />
          </button>
        </div>

        <!-- Middle: Nav Links (Large & Touchable) -->
        <nav class="flex flex-col my-auto py-6 space-y-1">
          <a
            v-for="(link, idx) in links"
            :key="link.label"
            :href="link.href"
            class="py-3.5 px-3 rounded-2xl text-2xl sm:text-3xl font-black text-white hover:text-blue-400 hover:bg-white/5 active:scale-[0.98] transition-all flex items-center justify-between group border-b border-white/5 last:border-0"
            @click="isMobileOpen = false"
          >
            <div class="flex items-center gap-3">
              <span class="text-xs font-mono text-slate-500 font-bold group-hover:text-blue-400 transition-colors">0{{ idx + 1 }}</span>
              <span>{{ link.label }}</span>
            </div>
            <PhArrowRight :size="20" weight="bold" class="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </a>
        </nav>

        <!-- Bottom: Primary Action Button & Info -->
        <div class="pt-6 border-t border-white/10 space-y-4">
          <a
            href="#download"
            class="w-full py-4 px-6 rounded-2xl text-center text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5"
            @click="isMobileOpen = false"
          >
            <PhDownloadSimple :size="20" weight="bold" />
            <span>Download Android APK</span>
          </a>

          <div class="text-center text-xs text-slate-500 font-medium">
            On-Device DNS Privacy & Threat Firewall
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.fullscreen-menu-enter-active,
.fullscreen-menu-leave-active {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.fullscreen-menu-enter-from,
.fullscreen-menu-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>

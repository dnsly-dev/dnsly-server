<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { PhShieldCheck, PhList, PhX, PhDownloadSimple, PhUserGear } from '@phosphor-icons/vue'

const isScrolled = ref(false)
const isMobileOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 15
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

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
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled
      ? 'bg-blue-600/95 backdrop-blur-md shadow-md py-1'
      : 'bg-transparent py-2'"
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
        <router-link
          to="/admin"
          class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Admin Management Console"
        >
          <PhUserGear :size="15" weight="bold" />
          <span>Admin Console</span>
        </router-link>

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
          @click="isMobileOpen = !isMobileOpen"
          :aria-expanded="isMobileOpen"
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation menu"
        >
          <PhX v-if="isMobileOpen" :size="24" weight="bold" />
          <PhList v-else :size="24" weight="bold" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <Transition name="slide">
      <div
        v-if="isMobileOpen"
        id="mobile-navigation"
        class="md:hidden bg-white border-b border-slate-200 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Menu"
      >
        <nav class="max-w-6xl mx-auto px-5 py-5 flex flex-col gap-1.5">
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            class="px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between"
            @click="isMobileOpen = false"
          >
            <span>{{ link.label }}</span>
          </a>

          <div class="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2.5">
            <router-link
              to="/admin"
              class="w-full py-3 px-4 rounded-xl text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              @click="isMobileOpen = false"
            >
              <PhUserGear :size="16" weight="bold" />
              <span>Admin Console</span>
            </router-link>

            <a
              href="#download"
              class="w-full py-3.5 px-4 rounded-xl text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              @click="isMobileOpen = false"
            >
              <PhDownloadSimple :size="16" weight="bold" />
              <span>Download APK</span>
            </a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

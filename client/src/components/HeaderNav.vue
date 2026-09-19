<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { PhShieldCheck, PhList, PhX, PhDownloadSimple } from '@phosphor-icons/vue'

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
    class="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
    :class="isScrolled
      ? 'bg-primary-600/95 backdrop-blur-md shadow-card'
      : 'bg-transparent'"
  >
    <div class="section-container h-[var(--header-height)] flex items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2.5 no-underline group select-none">
        <div class="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/25 group-hover:bg-white/30 transition-all shadow-sm">
          <PhShieldCheck :size="20" class="text-white" weight="fill" />
        </div>
        <span class="text-xl font-extrabold tracking-tight text-white">
          DNSly
        </span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-7">
        <template v-for="link in links" :key="link.label">
          <a
            :href="link.href"
            class="text-sm font-semibold tracking-wide text-white/85 hover:text-white transition-colors duration-150 inline-flex items-center gap-1 cursor-pointer"
          >
            {{ link.label }}
          </a>
        </template>
      </nav>

      <!-- Right CTA -->
      <div class="flex items-center gap-3">
        <router-link
          to="/admin"
          class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
        >
          <span>Admin Portal</span>
        </router-link>

        <a
          href="https://github.com/dnsly-dev/dnsly-app/releases"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-primary-700 bg-white hover:bg-slate-50 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          <PhDownloadSimple :size="16" weight="bold" />
          <span>Download</span>
        </a>

        <!-- Mobile Toggle -->
        <button
          class="md:hidden p-2 rounded-xl transition-colors text-white hover:bg-white/20 active:scale-95"
          @click="isMobileOpen = !isMobileOpen"
          aria-label="Toggle navigation"
        >
          <PhX v-if="isMobileOpen" :size="22" weight="bold" />
          <PhList v-else :size="22" weight="bold" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <Transition name="slide">
      <div v-if="isMobileOpen" class="md:hidden bg-white border-b border-slate-100 shadow-card">
        <nav class="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-1.5">
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            class="px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors flex items-center justify-between cursor-pointer"
            @click="isMobileOpen = false"
          >
            <span>{{ link.label }}</span>
          </a>
          <div class="mt-3 pt-3 border-t border-slate-100">
            <a
              href="https://github.com/dnsly-dev/dnsly-app/releases"
              target="_blank"
              class="btn-primary w-full text-center"
              @click="isMobileOpen = false"
            >
              <PhDownloadSimple :size="16" weight="bold" />
              Download APK
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

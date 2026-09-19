<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import {
  PhShieldCheck,
  PhChartPieSlice,
  PhDeviceMobile,
  PhGlobeHemisphereWest,
  PhListChecks,
  PhActivity,
  PhSignOut,
  PhHouse,
  PhBookOpen,
  PhMagnifyingGlass,
  PhPlus,
  PhList,
  PhX,
  PhCaretRight
} from '@phosphor-icons/vue'

const { user, logout } = useAuth()
const route = useRoute()

const isMobileDrawerOpen = ref(false)
const apiUrl = ref(localStorage.getItem('dnsly_api_base_url') || 'https://dnsly.shovon.bd')

const navItems = [
  { name: 'Dashboard', shortName: 'Overview', path: '/admin/overview', icon: PhChartPieSlice, color: 'text-blue-500', badge: null },
  { name: 'Device Fleets', shortName: 'Devices', path: '/admin/devices', icon: PhDeviceMobile, color: 'text-purple-500', badge: 'Live' },
  { name: 'DNS Upstreams', shortName: 'DNS', path: '/admin/dns-servers', icon: PhGlobeHemisphereWest, color: 'text-amber-500', badge: null },
  { name: 'Threat Blocklists', shortName: 'Blocklists', path: '/admin/blocklists', icon: PhListChecks, color: 'text-emerald-500', badge: null },
  { name: 'Live Stream', shortName: 'Telemetry', path: '/admin/telemetry', icon: PhActivity, color: 'text-red-500', badge: '5s' },
]

watch(isMobileDrawerOpen, (open) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

const handleLogout = async () => {
  await logout()
}
</script>

<template>
  <div class="min-h-screen bg-[#f4f6fa] text-slate-800 flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white">
    <!-- Top Global Header Bar -->
    <header class="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs">
      <!-- Left: Brand Logo & Mobile Toggle -->
      <div class="flex items-center gap-3">
        <button
          @click="isMobileDrawerOpen = true"
          class="lg:hidden min-w-[40px] min-h-[40px] p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
          aria-label="Open sidebar menu"
        >
          <PhList :size="24" weight="bold" />
        </button>

        <router-link to="/admin" class="flex items-center gap-2.5 no-underline group select-none">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
            <PhShieldCheck :size="22" weight="fill" />
          </div>
          <div class="flex items-center gap-1.5">
            <span class="text-xl font-black tracking-tight text-slate-900">DNS<span class="text-blue-600">ly</span></span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-blue-500 text-white">UI</span>
          </div>
        </router-link>
      </div>

      <!-- Center Search (Desktop) -->
      <div class="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
        <div class="relative w-full">
          <PhMagnifyingGlass :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search telemetry, devices, blocklists..."
            class="w-full pl-9 pr-4 py-1.5 bg-slate-100/80 hover:bg-slate-100 border border-transparent focus:border-blue-400 focus:bg-white rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none transition-all"
          />
        </div>
      </div>

      <!-- Right Action Items -->
      <div class="flex items-center gap-2.5">
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Gateway Connected</span>
        </div>

        <router-link
          to="/admin/telemetry"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-500/30 transition-all active:scale-95"
        >
          <PhPlus :size="14" weight="bold" />
          <span class="hidden sm:inline">Telemetry Stream</span>
        </router-link>

        <a
          :href="`${apiUrl}/reference`"
          target="_blank"
          title="Scalar API Reference"
          class="hidden sm:flex p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <PhBookOpen :size="18" />
        </a>

        <!-- User Profile Pill -->
        <div class="flex items-center gap-2 pl-2.5 sm:pl-3 border-l border-slate-200">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white uppercase shadow-xs select-none">
            {{ (user?.email || 'A')[0] }}
          </div>
          <div class="hidden lg:block text-left">
            <div class="text-xs font-bold text-slate-800 leading-tight">{{ user?.name || 'Administrator' }}</div>
            <div class="text-[10px] text-slate-400 leading-tight truncate max-w-[110px]">{{ user?.email || 'admin@dnsly.app' }}</div>
          </div>
          <button
            @click="handleLogout"
            title="Sign out"
            class="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <PhSignOut :size="18" weight="bold" />
          </button>
        </div>
      </div>
    </header>

    <div class="flex-1 flex">
      <!-- Left Sidebar (Desktop Only) -->
      <aside class="hidden lg:flex flex-col w-60 bg-white border-r border-slate-200/80 shrink-0 p-4 justify-between sticky top-16 h-[calc(100vh-4rem)] z-30 shadow-xs">
        <div class="space-y-6">
          <!-- Navigation List -->
          <div>
            <div class="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 mb-2">Main Navigation</div>
            <nav class="space-y-1">
              <router-link
                v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                class="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all group"
                :class="route.path.startsWith(item.path)
                  ? 'bg-blue-50 text-blue-700 font-extrabold shadow-2xs border border-blue-100/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'"
              >
                <div class="flex items-center gap-3">
                  <component
                    :is="item.icon"
                    :size="18"
                    weight="bold"
                    :class="route.path.startsWith(item.path) ? 'text-blue-600' : item.color"
                  />
                  <span>{{ item.name }}</span>
                </div>

                <div class="flex items-center gap-1.5">
                  <span
                    v-if="item.badge"
                    class="px-1.5 py-0.5 rounded-md text-[9px] font-extrabold"
                    :class="item.badge === 'Live' ? 'bg-purple-100 text-purple-700' : 'bg-red-100 text-red-700'"
                  >
                    {{ item.badge }}
                  </span>
                  <PhCaretRight :size="12" class="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                </div>
              </router-link>
            </nav>
          </div>

          <!-- Secondary Links -->
          <div>
            <div class="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 mb-2">Platform</div>
            <div class="space-y-1">
              <router-link
                to="/"
                class="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <PhHouse :size="16" class="text-slate-400" />
                <span>Public Landing Page</span>
              </router-link>
              <a
                :href="`${apiUrl}/reference`"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <PhBookOpen :size="16" class="text-slate-400" />
                <span>Scalar API Reference</span>
              </a>
            </div>
          </div>
        </div>

        <!-- API Endpoint Card at bottom of sidebar -->
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] space-y-1">
          <div class="flex items-center justify-between text-slate-500 font-bold uppercase text-[9px] tracking-wider">
            <span>Target API</span>
            <span class="text-emerald-600 font-bold">● Active</span>
          </div>
          <div class="font-mono text-[10px] text-slate-600 truncate font-semibold" :title="apiUrl">
            {{ apiUrl }}
          </div>
        </div>
      </aside>

      <!-- Slide-Out Mobile Drawer (Phone / Tablet) -->
      <Transition name="drawer">
        <div
          v-if="isMobileDrawerOpen"
          class="lg:hidden fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Admin Navigation Menu"
        >
          <!-- Backdrop -->
          <div
            class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            @click="isMobileDrawerOpen = false"
          ></div>

          <!-- Drawer Panel -->
          <div class="relative w-4/5 max-w-xs bg-white h-full p-5 shadow-2xl flex flex-col justify-between z-10 overflow-y-auto">
            <div class="space-y-6">
              <!-- Drawer Header -->
              <div class="flex items-center justify-between pb-4 border-b border-slate-100">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                    <PhShieldCheck :size="22" weight="fill" />
                  </div>
                  <div>
                    <span class="text-lg font-black tracking-tight text-slate-900">DNS<span class="text-blue-600">ly</span></span>
                    <span class="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-blue-500 text-white">Console</span>
                  </div>
                </div>

                <button
                  @click="isMobileDrawerOpen = false"
                  class="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <PhX :size="20" weight="bold" />
                </button>
              </div>

              <!-- User Info Card -->
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-sm text-white uppercase shrink-0 shadow-xs">
                  {{ (user?.email || 'A')[0] }}
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold text-slate-900 truncate">{{ user?.name || 'Administrator' }}</div>
                  <div class="text-[11px] text-slate-400 truncate">{{ user?.email || 'admin@dnsly.app' }}</div>
                </div>
              </div>

              <!-- Navigation Links -->
              <div>
                <div class="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-2 mb-2">Navigation</div>
                <nav class="space-y-1">
                  <router-link
                    v-for="item in navItems"
                    :key="item.path"
                    :to="item.path"
                    @click="isMobileDrawerOpen = false"
                    class="flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all"
                    :class="route.path.startsWith(item.path)
                      ? 'bg-blue-600 text-white font-extrabold shadow-md shadow-blue-500/25'
                      : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'"
                  >
                    <div class="flex items-center gap-3">
                      <component
                        :is="item.icon"
                        :size="20"
                        weight="bold"
                        :class="route.path.startsWith(item.path) ? 'text-white' : item.color"
                      />
                      <span>{{ item.name }}</span>
                    </div>

                    <span
                      v-if="item.badge"
                      class="px-2 py-0.5 rounded-md text-[9px] font-extrabold"
                      :class="route.path.startsWith(item.path)
                        ? 'bg-white/20 text-white'
                        : item.badge === 'Live' ? 'bg-purple-100 text-purple-700' : 'bg-red-100 text-red-700'"
                    >
                      {{ item.badge }}
                    </span>
                  </router-link>
                </nav>
              </div>

              <!-- Secondary Links -->
              <div>
                <div class="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-2 mb-2">Shortcuts</div>
                <div class="space-y-1">
                  <router-link
                    to="/"
                    @click="isMobileDrawerOpen = false"
                    class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <PhHouse :size="18" class="text-slate-400" />
                    <span>Public Landing Page</span>
                  </router-link>

                  <a
                    :href="`${apiUrl}/reference`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <PhBookOpen :size="18" class="text-slate-400" />
                    <span>Scalar API Reference</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Drawer Footer / Sign Out -->
            <div class="pt-4 border-t border-slate-100">
              <button
                @click="handleLogout"
                class="w-full py-3 px-4 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 active:bg-red-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhSignOut :size="16" weight="bold" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Main Content Area -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 max-w-7xl w-full mx-auto">
        <router-view />
      </main>
    </div>

    <!-- Fixed Bottom Navigation Bar (Mobile / Tablet Only) -->
    <nav
      class="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/80 z-30 flex items-center justify-around px-2 shadow-lg"
      aria-label="Mobile Bottom Navigation"
    >
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex-1 py-1 flex flex-col items-center justify-center gap-1 transition-all relative select-none"
        :class="route.path.startsWith(item.path) ? 'text-blue-600 font-extrabold' : 'text-slate-400 hover:text-slate-600 font-medium'"
      >
        <div class="relative">
          <component
            :is="item.icon"
            :size="20"
            :weight="route.path.startsWith(item.path) ? 'fill' : 'regular'"
            :class="route.path.startsWith(item.path) ? 'text-blue-600 scale-110' : 'text-slate-400'"
            class="transition-transform"
          />
          <span
            v-if="item.badge"
            class="absolute -top-1 -right-1.5 w-2 h-2 rounded-full"
            :class="item.badge === 'Live' ? 'bg-purple-500' : 'bg-red-500'"
          ></span>
        </div>
        <span class="text-[10px] tracking-tight leading-none">{{ item.shortName }}</span>
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from .relative,
.drawer-leave-to .relative {
  transform: translateX(-100%);
}
</style>

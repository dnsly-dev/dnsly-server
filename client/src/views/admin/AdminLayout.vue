<script setup lang="ts">
import { ref } from 'vue'
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

const isMobileMenuOpen = ref(false)
const apiUrl = ref(localStorage.getItem('dnsly_api_base_url') || 'https://dnsly.shovon.bd')

const navItems = [
  { name: 'Dashboard', path: '/admin/overview', icon: PhChartPieSlice, color: 'text-blue-500', badge: null },
  { name: 'Device Fleets', path: '/admin/devices', icon: PhDeviceMobile, color: 'text-purple-500', badge: 'Live' },
  { name: 'DNS Upstreams', path: '/admin/dns-servers', icon: PhGlobeHemisphereWest, color: 'text-amber-500', badge: null },
  { name: 'Threat Blocklists', path: '/admin/blocklists', icon: PhListChecks, color: 'text-emerald-500', badge: null },
  { name: 'Live Stream', path: '/admin/telemetry', icon: PhActivity, color: 'text-red-500', badge: '5s' },
]

const handleLogout = async () => {
  await logout()
}
</script>

<template>
  <div class="min-h-screen bg-[#f4f6fa] text-slate-800 flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white">
    <!-- Top Global Header Bar (StartUI Style) -->
    <header class="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs">
      <!-- Left: Brand Logo & Mobile Toggle -->
      <div class="flex items-center gap-4">
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <PhX v-if="isMobileMenuOpen" :size="22" />
          <PhList v-else :size="22" />
        </button>

        <router-link to="/admin" class="flex items-center gap-2.5 no-underline group">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
            <PhShieldCheck :size="22" weight="fill" />
          </div>
          <div class="flex items-center gap-1.5">
            <span class="text-xl font-black tracking-tight text-slate-900">DNS<span class="text-blue-600">ly</span></span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-blue-500 text-white">UI</span>
          </div>
        </router-link>
      </div>

      <!-- Center Search & API Info (Desktop) -->
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
      <div class="flex items-center gap-3">
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Gateway Connected</span>
        </div>

        <router-link
          to="/admin/telemetry"
          class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold shadow-sm shadow-blue-500/30 transition-all"
        >
          <PhPlus :size="14" weight="bold" />
          <span class="hidden sm:inline">Telemetry</span>
        </router-link>

        <a
          :href="`${apiUrl}/reference`"
          target="_blank"
          title="Scalar API Reference"
          class="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <PhBookOpen :size="18" />
        </a>

        <!-- User Profile Pill -->
        <div class="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white uppercase shadow-xs">
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
      <!-- Left Sidebar (StartUI Crisp Light Style) -->
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

      <!-- Mobile Dropdown Menu -->
      <div v-if="isMobileMenuOpen" class="lg:hidden fixed inset-x-0 top-16 bg-white border-b border-slate-200 p-4 space-y-2 z-40 shadow-xl">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          @click="isMobileMenuOpen = false"
          class="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold"
          :class="route.path.startsWith(item.path) ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'"
        >
          <div class="flex items-center gap-3">
            <component :is="item.icon" :size="18" weight="bold" :class="item.color" />
            <span>{{ item.name }}</span>
          </div>
          <span v-if="item.badge" class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">{{ item.badge }}</span>
        </router-link>

        <div class="pt-3 border-t border-slate-100 flex gap-2">
          <router-link to="/" class="flex-1 py-2 text-center text-xs font-bold text-slate-600 bg-slate-100 rounded-lg">
            Public Website
          </router-link>
          <button @click="handleLogout" class="flex-1 py-2 text-center text-xs font-bold text-red-600 bg-red-50 rounded-lg">
            Sign Out
          </button>
        </div>
      </div>

      <!-- Main Content Area -->
      <main class="flex-1 p-5 sm:p-7 lg:p-8 max-w-7xl w-full mx-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

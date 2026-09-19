<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { api, type OverviewMetrics, type DeviceItem } from '../../services/api'
import {
  PhArrowsClockwise,
  PhWarningCircle,
  PhArrowSquareOut
} from '@phosphor-icons/vue'

const metrics = ref<OverviewMetrics | null>(null)
const recentDevices = ref<DeviceItem[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const lastRefreshed = ref<Date>(new Date())

const loadData = async () => {
  isLoading.value = true
  error.value = null
  try {
    const [overviewData, devicesData] = await Promise.all([
      api.getOverview(),
      api.getDevices({ page: 1, limit: 6 })
    ])
    metrics.value = overviewData
    recentDevices.value = devicesData.devices || []
    lastRefreshed.value = new Date()
  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || 'Failed to load telemetry statistics'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadData()
})

const formatNumber = (num: number = 0) => {
  return new Intl.NumberFormat().format(num)
}

// Compute real SVG coordinates from backend dailyTraffic time series
const realChartData = computed(() => {
  const daily = metrics.value?.dailyTraffic || []
  if (daily.length === 0) {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    return days.map(d => ({ day: d, queries: 0, blocks: 0, x: 0, y: 70 }))
  }

  const maxVal = Math.max(...daily.map(d => d.totalQueries), 10)
  const width = 300
  const height = 75
  const step = width / (daily.length - 1 || 1)

  return daily.map((d, i) => {
    const x = i * step
    const y = height - (d.totalQueries / maxVal) * (height - 15)
    return {
      day: d.dayLabel,
      date: d.date,
      queries: d.totalQueries,
      blocks: d.blockedQueries,
      x: Math.round(x),
      y: Math.round(Math.max(y, 10))
    }
  })
})

const svgPath = computed(() => {
  const pts = realChartData.value
  if (pts.length === 0) return ''
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i]
    const p1 = pts[i + 1]
    const cx1 = p0.x + (p1.x - p0.x) / 2
    const cy1 = p0.y
    const cx2 = p0.x + (p1.x - p0.x) / 2
    const cy2 = p1.y
    d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p1.x} ${p1.y}`
  }
  return d
})

const svgAreaPath = computed(() => {
  const base = svgPath.value
  if (!base) return ''
  const pts = realChartData.value
  const lastX = pts[pts.length - 1]?.x || 300
  return `${base} L ${lastX} 80 L 0 80 Z`
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Telemetry Overview</h1>
        <p class="text-xs text-slate-500 mt-0.5">Aggregated production metrics for DNS queries, blocked threats, and active devices</p>
      </div>

      <div class="flex items-center gap-2.5">
        <span class="text-xs text-slate-400 hidden sm:inline">
          Updated: <span class="font-mono text-slate-700 font-semibold">{{ lastRefreshed.toLocaleTimeString() }}</span>
        </span>
        <button
          @click="loadData"
          :disabled="isLoading"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
        >
          <PhArrowsClockwise :size="14" :class="{ 'animate-spin': isLoading }" weight="bold" />
          <span>Refresh</span>
        </button>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between text-red-700 text-xs">
      <div class="flex items-center gap-2">
        <PhWarningCircle :size="16" class="shrink-0" />
        <span>{{ error }}</span>
      </div>
      <button @click="loadData" class="font-bold underline hover:text-red-900 cursor-pointer">Retry</button>
    </div>

    <!-- Top Section: StartUI Featured Split Card + 4 Metric Tiles -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <!-- ─── 1. Featured Split Blue Card (Left 7-Cols) ─── -->
      <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col md:flex-row min-h-[220px]">
        <!-- Dark Slate Summary Panel -->
        <div class="md:w-5/12 bg-slate-900 text-white p-5 flex flex-col justify-between relative">
          <div>
            <div class="text-[10px] font-bold tracking-wider text-slate-400 uppercase">DNS Queries (7-Day)</div>
            <div class="mt-2 text-3xl font-black tracking-tight text-white font-mono">
              {{ metrics ? formatNumber(metrics.queries.total7d) : '0' }}
            </div>
            <div class="text-xs text-slate-400 mt-0.5">Total Ingested Traffic</div>
          </div>

          <div class="space-y-2 mt-4 pt-4 border-t border-slate-800 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-blue-400 font-bold flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-blue-400"></span>
                Safe Queries
              </span>
              <span class="font-mono text-slate-200 font-bold">
                {{ metrics ? formatNumber(metrics.queries.total7d - metrics.queries.blocked7d) : 0 }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-red-400 font-bold flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-red-400"></span>
                Threat Queries
              </span>
              <span class="font-mono text-slate-200 font-bold">
                {{ metrics ? formatNumber(metrics.queries.blocked7d) : 0 }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-emerald-400 font-bold flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                Block Rate
              </span>
              <span class="font-mono text-slate-200 font-bold">
                {{ metrics ? metrics.queries.blockRatePercent : 0 }}%
              </span>
            </div>
          </div>
        </div>

        <!-- Vibrant Blue Time-Series Panel -->
        <div class="md:w-7/12 bg-gradient-to-br from-blue-500 to-blue-600 text-white p-5 flex flex-col justify-between relative">
          <!-- Weekday Labels Header -->
          <div class="flex items-center justify-between text-[10px] font-extrabold tracking-wider uppercase text-blue-100/90 pb-2 border-b border-blue-400/40">
            <span v-for="p in realChartData" :key="p.day">{{ p.day }}</span>
          </div>

          <!-- Real Spline Area SVG -->
          <div class="my-3 h-24 relative flex items-end">
            <!-- Grid Lines -->
            <div class="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div class="border-b border-white border-dashed"></div>
              <div class="border-b border-white border-dashed"></div>
              <div class="border-b border-white border-dashed"></div>
            </div>

            <!-- Real Curve -->
            <svg class="w-full h-full overflow-visible" viewBox="0 0 300 80" preserveAspectRatio="none">
              <defs>
                <linearGradient id="realGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3" />
                  <stop offset="100%" stop-color="#ffffff" stop-opacity="0.0" />
                </linearGradient>
              </defs>
              <path :d="svgAreaPath" fill="url(#realGrad)" />
              <path :d="svgPath" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
              <circle
                v-for="p in realChartData"
                :key="p.day"
                :cx="p.x"
                :cy="p.y"
                r="3.5"
                fill="#ffffff"
              />
            </svg>
          </div>

          <!-- Bottom Label -->
          <div class="flex items-center justify-between text-xs font-bold text-blue-50">
            <span>Daily Query Volume</span>
            <span class="text-[11px] px-2 py-0.5 rounded bg-blue-700/50 font-mono">Real-Time</span>
          </div>
        </div>
      </div>

      <!-- ─── 2. 4 Metric Tiles (Right 5-Cols 2x2 Grid) ─── -->
      <div class="lg:col-span-5 grid grid-cols-2 gap-4">
        <!-- 🔴 Card 1: Red (Threats Blocked) -->
        <div class="bg-[#ef4444] rounded-2xl p-4 text-white shadow-xs flex flex-col justify-between min-h-[105px]">
          <div>
            <div class="text-3xl sm:text-4xl font-black tracking-tight leading-none font-mono">
              {{ metrics ? formatNumber(metrics.queries.blocked7d) : '0' }}
            </div>
            <div class="text-xs font-semibold text-red-100 mt-1">Blocked Queries</div>
          </div>
          <div class="flex items-center justify-between text-[11px] font-bold text-red-100 mt-2 pt-2 border-t border-red-400/40">
            <span>Threat Block Rate</span>
            <span class="font-mono text-white">{{ metrics ? metrics.queries.blockRatePercent : 0 }}%</span>
          </div>
        </div>

        <!-- 🟣 Card 2: Purple (24h Active Devices) -->
        <div class="bg-[#8b5cf6] rounded-2xl p-4 text-white shadow-xs flex flex-col justify-between min-h-[105px]">
          <div>
            <div class="text-3xl sm:text-4xl font-black tracking-tight leading-none font-mono">
              {{ metrics ? formatNumber(metrics.devices.active24h) : '0' }}
            </div>
            <div class="text-xs font-semibold text-purple-100 mt-1">Active Devices (24h)</div>
          </div>
          <div class="flex items-center justify-between text-[11px] font-bold text-purple-100 mt-2 pt-2 border-t border-purple-400/40">
            <span>Daily Active Users</span>
            <span class="font-mono text-white">DAU</span>
          </div>
        </div>

        <!-- 🟡 Card 3: Amber (Total Enrolled Devices) -->
        <div class="bg-[#f59e0b] rounded-2xl p-4 text-white shadow-xs flex flex-col justify-between min-h-[105px]">
          <div>
            <div class="text-3xl sm:text-4xl font-black tracking-tight leading-none font-mono">
              {{ metrics ? formatNumber(metrics.devices.total) : '0' }}
            </div>
            <div class="text-xs font-semibold text-amber-100 mt-1">Total Devices</div>
          </div>
          <div class="flex items-center justify-between text-[11px] font-bold text-amber-100 mt-2 pt-2 border-t border-amber-400/40">
            <span>Registered UUIDs</span>
            <span class="font-mono text-white">Total</span>
          </div>
        </div>

        <!-- 🟢 Card 4: Emerald (7d Active Devices) -->
        <div class="bg-[#10b981] rounded-2xl p-4 text-white shadow-xs flex flex-col justify-between min-h-[105px]">
          <div>
            <div class="text-3xl sm:text-4xl font-black tracking-tight leading-none font-mono">
              {{ metrics ? formatNumber(metrics.devices.active7d) : '0' }}
            </div>
            <div class="text-xs font-semibold text-emerald-100 mt-1">Active Devices (7d)</div>
          </div>
          <div class="flex items-center justify-between text-[11px] font-bold text-emerald-100 mt-2 pt-2 border-t border-emerald-400/40">
            <span>Weekly Active Users</span>
            <span class="font-mono text-white">WAU</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── Bottom Row: 2 Clean Tables ─── -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <!-- Left Table: Recent Device Activity -->
      <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h2 class="text-xs font-extrabold uppercase tracking-wider text-slate-800">Recent Connected Devices</h2>
            <span class="px-2 py-0.5 text-[10px] font-extrabold bg-slate-100 text-slate-600 rounded-md">Live</span>
          </div>

          <router-link to="/admin/devices" class="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
            <span>View All Devices</span>
            <PhArrowSquareOut :size="13" />
          </router-link>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <th class="py-2.5 px-4">Status</th>
                <th class="py-2.5 px-4">Device Model</th>
                <th class="py-2.5 px-4">Device UUID</th>
                <th class="py-2.5 px-4">Last Seen</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-if="isLoading" v-for="i in 4" :key="i" class="animate-pulse">
                <td colspan="4" class="py-3 px-4"><div class="h-5 bg-slate-100 rounded"></div></td>
              </tr>

              <tr v-else-if="recentDevices.length === 0">
                <td colspan="4" class="py-8 text-center text-slate-400 font-medium">
                  No active mobile devices connected yet.
                </td>
              </tr>

              <tr
                v-else
                v-for="device in recentDevices"
                :key="device.id"
                class="hover:bg-slate-50/80 transition-colors"
              >
                <!-- Status -->
                <td class="py-2.5 px-4">
                  <div class="flex items-center gap-1">
                    <span class="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-500 text-white shadow-2xs">
                      DoH
                    </span>
                    <span
                      class="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase"
                      :class="device.lastHeartbeat?.shieldEnabled
                        ? 'bg-emerald-500 text-white shadow-2xs'
                        : 'bg-slate-200 text-slate-700'"
                    >
                      {{ device.lastHeartbeat?.shieldEnabled ? 'Shield Active' : 'Shield Off' }}
                    </span>
                  </div>
                </td>

                <!-- Device Model -->
                <td class="py-2.5 px-4 font-bold text-slate-800">
                  {{ device.deviceModel || 'Android Device' }}
                  <span class="text-[10px] text-slate-400 font-normal block font-mono">{{ device.osVersion }}</span>
                </td>

                <!-- UUID -->
                <td class="py-2.5 px-4 font-mono text-[11px] text-slate-500 truncate max-w-[130px]" :title="device.id">
                  {{ device.id }}
                </td>

                <!-- Date -->
                <td class="py-2.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                  {{ new Date(device.lastSeenAt).toLocaleTimeString() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right Card: DNS Resolver Distribution -->
      <div class="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
        <div>
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <h2 class="text-xs font-extrabold uppercase tracking-wider text-slate-800">DNS Resolver Distribution</h2>
            <router-link to="/admin/dns-servers" class="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
              <span>Manage Upstreams</span>
              <PhArrowSquareOut :size="13" />
            </router-link>
          </div>

          <div class="p-5 space-y-3.5">
            <div
              v-if="!metrics || Object.keys(metrics.providerDistribution).length === 0"
              class="py-8 text-center text-slate-400 text-xs"
            >
              No DNS resolver usage recorded yet.
            </div>

            <div
              v-else
              v-for="(count, provider) in metrics.providerDistribution"
              :key="provider"
              class="space-y-1"
            >
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-slate-800">{{ provider || 'Default Upstream' }}</span>
                <span class="font-mono text-slate-500 font-semibold">
                  {{ count }} clients ({{ ((count / metrics.devices.total) * 100).toFixed(0) }}%)
                </span>
              </div>
              <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                  :style="{ width: `${Math.min(((count / metrics.devices.total) * 100), 100)}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Active Protocol</span>
          <span class="font-bold text-slate-800">DNS-over-HTTPS (DoH)</span>
        </div>
      </div>
    </div>
  </div>
</template>

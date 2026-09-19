<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { api, type HeartbeatLogItem } from '../../services/api'
import {
  PhActivity,
  PhArrowsClockwise,
  PhPlay,
  PhPause,
  PhCode,
  PhX,
  PhMagnifyingGlass,
  PhDownloadSimple,
  PhCaretLeft,
  PhCaretRight
} from '@phosphor-icons/vue'

const logs = ref<HeartbeatLogItem[]>([])
const total = ref(0)
const page = ref(1)
const limit = ref(20)
const totalPages = ref(1)
const isLoading = ref(true)
const isAutoPolling = ref(true)
const pollIntervalMs = ref(5000)
const selectedLog = ref<HeartbeatLogItem | null>(null)
let pollTimer: any = null

// Filter states
const searchQuery = ref('')
const shieldFilter = ref('ALL')
const providerFilter = ref('ALL')

const loadHeartbeats = async (silent = false) => {
  if (!silent) isLoading.value = true
  try {
    const shieldParam = shieldFilter.value === 'ACTIVE' ? 'true' : shieldFilter.value === 'STANDBY' ? 'false' : undefined
    const providerParam = providerFilter.value !== 'ALL' ? providerFilter.value : undefined

    const data = await api.getHeartbeats({
      page: page.value,
      limit: limit.value,
      search: searchQuery.value.trim() || undefined,
      shieldEnabled: shieldParam,
      provider: providerParam,
    })

    logs.value = data.heartbeats || []
    total.value = data.total || 0
    totalPages.value = data.totalPages || 1
  } catch (err) {
    console.error('Failed to load heartbeats stream:', err)
  } finally {
    if (!silent) isLoading.value = false
  }
}

const togglePolling = () => {
  isAutoPolling.value = !isAutoPolling.value
  if (isAutoPolling.value) {
    startPoll()
  } else {
    stopPoll()
  }
}

const startPoll = () => {
  stopPoll()
  if (!isAutoPolling.value) return
  pollTimer = setInterval(() => {
    loadHeartbeats(true)
  }, pollIntervalMs.value)
}

const stopPoll = () => {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

let searchDebounce: any = null
watch(searchQuery, () => {
  if (searchDebounce) clearTimeout(searchDebounce)
  searchDebounce = setTimeout(() => {
    page.value = 1
    loadHeartbeats()
  }, 350)
})

watch([shieldFilter, providerFilter, page, limit], () => {
  loadHeartbeats()
})

watch(pollIntervalMs, () => {
  if (isAutoPolling.value) {
    startPoll()
  }
})

onMounted(() => {
  loadHeartbeats()
  if (isAutoPolling.value) startPoll()
})

onUnmounted(() => {
  stopPoll()
})

const timeAgo = (iso: string) => {
  if (!iso) return 'N/A'
  const diff = Date.now() - new Date(iso).getTime()
  const secs = Math.floor(diff / 1000)
  if (secs < 5) return 'Just now'
  if (secs < 60) return `${secs}s ago`
  const mins = Math.floor(secs / 60)
  if (mins < 60) return `${mins}m ago`
  return `${Math.floor(mins / 60)}h ago`
}

// KPI stream stats from current loaded page
const streamStats = computed(() => {
  const count = logs.value.length
  if (count === 0) return { count: 0, totalQueries: 0, blockedQueries: 0, blockRate: 0, uniqueDevices: 0 }

  const totalQueries = logs.value.reduce((acc, curr) => acc + (curr.totalQueries || 0), 0)
  const blockedQueries = logs.value.reduce((acc, curr) => acc + (curr.blockedQueries || 0), 0)
  const blockRate = totalQueries > 0 ? Math.round((blockedQueries / totalQueries) * 100) : 0
  const uniqueDevices = new Set(logs.value.map(l => l.deviceId)).size

  return { count, totalQueries, blockedQueries, blockRate, uniqueDevices }
})

const exportStreamJSON = () => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs.value, null, 2))
  const downloadAnchor = document.createElement('a')
  downloadAnchor.setAttribute('href', dataStr)
  downloadAnchor.setAttribute('download', `dnsly_telemetry_page${page.value}_${Date.now()}.json`)
  document.body.appendChild(downloadAnchor)
  downloadAnchor.click()
  downloadAnchor.remove()
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <div class="flex items-center gap-2.5">
          <h1 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Real-Time Telemetry Stream</h1>
          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
            :class="isAutoPolling
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-slate-200 text-slate-700'"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="isAutoPolling ? 'bg-emerald-500 animate-ping' : 'bg-slate-500'"></span>
            {{ isAutoPolling ? `Polling (${pollIntervalMs / 1000}s)` : 'Paused' }}
          </span>
        </div>
        <p class="text-xs text-slate-500 mt-0.5">Paginated historical and real-time telemetry packets transmitted by mobile DNS clients</p>
      </div>

      <div class="flex items-center gap-2.5">
        <!-- Interval Selector -->
        <select
          v-model="pollIntervalMs"
          :disabled="!isAutoPolling"
          class="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-bold focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer"
        >
          <option :value="2000">Live (2s)</option>
          <option :value="5000">Standard (5s)</option>
          <option :value="10000">Relaxed (10s)</option>
          <option :value="30000">Slow (30s)</option>
        </select>

        <button
          @click="togglePolling"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer"
          :class="isAutoPolling
            ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
            : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'"
        >
          <PhPause v-if="isAutoPolling" :size="14" weight="bold" />
          <PhPlay v-else :size="14" weight="bold" />
          <span>{{ isAutoPolling ? 'Pause Stream' : 'Resume' }}</span>
        </button>

        <button
          @click="exportStreamJSON"
          class="p-2 bg-white hover:bg-slate-50 text-slate-600 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          title="Export Page JSON"
        >
          <PhDownloadSimple :size="15" />
        </button>

        <button
          @click="loadHeartbeats(false)"
          :disabled="isLoading"
          class="p-2 bg-white hover:bg-slate-50 text-slate-600 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          title="Refresh stream"
        >
          <PhArrowsClockwise :size="15" :class="{ 'animate-spin': isLoading }" />
        </button>
      </div>
    </div>

    <!-- Live Stream KPI Summary Row -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div class="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div class="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Total Recorded Packets</div>
        <div class="text-2xl font-black text-slate-900 mt-1 font-mono">{{ total.toLocaleString() }}</div>
        <div class="text-[11px] text-slate-500 mt-0.5">Historical Heartbeats</div>
      </div>

      <div class="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div class="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Page Devices</div>
        <div class="text-2xl font-black text-purple-600 mt-1 font-mono">{{ streamStats.uniqueDevices }}</div>
        <div class="text-[11px] text-slate-500 mt-0.5">Active on Current Page</div>
      </div>

      <div class="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div class="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Page Block Rate</div>
        <div class="text-2xl font-black text-red-500 mt-1 font-mono">{{ streamStats.blockRate }}%</div>
        <div class="text-[11px] text-slate-500 mt-0.5">{{ streamStats.blockedQueries.toLocaleString() }} Threats Blocked</div>
      </div>

      <div class="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div class="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Page Total Queries</div>
        <div class="text-2xl font-black text-blue-600 mt-1 font-mono">{{ streamStats.totalQueries.toLocaleString() }}</div>
        <div class="text-[11px] text-slate-500 mt-0.5">Aggregated Queries</div>
      </div>
    </div>

    <!-- Filter & Sort Control Toolbar -->
    <div class="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
      <div class="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
        <!-- Search -->
        <div class="relative flex-1 min-w-[200px] max-w-sm">
          <PhMagnifyingGlass :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by UUID, model, or provider..."
            class="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        <!-- Shield Filter -->
        <div class="flex items-center gap-1.5">
          <span class="text-slate-400 font-bold uppercase text-[10px]">Shield:</span>
          <select
            v-model="shieldFilter"
            class="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Shield Active</option>
            <option value="STANDBY">Shield Standby</option>
          </select>
        </div>

        <!-- Provider Filter -->
        <div class="flex items-center gap-1.5">
          <span class="text-slate-400 font-bold uppercase text-[10px]">Provider:</span>
          <select
            v-model="providerFilter"
            class="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Upstreams</option>
            <option value="Cloudflare">Cloudflare</option>
            <option value="AdGuard">AdGuard</option>
            <option value="Quad9">Quad9</option>
            <option value="Google">Google</option>
            <option value="NextDNS">NextDNS</option>
          </select>
        </div>
      </div>

      <!-- Page Size Selector -->
      <div class="flex items-center gap-1.5 text-slate-500">
        <span class="text-[10px] uppercase font-bold text-slate-400">Rows:</span>
        <select
          v-model="limit"
          class="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-semibold focus:outline-none focus:border-blue-500"
        >
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>
    </div>

    <!-- Feed Table (StartUI White Card) -->
    <div class="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-slate-100 bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
              <th class="py-3 px-4">Timestamp</th>
              <th class="py-3 px-4">Device Model & UUID</th>
              <th class="py-3 px-4">Provider Config</th>
              <th class="py-3 px-4">Shield Status</th>
              <th class="py-3 px-4">Total Queries</th>
              <th class="py-3 px-4">Threat Blocks</th>
              <th class="py-3 px-4 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 font-mono">
            <tr v-if="isLoading" v-for="i in 5" :key="i" class="animate-pulse">
              <td colspan="7" class="py-3 px-4"><div class="h-5 bg-slate-100 rounded"></div></td>
            </tr>

            <tr v-else-if="logs.length === 0">
              <td colspan="7" class="py-12 text-center text-slate-400 font-sans font-medium">
                No telemetry heartbeat packets match the active filter criteria.
              </td>
            </tr>

            <tr
              v-else
              v-for="log in logs"
              :key="log.id"
              class="hover:bg-slate-50/80 transition-colors"
            >
              <!-- Timestamp -->
              <td class="py-2.5 px-4 text-slate-700">
                <div class="flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span class="font-bold text-slate-900">{{ timeAgo(log.timestamp) }}</span>
                </div>
                <div class="text-[10px] text-slate-400">{{ new Date(log.timestamp).toLocaleTimeString() }}</div>
              </td>

              <!-- Device Info -->
              <td class="py-2.5 px-4 font-sans">
                <div class="font-bold text-slate-800 truncate max-w-[150px]">
                  {{ log.device?.deviceModel || 'Android Client' }}
                </div>
                <div class="text-[10px] font-mono text-slate-400 truncate max-w-[130px]" :title="log.deviceId">
                  {{ log.deviceId }}
                </div>
              </td>

              <!-- Provider -->
              <td class="py-2.5 px-4 font-sans">
                <span class="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                  {{ log.selectedProvider }}
                </span>
              </td>

              <!-- Shield (StartUI Badge style) -->
              <td class="py-2.5 px-4 font-sans">
                <span
                  v-if="log.shieldEnabled"
                  class="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500 text-white shadow-2xs"
                >
                  Active
                </span>
                <span v-else class="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-200 text-slate-700">
                  Standby
                </span>
              </td>

              <!-- Total Queries -->
              <td class="py-2.5 px-4 font-bold text-slate-800">
                {{ log.totalQueries.toLocaleString() }}
              </td>

              <!-- Blocked Queries -->
              <td class="py-2.5 px-4 font-bold text-red-600">
                {{ log.blockedQueries.toLocaleString() }}
                <span class="text-[10px] text-slate-400 font-normal">
                  ({{ log.totalQueries > 0 ? ((log.blockedQueries / log.totalQueries) * 100).toFixed(0) : 0 }}%)
                </span>
              </td>

              <!-- Action -->
              <td class="py-2.5 px-4 text-right font-sans">
                <button
                  @click="selectedLog = log"
                  class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                  title="View JSON Payload"
                >
                  <PhCode :size="14" />
                  <span>Payload</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div class="p-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div>
          Showing page <span class="font-bold text-slate-800">{{ page }}</span> of <span class="font-bold text-slate-800">{{ totalPages }}</span> ({{ total.toLocaleString() }} total packets recorded)
        </div>

        <div class="flex items-center gap-1.5">
          <button
            @click="page = Math.max(1, page - 1)"
            :disabled="page <= 1"
            class="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 shadow-2xs cursor-pointer"
          >
            <PhCaretLeft :size="14" />
          </button>
          <button
            @click="page = Math.min(totalPages, page + 1)"
            :disabled="page >= totalPages"
            class="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 shadow-2xs cursor-pointer"
          >
            <PhCaretRight :size="14" />
          </button>
        </div>
      </div>
    </div>

    <!-- Heartbeat JSON Inspector Modal -->
    <div
      v-if="selectedLog"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div class="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div class="flex items-center gap-2">
            <PhActivity :size="20" class="text-blue-600" />
            <h3 class="text-sm font-bold text-slate-900">Telemetry Packet Payload</h3>
          </div>
          <button @click="selectedLog = null" class="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100">
            <PhX :size="18" />
          </button>
        </div>

        <pre class="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-80 shadow-inner">{{ JSON.stringify(selectedLog, null, 2) }}</pre>

        <div class="flex justify-end pt-2">
          <button
            @click="selectedLog = null"
            class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

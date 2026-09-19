<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { api, type DeviceItem } from '../../services/api'
import {
  PhDeviceMobile,
  PhMagnifyingGlass,
  PhArrowsClockwise,
  PhCaretLeft,
  PhCaretRight,
  PhCode,
  PhX,
  PhClock,
  PhDownloadSimple
} from '@phosphor-icons/vue'

const devices = ref<DeviceItem[]>([])
const total = ref(0)
const page = ref(1)
const limit = ref(15)
const totalPages = ref(1)
const isLoading = ref(true)

// Filters & Sorting state
const searchQuery = ref('')
const shieldFilter = ref('ALL')
const providerFilter = ref('ALL')
const sortBy = ref('lastSeenAt_desc')
const selectedDevice = ref<DeviceItem | null>(null)

const loadDevices = async () => {
  isLoading.value = true
  try {
    const shieldParam = shieldFilter.value === 'ACTIVE' ? 'true' : shieldFilter.value === 'DISABLED' ? 'false' : undefined
    const providerParam = providerFilter.value !== 'ALL' ? providerFilter.value : undefined

    const data = await api.getDevices({
      page: page.value,
      limit: limit.value,
      search: searchQuery.value.trim() || undefined,
      shieldEnabled: shieldParam,
      provider: providerParam,
    })
    devices.value = data.devices || []
    total.value = data.total || 0
    totalPages.value = data.totalPages || 1
  } catch (err) {
    console.error('Failed to load devices list:', err)
  } finally {
    isLoading.value = false
  }
}

// Client-side sorting for current page
const sortedDevices = () => {
  const list = [...devices.value]
  switch (sortBy.value) {
    case 'lastSeenAt_desc':
      return list.sort((a, b) => new Date(b.lastSeenAt).getTime() - new Date(a.lastSeenAt).getTime())
    case 'lastSeenAt_asc':
      return list.sort((a, b) => new Date(a.lastSeenAt).getTime() - new Date(b.lastSeenAt).getTime())
    case 'queries_desc':
      return list.sort((a, b) => (b.lastHeartbeat?.totalQueries || 0) - (a.lastHeartbeat?.totalQueries || 0))
    case 'blocked_desc':
      return list.sort((a, b) => (b.lastHeartbeat?.blockedQueries || 0) - (a.lastHeartbeat?.blockedQueries || 0))
    case 'model_asc':
      return list.sort((a, b) => a.deviceModel.localeCompare(b.deviceModel))
    default:
      return list
  }
}

let searchDebounce: any = null
watch(searchQuery, () => {
  if (searchDebounce) clearTimeout(searchDebounce)
  searchDebounce = setTimeout(() => {
    page.value = 1
    loadDevices()
  }, 350)
})

watch([shieldFilter, providerFilter, page, limit], () => {
  loadDevices()
})

onMounted(() => {
  loadDevices()
})

const formatDate = (iso: string) => {
  if (!iso) return 'N/A'
  try {
    const d = new Date(iso)
    return d.toLocaleString()
  } catch {
    return iso
  }
}

const timeAgo = (iso: string) => {
  if (!iso) return 'Never'
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

const exportJSON = () => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(devices.value, null, 2))
  const downloadAnchor = document.createElement('a')
  downloadAnchor.setAttribute('href', dataStr)
  downloadAnchor.setAttribute('download', `dnsly_devices_${Date.now()}.json`)
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
        <h1 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Enrolled Mobile Devices</h1>
        <p class="text-xs text-slate-500 mt-0.5">Manage and inspect connected client hardware, operating systems, and query activity</p>
      </div>

      <div class="flex items-center gap-2.5">
        <button
          @click="exportJSON"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-200 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
          title="Export JSON"
        >
          <PhDownloadSimple :size="14" />
          <span>Export</span>
        </button>

        <button
          @click="loadDevices"
          :disabled="isLoading"
          class="p-2 bg-white hover:bg-slate-50 text-slate-600 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          title="Refresh table"
        >
          <PhArrowsClockwise :size="15" :class="{ 'animate-spin': isLoading }" />
        </button>
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
            placeholder="Search by UUID, model, OS, or country..."
            class="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        <!-- Shield Status Filter -->
        <div class="flex items-center gap-1.5">
          <span class="text-slate-400 font-bold uppercase text-[10px]">Shield:</span>
          <select
            v-model="shieldFilter"
            class="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Devices</option>
            <option value="ACTIVE">Shield Active</option>
            <option value="DISABLED">Shield Disabled</option>
          </select>
        </div>

        <!-- Sort By Dropdown -->
        <div class="flex items-center gap-1.5">
          <span class="text-slate-400 font-bold uppercase text-[10px]">Sort:</span>
          <select
            v-model="sortBy"
            class="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="lastSeenAt_desc">Latest Activity (Newest First)</option>
            <option value="lastSeenAt_asc">Oldest Activity</option>
            <option value="queries_desc">Highest Total Queries</option>
            <option value="blocked_desc">Highest Blocked Threats</option>
            <option value="model_asc">Device Model (A-Z)</option>
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
          <option :value="15">15</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <!-- Table Container -->
    <div class="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-slate-100 bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4">Device UUID</th>
              <th class="py-3 px-4">Model & Operating System</th>
              <th class="py-3 px-4">Selected Upstream</th>
              <th class="py-3 px-4">Queries / Blocked</th>
              <th class="py-3 px-4">Last Activity</th>
              <th class="py-3 px-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="isLoading" v-for="i in 5" :key="i" class="animate-pulse">
              <td colspan="7" class="py-4 px-4"><div class="h-5 bg-slate-100 rounded"></div></td>
            </tr>

            <tr v-else-if="sortedDevices().length === 0">
              <td colspan="7" class="py-12 text-center text-slate-400 font-medium">
                No mobile devices found matching the active filter criteria.
              </td>
            </tr>

            <tr
              v-else
              v-for="device in sortedDevices()"
              :key="device.id"
              class="hover:bg-slate-50/80 transition-colors"
            >
              <!-- Status Pills -->
              <td class="py-3 px-4">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold uppercase whitespace-nowrap"
                  :class="device.lastHeartbeat?.shieldEnabled
                    ? 'bg-emerald-500 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'"
                >
                  {{ device.lastHeartbeat?.shieldEnabled ? 'Shield Active' : 'Shield Off' }}
                </span>
              </td>

              <!-- UUID -->
              <td class="py-3 px-4">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <PhDeviceMobile :size="16" />
                  </div>
                  <div>
                    <div class="font-mono font-bold text-slate-800 truncate max-w-[140px]" :title="device.id">
                      {{ device.id }}
                    </div>
                    <div class="text-[10px] text-slate-400">App v{{ device.appVersion }} • {{ device.countryCode }}</div>
                  </div>
                </div>
              </td>

              <!-- Model & OS -->
              <td class="py-3 px-4">
                <div class="font-bold text-slate-800">{{ device.deviceModel }}</div>
                <div class="text-[10px] text-slate-400 font-mono">{{ device.osVersion }}</div>
              </td>

              <!-- Provider -->
              <td class="py-3 px-4">
                <span class="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                  {{ device.lastHeartbeat?.selectedProvider || 'Default' }}
                </span>
              </td>

              <!-- Queries -->
              <td class="py-3 px-4 font-mono">
                <div class="text-slate-800 font-bold">
                  {{ (device.lastHeartbeat?.totalQueries || 0).toLocaleString() }}
                  <span class="text-red-500 font-normal">({{ (device.lastHeartbeat?.blockedQueries || 0).toLocaleString() }})</span>
                </div>
                <div class="text-[10px] text-slate-400">
                  {{
                    device.lastHeartbeat?.totalQueries
                      ? (((device.lastHeartbeat.blockedQueries || 0) / device.lastHeartbeat.totalQueries) * 100).toFixed(0)
                      : 0
                  }}% block rate
                </div>
              </td>

              <!-- Last Active -->
              <td class="py-3 px-4 text-slate-600">
                <div class="flex items-center gap-1 text-[11px] font-medium">
                  <PhClock :size="12" class="text-slate-400" />
                  <span>{{ timeAgo(device.lastSeenAt) }}</span>
                </div>
                <div class="text-[10px] text-slate-400 font-mono">{{ formatDate(device.lastSeenAt) }}</div>
              </td>

              <!-- Action -->
              <td class="py-3 px-4 text-right">
                <button
                  @click="selectedDevice = device"
                  class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <PhCode :size="13" />
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
          Showing page <span class="font-bold text-slate-800">{{ page }}</span> of <span class="font-bold text-slate-800">{{ totalPages }}</span> ({{ total }} enrolled devices)
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

    <!-- Inspector Modal -->
    <div
      v-if="selectedDevice"
      class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div class="bg-white border border-slate-200 rounded-t-3xl sm:rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <PhDeviceMobile :size="20" />
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">{{ selectedDevice.deviceModel }}</h3>
              <p class="text-xs font-mono text-slate-400">{{ selectedDevice.id }}</p>
            </div>
          </div>
          <button
            @click="selectedDevice = null"
            class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <PhX :size="18" />
          </button>
        </div>

        <div>
          <div class="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Raw Telemetry Packet</div>
          <pre class="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-80 shadow-inner">{{ JSON.stringify(selectedDevice, null, 2) }}</pre>
        </div>

        <div class="flex justify-end pt-2">
          <button
            @click="selectedDevice = null"
            class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

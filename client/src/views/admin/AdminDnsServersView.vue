<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { api, type DnsServerConfigItem } from '../../services/api'
import {
  PhGlobeHemisphereWest,
  PhPlus,
  PhTrash,
  PhPencilSimple,
  PhX,
  PhToggleLeft,
  PhToggleRight,
  PhArrowsClockwise,
  PhMagnifyingGlass
} from '@phosphor-icons/vue'

const servers = ref<DnsServerConfigItem[]>([])
const isLoading = ref(true)
const showModal = ref(false)
const editingServer = ref<Partial<DnsServerConfigItem> | null>(null)
const isSaving = ref(false)

// Filters
const searchQuery = ref('')
const categoryFilter = ref('ALL')
const statusFilter = ref('ALL')

const loadServers = async () => {
  isLoading.value = true
  try {
    servers.value = await api.getDnsServers()
  } catch (err) {
    console.error('Failed to load DNS server configs:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadServers()
})

const filteredServers = computed(() => {
  return servers.value.filter((s) => {
    const matchesSearch = !searchQuery.value.trim() ||
      s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      s.primaryIp.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (s.dohUrl || '').toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = categoryFilter.value === 'ALL' || s.category.toUpperCase() === categoryFilter.value
    const matchesStatus = statusFilter.value === 'ALL' ||
      (statusFilter.value === 'ACTIVE' && s.isEnabled) ||
      (statusFilter.value === 'DISABLED' && !s.isEnabled)

    return matchesSearch && matchesCategory && matchesStatus
  })
})

const openAddModal = () => {
  editingServer.value = {
    name: '',
    primaryIp: '',
    secondaryIp: '',
    hostname: '',
    dohUrl: '',
    category: 'SECURITY',
    isDefault: false,
    isEnabled: true,
    order: servers.value.length + 1,
  }
  showModal.value = true
}

const openEditModal = (item: DnsServerConfigItem) => {
  editingServer.value = { ...item }
  showModal.value = true
}

const toggleServer = async (server: DnsServerConfigItem) => {
  try {
    const updated = await api.updateDnsServer(server.id, { isEnabled: !server.isEnabled })
    const idx = servers.value.findIndex((s) => s.id === server.id)
    if (idx !== -1) {
      servers.value[idx] = updated
    }
  } catch (err) {
    console.error('Failed to toggle server:', err)
  }
}

const deleteServer = async (id: string) => {
  if (!confirm(`Are you sure you want to delete "${servers.value.find(s => s.id === id)?.name}"?`)) return
  try {
    await api.deleteDnsServer(id)
    servers.value = servers.value.filter((s) => s.id !== id)
  } catch (err) {
    console.error('Failed to delete DNS server:', err)
  }
}

const saveServer = async () => {
  if (!editingServer.value || !editingServer.value.name || !editingServer.value.primaryIp) return
  isSaving.value = true
  try {
    if (editingServer.value.id) {
      const updated = await api.updateDnsServer(editingServer.value.id, editingServer.value)
      const idx = servers.value.findIndex((s) => s.id === updated.id)
      if (idx !== -1) servers.value[idx] = updated
    } else {
      const created = await api.createDnsServer(editingServer.value)
      servers.value.push(created)
    }
    showModal.value = false
    editingServer.value = null
  } catch (err) {
    console.error('Failed to save DNS server config:', err)
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">DNS Upstream Resolvers</h1>
        <p class="text-xs text-slate-500 mt-0.5">Configure DoH / DoT endpoints and IP addresses distributed to client devices</p>
      </div>

      <div class="flex items-center gap-2.5">
        <button
          @click="loadServers"
          :disabled="isLoading"
          class="p-2 bg-white hover:bg-slate-50 text-slate-600 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
        >
          <PhArrowsClockwise :size="15" :class="{ 'animate-spin': isLoading }" />
        </button>

        <button
          @click="openAddModal"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
        >
          <PhPlus :size="14" weight="bold" />
          <span>Add Resolver</span>
        </button>
      </div>
    </div>

    <!-- Filter Control Toolbar -->
    <div class="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
      <div class="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
        <!-- Search -->
        <div class="relative flex-1 min-w-[200px] max-w-sm">
          <PhMagnifyingGlass :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by provider name, IP, or DoH URL..."
            class="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        <!-- Category Filter -->
        <div class="flex items-center gap-1.5">
          <span class="text-slate-400 font-bold uppercase text-[10px]">Category:</span>
          <select
            v-model="categoryFilter"
            class="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Categories</option>
            <option value="SECURITY">Security</option>
            <option value="PRIVACY">Privacy</option>
            <option value="FAMILY">Family</option>
            <option value="PUBLIC">Public</option>
            <option value="CUSTOM">Custom</option>
          </select>
        </div>

        <!-- Status Filter -->
        <div class="flex items-center gap-1.5">
          <span class="text-slate-400 font-bold uppercase text-[10px]">Status:</span>
          <select
            v-model="statusFilter"
            class="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="DISABLED">Disabled</option>
          </select>
        </div>
      </div>

      <div class="text-xs text-slate-400 font-medium">
        Showing <span class="font-bold text-slate-700">{{ filteredServers.length }}</span> resolvers
      </div>
    </div>

    <!-- Servers Grid -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="i in 6" :key="i" class="h-44 rounded-2xl bg-white border border-slate-200 animate-pulse"></div>
    </div>

    <div v-else-if="filteredServers.length === 0" class="py-16 text-center bg-white rounded-2xl border border-slate-200">
      <PhGlobeHemisphereWest :size="36" class="mx-auto text-slate-400 mb-2" />
      <div class="text-slate-600 font-semibold text-sm">No DNS resolvers matching filter criteria.</div>
      <button @click="openAddModal" class="mt-2 text-xs text-blue-600 font-bold hover:underline">Add new resolver</button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="server in filteredServers"
        :key="server.id"
        class="bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between transition-all"
        :class="server.isEnabled ? 'border-slate-200 hover:shadow-md hover:border-blue-200' : 'border-slate-200/60 opacity-60 bg-slate-50'"
      >
        <div>
          <!-- Header -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <PhGlobeHemisphereWest :size="20" weight="bold" />
              </div>
              <div>
                <h3 class="font-bold text-slate-900 text-sm">{{ server.name }}</h3>
                <span class="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {{ server.category }}
                </span>
              </div>
            </div>

            <span v-if="server.isDefault" class="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-extrabold">
              Default
            </span>
          </div>

          <!-- IP & DoH Details -->
          <div class="mt-4 space-y-2 text-xs font-mono">
            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span class="text-slate-400 text-[10px] uppercase font-bold">Primary IP</span>
              <span class="text-slate-800 font-bold">{{ server.primaryIp }}</span>
            </div>

            <div v-if="server.secondaryIp" class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span class="text-slate-400 text-[10px] uppercase font-bold">Secondary IP</span>
              <span class="text-slate-600">{{ server.secondaryIp }}</span>
            </div>

            <div v-if="server.dohUrl" class="p-2 rounded-lg bg-slate-50 border border-slate-100 truncate" :title="server.dohUrl">
              <div class="text-slate-400 text-[10px] uppercase font-bold mb-0.5">DoH Endpoint</div>
              <div class="text-blue-600 text-[11px] truncate font-semibold">{{ server.dohUrl }}</div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
          <button
            @click="toggleServer(server)"
            class="text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            :class="server.isEnabled ? 'text-emerald-600 hover:text-emerald-700' : 'text-slate-400 hover:text-slate-600'"
          >
            <PhToggleRight v-if="server.isEnabled" :size="22" weight="fill" />
            <PhToggleLeft v-else :size="22" />
            <span>{{ server.isEnabled ? 'Active Resolver' : 'Disabled' }}</span>
          </button>

          <div class="flex items-center gap-1">
            <button
              @click="openEditModal(server)"
              class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              title="Edit"
            >
              <PhPencilSimple :size="16" />
            </button>
            <button
              @click="deleteServer(server.id)"
              class="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <PhTrash :size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal && editingServer"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div class="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="text-base font-bold text-slate-900">
            {{ editingServer.id ? 'Edit Upstream Resolver' : 'Add New Upstream Resolver' }}
          </h3>
          <button @click="showModal = false" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100">
            <PhX :size="18" />
          </button>
        </div>

        <form @submit.prevent="saveServer" class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Resolver Name *</label>
            <input
              v-model="editingServer.name"
              type="text"
              required
              placeholder="e.g. Quad9 DNS (Malware Protection)"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Primary IPv4 *</label>
              <input
                v-model="editingServer.primaryIp"
                type="text"
                required
                placeholder="9.9.9.9"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Secondary IPv4</label>
              <input
                v-model="editingServer.secondaryIp"
                type="text"
                placeholder="149.112.112.112"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">DoH URL (DNS-over-HTTPS)</label>
            <input
              v-model="editingServer.dohUrl"
              type="url"
              placeholder="https://dns.quad9.net/dns-query"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Category</label>
            <select
              v-model="editingServer.category"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
            >
              <option value="SECURITY">Security</option>
              <option value="PRIVACY">Privacy</option>
              <option value="FAMILY">Family</option>
              <option value="PUBLIC">Public</option>
              <option value="CUSTOM">Custom</option>
            </select>
          </div>

          <div class="flex items-center gap-6 pt-1">
            <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input v-model="editingServer.isEnabled" type="checkbox" class="rounded text-blue-600" />
              <span>Active for Clients</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input v-model="editingServer.isDefault" type="checkbox" class="rounded text-blue-600" />
              <span>Default Preset</span>
            </label>
          </div>

          <div class="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSaving"
              class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold disabled:opacity-50"
            >
              {{ isSaving ? 'Saving...' : 'Save Resolver' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { api, type BlocklistConfigItem } from '../../services/api'
import {
  PhPlus,
  PhTrash,
  PhPencilSimple,
  PhArrowsClockwise,
  PhX,
  PhLink,
  PhMagnifyingGlass,
  PhListChecks
} from '@phosphor-icons/vue'

const blocklists = ref<BlocklistConfigItem[]>([])
const isLoading = ref(true)
const showModal = ref(false)
const editingItem = ref<Partial<BlocklistConfigItem> | null>(null)
const isSaving = ref(false)

// Interactive controls
const searchQuery = ref('')
const categoryFilter = ref('ALL')
const statusFilter = ref('ALL')
const sortBy = ref('rules_desc')

const loadBlocklists = async () => {
  isLoading.value = true
  try {
    blocklists.value = await api.getBlocklists()
  } catch (err) {
    console.error('Failed to load blocklists:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadBlocklists()
})

const filteredBlocklists = computed(() => {
  const list = blocklists.value.filter((b) => {
    const matchesSearch = !searchQuery.value.trim() ||
      b.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      b.url.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (b.description || '').toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = categoryFilter.value === 'ALL' || b.category.toUpperCase() === categoryFilter.value
    const matchesStatus = statusFilter.value === 'ALL' ||
      (statusFilter.value === 'ACTIVE' && b.isEnabled) ||
      (statusFilter.value === 'DISABLED' && !b.isEnabled)

    return matchesSearch && matchesCategory && matchesStatus
  })

  return list.sort((a, b) => {
    switch (sortBy.value) {
      case 'rules_desc':
        return (b.ruleCount || 0) - (a.ruleCount || 0)
      case 'rules_asc':
        return (a.ruleCount || 0) - (b.ruleCount || 0)
      case 'name_asc':
        return a.name.localeCompare(b.name)
      case 'name_desc':
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })
})

// KPI Computations
const totalRules = computed(() => {
  return blocklists.value.reduce((acc, curr) => acc + (curr.isEnabled ? (curr.ruleCount || 0) : 0), 0)
})

const activeCount = computed(() => {
  return blocklists.value.filter(b => b.isEnabled).length
})

const openAddModal = () => {
  editingItem.value = {
    name: '',
    url: '',
    category: 'ADS',
    description: '',
    ruleCount: 0,
    isEnabled: true,
    order: blocklists.value.length + 1,
  }
  showModal.value = true
}

const openEditModal = (item: BlocklistConfigItem) => {
  editingItem.value = { ...item }
  showModal.value = true
}

const toggleBlocklist = async (item: BlocklistConfigItem) => {
  try {
    const updated = await api.updateBlocklist(item.id, { isEnabled: !item.isEnabled })
    const idx = blocklists.value.findIndex((b) => b.id === item.id)
    if (idx !== -1) blocklists.value[idx] = updated
  } catch (err) {
    console.error('Failed to toggle blocklist:', err)
  }
}

const deleteBlocklist = async (id: string) => {
  if (!confirm('Are you sure you want to remove this blocklist feed?')) return
  try {
    await api.deleteBlocklist(id)
    blocklists.value = blocklists.value.filter((b) => b.id !== id)
  } catch (err) {
    console.error('Failed to delete blocklist:', err)
  }
}

const saveBlocklist = async () => {
  if (!editingItem.value || !editingItem.value.name || !editingItem.value.url) return
  isSaving.value = true
  try {
    if (editingItem.value.id) {
      const updated = await api.updateBlocklist(editingItem.value.id, editingItem.value)
      const idx = blocklists.value.findIndex((b) => b.id === updated.id)
      if (idx !== -1) blocklists.value[idx] = updated
    } else {
      const created = await api.createBlocklist(editingItem.value)
      blocklists.value.push(created)
    }
    showModal.value = false
    editingItem.value = null
  } catch (err) {
    console.error('Failed to save blocklist:', err)
  } finally {
    isSaving.value = false
  }
}

const getCategoryBadgeClass = (category: string) => {
  switch (category?.toUpperCase()) {
    case 'ADS':
      return 'bg-blue-50 text-blue-700 border-blue-200'
    case 'TRACKING':
      return 'bg-purple-50 text-purple-700 border-purple-200'
    case 'SECURITY':
      return 'bg-red-50 text-red-700 border-red-200'
    case 'SCAMS':
      return 'bg-amber-50 text-amber-700 border-amber-200'
    case 'CONTENT':
      return 'bg-pink-50 text-pink-700 border-pink-200'
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Security & Ad Blocklists</h1>
        <p class="text-xs text-slate-500 mt-0.5">Manage domain hostlist filters synced to client devices for local offline DNS blocking</p>
      </div>

      <div class="flex items-center gap-2.5">
        <button
          @click="loadBlocklists"
          :disabled="isLoading"
          class="p-2 bg-white hover:bg-slate-50 text-slate-600 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          title="Refresh feeds"
        >
          <PhArrowsClockwise :size="15" :class="{ 'animate-spin': isLoading }" />
        </button>

        <button
          @click="openAddModal"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
        >
          <PhPlus :size="14" weight="bold" />
          <span>Add Blocklist Feed</span>
        </button>
      </div>
    </div>

    <!-- KPI Summary Row -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div class="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div class="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Total Feeds</div>
        <div class="text-2xl font-black text-slate-900 mt-1 font-mono">{{ blocklists.length }}</div>
        <div class="text-[11px] text-slate-500 mt-0.5">Configured Sources</div>
      </div>

      <div class="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div class="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Active Rules</div>
        <div class="text-2xl font-black text-blue-600 mt-1 font-mono">{{ totalRules.toLocaleString() }}</div>
        <div class="text-[11px] text-slate-500 mt-0.5">Active Block Rules</div>
      </div>

      <div class="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div class="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Active Feeds</div>
        <div class="text-2xl font-black text-emerald-600 mt-1 font-mono">{{ activeCount }}</div>
        <div class="text-[11px] text-slate-500 mt-0.5">Enabled for Sync</div>
      </div>

      <div class="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div class="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Feed Categories</div>
        <div class="text-2xl font-black text-purple-600 mt-1 font-mono">5</div>
        <div class="text-[11px] text-slate-500 mt-0.5">Ads, Trackers, Malware</div>
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
            placeholder="Search feeds by name, description, or URL..."
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
            <option value="ADS">Advertising</option>
            <option value="TRACKING">Tracking & Telemetry</option>
            <option value="SECURITY">Security & Malware</option>
            <option value="SCAMS">Scams & Fraud</option>
            <option value="CONTENT">Content & Safety</option>
          </select>
        </div>

        <!-- Status Filter -->
        <div class="flex items-center gap-1.5">
          <span class="text-slate-400 font-bold uppercase text-[10px]">Status:</span>
          <select
            v-model="statusFilter"
            class="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Feeds</option>
            <option value="ACTIVE">Active Only</option>
            <option value="DISABLED">Disabled Only</option>
          </select>
        </div>

        <!-- Sort By -->
        <div class="flex items-center gap-1.5">
          <span class="text-slate-400 font-bold uppercase text-[10px]">Sort:</span>
          <select
            v-model="sortBy"
            class="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="rules_desc">Highest Rule Count</option>
            <option value="rules_asc">Lowest Rule Count</option>
            <option value="name_asc">Feed Name (A-Z)</option>
            <option value="name_desc">Feed Name (Z-A)</option>
          </select>
        </div>
      </div>

      <div class="text-xs text-slate-400 font-medium">
        Showing <span class="font-bold text-slate-700">{{ filteredBlocklists.length }}</span> of {{ blocklists.length }} feeds
      </div>
    </div>

    <!-- Table Container (StartUI White Card) -->
    <div class="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-slate-100 bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
              <th class="py-3 px-4">Feed Details & Category</th>
              <th class="py-3 px-4">Source Hostlist URL</th>
              <th class="py-3 px-4">Rule Count</th>
              <th class="py-3 px-4">Client Sync</th>
              <th class="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="isLoading" v-for="i in 5" :key="i" class="animate-pulse">
              <td colspan="5" class="py-4 px-4"><div class="h-5 bg-slate-100 rounded"></div></td>
            </tr>

            <tr v-else-if="filteredBlocklists.length === 0">
              <td colspan="5" class="py-12 text-center text-slate-400 font-medium">
                <div class="max-w-sm mx-auto space-y-2">
                  <PhListChecks :size="32" class="mx-auto text-slate-300" />
                  <div>No blocklist feeds match the selected search or filter settings.</div>
                </div>
              </td>
            </tr>

            <tr
              v-else
              v-for="item in filteredBlocklists"
              :key="item.id"
              class="hover:bg-slate-50/80 transition-colors"
            >
              <!-- Name & Category -->
              <td class="py-3 px-4">
                <div class="font-bold text-slate-900 text-sm">{{ item.name }}</div>
                <div class="flex items-center gap-2 mt-1">
                  <span
                    class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border"
                    :class="getCategoryBadgeClass(item.category)"
                  >
                    {{ item.category }}
                  </span>
                  <span v-if="item.description" class="text-[11px] text-slate-400 truncate max-w-xs">
                    {{ item.description }}
                  </span>
                </div>
              </td>

              <!-- Source URL -->
              <td class="py-3 px-4 font-mono text-[11px] text-blue-600 max-w-xs truncate" :title="item.url">
                <a :href="item.url" target="_blank" rel="noopener noreferrer" class="hover:underline inline-flex items-center gap-1.5 font-semibold">
                  <PhLink :size="12" class="shrink-0 text-slate-400" />
                  <span class="truncate">{{ item.url }}</span>
                </a>
              </td>

              <!-- Rule Count -->
              <td class="py-3 px-4 font-mono font-bold text-slate-700">
                {{ item.ruleCount > 0 ? item.ruleCount.toLocaleString() : '~' }} rules
              </td>

              <!-- Status Toggle (StartUI Badge) -->
              <td class="py-3 px-4">
                <button
                  @click="toggleBlocklist(item)"
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase transition-colors cursor-pointer"
                  :class="item.isEnabled
                    ? 'bg-emerald-500 text-white shadow-2xs hover:bg-emerald-600'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'"
                >
                  <span>{{ item.isEnabled ? 'Active' : 'Disabled' }}</span>
                </button>
              </td>

              <!-- Actions -->
              <td class="py-3 px-4 text-right">
                <div class="inline-flex items-center gap-1">
                  <button
                    @click="openEditModal(item)"
                    class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Edit"
                  >
                    <PhPencilSimple :size="15" />
                  </button>
                  <button
                    @click="deleteBlocklist(item.id)"
                    class="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <PhTrash :size="15" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal && editingItem"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div class="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="text-base font-bold text-slate-900">
            {{ editingItem.id ? 'Edit Blocklist Feed' : 'Add New Blocklist Feed' }}
          </h3>
          <button @click="showModal = false" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100">
            <PhX :size="18" />
          </button>
        </div>

        <form @submit.prevent="saveBlocklist" class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Feed Name *</label>
            <input
              v-model="editingItem.name"
              type="text"
              required
              placeholder="e.g. HaGeZi Threat Intelligence (TIF)"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Source URL (hosts / domain list) *</label>
            <input
              v-model="editingItem.url"
              type="url"
              required
              placeholder="https://cdn.jsdelivr.net/.../hosts.txt"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Category</label>
              <select
                v-model="editingItem.category"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
              >
                <option value="ADS">Advertising</option>
                <option value="TRACKING">Tracking & Telemetry</option>
                <option value="SECURITY">Security & Malware</option>
                <option value="SCAMS">Scams & Fraud</option>
                <option value="CONTENT">Content & Safety</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Approx. Rule Count</label>
              <input
                v-model="editingItem.ruleCount"
                type="number"
                placeholder="45000"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Description / Notes</label>
            <input
              v-model="editingItem.description"
              type="text"
              placeholder="Live C2 and malware host sinkhole updated hourly"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div class="flex items-center gap-2 pt-1">
            <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input v-model="editingItem.isEnabled" type="checkbox" class="rounded text-blue-600" />
              <span>Active & Enabled for Client Synchronization</span>
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
              {{ isSaving ? 'Saving...' : 'Save Feed' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

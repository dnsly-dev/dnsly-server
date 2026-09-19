import axios from 'axios'

// Configurable backend API base URL: defaults to same-origin when hosted on NestJS, or remote fallback
const getStoredApiUrl = () => {
  const custom = localStorage.getItem('dnsly_api_base_url')
  if (custom) return custom
  if (typeof window !== 'undefined' && window.location.port !== '5173') {
    return '' // Same-origin relative path for NestJS unified hosting
  }
  return 'https://api.dnsly.shovon.bd'
}

export const apiClient = axios.create({
  baseURL: getStoredApiUrl(),
  withCredentials: true, // Automatically sends and receives HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// Request interceptor: attach dynamic baseURL and fallback Bearer token
apiClient.interceptors.request.use((config) => {
  config.baseURL = getStoredApiUrl()
  config.withCredentials = true
  const token = localStorage.getItem('dnsly_admin_token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor: handle 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('dnsly_admin_token')
      localStorage.removeItem('dnsly_admin_user')
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

export interface AdminUser {
  id: string
  email: string
  name?: string
  role: string
}

export interface OverviewMetrics {
  devices: {
    total: number
    active24h: number
    active7d: number
  }
  queries: {
    total7d: number
    blocked7d: number
    blockRatePercent: number
  }
  dailyTraffic: Array<{
    dayLabel: string
    date: string
    totalQueries: number
    blockedQueries: number
  }>
  providerDistribution: Record<string, number>
  versionDistribution: Array<{ version: string; count: number }>
  timestamp: string
}

export interface DeviceItem {
  id: string
  appVersion: string
  deviceModel: string
  osVersion: string
  countryCode: string
  firstSeenAt: string
  lastSeenAt: string
  isActive: boolean
  lastHeartbeat?: {
    id: string
    selectedProvider: string
    shieldEnabled: boolean
    totalQueries: number
    blockedQueries: number
    timestamp: string
  } | null
}

export interface DnsServerConfigItem {
  id: string
  name: string
  primaryIp: string
  secondaryIp?: string | null
  hostname?: string | null
  dohUrl?: string | null
  category: string
  isDefault: boolean
  isEnabled: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface BlocklistConfigItem {
  id: string
  name: string
  url: string
  category: string
  description?: string | null
  ruleCount: number
  isEnabled: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface HeartbeatLogItem {
  id: string
  deviceId: string
  selectedProvider: string
  shieldEnabled: boolean
  totalQueries: number
  blockedQueries: number
  timestamp: string
  device?: {
    deviceModel: string
    osVersion: string
    countryCode: string
    appVersion: string
  }
}

export interface PaginatedHeartbeatsResponse {
  total: number
  page: number
  limit: number
  totalPages: number
  heartbeats: HeartbeatLogItem[]
}

// ─── API Methods ───
export const api = {
  // Auth
  async login(email: string, password: string) {
    const res = await apiClient.post<{ accessToken: string; user: AdminUser }>('/api/v1/admin/auth/login', {
      email,
      password,
    })
    return res.data
  },

  async getMe(): Promise<{ authenticated: boolean; user: AdminUser }> {
    const res = await apiClient.get<{ authenticated: boolean; user: AdminUser }>('/api/v1/admin/auth/me')
    return res.data
  },

  async logout() {
    try {
      await apiClient.post('/api/v1/admin/auth/logout')
    } finally {
      localStorage.removeItem('dnsly_admin_token')
      localStorage.removeItem('dnsly_admin_user')
    }
  },

  // Analytics
  async getOverview(): Promise<OverviewMetrics> {
    const res = await apiClient.get<OverviewMetrics>('/api/v1/admin/analytics/overview')
    return res.data
  },

  async getDevices(params?: {
    page?: number
    limit?: number
    search?: string
    shieldEnabled?: string
    provider?: string
  }): Promise<{ total: number; page: number; limit: number; totalPages: number; devices: DeviceItem[] }> {
    const res = await apiClient.get('/api/v1/admin/analytics/devices', { params })
    return res.data
  },

  async getHeartbeats(params?: {
    page?: number
    limit?: number
    search?: string
    shieldEnabled?: string
    provider?: string
  }): Promise<PaginatedHeartbeatsResponse> {
    const res = await apiClient.get<PaginatedHeartbeatsResponse>('/api/v1/admin/analytics/heartbeats', { params })
    // In case backend returns raw array or paginated object
    if (Array.isArray(res.data)) {
      const arr = res.data as HeartbeatLogItem[]
      return {
        total: arr.length,
        page: 1,
        limit: arr.length,
        totalPages: 1,
        heartbeats: arr,
      }
    }
    return res.data
  },

  // Remote Config: DNS Servers
  async getDnsServers(): Promise<DnsServerConfigItem[]> {
    const res = await apiClient.get<DnsServerConfigItem[]>('/api/v1/admin/config/dns-servers')
    return res.data
  },

  async createDnsServer(data: Partial<DnsServerConfigItem>): Promise<DnsServerConfigItem> {
    const res = await apiClient.post<DnsServerConfigItem>('/api/v1/admin/config/dns-servers', data)
    return res.data
  },

  async updateDnsServer(id: string, data: Partial<DnsServerConfigItem>): Promise<DnsServerConfigItem> {
    const res = await apiClient.put<DnsServerConfigItem>(`/api/v1/admin/config/dns-servers/${id}`, data)
    return res.data
  },

  async deleteDnsServer(id: string): Promise<{ id: string }> {
    const res = await apiClient.delete(`/api/v1/admin/config/dns-servers/${id}`)
    return res.data
  },

  // Remote Config: Blocklists
  async getBlocklists(): Promise<BlocklistConfigItem[]> {
    const res = await apiClient.get<BlocklistConfigItem[]>('/api/v1/admin/config/blocklists')
    return res.data
  },

  async createBlocklist(data: Partial<BlocklistConfigItem>): Promise<BlocklistConfigItem> {
    const res = await apiClient.post<BlocklistConfigItem>('/api/v1/admin/config/blocklists', data)
    return res.data
  },

  async updateBlocklist(id: string, data: Partial<BlocklistConfigItem>): Promise<BlocklistConfigItem> {
    const res = await apiClient.put<BlocklistConfigItem>(`/api/v1/admin/config/blocklists/${id}`, data)
    return res.data
  },

  async deleteBlocklist(id: string): Promise<{ id: string }> {
    const res = await apiClient.delete(`/api/v1/admin/config/blocklists/${id}`)
    return res.data
  },
}

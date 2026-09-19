import { ref, computed } from 'vue'
import { api, type AdminUser } from '../services/api'
import { useRouter } from 'vue-router'

const token = ref<string | null>(localStorage.getItem('dnsly_admin_token'))
const user = ref<AdminUser | null>(
  localStorage.getItem('dnsly_admin_user')
    ? JSON.parse(localStorage.getItem('dnsly_admin_user')!)
    : null
)
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useAuth() {
  const router = useRouter()
  const isAuthenticated = computed(() => !!token.value || !!user.value)

  // Verify active session via HttpOnly cookie or bearer token
  const checkSession = async () => {
    try {
      const data = await api.getMe()
      if (data.authenticated && data.user) {
        user.value = data.user
        localStorage.setItem('dnsly_admin_user', JSON.stringify(data.user))
        return true
      }
    } catch {
      // Not authenticated via cookie
    }
    return false
  }

  const login = async (email: string, pass: string) => {
    isLoading.value = true
    error.value = null
    try {
      const data = await api.login(email, pass)
      token.value = data.accessToken
      user.value = data.user
      localStorage.setItem('dnsly_admin_token', data.accessToken)
      localStorage.setItem('dnsly_admin_user', JSON.stringify(data.user))
      if (router) {
        await router.push('/admin')
      }
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message || 'Login failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    try {
      await api.logout()
    } catch (_) {
      // ignore
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('dnsly_admin_token')
      localStorage.removeItem('dnsly_admin_user')
      isLoading.value = false
      if (router) {
        router.push('/admin/login')
      } else {
        window.location.href = '/admin/login'
      }
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkSession,
  }
}

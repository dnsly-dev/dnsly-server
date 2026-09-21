import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import AdminLoginView from '../views/admin/AdminLoginView.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'
import AdminOverviewView from '../views/admin/AdminOverviewView.vue'
import AdminDevicesView from '../views/admin/AdminDevicesView.vue'
import AdminDnsServersView from '../views/admin/AdminDnsServersView.vue'
import AdminBlocklistsView from '../views/admin/AdminBlocklistsView.vue'
import AdminTelemetryView from '../views/admin/AdminTelemetryView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'landing',
    component: LandingView,
  },
  {
    path: '/privacy',
    name: 'privacy-policy',
    component: PrivacyPolicyView,
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLoginView,
    beforeEnter: (_to, _from, next) => {
      const token = localStorage.getItem('dnsly_admin_token')
      if (token) {
        next('/admin/overview')
      } else {
        next()
      }
    },
  },
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: (to, _from, next) => {
      const token = localStorage.getItem('dnsly_admin_token')
      if (!token) {
        next({ path: '/admin/login', query: { redirect: to.fullPath } })
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        redirect: '/admin/overview',
      },
      {
        path: 'overview',
        name: 'admin-overview',
        component: AdminOverviewView,
      },
      {
        path: 'devices',
        name: 'admin-devices',
        component: AdminDevicesView,
      },
      {
        path: 'dns-servers',
        name: 'admin-dns-servers',
        component: AdminDnsServersView,
      },
      {
        path: 'blocklists',
        name: 'admin-blocklists',
        component: AdminBlocklistsView,
      },
      {
        path: 'telemetry',
        name: 'admin-telemetry',
        component: AdminTelemetryView,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

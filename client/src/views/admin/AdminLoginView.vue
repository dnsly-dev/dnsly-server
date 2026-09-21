<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { PhLockKey, PhEnvelope, PhArrowRight, PhGearSix, PhCircleNotch } from '@phosphor-icons/vue'

const { login, isLoading, error } = useAuth()

const email = ref('')
const password = ref('')
const showApiConfig = ref(false)
const customApiUrl = ref(localStorage.getItem('dnsly_api_base_url') || 'https://dnsly.shovon.bd')

const handleSubmit = async () => {
  if (showApiConfig.value) {
    localStorage.setItem('dnsly_api_base_url', customApiUrl.value.trim().replace(/\/$/, ''))
  }
  await login(email.value.trim(), password.value)
}

const quickSetUrl = (url: string) => {
  customApiUrl.value = url
  localStorage.setItem('dnsly_api_base_url', url)
}
</script>

<template>
  <div class="min-h-screen bg-[#f4f6fa] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
    <!-- Subtle top glow banner -->
    <div class="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none"></div>

    <div class="w-full max-w-md relative z-10">
      <!-- Logo Header -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-flex items-center gap-2.5 no-underline group mb-3">
          <img
            src="/logo.png"
            alt="DNSly Logo"
            class="w-11 h-11 rounded-2xl object-contain shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform"
          />
          <div class="flex items-center gap-1.5">
            <span class="text-2xl font-black tracking-tight text-slate-900">DNS<span class="text-blue-600">ly</span></span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-blue-500 text-white">UI</span>
          </div>
        </router-link>
        <h1 class="text-xl font-extrabold text-slate-900 tracking-tight">Admin Console Login</h1>
        <p class="text-xs text-slate-500 mt-1">Manage global telemetry, live fleets, and dynamic DNS policies</p>
      </div>

      <!-- Card Form (StartUI White Card) -->
      <div class="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xl shadow-slate-200/50">
        <!-- Error Alert -->
        <div v-if="error" class="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 text-xs">
          <div class="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0"></div>
          <div>{{ error }}</div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Email Input -->
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[10px]">Admin Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <PhEnvelope :size="16" weight="bold" />
              </div>
              <input
                v-model="email"
                type="email"
                required
                placeholder="name@company.com"
                class="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">Secret Key / Password</label>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <PhLockKey :size="16" weight="bold" />
              </div>
              <input
                v-model="password"
                type="password"
                required
                placeholder="••••••••••••"
                class="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <!-- API Host Toggle -->
          <div class="pt-1">
            <button
              type="button"
              @click="showApiConfig = !showApiConfig"
              class="text-[11px] font-semibold text-slate-500 hover:text-blue-600 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <PhGearSix :size="13" />
              <span>{{ showApiConfig ? 'Hide Target API Config' : 'Configure Target Server API' }}</span>
            </button>

            <div v-if="showApiConfig" class="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Backend API URL:</div>
              <input
                v-model="customApiUrl"
                type="text"
                class="w-full px-3 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg text-blue-700 focus:outline-none focus:border-blue-500"
                placeholder="https://dnsly.shovon.bd"
              />
              <div class="flex gap-2">
                <button
                  type="button"
                  @click="quickSetUrl('https://dnsly.shovon.bd')"
                  class="text-[10px] font-bold px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded transition-colors cursor-pointer"
                >
                  Cloud API (shovon.bd)
                </button>
                <button
                  type="button"
                  @click="quickSetUrl('http://localhost:3000')"
                  class="text-[10px] font-bold px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded transition-colors cursor-pointer"
                >
                  Local API (:3000)
                </button>
              </div>
            </div>
          </div>

          <!-- Submit Button (StartUI Blue Button) -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 group mt-2"
          >
            <PhCircleNotch v-if="isLoading" :size="18" class="animate-spin text-white" />
            <span v-else>Authorize & Enter Console</span>
            <PhArrowRight v-if="!isLoading" :size="15" class="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div class="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <router-link to="/" class="hover:text-slate-700 transition-colors font-semibold">← Public Website</router-link>
          <span class="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            SSL Gated
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

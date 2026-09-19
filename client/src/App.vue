<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Lenis from 'lenis'

const route = useRoute()
let lenis: Lenis | null = null
let rafId: number | null = null

const initLenis = () => {
  if (lenis) return
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.5,
  })

  function raf(time: number) {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }

  rafId = requestAnimationFrame(raf)
}

const destroyLenis = () => {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  lenis?.destroy()
  lenis = null
}

onMounted(() => {
  if (!route.path.startsWith('/admin')) {
    initLenis()
  }

  // Global anchor click listener for ultra-smooth programmatic scrolling
  const handleAnchorClick = (e: MouseEvent) => {
    if (route.path.startsWith('/admin')) return
    const target = (e.target as HTMLElement).closest('a')
    if (!target) return
    const href = target.getAttribute('href')
    if (href && href.startsWith('#') && href.length > 1) {
      const element = document.querySelector(href)
      if (element) {
        e.preventDefault()
        lenis?.scrollTo(element as HTMLElement, {
          offset: -72,
          duration: 1.2,
        })
      }
    }
  }

  document.addEventListener('click', handleAnchorClick)

  onUnmounted(() => {
    document.removeEventListener('click', handleAnchorClick)
  })
})

watch(
  () => route.path,
  (newPath) => {
    if (newPath.startsWith('/admin')) {
      destroyLenis()
    } else {
      initLenis()
    }
  }
)

onUnmounted(() => {
  destroyLenis()
})
</script>

<template>
  <router-view />
</template>



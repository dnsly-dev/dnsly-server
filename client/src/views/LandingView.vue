<script setup lang="ts">
import HeaderNav from '../components/HeaderNav.vue'
import HeroSection from '../components/HeroSection.vue'
import HowItWorksSection from '../components/HowItWorksSection.vue'
import ComparisonSection from '../components/ComparisonSection.vue'
import SpeedSection from '../components/SpeedSection.vue'
import FeaturesGrid from '../components/FeaturesGrid.vue'
import CtaBottom from '../components/CtaBottom.vue'
import FooterNav from '../components/FooterNav.vue'
</script>

<template>
  <div class="min-h-screen bg-white antialiased">
    <HeaderNav />
    <HeroSection />
    <HowItWorksSection />
    <ComparisonSection />
    <SpeedSection />
    <FeaturesGrid />
    <CtaBottom />
    <FooterNav />
  </div>
</template>

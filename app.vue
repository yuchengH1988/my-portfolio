<script setup>
import 'virtual:svg-icons-register'
import { useAllStore } from '@/store/all'
const allStore = useAllStore()
const { windowWidth } = toRefs(allStore)

onMounted(() => {
  const sh = window.innerHeight
  document.documentElement.style.setProperty('--sh', `${sh}px`)
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
})
</script>

<template>
  <div>
    <SEO />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

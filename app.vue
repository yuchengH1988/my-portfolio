<script setup>
import 'virtual:svg-icons-register'
import { useAllStore } from '@/store/all'
const allStore = useAllStore()
const { windowWidth } = toRefs(allStore)

onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
  // const sh = window.innerHeight
  // document.documentElement.style.setProperty('--sh', `${sh}px`)
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

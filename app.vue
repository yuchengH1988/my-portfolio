<script setup>
import 'virtual:svg-icons-register'
import { useAllStore } from '@/store/all'
const allStore = useAllStore()
const { windowWidth } = toRefs(allStore)
const { setIsCursor } = allStore

let coarsePointerMediaQuery = null

function updatePointerCapability () {
  const hasTouchPoints = navigator.maxTouchPoints > 0
  const hasCoarsePointer = coarsePointerMediaQuery?.matches ?? false
  setIsCursor(!(hasTouchPoints || hasCoarsePointer))
}

function handlePointerEvent (event) {
  if (event.pointerType === 'touch') {
    setIsCursor(false)
    return
  }

  if (event.pointerType === 'mouse') {
    setIsCursor(true)
  }
}

function handleResize () {
  const sh = window.innerHeight
  document.documentElement.style.setProperty('--sh', `${sh}px`)
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  handleResize()

  coarsePointerMediaQuery = window.matchMedia('(any-pointer: coarse)')
  updatePointerCapability()

  window.addEventListener('resize', handleResize)
  window.addEventListener('pointerdown', handlePointerEvent, { passive: true })
  window.addEventListener('pointermove', handlePointerEvent, { passive: true })
  coarsePointerMediaQuery.addEventListener('change', updatePointerCapability)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('pointerdown', handlePointerEvent)
  window.removeEventListener('pointermove', handlePointerEvent)
  coarsePointerMediaQuery?.removeEventListener('change', updatePointerCapability)
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

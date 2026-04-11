<script setup>
import { useAllStore } from '~/store/all'

const { isCursor } = storeToRefs(useAllStore())
const isDisplay = ref(false)
const cursorEl = ref(null)

const target = { x: -100, y: -100 }
const current = { x: -100, y: -100 }
let rafId = 0
let displayTimer = 0
let moveTimer = 0
let isMoving = false
let currentSize = 0
const baseSize = 200

const lerp = (from, to, speed) => from + (to - from) * speed

const update = () => {
  current.x = lerp(current.x, target.x, 0.05)
  current.y = lerp(current.y, target.y, 0.05)

  if (cursorEl.value) {
    cursorEl.value.style.setProperty('--x', `${current.x}px`)
    cursorEl.value.style.setProperty('--y', `${current.y}px`)
    const targetSize = isDisplay.value ? (isMoving ? baseSize / 3 : baseSize) : 0
    currentSize = lerp(currentSize, targetSize, 0.05)
    cursorEl.value.style.setProperty('--size', `${currentSize}px`)
  }

  rafId = window.requestAnimationFrame(update)
}

const onPointerMove = (event) => {
  target.x = event.clientX
  target.y = event.clientY
  isMoving = true
  if (moveTimer) { window.clearTimeout(moveTimer) }
  moveTimer = window.setTimeout(() => {
    isMoving = false
  }, 120)
}

onMounted(() => {
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  rafId = window.requestAnimationFrame(update)
})

watch(
  isCursor,
  (enabled) => {
    if (!enabled) {
      isDisplay.value = false
      currentSize = 0
      return
    }
    if (displayTimer) { window.clearTimeout(displayTimer) }
    displayTimer = window.setTimeout(() => {
      isDisplay.value = true
    }, 3000)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  window.cancelAnimationFrame(rafId)
  if (displayTimer) { window.clearTimeout(displayTimer) }
  if (moveTimer) { window.clearTimeout(moveTimer) }
  document.documentElement.style.cursor = ''
  document.body.style.cursor = ''
})
</script>

<template>
  <div
    id="invertedCursor"
    ref="cursorEl"
    class="ease-in-out pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border-2 border-white bg-white mix-blend-difference transition-opacity duration-200"
    :style="{
      transform: 'translate3d(var(--x, -100px), var(--y, -100px), 0) translate(-50%, -50%)',
      width: 'var(--size, 0px)',
      height: 'var(--size, 0px)',
      opacity: isDisplay ? 1 : 0
    }"
  />
</template>

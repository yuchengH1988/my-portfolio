<script setup>
const { $gsap, $ScrollTrigger } = useNuxtApp()

const bgRef = ref(null)
const heroLayer = ref(null)

const SECTION_IDS = ['home', 'intro', 'work', 'exp']

const activeIndex = ref(0)

const triggers = []

const setIndex = (index) => {
  const next = Math.max(0, Math.min(index, SECTION_IDS.length - 1))
  if (activeIndex.value === next) { return }
  activeIndex.value = next
}

const fadeIn = (timeline, position = '-=2') => {
  if (!bgRef.value) { return }
  timeline.to(bgRef.value, {
    opacity: 1,
    duration: 3,
    ease: 'power2.out'
  }, position)
}

onMounted(() => {
  nextTick(() => {
    $gsap.set(bgRef.value, { opacity: 0 })
    $gsap.set(heroLayer.value, { opacity: 1, visibility: 'visible' })

    $gsap.to(bgRef.value, {
      opacity: 1,
      duration: 3,
      delay: 0.8,
      ease: 'power2.out',
      overwrite: 'auto'
    })

    setTimeout(() => {
      SECTION_IDS.forEach((id, index) => {
        const el = document.querySelector(`#${id}`)
        if (!el) { return }

        triggers.push($ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          markers: false,
          onEnter: () => setIndex(index),
          onLeaveBack: () => setIndex(index - 1)
        }))
      })

      setIndex(0)
      $ScrollTrigger.refresh()
    }, 500)
  })
})

onBeforeUnmount(() => {
  triggers.forEach(t => t.kill())
  triggers.length = 0
})

defineExpose({ fadeIn })
</script>

<template>
  <div
    ref="bgRef"
    class="p5-background pointer-events-none fixed inset-0 z-0 h-[100dvh] w-screen overflow-hidden"
  >
    <div ref="heroLayer" class="absolute inset-0">
      <CommonP5Hero :active="true" :scene-index="activeIndex" />
    </div>
  </div>
</template>

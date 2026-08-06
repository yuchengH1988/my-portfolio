<script setup>
const { $gsap, $ScrollTrigger } = useNuxtApp()

const bgRef = ref(null)
const heroLayer = ref(null)
const workLayer = ref(null)

// 區塊順序（contact 當 footer，不列入）
const SECTION_IDS = ['home', 'intro', 'work', 'exp']

const activeIndex = ref(0)
const activeId = computed(() => SECTION_IDS[activeIndex.value] || SECTION_IDS[0])

let sceneTween = null
const triggers = []

const setIndex = (index) => {
  const next = Math.max(0, Math.min(index, SECTION_IDS.length - 1))
  if (activeIndex.value === next) { return }
  activeIndex.value = next

  // TODO: 之後依 activeIndex 切換不同 p5 動態
  // 目前先保留 hero 常駐，index 用畫面標示確認觸發點
  console.info('[p5-bg] section', next, activeId.value)
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
    $gsap.set(workLayer.value, { opacity: 0, visibility: 'hidden' })

    // 保險：若 Home timeline 沒接到 fadeIn（HMR/時序），仍會自行淡入
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

        // 區頂碰到畫面中線：
        // - 往下滑 → onEnter → 切到該區
        // - 往上滑 → onLeaveBack → 切回上一區
        triggers.push($ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          markers: true, // debug：確認中線觸發點，之後可關
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
  sceneTween?.kill()
  triggers.forEach(t => t.kill())
  triggers.length = 0
})

defineExpose({ fadeIn, activeIndex, activeId })
</script>

<template>
  <div
    ref="bgRef"
    class="p5-background pointer-events-none fixed inset-0 z-0 h-[100dvh] w-screen overflow-hidden"
  >
    <div ref="heroLayer" class="absolute inset-0">
      <CommonP5Hero :active="true" :scene-index="activeIndex" />
    </div>
    <div ref="workLayer" class="absolute inset-0">
      <CommonP5Work :active="false" />
    </div>

    <!-- debug：目前區塊 index（之後可拿掉） -->
    <div class="pointer-events-none absolute bottom-6 left-6 z-20 rounded bg-black/60 px-3 py-2 font-mono text-sm text-white">
      <div>index: {{ activeIndex }}</div>
      <div>#{{ activeId }}</div>
    </div>
  </div>
</template>

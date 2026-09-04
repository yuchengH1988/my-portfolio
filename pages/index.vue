<script setup>
const { $gsap, $ScrollTrigger } = useNuxtApp()
const p5BgRef = ref(null)

provide('p5Background', {
  fadeIn: (timeline, position) => p5BgRef.value?.fadeIn(timeline, position)
})

onMounted(() => {
  nextTick(() => {
    // 等字型 / 圖片大致就緒再綁定，減少手機首次量測偏差
    setTimeout(() => {
      $gsap.effects.aosFadeIn()
      $ScrollTrigger.refresh()
    }, 500)
  })
})

</script>

<template>
  <div>
    <CommonP5Background ref="p5BgRef" />
    <div class="z-10 relative font-default">
      <LayoutHome />
      <LayoutIntro />
      <LayoutWork />
      <LayoutExp />
      <LayoutContact />
    </div>
  </div>
</template>

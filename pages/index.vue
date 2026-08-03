<script setup>
const { $gsap, $ScrollTrigger } = useNuxtApp()
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
  <div class="font-default">
    <LayoutHome />
    <LayoutIntro />
    <LayoutWork />
    <LayoutExp />
    <LayoutContact />
  </div>
</template>

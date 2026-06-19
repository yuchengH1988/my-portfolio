<script setup>
const { $gsap } = useNuxtApp()
onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      $gsap.effects.aosFadeIn()
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

<script setup>
const { $gsap } = useNuxtApp()
const desRef = ref(null)
const workWordEls = ref([])
let workTextTween = null

const workText = 'Over the past 4 years, I have delivered 30+ web projects, including corporate sites, exhibition microsites, and animation-driven experiences. Many involved WordPress CMS integration, i18n, and performance tuning, strengthening my capabilities in motion UI, scalable architecture, and cross-team collaboration.'
const workWords = workText.split(' ')

onMounted(() => {
  if (!desRef.value || !workWordEls.value.length) { return }

  $gsap.set(workWordEls.value, {
    opacity: 0,
    force3D: true,
    transformOrigin: 'center center',
    scale: 2,
    x: (index) => {
      const direction = index % 4
      return direction === 1 ? 144 : direction === 3 ? -144 : 0
    },
    y: (index) => {
      const direction = index % 4
      return direction === 0 ? -108 : direction === 2 ? 108 : 0
    },
    rotate: index => index % 2 === 0 ? -6 : 6
  })

  workTextTween = $gsap.to(workWordEls.value, {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: desRef.value,
      start: 'top 120%',
      end: 'top 50%',
      scrub: true
    }
  })
})

onBeforeUpdate(() => {
  workWordEls.value = []
})

onBeforeUnmount(() => {
  workTextTween?.scrollTrigger?.kill()
  workTextTween?.kill()
})
</script>

<template>
  <div class="relative flex h-screen w-full flex-col items-center justify-center sm:h-dvh">
    <CommonP5Work class="z-[-1]" />
    <p ref="desRef" class="w-[560px] max-w-[80vw] rounded-3xl p-3 text-center text-[12px] font-normal leading-[1.8] text-bgc sm:text-xl md:p-5 lg:w-[920px] lg:text-[28px]">
      <span
        v-for="(word, wordIndex) in workWords"
        :key="`${word}-${wordIndex}`"
        :ref="el => { if (el) workWordEls.push(el) }"
        class="mr-[0.25em] inline-block will-change-transform"
      >
        {{ word }}
      </span>
    </p>
  </div>
</template>

<script setup>
const { $gsap } = useNuxtApp()
const desRef = ref(null)
const workTextChars = ref([])
let workTextTween = null

const workText = 'Over the past 4 years, I have delivered 30+ web projects, including corporate sites, exhibition microsites, and animation-driven experiences. Many involved WordPress CMS integration, i18n, and performance tuning, strengthening my capabilities in motion UI, scalable architecture, and cross-team collaboration.'
const workWords = workText.split(' ').map(word => word.split(''))

onMounted(() => {
  if (!desRef.value || !workTextChars.value.length) { return }

  $gsap.set(workTextChars.value, {
    opacity: 0,
    filter: 'blur(16px)',
    transformPerspective: 900,
    transformOrigin: 'center center',
    scale: 3,
    x: (index) => {
      const direction = index % 4
      return direction === 1 ? 160 : direction === 3 ? -160 : 0
    },
    y: (index) => {
      const direction = index % 4
      return direction === 0 ? -160 : direction === 2 ? 160 : 0
    },
    rotateX: (index) => {
      const direction = index % 4
      return direction === 0 ? -90 : direction === 2 ? 90 : 0
    },
    rotateY: (index) => {
      const direction = index % 4
      return direction === 1 ? 90 : direction === 3 ? -90 : 0
    },
    rotateZ: index => index % 2 === 0 ? -18 : 18
  })

  workTextTween = $gsap.to(workTextChars.value, {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: desRef.value,
      start: 'top bottom',
      end: 'top 10%',
      scrub: true
    }
  })
})

onBeforeUpdate(() => {
  workTextChars.value = []
})

onBeforeUnmount(() => {
  workTextTween?.scrollTrigger?.kill()
  workTextTween?.kill()
})
</script>

<template>
  <section id="work" class="w-screen overflow-hidden">
    <div class="set w-full pt-30 text-bgc/90">
      <div class="flex flex-col items-center text-center ">
        <h2 data-fade="up" class="text-[62px] font-black leading-[1.2] sm:text-[100px] lg:text-[200px]">
          PROJECTS
        </h2>
        <p data-fade="up" class="mb-5 mt-10  max-w-[80%] text-[18px] lg:my-0">
          These selected projects highlight my real-world experience across modern web development. Each example includes a brief overview and live demo, demonstrating my ability to solve complex problems, work with different technologies, and deliver effective solutions.
        </p>
        <WorkSliderSelect data-fade="right" />
      </div>
    </div>
    <div class="relative flex h-screen w-full flex-col items-center justify-center sm:h-dvh">
      <CommonP5Work class="z-[-1]" />
      <p ref="desRef" class="w-[560px] max-w-[80vw] rounded-3xl p-3 text-center text-[12px] font-normal leading-[1.8] text-bgc sm:text-xl md:p-5 lg:w-[920px] lg:text-[28px]">
        <span
          v-for="(word, wordIndex) in workWords"
          :key="`${word.join('')}-${wordIndex}`"
          class="mr-[0.25em] inline-flex align-top"
        >
          <span
            v-for="(char, charIndex) in word"
            :key="`${char}-${wordIndex}-${charIndex}`"
            class="inline-block"
          >
            <span
              :ref="el => { if (el) workTextChars.push(el) }"
              class="inline-block will-change-transform"
            >{{ char }}</span>
          </span>
        </span>
      </p>
    </div>
  </section>
</template>

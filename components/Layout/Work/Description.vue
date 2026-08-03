<script setup>
import siteContent from '~/locales/site.json'

const { $gsap } = useNuxtApp()
const sectionRef = ref(null)
const workWordEls = ref([])
let workTextTween = null

const workText = siteContent.work.description
const workWords = workText.split(' ')

onMounted(() => {
  if (!sectionRef.value || !workWordEls.value.length) { return }

  // sm 以下關閉字詞飄移（手機 scrub + 多字 transform 太耗效能）
  const enableDrift = window.matchMedia('(min-width: 540px)').matches
  if (!enableDrift) { return }

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
      trigger: sectionRef.value,
      start: 'top 85%',
      end: 'center center',
      scrub: true,
      invalidateOnRefresh: true
    }
  })

  workTextTween.scrollTrigger?.refresh()
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
  <div ref="sectionRef" class="relative flex h-screen w-full flex-col items-center justify-center sm:h-dvh">
    <CommonP5Work class="z-[-1]" />
    <p ref="desRef" class="text-head-1 w-[560px] max-w-[80vw] rounded-3xl p-3 text-center text-bgc md:p-5 lg:w-[920px]">
      <span
        v-for="(word, wordIndex) in workWords"
        :key="`${word}-${wordIndex}`"
        :ref="el => { if (el) workWordEls.push(el) }"
        class="mr-[0.25em] inline-block sm:will-change-transform"
      >
        {{ word }}
      </span>
    </p>
  </div>
</template>

<script setup>
import siteContent from '~/locales/site.json'

const { $gsap } = useNuxtApp()
const wordsRef = ref(null)
const nameRef = ref(null)
const p5HeroRef = ref(null)
const homeContent = siteContent.home
onMounted(() => {
  nextTick(() => {
    const wordEls = wordsRef.value?.querySelectorAll('.js-hero-word')
    const separatorEls = wordsRef.value?.querySelectorAll('.js-hero-separator')
    if (!wordEls?.length) { return }
    const nameEl = nameRef.value
    const p5HeroEl = p5HeroRef.value

    $gsap.set(wordEls, {
      transformOrigin: 'center bottom',
      transformPerspective: 800,
      rotateX: 90,
      y: (index) => {
        if (index === 0) { return '-20vh' }
        if (index === 2) { return '20vh' }
        return 0
      },
      opacity: 0
    })
    $gsap.set(separatorEls, { opacity: 0 })
    if (nameEl) {
      $gsap.set(nameEl, {
        filter: 'blur(10px)',
        opacity: 0,
        scale: 1.6
      })
    }
    if (p5HeroEl) { $gsap.set(p5HeroEl, { opacity: 0 }) }

    const tl = $gsap.timeline()
    tl.to(wordEls, {
      rotateX: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.3,
      delay: 2,
      ease: 'power3.out'
    })
      .to(wordEls, {
        y: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.inOut'
      }, '-=0.1')
      .to(separatorEls, {
        opacity: 1,
        duration: 0.45,
        stagger: 0.08,
        ease: 'power2.out'
      }, '-=0.45')
    if (nameEl) {
      tl.to(nameEl, {
        filter: 'blur(0px)',
        opacity: 1,
        scale: 1,
        duration: 1.6,
        ease: 'power2.out'
      }, '-=0.6')
    }
    if (p5HeroEl) {
      tl.to(p5HeroEl, {
        opacity: 1,
        duration: 3,
        ease: 'power2.out'
      }, '-=2')
    }
  })
})

</script>
<template>
  <section id="home" class="relative flex h-sh w-screen flex-col items-center justify-center overflow-visible sm:h-dvh">
    <div ref="p5HeroRef" class="absolute inset-0 z-[-1]">
      <CommonP5Hero />
    </div>
    <div class="z-[1] text-center uppercase text-white">
      <div ref="wordsRef" class="text-display-2 flex flex-col md:flex-row">
        <template v-for="(word, index) in homeContent.heroWords" :key="word">
          <span class="js-hero-word">{{ word }}</span><span v-if="index < homeContent.heroWords.length - 1" class="js-hero-separator">{{ homeContent.heroSeparator }}</span>
        </template>
      </div>
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 text-white sm:bottom-[20%] md:bottom-20">
        <h1 ref="nameRef" class="text-body-2 mt-10 w-max">
          {{ homeContent.name }}<br />
          {{ homeContent.role }}
        </h1>
      </div>
    </div>
  </section>
</template>

<script setup>
import siteContent from '~/locales/site.json'

const { $gsap } = useNuxtApp()
const wordsRef = ref(null)
const nameRef = ref(null)
const homeContent = siteContent.home
onMounted(() => {
  nextTick(() => {
    const spans = wordsRef.value?.querySelectorAll('span')
    if (!spans?.length) { return }
    const nameEl = nameRef.value
    const tl = $gsap.timeline()
    tl.fromTo(spans, {
      transformOrigin: 'center bottom',
      transformPerspective: 800,
      rotateX: 90,
      opacity: 0
    }, {
      rotateX: 0,
      opacity: 1,
      duration: 2,
      stagger: 0.3,
      delay: 2,
      ease: 'power3.out'
    })
    if (nameEl) {
      tl.from(nameEl, {
        filter: 'blur(10px)',
        opacity: 0,
        scale: 1.6,
        duration: 1.6,
        ease: 'power2.out'
      }, '-=1.5')
    }
  })
})

</script>
<template>
  <section id="home" class="relative flex h-sh w-screen flex-col items-center justify-center overflow-visible sm:h-dvh">
    <CommonP5Hero class="z-[-1]" />
    <div class="z-[1] text-center uppercase text-white">
      <div ref="wordsRef" class="text-display-2 flex flex-col md:flex-row">
        <template v-for="(word, index) in homeContent.heroWords" :key="word">
          <span>{{ word }}</span><span v-if="index < homeContent.heroWords.length - 1">{{ homeContent.heroSeparator }}</span>
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

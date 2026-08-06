<script setup>
import siteContent from '~/locales/site.json'

const { $gsap } = useNuxtApp()
const p5Background = inject('p5Background', null)
const wordsRef = ref(null)
const nameRef = ref(null)
const homeContent = siteContent.home
const heroLetters = 'PORTFOLIO'.split('')

onMounted(() => {
  nextTick(() => {
    const letterEls = wordsRef.value?.querySelectorAll('.js-hero-letter')
    if (!letterEls?.length) { return }
    const nameEl = nameRef.value

    $gsap.set(letterEls, {
      transformOrigin: 'center bottom',
      transformPerspective: 800,
      rotateX: 90,
      opacity: 0,
      force3D: true
    })
    if (nameEl) {
      $gsap.set(nameEl, {
        filter: 'blur(10px)',
        opacity: 0,
        scale: 1.6
      })
    }

    const tl = $gsap.timeline()
    tl.to(letterEls, {
      rotateX: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.1,
      delay: 0.5,
      ease: 'power3.out'
    })
    if (nameEl) {
      tl.to(nameEl, {
        filter: 'blur(0px)',
        opacity: 1,
        scale: 1,
        duration: 1.6,
        ease: 'power2.out'
      }, '-=0.4')
    }
    p5Background?.fadeIn(tl, '-=2')
  })
})

</script>
<template>
  <section id="home" class="relative flex h-sh w-screen flex-col items-center justify-center overflow-visible sm:h-dvh">
    <div class="z-[1] text-center uppercase text-white">
      <div ref="wordsRef" class="hero-title inline-flex justify-center gap-2.5 font-display uppercase lg:gap-5">
        <span
          v-for="(char, index) in heroLetters"
          :key="`${char}-${index}`"
          class="js-hero-letter inline-block will-change-transform"
        >
          {{ char }}
        </span>
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

<style scoped>
.hero-title {
  perspective: 800px;
  transform-style: preserve-3d;
  font-size: clamp(1rem, 6vw, 10rem);
  font-weight: 800;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: clamp(1rem, 10vw, 10rem);
  }
}

.js-hero-letter {
  transform-origin: center bottom;
}
</style>

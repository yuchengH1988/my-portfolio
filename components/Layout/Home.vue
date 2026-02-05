<script setup>
const { $gsap } = useNuxtApp()
const wordsRef = ref(null)
const nameRef = ref(null)
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
  <section id="home" class="relative flex h-sh w-screen flex-col items-center justify-center overflow-hidden sm:h-dvh">
    <CommonP5Hero class="z-[-1]" />
    <div class="z-[1] text-center font-bold uppercase text-white">
      <div ref="wordsRef" class="flex flex-col text-[40px] leading-[0.9] md:flex-row md:text-[64px] lg:text-[86px] xl:text-[100px]">
        <span>CODE</span><span>．</span><span>DESIGN</span><span>．</span><span>FLOW</span>
      </div>
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 sm:bottom-[20%] md:bottom-20">
        <h1 ref="nameRef" class="mt-10 text-[14px] sm:text-[20px]">
          YU CHENG HUANG<br />
          FrontEnd Developer
        </h1>
      </div>
    </div>
  </section>
</template>

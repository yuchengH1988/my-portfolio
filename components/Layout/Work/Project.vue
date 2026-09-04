<script setup>
import siteContent from '~/locales/site.json'

const { $gsap } = useNuxtApp()
const workContent = siteContent.work
const sectionRef = ref(null)
const introRef = ref(null)
const titleSpaceRef = ref(null)
const titleRef = ref(null)
let titleTween
const TITLE_VISUAL_FILL_RATIO = 1.8
const TITLE_VISUAL_FILL_RATIO_MOBILE = TITLE_VISUAL_FILL_RATIO * 0.7

const getTitleScale = () => {
  if (!titleSpaceRef.value || !titleRef.value) { return 1 }

  const titleHeight = titleRef.value.offsetHeight
  const titleSpaceHeight = titleSpaceRef.value.offsetHeight
  const fillRatio = window.innerWidth < 1024
    ? TITLE_VISUAL_FILL_RATIO_MOBILE
    : TITLE_VISUAL_FILL_RATIO

  if (!titleHeight || !titleSpaceHeight) { return 1 }

  return Math.min(Math.max(titleSpaceHeight / titleHeight * fillRatio, 1), 14)
}

onMounted(() => {
  nextTick(() => {
    if (!introRef.value || !titleSpaceRef.value || !titleRef.value) { return }

    titleTween = $gsap.fromTo(
      titleRef.value,
      {
        scaleY: getTitleScale,
        transformOrigin: 'center bottom'
      },
      {
        scaleY: 1,
        force3D: true,
        ease: 'none',
        scrollTrigger: {
          trigger: introRef.value,
          start: 'top bottom',
          end: 'bottom 20%',
          scrub: true,
          invalidateOnRefresh: true
        }
      }
    )

    document.fonts?.ready.then(() => {
      titleTween?.scrollTrigger?.refresh()
    })
  })
})

onBeforeUnmount(() => {
  titleTween?.scrollTrigger?.kill()
  titleTween?.kill()
})
</script>

<template>
  <div ref="sectionRef" class="flex min-h-dvh w-full items-center px-5 py-30 text-bgc/90">
    <div>
      <div ref="introRef" class="flex h-dvh flex-col items-center text-center">
        <div ref="titleSpaceRef" class="flex h-[70dvh] items-end justify-center overflow-visible">
          <h2
            ref="titleRef"
            class="relative z-0 font-display text-[clamp(2rem,12vw,20rem)] font-black leading-none will-change-transform md:text-[clamp(2rem,15vw,20rem)]"
          >
            {{ workContent.title }}
          </h2>
        </div>
        <p data-fade="up" class="text-body-1 relative z-[1] mb-5 mt-16 max-w-[780px] lg:mb-0 lg:mt-20">
          {{ workContent.summary }}
        </p>
      </div>
      <WorkClips />
    </div>
  </div>
</template>

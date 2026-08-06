<script setup>
import { useAllStore } from '~/store/all'
import siteContent from '~/locales/site.json'

const { $gsap } = useNuxtApp()
const { isCursor } = storeToRefs(useAllStore())
const rightInfoRef = ref(null)
const leftInfoRef = ref(null)
const introTextChars = ref([])
const introRadiusTween = null
let introTextTween = null
let mm = null

const introContent = siteContent.intro
const introText = introContent.body
const introWords = introText.split(' ').map(word => word.split(''))

onMounted(() => {
  if (!rightInfoRef.value || !introTextChars.value.length) { return }

  mm = $gsap.matchMedia()
  mm.add('(min-width: 1024px)', () => {
    introTextTween = $gsap.fromTo(
      introTextChars.value,
      {
        yPercent: 110
      },
      {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightInfoRef.value,
          start: 'top 50%',
          end: 'bottom bottom',
          scrub: true
        }
      }
    )

    return () => {
      introTextTween?.scrollTrigger?.kill()
      introTextTween?.kill()
      introTextTween = null
    }
  })
  mm.add('(max-width: 1023px)', () => {
    introTextTween = $gsap.fromTo(
      introTextChars.value,
      {
        yPercent: 110
      },
      {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftInfoRef.value,
          start: 'top 50%',
          end: 'top top',
          scrub: true
        }
      }
    )

    return () => {
      introTextTween?.scrollTrigger?.kill()
      introTextTween?.kill()
      introTextTween = null
    }
  })
})

onBeforeUpdate(() => {
  introTextChars.value = []
})

onBeforeUnmount(() => {
  mm?.revert()
  introRadiusTween?.scrollTrigger?.kill()
  introRadiusTween?.kill()
  introTextTween?.scrollTrigger?.kill()
  introTextTween?.kill()
})

const skills = ref(introContent.skills)
</script>

<template>
  <div id="intro" ref="introRef" class="w-screen bg-transparent">
    <div class="set grid w-full grid-cols-1 overflow-visible lg:grid-cols-2">
      <div ref="leftInfoRef" class="top-0 flex  flex-col justify-center py-30 pl-5 pr-10 sm:mt-0 lg:sticky lg:mb-0 lg:h-dvh lg:border-r lg:border-white/80 lg:py-0 xl:pl-0">
        <span class="text-body-1 inline-block w-fit rounded-full bg-black px-2 uppercase text-white/80 xl:px-4 xl:py-0.5">
          {{ introContent.eyebrow }}
        </span>
        <h2 class="intro-title my-5 font-display uppercase text-white">
          {{ introContent.title }}
        </h2>
        <p class="text-body-2 text-black lg:w-4/5">
          <span
            v-for="(word, wordIndex) in introWords"
            :key="`${word.join('')}-${wordIndex}`"
            class="mr-[0.25em] inline-flex overflow-hidden align-top"
          >
            <span
              v-for="(char, charIndex) in word"
              :key="`${char}-${wordIndex}-${charIndex}`"
              class="inline-block overflow-hidden"
            >
              <span
                :ref="el => { if (el) introTextChars.push(el) }"
                class="inline-block will-change-transform"
              >{{ char }}</span>
            </span>
          </span>
        </p>
      </div>
      <div
        class="overflow-y-auto overflow-x-hidden pb-20 pl-5 pt-0 lg:pb-40 lg:pl-10 lg:pt-30"
      >
        <div
          ref="rightInfoRef"
          class="mb-5 flex flex-col gap-5 uppercase lg:mb-0"
        >
          <h3
            data-fade="up"
            class="text-display-1 mb-2 duration-300 md:mb-8 lg:mb-0"
            :class="isCursor && 'hover:ml-10 hover:font-light'"
          >
            {{ introContent.skillsTitle }}
          </h3>
          <div
            v-for="({ title, list }, index) in skills"
            :key="index"
            class="flex flex-col"
          >
            <h4
              data-fade="left"
              class="text-display-2 mb-1 text-black/70 duration-300 hover:translate-x-10 hover:font-light"
            >
              {{ title }}
            </h4>
            <span
              v-for="(item, i) in list"
              :key="i"
              data-fade="right"
              class="text-display-2 pl-7 text-black/40 duration-300 sm:pl-14"
              :class="isCursor && 'hover:ml-10 hover:font-light'"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.intro-title {
  font-size: clamp(2rem, 6.6vw, 6.2rem);
  font-weight: 800;
}

@media (max-width: 1023px) {
  .intro-title {
    font-size: 44px;
  }
}
</style>

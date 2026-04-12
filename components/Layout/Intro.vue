<script setup>
import { useAllStore } from '~/store/all'
const { $gsap } = useNuxtApp()
const { isCursor } = storeToRefs(useAllStore())
const rightInfoRef = ref(null)
const leftInfoRef = ref(null)
const introTextChars = ref([])
const introRadiusTween = null
let introTextTween = null
let mm = null

const introText = 'Hi, I’m Calvin, a frontend engineer who loves turning design and motion into seamless web experiences. I build interactive, animation-driven websites with a focus on performance, precision, and user flow. My background in hospitality taught me to care about people’s experiences - now I apply that same mindset to the digital world.'
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

const skills = ref([
  {
    title: 'Frontend',
    list: [
      'React.js',
      'Vue.js',
      'Nuxt',
      'Tailwind CSS',
      'Bootstrap',
      'GSAP',
      'p5.js',
      'Three.js'
    ]
  },
  {
    title: 'Backend / CMS',
    list: [
      'Node.js',
      'Express.js',
      'WordPress'
    ]
  },
  {
    title: 'Database',
    list: [
      'MongoDB',
      'MySQL'
    ]
  },
  {
    title: 'DevOps',
    list: [
      'Git',
      'Docker',
      'Nginx',
      'Google Cloud Platform(GCP)',
      'AWS'
    ]
  },
  {
    title: 'Testing',
    list: [
      'Jest',
      'Mocha / Chai'
    ]
  },
  {
    title: 'Languages',
    list: [
      'Chinese (Mandarin & Taiwanese)',
      'English'
    ]
  }
])
</script>

<template>
  <div id="intro" ref="introRef" class="w-screen bg-white/80">
    <div class="set grid w-full grid-cols-1 overflow-visible lg:grid-cols-2">
      <div ref="leftInfoRef" class="top-0 flex  flex-col justify-center py-30 pl-5 pr-10 sm:mt-0 lg:sticky lg:mb-0 lg:h-dvh lg:border-r lg:border-white/80 lg:py-0 xl:pl-0">
        <span class="inline-block w-fit rounded-full bg-black px-2 text-[18px] uppercase text-white/80 sm:text-[24px] xl:px-4 xl:py-0.5 xl:text-[32px]">
          Introduction
        </span>
        <h2 class="text-[52px] font-black uppercase text-white sm:text-[80px] xl:text-[100px]">
          Overview
        </h2>
        <p class="text-[16px] font-medium leading-[1.6] text-black/50 sm:leading-[1.4] lg:w-4/5 lg:text-[20px]">
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
          class="mb-5 flex flex-col gap-5  font-bold uppercase leading-[0.8] lg:mb-0"
        >
          <h3
            data-fade="up"
            class="mb-2 text-[50px] duration-300 sm:text-[40px] md:mb-8 md:text-[76px] lg:mb-0 lg:text-[60px] xl:text-[80px]"
            :class="isCursor && 'hover:ml-10 hover:font-light'"
          >
            Technical<br class="sm:hidden lg:inline-block" /><span class="sm:mx-2 lg:hidden"></span>Skills
          </h3>
          <div
            v-for="({ title, list }, index) in skills"
            :key="index"
            class="flex flex-col"
          >
            <h4
              data-fade="left"
              class="mb-1 text-[40px] text-black/70 duration-300 hover:translate-x-10 hover:font-light  xl:text-[64px]"
            >
              {{ title }}
            </h4>
            <span
              v-for="(item, i) in list"
              :key="i"
              data-fade="right"
              class="pl-7 text-[36px] text-black/40 duration-300 sm:pl-14 sm:text-[40px]  xl:text-[64px]"
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

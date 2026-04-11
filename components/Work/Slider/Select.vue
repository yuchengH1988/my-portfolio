<script setup>
import { useAllStore } from '~/store/all'
import imgNation from '~/assets/images/nation-archive.jpeg'
import imgSino from '~/assets/images/chine-fa.jpg'
import imgYichiu from '~/assets/images/yichiu.jpeg'
import imgPaipai from '~/assets/images/paipai.jpg'
import imgDeer from '~/assets/images/deer.jpg'
import imgOpenProcess from '~/assets/images/openprocess.webp'

const { $gsap, $ScrollTrigger } = useNuxtApp()
const { isCursor } = storeToRefs(useAllStore())

const selectedData = ref([
  {
    title: 'Formosa Adventure (3D Web Experience)',
    description: 'Interactive 3D experience for National Museum of Taiwan History',
    highlight: [
      'Three.js 3D interaction',
      'Nuxt architecture refactor',
      'WebGL performance optimization'
    ],
    image: 'deer.jpg',
    link: 'https://taiwanoverseas.nmth.gov.tw/collection-event/'
  },
  {
    title: 'Time Traveler (Interactive Campaign Site)',
    description: 'Campaign website for National Archives of Taiwan',
    highlight: [
      'Advanced GSAP scroll animation',
      'SVG + timeline control',
      'High-performance scroll handling'
    ],
    image: 'nation-archive.jpeg',
    link: 'https://www.archivesgames.tw/'
  },
  {
    title: 'Generative Art Collection (p5.js)',
    description: 'Creative coding experiments on OpenProcessing',
    highlight: [
      'Generative visuals with p5.js',
      '30+ interactive sketches',
      'Creative coding exploration'
    ],
    image: 'openprocess.webp',
    link: 'https://openprocessing.org/user/436847#sketches'
  },
  {
    title: 'Sino-French War (Interactive Story)',
    description: 'Narrative web experience for NMTH',
    highlight: [
      'Scroll-driven storytelling',
      'SVG + animation integration',
      'Multi-section interaction design'
    ],
    image: 'chine-fa.jpg',
    link: 'https://taiwanoverseas.nmth.gov.tw/sino-french-war'
  },
  {
    title: 'YiChiu Group Website',
    description: 'Corporate website with multi-language support',
    highlight: [
      'Horizontal scroll interaction',
      'Dark/Light theme switching',
      'i18n implementation'
    ],
    image: 'yichiu.jpeg',
    link: 'https://www.yico.tw/'
  },
  {
    title: 'Bai Bai 1.0 (CMS + Animation)',
    description: 'Content-driven site built with WordPress + Nuxt',
    highlight: [
      'SVG animation with GSAP',
      'Multi-language CMS integration',
      'Legacy site optimization'
    ],
    image: 'paipai.jpg',
    link: 'https://paipai.blog/'
  }
])

const rootRef = ref(null)
const slideRefs = ref([])
let revealTimeline = null

const imageMap = {
  'nation-archive.jpeg': imgNation,
  'chine-fa.jpg': imgSino,
  'yichiu.jpeg': imgYichiu,
  'paipai.jpg': imgPaipai,
  'openprocess.webp': imgOpenProcess,
  'deer.jpg': imgDeer
}

const imgUrl = name => imageMap[name] || name

function setSlideRef (el, index) {
  if (el) { slideRefs.value[index] = el }
}

function killRevealTimeline () {
  revealTimeline?.scrollTrigger?.kill()
  revealTimeline?.kill()
  revealTimeline = null
}

function initRevealPanels () {
  if (!rootRef.value || slideRefs.value.length !== selectedData.value.length) { return }

  killRevealTimeline()

  slideRefs.value.forEach((slideEl, index) => {
    $gsap.set(slideEl, {
      clipPath: index === 0 ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)'
    })
  })

  revealTimeline = $gsap.timeline({
    scrollTrigger: {
      trigger: rootRef.value,
      start: 'top top',
      end: () => `+=${window.innerHeight * (selectedData.value.length - 1)}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  })

  slideRefs.value.forEach((slideEl, index) => {
    if (index === 0) { return }

    revealTimeline.to(slideEl, {
      clipPath: 'inset(0% 0 0 0)',
      ease: 'none',
      duration: 1
    })
  })

  $ScrollTrigger.refresh()
}

onMounted(async () => {
  await nextTick()
  initRevealPanels()
})

onBeforeUpdate(() => {
  slideRefs.value = []
})

onBeforeUnmount(() => {
  killRevealTimeline()
})
</script>

<template>
  <div ref="rootRef" class="relative mt-16 h-[600dvh] w-full rounded-[50px]">
    <div class="relative h-dvh overflow-hidden">
      <article
        v-for="(item, idx) in selectedData"
        :key="item.title"
        :ref="el => setSlideRef(el, idx)"
        class="absolute inset-0 bg-black py-8 sm:px-2 lg:px-6"
        :style="{ zIndex: idx + 1 }"
      >
        <div
          class="group relative isolate flex h-[calc(100dvh-64px)] flex-col items-start justify-center gap-8 overflow-hidden rounded-[32px] px-2 lg:flex-row lg:items-center lg:justify-between lg:px-5"
        >
          <div class="pointer-events-none absolute inset-0 z-0">
            <img
              :src="imgUrl(item.image)"
              :alt="`${item.title}圖片` || `slide-${idx}`"
              class="size-full object-cover opacity-80 transition-all duration-500"
              :class="[isCursor ? 'blur-[0px] group-hover:blur-[2px]' : 'blur-[2px]']"
            />
            <div v-if="isCursor" class="absolute inset-0 bg-black/20 opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
          </div>
          <div class="relative flex w-[min(100%,370px)] flex-col px-4 py-2 text-left font-bold text-black lg:w-[480px]">
            <AtomBgGlass />
            <span class="z-[2] text-[14px] leading-[2] lg:text-[24px]">
              {{ String(idx + 1).padStart(2, '0') }}
            </span>
            <div class="z-[2] flex flex-col gap-2">
              <h3 class="text-[20px] leading-[0.9] lg:text-[32px]">
                {{ item.title }}
              </h3>
              <p class="text-sm uppercase">
                {{ item.description }}
              </p>
              <p class="text-[12px] lg:text-[16px]">
                <span v-for="(point, pidx) in item.highlight" :key="pidx">
                  - {{ point }}<br v-if="pidx < item.highlight.length - 1" />
                </span>
              </p>
            </div>
          </div>

          <a
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="z-10 relative ml-auto block aspect-square w-[min(520px,100%)] rounded-3xl sm:aspect-[2] lg:ml-0 lg:w-full lg:flex-1"
          >
            <img
              :src="imgUrl(item.image)"
              :alt="`${item.title}圖片` || `slide-${idx}`"
              class="size-full rounded-3xl object-cover transition-all duration-500"
              :class="[isCursor ? 'blur-[2px] grayscale group-hover:blur-0 group-hover:grayscale-0' : 'blur-0']"
            />
          </a>
        </div>
      </article>
    </div>
  </div>
</template>

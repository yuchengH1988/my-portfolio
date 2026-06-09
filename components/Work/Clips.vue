<script setup>
import { useAllStore } from '~/store/all'
import imgNation from '~/assets/images/nation-archive.webp'
import imgSino from '~/assets/images/chine-fa.webp'
import imgYichiu from '~/assets/images/yichiu.webp'
import imgPaipai from '~/assets/images/paipai.webp'
import imgDeer from '~/assets/images/deer.webp'
import imgOpenProcess from '~/assets/images/openprocess.webp'
import imgNationMobile from '~/assets/images/nation-archive-m.webp'
import imgSinoMobile from '~/assets/images/chine-fa-m.webp'
import imgYichiuMobile from '~/assets/images/yichiu-m.webp'
import imgPaipaiMobile from '~/assets/images/paipai-m.webp'
import imgDeerMobile from '~/assets/images/deer-m.webp'
import imgOpenProcessMobile from '~/assets/images/openprocess-m.webp'

const { $gsap, $ScrollTrigger } = useNuxtApp()
const { isCursor } = storeToRefs(useAllStore())

const selectedData = ref([
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
    image: 'chine-fa.webp',
    link: 'https://taiwanoverseas.nmth.gov.tw/sino-french-war'
  },
  {
    title: 'Bai Bai 1.0 (CMS + Animation)',
    description: 'Content-driven site built with WordPress + Nuxt',
    highlight: [
      'SVG animation with GSAP',
      'Multi-language CMS integration',
      'Legacy site optimization'
    ],
    image: 'paipai.webp',
    link: 'https://paipai.blog/'
  }
])

const rootRef = ref(null)
const slideRefs = ref([])
let revealTimeline = null

const imageMap = {
  'nation-archive.webp': imgNation,
  'chine-fa.webp': imgSino,
  'yichiu.webp': imgYichiu,
  'paipai.webp': imgPaipai,
  'openprocess.webp': imgOpenProcess,
  'deer.webp': imgDeer
}

const mobileImageMap = {
  'nation-archive.webp': imgNationMobile,
  'chine-fa.webp': imgSinoMobile,
  'yichiu.webp': imgYichiuMobile,
  'paipai.webp': imgPaipaiMobile,
  'openprocess.webp': imgOpenProcessMobile,
  'deer.webp': imgDeerMobile
}

const cleanAssetUrl = url => String(url).split('?')[0]
const imgUrl = name => cleanAssetUrl(imageMap[name] || name)
const mobileImgUrl = name => cleanAssetUrl(mobileImageMap[name] || imageMap[name] || name)

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
      clipPath: index === 0 ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
      force3D: true,
      willChange: 'clip-path'
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
        class="absolute inset-0 bg-black py-8 will-change-[clip-path] sm:px-2 lg:px-6"
        :style="{ zIndex: idx + 1 }"
      >
        <div
          class="group relative isolate flex h-[calc(100dvh-64px)] flex-col items-start justify-center gap-8 overflow-hidden rounded-[32px] px-3 lg:flex-row lg:items-center lg:justify-between lg:px-5"
        >
          <div class="pointer-events-none absolute inset-0 z-0">
            <picture class="block size-full">
              <source media="(max-width: 539px)" :srcset="mobileImgUrl(item.image)" />
              <img
                :src="imgUrl(item.image)"
                :alt="`${item.title}圖片` || `slide-${idx}`"
                class="size-full object-cover opacity-80 transition-all duration-500"
                :class="[isCursor ? 'sm:blur-[0px] sm:group-hover:blur-[2px]' : 'sm:blur-[2px]']"
              />
            </picture>
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
            <picture class="block size-full">
              <source media="(max-width: 539px)" :srcset="mobileImgUrl(item.image)" />
              <img
                :src="imgUrl(item.image)"
                :alt="`${item.title}圖片` || `slide-${idx}`"
                class="size-full rounded-3xl object-cover transition-all duration-500"
                :class="[
                  isCursor ? 'sm:blur-[2px] sm:grayscale sm:group-hover:blur-0 sm:group-hover:grayscale-0' : 'blur-0',
                  [2, 3].includes(idx) && 'object-left sm:object-center'
                ]"
              />
            </picture>
          </a>
        </div>
      </article>
    </div>
  </div>
</template>

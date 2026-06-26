<script setup>
import { useAllStore } from '~/store/all'
import imgSino from '~/assets/images/chine-fa.webp'
import imgPaipai from '~/assets/images/paipai.webp'
import imgOpenProcess from '~/assets/images/openprocess.webp'
import imgSinoMobile from '~/assets/images/chine-fa-m.webp'
import imgPaipaiMobile from '~/assets/images/paipai-m.webp'
import imgOpenProcessMobile from '~/assets/images/openprocess-m.webp'
import imgFenc from '~/assets/images/fenc.webp'
import imgFencMobile from '~/assets/images/fenc-mobile.webp'
import siteContent from '~/locales/site.json'

const { $gsap, $ScrollTrigger } = useNuxtApp()
const { isCursor } = storeToRefs(useAllStore())

const selectedData = ref(siteContent.work.projects)

const rootRef = ref(null)
const slideRefs = ref([])
let revealTimeline = null

const imageMap = {
  'chine-fa.webp': imgSino,
  'paipai.webp': imgPaipai,
  'openprocess.webp': imgOpenProcess,
  'fenc.webp': imgFenc
}

const mobileImageMap = {
  'chine-fa.webp': imgSinoMobile,
  'paipai.webp': imgPaipaiMobile,
  'openprocess.webp': imgOpenProcessMobile,
  'fenc-mobile.webp': imgFencMobile
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
  <div ref="rootRef" class="relative mt-16 h-dvh w-full rounded-[50px]">
    <div class="relative h-dvh overflow-hidden">
      <article
        v-for="(item, idx) in selectedData"
        :key="item.title"
        :ref="el => setSlideRef(el, idx)"
        class="absolute inset-0 bg-black py-8 will-change-[clip-path] sm:px-2 lg:px-6"
        :style="{ zIndex: idx + 1 }"
      >
        <div
          class="group relative isolate flex h-[calc(100dvh-64px)] flex-col items-center justify-center gap-2 overflow-hidden rounded-[32px] px-3 lg:px-5"
        >
          <div class="pointer-events-none absolute inset-0 z-0">
            <picture class="block size-full">
              <source media="(max-width: 539px)" :srcset="mobileImgUrl(item.image)" />
              <img
                :src="imgUrl(item.image)"
                :alt="item.alt || item.title"
                class="size-full object-cover opacity-85 blur-[2px] transition-all duration-500"
              />
            </picture>
            <div v-if="isCursor" class="absolute inset-0 bg-black/30 opacity-100 transition-opacity duration-500 group-hover:opacity-10" />
          </div>
          <div class="relative flex h-[30vh] w-[80vw] flex-col px-4 py-2 text-left text-black lg:w-[50vw]">
            <AtomBgGlass />
            <span class="text-body-2 z-[2] text-right leading-[2]">
              {{ String(idx + 1).padStart(2, '0') }}
            </span>
            <div class="z-[2] flex flex-1 flex-col items-center justify-center gap-2">
              <h3 class="text-head-2 text-center">
                {{ item.title }}
              </h3>
              <p class="text-body-2 text-center uppercase">
                {{ item.description }}
              </p>
              <p class="text-body-2">
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
            class="group/link relative block w-[80vw] overflow-hidden rounded-xl lg:w-[50vw]"
          >
            <picture class="block size-full">
              <source media="(max-width: 539px)" :srcset="mobileImgUrl(item.image)" />
              <img
                :src="imgUrl(item.image)"
                :alt="item.alt || item.title"
                class="size-full object-contain transition-all duration-500"
                :class="[
                  isCursor ? 'sm:blur-[2px] sm:grayscale sm:group-hover:blur-0 sm:group-hover:grayscale-0' : 'blur-0',
                  [2, 3].includes(idx) && 'object-left sm:object-center'
                ]"
              />
            </picture>
            <span
              class="pointer-events-none absolute bottom-3 right-3 z-[2] flex size-10 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-md transition-transform duration-300 group-hover/link:scale-110"
            >
              <AtomIcon name="external-link" class="size-5" />
            </span>
          </a>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import imgSino from '~/assets/images/chine-fa.webp'
import imgPaipai from '~/assets/images/paipai.webp'
import imgOpenProcess from '~/assets/images/openprocess.webp'
import imgSinoMobile from '~/assets/images/chine-fa-m.webp'
import imgPaipaiMobile from '~/assets/images/paipai-m.webp'
import imgOpenProcessMobile from '~/assets/images/openprocess-m.webp'
import imgByeBye1987 from '~/assets/images/byebye1987.webp'
import imgByeBye1987Mobile from '~/assets/images/byebye1987_m.webp'
import imgFenc from '~/assets/images/fenc.webp'
import imgFencMobile from '~/assets/images/fenc-mobile.webp'
import siteContent from '~/locales/site.json'

const imageMap = {
  'chine-fa.webp': imgSino,
  'paipai.webp': imgPaipai,
  'openprocess.webp': imgOpenProcess,
  'byebye1987.webp': imgByeBye1987,
  'fenc.webp': imgFenc
}

const mobileImageMap = {
  'chine-fa.webp': imgSinoMobile,
  'paipai.webp': imgPaipaiMobile,
  'openprocess.webp': imgOpenProcessMobile,
  'byebye1987.webp': imgByeBye1987Mobile,
  'fenc.webp': imgFencMobile
}

const cleanAssetUrl = url => String(url).split('?')[0]
const imgUrl = name => cleanAssetUrl(imageMap[name] || name)
const mobileImgUrl = name => cleanAssetUrl(mobileImageMap[name] || imageMap[name] || name)

const splitTitle = (title) => {
  const match = String(title).match(/^(.*?)\s*\((.*)\)\s*$/)
  if (!match) { return { main: title, aside: '' } }
  return { main: match[1].trim(), aside: match[2].trim() }
}

const selectedData = computed(() =>
  siteContent.work.projects.map(item => ({
    ...item,
    titleParts: splitTitle(item.title)
  }))
)
</script>

<template>
  <div class="relative mt-20 w-full border-t border-bgc/20">
    <div
      v-for="(item, idx) in selectedData"
      :key="item.title"
      class="project-row group grid grid-cols-12 gap-4 border-b border-bgc/20 py-8 text-bgc transition-colors duration-500 last:border-b-0 lg:items-center lg:gap-x-4"
    >
      <div class="col-span-12 flex flex-col items-center justify-center gap-2 lg:col-span-9 lg:flex-row lg:justify-start lg:gap-8">
        <span class="text-body-3 mr-auto text-bgc/60">
          {{ String(idx + 1).padStart(2, '0') }}
        </span>
        <h3 class="text-display-3 text-balance pb-4 text-center lg:w-1/2 lg:pb-0 lg:text-left">
          {{ item.titleParts.main }}
          <span
            v-if="item.titleParts.aside"
            class="text-head-2 ml-2 mt-0 text-bgc/60 lg:ml-0 lg:mt-1 lg:block"
          >
            {{ item.titleParts.aside }}
          </span>
        </h3>
        <div class="max-w-[300px] sm:max-w-none lg:w-1/2">
          <p class="text-body-2 text-bgc/90">
            {{ item.description }}
          </p>
          <p class="text-body-3 mt-2 flex flex-wrap gap-x-3 gap-y-1 text-bgc/60 lg:mt-4">
            <span v-for="point in item.highlight.slice(0, 2)" :key="point">
              {{ point }}
            </span>
          </p>
        </div>
      </div>
      <a
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
        class="project-media relative col-span-12 mx-auto aspect-[16/10] max-w-[300px] overflow-hidden rounded-lg lg:col-span-3 lg:max-w-none"
      >
        <picture class="block size-full">
          <source media="(max-width: 539px)" :srcset="mobileImgUrl(item.image)" />
          <img
            :src="imgUrl(item.image)"
            :alt="item.alt || item.title"
            class="ease-out size-full object-cover transition duration-700"
            :class="[idx === 2 && 'object-left lg:object-center']"
            loading="lazy"
          />
        </picture>
        <span class="pointer-events-none absolute bottom-2 right-2 flex size-9 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
          <AtomIcon name="external-link" class="size-4" />
        </span>
      </a>
    </div>
  </div>
</template>

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .project-media img {
    filter: grayscale(1);
  }

  .project-row:hover .project-media img {
    filter: grayscale(0);
    transform: scale(1.035);
  }
}
</style>

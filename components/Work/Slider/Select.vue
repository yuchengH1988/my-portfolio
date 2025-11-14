<script setup>

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Keyboard, A11y } from 'swiper/modules'
import imgNation from '~/assets/images/nation-archive.jpeg'
import imgSino from '~/assets/images/chine-fa.jpg'
import imgYichui from '~/assets/images/yichui.jpeg'
import imgPaipai from '~/assets/images/paipai.jpg'
import imgOpenProcess from '~/assets/images/openprocess.webp'

// Swiper 樣式（必要）
import 'swiper/css'
import 'swiper/css/pagination'
const selectedData = ref([
  {
    title: 'Time Traveler',
    description: 'National Archives of Taiwan',
    highlight: [
      'Complex scroll animation'
    ],
    image: 'nation-archive.jpeg',
    link: 'https://www.archivesgames.tw/'
  },
  {
    title: 'P5.js Practice Works',
    description: 'OpenProcessing',
    highlight: [
      'Generative drawing with p5.js',
      '30+ creative coding sketches'
    ],
    image: 'openprocess.webp',
    link: 'https://openprocessing.org/user/436847#sketches'
  },
  {
    title: 'Sino-French War',
    description: 'National Museum of Taiwan History',
    highlight: [
      'Narrative 3D animation',
      'Scroll + SVG + slider motion'
    ],
    image: 'chine-fa.jpg',
    link: 'https://taiwanoverseas.nmth.gov.tw/sino-french-war'
  },
  {
    title: 'Yichiu Group',
    highlight: [
      'Horizontal scroll animation',
      'Light/Dark theme + multi-language'
    ],
    image: 'yichui.jpeg',
    link: 'https://www.yico.tw/'
  },
  {
    title: 'Bai Bai 1.0',
    description: 'Block Studio',
    highlight: [
      'SVG drawing animation',
      'Multi-language'
    ],
    image: 'paipai.jpg',
    link: 'https://paipai.blog/'
  }
])

const modules = [Autoplay, Keyboard, A11y]

const breakpoints = {
  0: { slidesPerView: 1 },
  768: { slidesPerView: 2 }
}
const imageMap = {
  'nation-archive.jpeg': imgNation,
  'chine-fa.jpg': imgSino,
  'yichui.jpeg': imgYichui,
  'paipai.jpg': imgPaipai,
  'openprocess.webp': imgOpenProcess
}
const imgUrl = name => imageMap[name] || name
</script>
<template>
  <div class="relative mt-16 w-full border-x-2 border-bgc">
    <ClientOnly>
      <Swiper
        :modules="modules"
        :slides-per-view="2"
        :breakpoints="breakpoints"
        :autoplay="{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false
        }"
        :speed="1000"
        :loop="true"
        :keyboard="{ enabled: true }"
        :grab-cursor="true"
        :simulate-touch="true"
        :allow-touch-move="true"
        class="w-full"
      >
        <SwiperSlide v-for="(item, idx) in selectedData" :key="idx">
          <a
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col overflow-hidden border-r-2 border-bgc/50 p-5 lg:px-10"
          >
            <span class="w-10 rounded-full border border-bgc text-[20px] font-light duration-500 group-hover:bg-bgc group-hover:text-black">
              {{ String(idx + 1).padStart(2, '0') }}
            </span>
            <div class="mt-3 h-30 text-left  font-bold ">
              <h3 class="line-clamp-1 text-[24px] uppercase leading-[0.9] sm:text-[40px]">
                {{ item.title }}
              </h3>
              <p class="h-[21px] text-right text-sm uppercase">
                {{ item.description }}
              </p>
              <p class="mt-3 text-[14px] font-light">
                <span v-for="(point, pidx) in item.highlight" :key="pidx">
                  - {{ point }}<br v-if="pidx < item.highlight.length - 1" />
                </span>
              </p>
            </div>
            <img
              :src="imgUrl(item.image)"
              :alt="`${item.title}圖片` || `slide-${idx}`"
              class="mt-5 aspect-[2] w-full object-cover opacity-80 transition-all duration-500 sm:blur-[2px] sm:grayscale sm:group-hover:blur-0 sm:group-hover:grayscale-0"
            />
          </a>
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
  </div>
</template>

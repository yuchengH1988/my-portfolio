<script setup>
const links = ref([
  { name: 'Email', url: 'mailto:yucheng.h.1988@gmail.com' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/huangyucheng/' },
  { name: 'GitHub', url: 'https://github.com/yuchengH1988' },
  { name: 'Open Process', url: 'https://openprocessing.org/user/436847/#sketches' }
])
</script>

<template>
  <section
    id="contact"
    class="w-screen overflow-hidden bg-bgc text-[40px] font-extra-bold uppercase leading-[1] text-black sm:text-[24px] md:text-[44px] lg:text-[60px]"
  >
    <div data-fade="up" class="flex w-full flex-col px-5 pb-15 pt-10 sm:flex-row lg:px-10">
      <h2 class="mb-30 flex w-full flex-col justify-between sm:mb-0 sm:w-1/2 sm:border-r sm:border-black">
        <span class="text-[16px] text-black/50">YuCheng Huang / Calvin</span>
        <span>contact me</span>
      </h2>
      <div class="flex w-full flex-col  items-end sm:w-1/2 sm:items-start sm:pl-5">
        <a
          v-for="(link, index) in links"
          :key="index"
          :href="link.url"
          :title="`${link.name}連結`"
          target="_blank"
          rel="noopener noreferrer"
          class="relative w-fit  text-black transition duration-700 hover:text-black/30"
        >
          {{ link.name }}
          <div class="absolute bottom-1.5 h-[0.5px] w-full bg-black"></div>
        </a>
      </div>
    </div>
  </section>
</template>

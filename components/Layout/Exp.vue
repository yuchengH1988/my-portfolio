<script setup>
import siteContent from '~/locales/site.json'

const getImageUrl = async (path) => {
  try {
    return await useAsset(`company/${path}`)
  } catch (error) {
    console.error(`Error loading image: ${path}`, error)
    return ''
  }
}

const experienceContent = siteContent.experience
const experiences = ref(await Promise.all(
  experienceContent.items.map(async item => ({
    ...item,
    icon: await getImageUrl(item.icon)
  }))
))

</script>
<template>
  <section id="exp" class="w-screen overflow-hidden text-white">
    <div class="set w-full pt-10 text-bgc/90">
      <h2 data-fade="up" class="text-display-3 uppercase">
        {{ experienceContent.title }}
      </h2>
      <div class="relative mx-auto mt-15 flex min-h-dvh w-full flex-col items-center pb-[300px] pt-10 [perspective:1000px] md:mt-20 md:w-[85vw] lg:w-[70vw]">
        <div class="exp-timeline-axis absolute inset-y-0 left-8 w-[1px] bg-white md:left-[225px]">
          <div class="relative size-full">
            <div class="absolute bottom-0 h-[240px] w-[1px] origin-bottom rotate-45 bg-bgc"></div>
            <div class="absolute bottom-0 h-[240px] w-[1px] origin-bottom -rotate-45 bg-bgc"></div>
          </div>
        </div>
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          class="relative flex w-full flex-col pb-24 pl-20 pt-0 md:flex-row md:py-5 md:pl-0"
        >
          <div class="absolute left-[12px] top-[30px] flex size-10 items-center justify-center overflow-hidden rounded-full bg-bgc md:left-[205px] md:top-[10px]">
            <img
              :src="exp.icon"
              :alt="`${exp.companyName} logo`"
              :class="[index === 0 || index === 3 ? 'size-[80%]' :'size-full']"
            />
          </div>
          <p data-fade="left" class="text-body-3 w-[154px] md:mr-30 md:w-40 md:text-right">
            {{ exp.date }}
          </p>
          <div data-fade="right" class="flex w-full flex-col pt-8 md:w-[calc(100%-280px)] md:pt-0">
            <p class="text-head-4 font-extra-bold">
              {{ exp.title }}
            </p>
            <p class="text-body-3 mt-3 w-fit bg-bgc px-2 py-1 font-extra-bold text-black">
              {{ exp.companyName }}
            </p>
            <ul class="text-body-3 mt-5 list-inside list-disc break-words md:ml-5">
              <li v-for="(point, index) in exp.points" :key="index">
                {{ point }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.exp-timeline-axis {
  transform-origin: center center;
  transform-style: preserve-3d;
  animation: timeline-axis-rotate 5s linear infinite;
  will-change: transform;
}

@keyframes timeline-axis-rotate {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(360deg);
  }
}
</style>

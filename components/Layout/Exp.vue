<script setup>
const getImageUrl = async (path) => {
  try {
    return await useAsset(`company/${path}`)
  } catch (error) {
    console.error(`Error loading image: ${path}`, error)
    return ''
  }
}

const experiences = ref(await Promise.all([
  {
    title: 'Frontend Engineer',
    company_name: 'Block Studio',
    icon: await getImageUrl('blockstudio.png'),
    date: 'Feb 2025 – Present',
    points: [
      'Delivered a 90+ page enterprise website, plus 2 mid-scale and 5 small-scale client sites using Nuxt + WordPress CMS.',
      'Implemented advanced animation solutions and optimized scroll-based interactions for smooth performance.',
      'Supported i18n, A11y compliance, and security best practices, collaborating closely with designers and PMs.'
    ]
  },
  {
    title: 'Node. Js Engineer',
    company_name: 'Bat Mobile Inc',
    icon: await getImageUrl('bat.png'),
    date: 'Aug 2021 - Jan 2025',
    points: [
      'Enhanced platform features across web/iOS/Android with focus on performance and maintainability.',
      'Upgraded messaging system into threaded group conversations with database redesign.',
      'Separated backend APIs from full-stack system, optimized DB architecture, and authored ~75% of technical documentation.',
      'Expanded operations platform with reporting, blocking, vote/board settings, account history, notifications, and scheduling.'
    ]
  },
  {
    title: 'Manager',
    company_name: 'CAMA coffee',
    icon: await getImageUrl('cama.png'),
    date: 'Oct 2017 - Jul 2020',
    points: [
      'Managed 3 branches and 10+ staff, strengthening leadership and communication.'
    ]
  },
  {
    title: 'Other Experience',
    company_name: 'Hospitality & Surveying',
    icon: await getImageUrl('other.png'),
    date: '2013 – 2017',
    points: [
      '8 years in hospitality & 1 year in surveying; developed strong teamwork and problem-solving abilities.'
    ]
  }]))

</script>
<template>
  <section id="exp" class="w-screen overflow-x-hidden text-white">
    <div class="set w-full pt-10 text-bgc/90">
      <h2 data-fade="up" class="text-[52px] font-extra-bold uppercase leading-[0.9] sm:text-[68px] md:text-[80px]">
        Work Experience
      </h2>
      <div class="relative mx-auto mt-15 flex min-h-dvh w-full flex-col items-center pb-[300px] pt-10 md:mt-20 md:w-[85vw] lg:w-[70vw]">
        <div data-fade="left" class="absolute inset-y-0 left-8 w-[1px] bg-white md:left-[225px]">
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
          <div data-fade="up" class="absolute left-[12px] top-[30px] flex size-10 items-center justify-center overflow-hidden rounded-full bg-bgc md:left-[205px] md:top-[10px]">
            <img
              :src="exp.icon"
              :alt="`${exp.company_name} logo`"
              :class="[index === 0 || index === 3 ? 'size-[80%]' :'size-full']"
            />
          </div>
          <p data-fade="left" class="w-[154px] md:mr-30 md:w-40 md:text-right">
            {{ exp.date }}
          </p>
          <div data-fade="right" class="flex w-full flex-col pt-8 md:w-[calc(100%-280px)] md:pt-0">
            <p class="text-xl font-extra-bold">
              {{ exp.title }}
            </p>
            <p class=" mt-3 w-fit bg-bgc px-2 py-1 text-sm font-extra-bold text-black">
              {{ exp.company_name }}
            </p>
            <ul class="mt-5 list-inside list-disc break-words md:ml-5">
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

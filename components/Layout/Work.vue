<script setup>

</script>

<template>
  <section id="work" class="w-screen overflow-hidden">
    <div class="set w-full pt-30 text-bgc/90">
      <div class="flex flex-col items-center text-center ">
        <h2 data-fade="up" class="text-[62px] font-black leading-[1.2] sm:text-[100px] lg:text-[200px]">
          PROJECTS
        </h2>
        <p data-fade="up" class="mb-5 mt-10  max-w-[80%] text-[18px] lg:my-0">
          These selected projects highlight my real-world experience across modern web development. Each example includes a brief overview and live demo, demonstrating my ability to solve complex problems, work with different technologies, and deliver effective solutions.
        </p>
        <WorkSliderSelect data-fade="right" />
      </div>
    </div>
    <div class="relative flex h-screen w-full flex-col items-center justify-center sm:h-dvh">
      <CommonP5Work class="z-[-1]" />
      <p data-fade="up" class="w-[560px] max-w-[80vw] rounded-3xl p-3 text-center text-[12px] font-normal leading-[1.8] text-bgc sm:text-xl md:p-5">
        Over the past 4 years, I have delivered 30+ web projects, including corporate sites, exhibition microsites, and animation-driven experiences. Many involved WordPress CMS integration, i18n, and performance tuning, strengthening my capabilities in motion UI, scalable architecture, and cross-team collaboration.
      </p>
    </div>
  </section>
</template>

<script setup>
import siteContent from '~/locales/site.json'

const workContent = siteContent.work
</script>

<template>
  <div class="set w-full pt-30 text-bgc/90">
    <div class="flex flex-col items-center text-center">
      <h2
        data-fade="up"
        class="font-display text-[clamp(3.875rem,15vw,12.5rem)] font-black leading-[1.2]"
      >
        {{ workContent.title }}
      </h2>
      <p data-fade="up" class="text-body-2 mb-5 mt-10 max-w-[80%] lg:my-0">
        {{ workContent.summary }}
      </p>
      <WorkClips />
    </div>
  </div>
</template>

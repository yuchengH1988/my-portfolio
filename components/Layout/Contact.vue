<script setup>
import siteContent from '~/locales/site.json'

const contactContent = siteContent.contact
const links = ref(contactContent.links)
</script>

<template>
  <section
    id="contact"
    class="text-display-5 w-screen overflow-hidden bg-bgc uppercase text-black"
  >
    <div data-fade="up" class="flex w-full flex-col px-5 pb-15 pt-10 sm:flex-row lg:px-10">
      <h2 class="mb-30 flex w-full flex-col justify-between sm:mb-0 sm:w-1/2 sm:border-r sm:border-black">
        <span class="text-body-1 text-black">{{ contactContent.name }}</span>
        <span>{{ contactContent.title }}</span>
      </h2>
      <div class="flex w-full flex-col  items-end sm:w-1/2 sm:items-start sm:pl-5">
        <a
          v-for="(link, index) in links"
          :key="index"
          :href="link.url"
          :title="link.title"
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

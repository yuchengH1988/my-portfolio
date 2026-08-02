<script setup>
import siteContent from '~/locales/site.json'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  }
})
const { title, link } = toRefs(props)
const uiContent = siteContent.ui
</script>
<template>
  <div class="flex flex-col space-y-8 rounded-lg border border-gray-300 bg-white px-6 pb-16 pt-10 duration-300">
    <div class="space-y-4">
      <div class="flex items-center gap-3">
        <h3 class="text-head-2 text-txt-800">
          {{ title }}
        </h3>
        <nuxt-link v-if="link" :to="link" target="_blank" class="text-body-3 underline text-gray-700 hover:text-txt-core">
          {{ uiContent.designFile }}
        </nuxt-link>
      </div>
      <div v-if="$slots.head" class="text-body-3 space-y-4 text-txt-700">
        <slot name="head"></slot>
      </div>
    </div>
    <div class="h-px w-full bg-gray-300"></div>

    <slot name="body"></slot>
    <!-- <div class="h-px w-full bg-gray-300"></div> -->
  </div>
</template>

<script setup>
import siteContent from '~/locales/site.json'

const props = defineProps({
  error: Object
})
const { error } = toRefs(props)
const errorContent = siteContent.error
</script>

<template>
  <div class="h-lvh pt-20 lg:pt-24">
    <div class="container flex h-full flex-col items-center justify-start gap-28 lg:justify-center">
      <div class="flex flex-col items-center opacity-75">
        <h2 class="text-display-1 text-red-500" v-text="error.statusCode" />
        <p class="text-en-head-4 text-center text-gray-800" v-text="error.message" />
      </div>

      <p class="text-en-head-3 lg:text-en-display-3 text-gray-800 opacity-75">
        {{ errorContent.notFound }}
      </p>
    </div>
  </div>
</template>

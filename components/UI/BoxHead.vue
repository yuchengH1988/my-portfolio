<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
const { title } = toRefs(props)
</script>
<template>
  <div class="flex flex-col space-y-4 border-b border-gray-300 pb-8">
    <h2 class="text-head-1 text-txt-800">
      {{ title }}
    </h2>
    <div v-if="$slots.desc" class="text-body-3 w-full text-txt-700">
      <slot name="desc"></slot>
    </div>
  </div>
</template>

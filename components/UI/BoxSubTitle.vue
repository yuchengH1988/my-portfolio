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
  <div class="relative  overflow-hidden rounded bg-gray-100 p-4">
    <div class="absolute inset-y-0 left-0 w-1 bg-pr"></div>
    <div class="space-y-2">
      <p class="text-zh-head-5 text-gray-800">
        {{ title }}
      </p>
      <slot></slot>
    </div>
  </div>
</template>

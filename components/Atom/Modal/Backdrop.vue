<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})
const { isOpen } = toRefs(props)
</script>

<template>
  <div
    class="absolute left-0 top-0 z-0 h-screen w-screen cursor-pointer bg-black/30 duration-300"
    :class="{
      'pointer-events-none opacity-0':!isOpen
    }"
  ></div>
</template>

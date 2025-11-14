<script setup>
const props = defineProps({
  /**
   * 是否開啟
   */
  isOpen: {
    type: Boolean,
    default: false
  }
})
const { isOpen } = toRefs(props)
const emits = defineEmits(['update:is-open'])

onMounted(() => {
})
</script>

<template>
  <div
    class="bs-modal | fixed left-0 top-0 h-screen w-screen"
    :class="{'pointer-events-none':!isOpen}"
  >
    <AtomModalBackdrop
      :is-open="isOpen"
      @click="emits('update:is-open',false)"
    />
    <slot></slot>
  </div>
</template>

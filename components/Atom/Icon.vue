<script setup>
const props = defineProps({
  /**
   * 輸入 icon 名稱
   * @type {String}
   * @values 例如：'up', 'down'
   */
  name: {
    type: String,
    required: true
  },
  /**
   * 是否跟著父元素寬度
   * @type {Boolean}
   * @values true: 跟著父元素寬度 / false: 預設 24px
   */
  isFull: {
    type: Boolean,
    default: false
  }
})
const { name } = toRefs(props)

const svgName = computed(() => {
  return name.value.includes('/') ? `#${name.value}` : `#/${name.value}`
})
</script>
<template>
  <svg
    :width="isFull ? '100%' : 24"
    :height="isFull ? '100%' :24"
    aria-hidden="true"
  >
    <use :xlink:href="svgName" fill="currentColor" />
  </svg>
</template>

<script setup>

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: 'auto'
  },
  height: {
    type: [String, Number],
    default: 'auto'
  },
  loading: {
    type: String,
    default: 'lazy'
  }
})

const imageUrl = ref(null)
const isLoading = ref(true)
const hasError = ref(false)

onMounted(async () => {
  try {
    imageUrl.value = await useAsset(props.src)
  } catch (error) {
    console.error('Failed to load image:', error)
    hasError.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="relative" :style="{ width, height }">
    <!-- 載入中狀態 -->
    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-gray-100">
      <div class="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>

    <!-- 錯誤狀態 -->
    <div v-else-if="hasError" class="absolute inset-0 flex items-center justify-center bg-gray-100">
      <span class="text-gray-400">圖片載入失敗</span>
    </div>

    <!-- 圖片 -->
    <img
      v-else
      :src="imageUrl"
      :alt="alt"
      :loading="loading"
      class="w-full h-full object-cover"
      @error="hasError = true"
    />
  </div>
</template> 
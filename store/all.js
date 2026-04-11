import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAllStore = defineStore('all', () => {
  const nowPath = ref('')

  // 視窗寬度
  const windowWidth = ref(0)
  const isCursor = ref(false)

  // 頁面 Loading 設定
  const pageLoading = ref(false)
  const webLoading = ref(true)
  const fetchLoading = ref(false)

  // 全域資料
  const globalData = ref({})

  // 範例程式碼
  const count = ref(0)
  const increment = () => {
    count.value += 1
  }
  const decrement = () => {
    count.value -= 1
  }
  const doubleCount = computed(() => count.value * 2)

  const setIsCursor = (value) => {
    isCursor.value = Boolean(value)
  }

  return {
    windowWidth,
    isCursor,
    setIsCursor,
    pageLoading,
    webLoading,
    fetchLoading,
    globalData,
    nowPath,
    count,
    increment,
    decrement,
    doubleCount
  }
})

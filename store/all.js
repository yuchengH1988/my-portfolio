// eslint-disable-next-line node/no-extraneous-import
import { defineStore } from 'pinia'

export const useAllStore = defineStore('all', () => {
  const nowPath = ref('')

  // 視窗寬度
  const windowWidth = ref(0)

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

  return {
    windowWidth,
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

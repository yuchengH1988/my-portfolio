// eslint-disable-next-line node/no-extraneous-import
import { defineStore } from 'pinia'
import { onScopeDispose, ref } from 'vue'

const checkPointer = () => {
  // 檢測裝置類型（僅 client 端）
  const pointerType = ref('')
  const hasFinePointer = ref(false)
  const isPointerDevice = ref(false)

  if (process.client) {
    const fineQuery = window.matchMedia('(pointer: fine)')

    const update = () => {
      isPointerDevice.value =
        ['mouse', 'pen'].includes(pointerType.value) || hasFinePointer.value
    }

    const updateFine = () => {
      hasFinePointer.value = fineQuery.matches
      update()
    }

    const onPointerMove = (event) => {
      pointerType.value = event.pointerType || ''
      update()
    }

    updateFine()
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    if (fineQuery.addEventListener) {
      fineQuery.addEventListener('change', updateFine)
    } else {
      fineQuery.addListener(updateFine)
    }

    onScopeDispose(() => {
      window.removeEventListener('pointermove', onPointerMove)
      if (fineQuery.removeEventListener) {
        fineQuery.removeEventListener('change', updateFine)
      } else {
        fineQuery.removeListener(updateFine)
      }
    })
  }

  return { isPointerDevice }
}

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

  const { isPointerDevice } = checkPointer()

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
    doubleCount,
    isPointerDevice
  }
})

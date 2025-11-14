import { useAllStore } from '@/store/all'

export default defineNuxtRouteMiddleware((newRoute, oldRoute) => {
  const allStore = useAllStore()
  const { pageLoading, webLoading, nowPath } = toRefs(allStore)

  // 更新當前路徑
  nowPath.value = newRoute.path

  // console.log('newRoute', newRoute)
  // console.log('oldRoute', oldRoute)

  return new Promise((resolve) => {
    // 換頁時，先顯示 loading
    // 如果有要先引入最一開始 loading 請打開
    // if (webLoading.value) {
    //   resolve()

    //   return
    // }

    if (newRoute.path === '/ui' || newRoute.path === '/ui/') {
      resolve()

      return
    }

    // 判斷如果是同一頁，只是 query 不同，不顯示 loading
    if (decodeURI(newRoute.path) === decodeURI(oldRoute.path)) {
      resolve()

      return
    }

    resolve()

    // 如果有要頁面 loading 效果請移除 return
    return

    setTimeout(() => {
      pageLoading.value = true
    })

    setTimeout(() => {
      resolve()
    }, 300)
  })
})

/**
 * Docker 時使用
 * APP_BACKEND_API 為 docker 內部 SSR 使用
 * APP_API 為實際 client 端使用
 * 使用方式：
 * const { $APP_URL } = useNuxtApp()
 */
export default defineNuxtPlugin((nuxtApp) => {
  const { APP_API, APP_BACKEND_API } = useRuntimeConfig().public

  nuxtApp.provide('APP_URL', () => {
    if (process.server && !process.dev) {
      return APP_BACKEND_API
    }

    return APP_API
  })
})

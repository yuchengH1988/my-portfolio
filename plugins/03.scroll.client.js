import Lenis from '@studio-freight/lenis'

let lenis

export default defineNuxtPlugin({
  name: 'scroll-client',
  setup () {
    /**
     * 執行其他 plugin 會有順序問題，要小心注意
     * GSAP 與 ScrollTrigger 需要在 Lenis 之前執行
     * @see https://nuxt.com/docs/guide/directory-structure/plugins#registration-order
     */
    const {
      $gsap: gsap,
      $ScrollTrigger: ScrollTrigger
    } = useNuxtApp()

    /**
     * Lenis 滾動效果
     */
    lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // 手機網址列顯隱會改 visualViewport，導致 ScrollTrigger 起點錯位
    // 不忽略 mobile resize，改 debounce refresh 校正
    ScrollTrigger.config({ ignoreMobileResize: false })

    let refreshTimer
    const scheduleRefresh = () => {
      clearTimeout(refreshTimer)
      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 200)
    }

    if (process.client) {
      window.addEventListener('orientationchange', scheduleRefresh)
      window.visualViewport?.addEventListener('resize', scheduleRefresh)
    }

    return {
      provide: {
        lenis
      }
    }
  },
  hooks: {
    'page:finish': () => {
      lenis.stop()

      if (useRouter().currentRoute.value.meta.scrollToTop) {
        document.scrollingElement?.scrollTo({ left: 0, top: 0 })
        document.body?.scrollTo({ left: 0, top: 0 })
      }

      lenis.start()
      // 頁面內容就緒後再算一次位置
      requestAnimationFrame(() => {
        const { $ScrollTrigger } = useNuxtApp()
        $ScrollTrigger.refresh()
      })
    }
  }
})

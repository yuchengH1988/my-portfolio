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
    }
  }
})

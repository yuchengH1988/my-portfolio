export default defineNuxtPlugin(({ provide }) => {
  const { GA_ID, GTM_ID } = useRuntimeConfig().public

  /**
   * Google Analytics
   */
  if (GA_ID) {
    window.dataLayer = window.dataLayer || []

    function gtag (..._args) {
      window.dataLayer.push(arguments)
    }

    provide('gtag', gtag)
    gtag('js', new Date())
    gtag('config', GA_ID, JSON.stringify({}, null, 2))

    useRouter().afterEach((to) => {
      gtag('config', GA_ID, {
      // 可自訂參數
      // page_path: to.fullPath,
      // location_path: window.location.origin + to.fullPath,
        debug_mode: process.env.NODE_ENV !== 'production' ? true : undefined // 在本地開發時為 DebugMode
      })
    })
  }

  /**
   * Google Tag Manager
   */
  if (GTM_ID) {
    useHead({
      script: [{
        children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');`
      }],
      noscript: [{
        children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        tagPosition: 'bodyOpen'
      }]
    })
  }
})

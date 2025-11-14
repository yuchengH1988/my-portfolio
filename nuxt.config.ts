// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      title: process.env.APP_TITLE,
      htmlAttrs: {
        lang: process.env.APP_DEFAULT_LANG
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'description',
          content: process.env.APP_DESC
        },
        {
          property: 'og:locale',
          content: process.env.APP_DEFAULT_LANG
        },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'robots',
          content: `${
                process.env.WEB_SEARCH === 'YES'
                  ? 'index, follow'
                  : 'noindex, nofollow'
              }`
        },
        {
          name: 'google-site-verification',
          content: `${
            process.env.GOOGLE_SITE_VERIFICATION
              ? process.env.GOOGLE_SITE_VERIFICATION
              : ''
          }`
        }
      ],
      link: [
        // Favicons
        { rel: 'icon', type: 'image/svg+xml', href: `${process.env.APP_BASE_URL}favicon.svg` },
        { rel: 'apple-touch-icon', href: `${process.env.APP_BASE_URL}apple-touch-icon.png` },
        { rel: 'manifest', href: `${process.env.APP_BASE_URL}manifest.webmanifest` },
        // Google Fonts
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
        { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css2?family=Expletus+Sans:wght@600;700&family=Noto+Sans+TC:wght@400;500&family=Roboto:wght@400;500;700&display=swap' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@200..800&display=swap'
        },
        { rel: 'stylesheet', media: 'print', onload: 'this.media="all"', href: 'https://fonts.googleapis.com/css2?family=Expletus+Sans:wght@600;700&family=Noto+Sans+TC:wght@400;500&family=Roboto:wght@400;500;700&display=swap' }
      ],
      script: [
        // 對應到 component 的 Atom/Video.vue 的 youtube iframe api
        {
          src: 'https://www.youtube.com/iframe_api'
        }
      ],
      noscript: [{ innerHTML: '此網站需要開啟JavaScript<br>JavaScript is required' }]
    },
    baseURL: `${process.env.APP_BASE_URL}`
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    // 'nuxt-security',
    '@nuxt/devtools',
    // '@nuxtjs/sitemap',  // 暫時註釋掉
    // Google Analytics Module
    (_inlineOptions, nuxt) => {
      const { GA_ID = '' } = nuxt.options.runtimeConfig.public

      if (!GA_ID) { return }

      nuxt.options.app.head.script = nuxt.options.app.head.script || []
      nuxt.options.app.head.script.unshift({
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
        async: true
      })
    }
  ],

  // security: {
  //   headers: {
  //     xXSSProtection: '1',
  //     hidePoweredBy: false,
  //     xFrameOptions: 'SAMEORIGIN',
  //     xContentTypeOptions: 'nosniff',
  //     crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
  //     crossOriginOpenerPolicy: 'same-origin',
  //     contentSecurityPolicy: {
  //       'base-uri': ["'self'"],
  //       'font-src': ["'self'", 'https:', 'data:'],
  //       'form-action': ["'self'"],
  //       'frame-ancestors': ["'self'"],
  //       'img-src': ["'self'", 'data:', 'https:'],
  //       'object-src': ["'none'"],
  //       'script-src-attr': ["'none'"],
  //       'style-src': ["'self'", 'https:', "'unsafe-inline'"],
  //       'upgrade-insecure-requests': true
  //     }
  //   }
  // },
  runtimeConfig: {
    APP_URL: process.env.APP_URL,
    APP_API: process.env.APP_API,
    BS_URL: process.env.BS_URL,
    APP_CDN_URL: process.env.APP_CDN_URL,
    public: {
      APP_TITLE: process.env.APP_TITLE,
      APP_DESC: process.env.APP_DESC,
      APP_URL: process.env.APP_URL,
      APP_API: process.env.APP_API,
      APP_BACKEND_API: process.env.APP_BACKEND_API,
      BS_URL: process.env.BS_URL,
      APP_CDN_URL: process.env.APP_CDN_URL,
      GA_ID: process.env.GA_ID,
      GTM_ID: process.env.GTM_ID,
      GOOGLE_SCRIPT_ID: process.env.GOOGLE_SCRIPT_ID
    }
  },

  // 移除 sitemap 配置
  // sitemap: {
  //   url: process.env.APP_URL,
  //   gzip: true,
  //   exclude: [
  //     '/admin/**'
  //   ]
  // },
  css: ['@/assets/css/tailwind.css'],

  vite: {
    server: {
      watch: {
        usePolling: true // set here to enable hot reload
      },
      hmr: {
        protocol: 'ws',
        host: 'localhost'
      }
    },
    esbuild: {
      pure: process.env.SHOW_CONSOLE_LOG === 'YES' ? [] : ['console.log', 'console.info']
    },
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'assets/icons')],
        symbolId: '[dir]/[name]',
        customDomId: '__svg__icons__dom__'
      })
    ]
  },

  postcss: require('./postcss.config.js'),

  devtools: {
    enabled: true,
    vscode: {}
  },

  nitro: {
    preset: 'github-pages',
    compressPublicAssets: true,
    minify: true,
    routeRules: {
      '/**': { isr: false }
    }
  },

  build: {
    transpile: ['gsap'],
    analyze: process.env.ANALYZE === 'true'
  },

  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
    asyncContext: true
  },

  compatibilityDate: '2025-05-30'
})

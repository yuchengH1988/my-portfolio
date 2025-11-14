<script setup>
/**
 * 在 app.vue 中已有使用預設 <SEO />
 * 使用方式：在你希望有個別 SEO 的頁面使用
 * <SEO :title="seo?.title" :desc="seo?.desc" :image="seo?.thumb" url="seo?.url" />
 * 或是欄位 key 與 props name 一致，可以直接使用
 * <SEO v-bind="data.seo" />
 */
const config = useRuntimeConfig()
const props = defineProps({
  /**
   * 頁面標題
   * 若沒有提供，則使用 .env APP_TITLE
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * 頁面描述
   * 若沒有提供，則使用 .env APP_DESC
   */
  desc: {
    type: String,
    default: ''
  },
  /**
   * 頁面 og 圖片
   * 若沒有提供，則使用 public/og_img.jpg
   */
  image: {
    type: [String, Boolean],
    default: ''
  },
  /**
   * 頁面 og 網址
   * 若沒有提供，則使用 config.public.APP_URL
   */
  url: {
    type: String,
    default: ''
  }
})

useServerSeoMeta({
  title: props.title || config.public.APP_TITLE,
  description: props.desc || config.public.APP_DESC,
  ogTitle: props.title || config.public.APP_TITLE,
  ogSiteName: props.title || config.public.APP_TITLE,
  ogUrl: `${config.public.APP_URL}/${props.url}` || config.public.APP_URL,
  ogDescription: props.desc || config.public.APP_DESC,
  ogImage: props.image || `${config.public.APP_URL}/og_img.jpg`,
  twitterTitle: props.title || config.public.APP_TITLE,
  twitterDescription: props.desc || config.public.APP_DESC,
  twitterImage: props.image || `${config.public.APP_URL}/og_img.jpg`
})
useSeoMeta({
  title: props.title || config.public.APP_TITLE,
  description: props.desc || config.public.APP_DESC,
  ogTitle: props.title || config.public.APP_TITLE,
  ogSiteName: props.title || config.public.APP_TITLE,
  ogUrl: `${config.public.APP_URL}/${props.url}` || config.public.APP_URL,
  ogDescription: props.desc || config.public.APP_DESC,
  ogImage: props.image || `${config.public.APP_URL}/og_img.jpg`,
  twitterTitle: props.title || config.public.APP_TITLE,
  twitterDescription: props.desc || config.public.APP_DESC,
  twitterImage: props.image || `${config.public.APP_URL}/og_img.jpg`
})
</script>

<template>
  <Head>
    <Title>{{ props.title || config.public.APP_TITLE }}</Title>
    <Meta
      hid="description"
      name="description"
      :content="props.desc || config.public.APP_DESC"
    />
  </Head>
</template>

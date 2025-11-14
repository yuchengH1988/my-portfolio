<script setup>
import { cva } from 'class-variance-authority'
import { NuxtLink } from '#components'

const props = defineProps({
  /**
   * 按鈕類型
   * @type {'primary' | 'secondary' | 'link' | 'tag'}
   */
  intent: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'link', 'tag', 'outline'].includes(value)
  },
  /**
   * 按鈕尺寸
   * @type {'sm' | 'md' | 'lg' | 'link'}
   */
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md', 'lg', 'link'].includes(value)
  },
  /**
   * 按鈕對齊
   * @type {'center' | 'start' | 'end'}
   */
  position: {
    type: String,
    default: 'center',
    validator: value => ['center', 'start', 'end'].includes(value)
  },
  rounded: {
    type: String,
    default: 'lg',
    validator: value => ['sm', 'md', 'lg', 'full'].includes(value)
  },
  /**
   * 按鈕 Disabled
   * @type {Boolean}
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 按鈕文字
   * @type {String}
   */
  text: {
    type: String,
    default: 'Button'
  },
  /**
   * 按鈕是否為連結
   * @type {String}
   */
  href: {
    type: String,
    default: ''
  },
  /**
   * 按鈕類型
   * @type {'button' | 'submit' | 'reset'}
   */
  type: {
    type: String,
    default: 'button'
  },
  /**
   * 按鈕 title 無障礙使用
   * @type {String}
   */
  title: {
    type: String,
    default: ''
  }
})
const { intent, size, position, disabled, text, href, type, title } = toRefs(props)

/**
 * 搭配套件用來組合 props 樣式為 button
 */
const button = cva([
  'cursor-pointer select-none rounded-lg border',
  'transition duration-300',
  'flex items-center gap-2'
],
{
  variants: {
    intent: {
      primary: [
        'border-gray-800 bg-gray-800 text-white',
        'hover:border-pr hover:bg-brand',
        'focus:border-pr focus:bg-brand focus:outline focus:outline-2 focus:outline-ad/20',
        'active:border-pr active:bg-brand',
        'disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-white'
      ],
      secondary: [
        'border-gray-800 bg-white text-gray-800',
        'hover:border-pr hover:text-brand',
        'focus:border-pr focus:outline-pr focus:text-brand focus:outline',
        'active:border-pr active:bg-brand active:text-white',
        'disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-transparent disabled:text-txt-super-light'
      ],
      link: [
        'border-none bg-transparent text-txt',
        'hover:text-brand',
        'disabled:cursor-not-allowed disabled:text-txt-super-light'
      ],
      outline: [
        'border-gray-800 bg-transparent text-gray-800',
        'hover:border-pr hover:text-brand',
        'focus:border-pr focus:outline-pr focus:text-brand focus:outline',
        'active:border-pr active:bg-brand active:text-white',
        'disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-transparent disabled:text-txt-super-light'
      ],
      tag: [
        'border-gray-800 bg-gray-800 text-white',
        'hover:border-pr hover:bg-brand',
        'focus:border-pr focus:bg-brand focus:outline focus:outline-2 focus:outline-ad/20',
        'active:border-pr active:bg-brand',
        'disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-white'
      ]
    },
    size: {
      xs: ['text-zh-body-2 py-0.5'],
      sm: ['text-zh-body-2 md:text-zh-body-1 px-3 py-1 md:px-4 md:py-2'],
      md: ['text-zh-body-1 md:text-zh-body-1 px-5 py-1 md:px-6 md:py-2'],
      lg: ['text-zh-body-1 md:text-zh-body-1 px-7 py-2 md:px-8 md:py-2'],
      link: ['px-1 py-2']
    },
    position: {
      center: 'justify-center',
      start: 'justify-start',
      end: 'justify-end'
    },
    rounded: {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full'
    }
  }
})

// 判斷是否為連結
const component = computed(() => {
  if (href.value && !disabled.value) {
    return NuxtLink
  }

  return 'button'
})

</script>

<template>
  <component
    :is="component"
    :type="href ? null : type"
    :to="href"
    :class="button({ intent, size, position, rounded })"
    :disabled="disabled"
    :title="title || text || '按鈕'"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<script setup>
import { cva } from 'class-variance-authority'
import { NuxtLink } from '#components'

const props = defineProps({
  /**
   * 按鈕圖示
   * @type {String}
   */
  icon: {
    type: String,
    default: ''
  },
  /**
   * 按鈕類型
   * @type {'trans' | 'transWhite' | 'transSecondary' | 'white' | 'black' | 'outlinePrimary' | 'outline', 'outlineGray' }
   */
  intent: {
    type: String,
    default: 'trans',
    validator: value => ['trans', 'transWhite', 'transSecondary', 'white', 'black', 'outlinePrimary', 'outline', 'outlineGray'].includes(value)
  },
  /**
   * 按鈕尺寸
   * @type {'sm' | 'md' | 'lg'}
   */
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md', 'lg'].includes(value)
  },
  /**
   * 按鈕 圓角
   * @type {'md' | 'full'}
   */
  rounded: {
    type: String,
    default: 'full',
    validator: value => ['md', 'full'].includes(value)
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
   * 按鈕是否為連結
   * @type {String}
   */
  href: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    default: 'center',
    validator: value => ['center', 'start', 'end'].includes(value)
  },
  /**
   * 按鈕類型
   * @type {'button' | 'submit' | 'reset'}
   */
  type: {
    type: String,
    default: 'button'
  },
  shadow: {
    type: String,
    default: 'none'
  }
})
const { icon, intent, size, position, rounded, disabled, href, type, shadow } = toRefs(props)

/**
 * 搭配套件用來組合 props 樣式為 button
 */
const button = cva([
  'cursor-pointer select-none border',
  'transition duration-300',
  'flex items-center gap-2'
],
{
  variants: {
    intent: {
      trans: [
        'border-transparent bg-transparent text-txt-dark',
        'hover:text-txt-core hover:border-transparent hover:bg-transparent',
        // 'focus:border-pr focus:bg-transparent focus:text-txt-core',
        'active:text-txt-core active:border-transparent active:bg-transparent',
        'disabled:cursor-not-allowed disabled:border-transparent disabled:bg-transparent disabled:text-txt'
      ],
      transWhite: [
        'border-transparent bg-transparent text-txt-white',
        'hover:text-txt-core hover:border-transparent hover:bg-transparent',
        // 'focus:border-pr focus:bg-transparent focus:text-txt-white',
        'active:text-txt-core active:border-transparent active:bg-transparent',
        'disabled:cursor-not-allowed disabled:border-transparent disabled:bg-transparent disabled:text-txt'
      ],
      transSecondary: [
        'border-transparent bg-transparent text-txt-dark',
        'hover:text-txt-core hover:border-transparent hover:bg-transparent',
        // 'focus:border-transparent focus:bg-transparent focus:text-txt-core',
        'active:text-txt-core active:border-transparent active:bg-transparent',
        'disabled:cursor-not-allowed disabled:border-transparent disabled:bg-transparent disabled:text-txt'
      ],
      outline: [
        'border-gray-700 bg-transparent text-txt-dark',
        'hover:text-txt-core hover:border-pr hover:bg-transparent',
        // 'focus:border-pr focus:bg-transparent focus:text-txt-core',
        'active:text-txt-core active:border-pr active:bg-transparent',
        'disabled:cursor-not-allowed disabled:border-gray-700 disabled:bg-transparent disabled:text-txt'
      ],
      white: [
        'border-white bg-white text-txt-dark',
        'hover:border-pr hover:bg-brand hover:text-txt-white',
        // 'focus:border-pr focus:bg-brand focus:text-txt-white',
        'active:border-pr active:bg-brand active:text-txt-white',
        'disabled:cursor-not-allowed disabled:border-white disabled:bg-white disabled:text-txt'
      ],
      black: [
        'border-gray-800 bg-gray-800 text-txt-white',
        'hover:border-pr hover:bg-brand hover:text-txt-white',
        // 'focus:border-pr focus:bg-brand focus:text-txt-white',
        'active:border-pr active:bg-brand active:text-txt-white',
        'disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-400 disabled:text-txt-white'
      ],
      outlinePrimary: [
        'border-pr bg-white text-brand',
        'hover:border-pr hover:bg-brand hover:text-txt-white',
        'active:border-pr active:bg-brand active:text-txt-white',
        'disabled:text-txt-200 disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-400'
      ],
      outlineGray: [
        'border-gray-100 bg-white text-txt-dark',
        'hover:text-txt-core hover:border-pr hover:bg-white',
        // 'focus:border-pr focus:bg-white focus:text-txt-core',
        'active:text-txt-core active:border-pr active:bg-white',
        'disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-400 disabled:text-txt'
      ]
    },
    size: {
      sm: ['h-9 w-9'],
      md: ['h-10 w-10'],
      lg: ['h-12 w-12']
    },
    position: {
      center: 'justify-center',
      start: 'justify-start',
      end: 'justify-end'
    },
    rounded: {
      md: ' rounded-md',
      full: 'rounded-full'
    },
    shadow: {
      md: 'shadow-md',
      none: ''
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

const iconSize = computed(() => {
  switch (size.value) {
    case 'sm':
      return 'size-4'
    case 'md':
      return 'size-5'
    case 'lg':
      return 'size-6'
  }
})

</script>

<template>
  <component
    :is="component"
    :type="href ? undefined : type"
    :to="href"
    :class="button({ intent, size, position, rounded, shadow })"
    :disabled="disabled"
  >
    <slot><AtomIcon :name="icon" :class="iconSize" /></slot>
  </component>
</template>

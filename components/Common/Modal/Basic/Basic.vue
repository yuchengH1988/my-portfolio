<script setup>
const props = defineProps({
  /**
   * 控制是否打開
   */
  modelValue: {
    type: Boolean,
    default: false
  },
  /**
   * 尺寸
   * @type {'auto' | 'lg' | 'md' | 'sm'}
   */
  size: {
    type: String,
    default: 'auto',
    validator: value => ['auto', 'lg', 'md', 'sm'].includes(value)
  },
  /**
   * 是否顯示背景
   */
  backdrop: {
    type: Boolean,
    default: true
  },
  /**
   * 按鈕樣式
   */
  btnStyle: {
    type: String,
    default: 'trans',
    validator: value => ['trans', 'bg'].includes(value)
  }
})
const { modelValue, size, backdrop, btnStyle } = toRefs(props)
const emits = defineEmits(['update:modelValue', 'close'])

function closeModal () {
  emits('update:modelValue', false)
  emits('close')
}

const showAll = ref(false)

if (process.client) {
  const { $lenis: lenis } = useNuxtApp()

  watch(modelValue, (newVal) => {
    if (newVal === true) {
      showAll.value = true
      lenis.stop()
      document.body.style.overflow = 'hidden'
    }

    if (newVal === false) {
      lenis.start()
      document.body.style.overflow = 'initial'
      setTimeout(() => {
        showAll.value = false
      }, 400)
    }
  }, {
    immediate: true
  })
}

const btnStyleClass = computed(() => {
  return {
    'bg-gray-700/80 text-txt-white duration-300 hover:text-txt-white': btnStyle.value === 'bg',
    'text-tx duration-300 hover:text-txt-dark': btnStyle.value === 'trans'
  }
})

const modalStyleClass = computed(() => {
  const style = ['']

  switch (size.value) {
    case 'md':
      style.push('max-w-[80vw] md:min-w-[600px] md:max-w-[600px]')
      break
    case 'sm':
      style.push('max-w-[80vw] md:min-w-[400px] md:max-w-[560px]')
      break
  }

  return style
})
</script>
<template>
  <ClientOnly>
    <Teleport to="#modalsField">
      <div
        v-if="showAll"
        class="bs-modal | fixed inset-0 duration-300"
      >
        <AtomModalBackdrop
          :is-open="backdrop && modelValue"
          @click="closeModal"
        />
        <Transition name="modal" appear>
          <div
            :key="modelValue"
            class="absolute left-1/2 top-1/2 flex h-max w-max -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-xl bg-white px-5 py-4 text-black lg:px-6"
            :class="[
              {
                'pointer-events-none opacity-0': !modelValue,
              },
              modalStyleClass
            ]"
          >
            <div v-if="$slots.head" class="relative w-full">
              <slot name="head" />
              <button
                class="absolute right-0 top-0 z-1 flex h-10 w-10 items-center justify-center rounded-full"
                :class="btnStyleClass"
                @click="closeModal"
              >
                <AtomIcon name="x" class="h-5 w-5" />
              </button>
            </div>
            <div v-else class="flex items-center justify-between">
              <slot name="title" />

              <button
                class="absolute right-0 top-0 z-1 flex h-10 w-10 items-center justify-center rounded-full"
                :class="btnStyleClass"
                @click="closeModal"
              >
                <AtomIcon name="x" class="h-5 w-5" />
              </button>
            </div>

            <div class="w-full">
              <slot name="body" />
            </div>
          </div>
        </Transition>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  transition-property: opacity, transform;
}

.modal-enter-from,
.modal-leave-to {
  pointer-events: none;
  /* opacity: 0; */
  transform: translate(-50%, -40%);
}
.modal-enter-to,
.modal-leave-from {
  pointer-events: auto;
  /* opacity: 1; */
  transform: translate(-50%, -50%);
}
</style>

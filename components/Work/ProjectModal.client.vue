<script setup>
import { A11y, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  project: {
    type: Object,
    default: null
  },
  initialIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue'])

const { modelValue, project, initialIndex } = toRefs(props)
const { $lenis } = useNuxtApp()
const modules = [A11y, EffectFade, Navigation, Pagination]
const isInfoOpen = ref(false)
let lastBodyOverflow = ''

const hasMultipleImages = computed(() => (project.value?.images?.length || 0) > 1)
const detail = computed(() => project.value?.detail || {})
const detailTitle = computed(() => detail.value.title || project.value?.titleParts?.main || project.value?.title || '')
const detailBody = computed(() => detail.value.body || [])
const detailCredits = computed(() => detail.value.credits || [])
const shouldShowInfo = computed(() =>
  Boolean(detailTitle.value || detailBody.value.length || detailCredits.value.length || project.value?.highlight?.length || project.value?.tags?.length)
)

function closeModal () {
  emit('update:modelValue', false)
}

function toggleInfo () {
  isInfoOpen.value = !isInfoOpen.value
}

function handleKeydown (event) {
  if (event.key === 'Escape') {
    closeModal()
  }
}

watch(modelValue, (isOpen) => {
  if (isOpen) {
    isInfoOpen.value = false
    lastBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    $lenis?.stop()
    window.addEventListener('keydown', handleKeydown)
    return
  }

  document.body.style.overflow = lastBodyOverflow
  $lenis?.start()
  window.removeEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.body.style.overflow = lastBodyOverflow
  $lenis?.start()
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="#modalsField">
    <Transition name="work-modal">
      <div
        v-if="modelValue && project"
        class="fixed inset-0 z-[3000] flex items-center justify-center bg-black/[0.96] px-4 py-6 text-white lg:px-8"
        role="dialog"
        aria-modal="true"
        :aria-label="`${detailTitle} project details`"
      >
        <button
          type="button"
          class="absolute inset-0 cursor-default"
          aria-label="Close project modal"
          @click="closeModal"
        ></button>

        <div class="relative z-1 flex size-full max-h-[90vh] max-w-[1180px] flex-col">
          <div class="z-40 relative mb-4 flex items-center justify-end gap-2">
            <a
              v-if="project.link"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="flex size-10 items-center justify-center text-white/80 transition-colors duration-300 hover:text-white"
              :aria-label="`Open ${detailTitle} website`"
            >
              <AtomIcon name="external-link" class="size-5" />
            </a>
            <button
              v-if="shouldShowInfo"
              type="button"
              class="flex size-10 items-center justify-center text-white/80 transition-colors duration-300 hover:text-white"
              :aria-pressed="isInfoOpen"
              aria-label="Toggle project information"
              @click="toggleInfo"
            >
              <AtomIcon name="info" class="size-5" />
            </button>
            <button
              type="button"
              class="flex size-10 items-center justify-center text-white/80 transition-colors duration-300 hover:text-white"
              aria-label="Close project modal"
              @click="closeModal"
            >
              <AtomIcon name="x" class="size-5" />
            </button>
          </div>

          <div class="relative min-h-0 flex-1">
            <Swiper
              :key="`${project.title}-${initialIndex}`"
              :space-between="30"
              :effect="'fade'"
              :navigation="hasMultipleImages"
              :pagination="hasMultipleImages ? { clickable: true } : false"
              :modules="modules"
              :initial-slide="initialIndex"
              :allow-touch-move="hasMultipleImages"
              :simulate-touch="hasMultipleImages"
              :grab-cursor="hasMultipleImages"
              :loop="hasMultipleImages"
              class="work-modal-swiper"
            >
              <SwiperSlide
                v-for="image in project.images"
                :key="`${project.title}-modal-${image.desktop}`"
              >
                <div class="flex size-full items-center justify-center p-3 sm:p-5 lg:p-8">
                  <img
                    :src="image.desktop"
                    :alt="project.alt || project.title"
                    class="max-h-full max-w-full select-none object-contain"
                    draggable="false"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
            <Transition name="work-info">
              <div
                v-if="isInfoOpen"
                class="absolute inset-0 z-[30] flex lg:justify-end"
              >
                <aside
                  data-lenis-prevent
                  class="work-info-panel size-full overflow-y-auto overscroll-contain bg-black/[0.8] px-5 py-6 sm:px-8 lg:w-2/3"
                >
                  <h2 class="text-display-2 mb-5 text-[#FFF]">
                    {{ detailTitle }}
                  </h2>
                  <div
                    v-if="detailBody.length"
                    class="text-body-2 space-y-4 text-[#CCC]"
                  >
                    <p
                      v-for="(paragraph, paragraphIndex) in detailBody"
                      :key="`${project.title}-paragraph-${paragraphIndex}`"
                      v-html="paragraph"
                    ></p>
                  </div>
                  <div
                    v-if="project.highlight?.length"
                    class="text-body-3 mt-6 space-y-2 text-[#CCC]"
                  >
                    <p v-for="point in project.highlight" :key="`${project.title}-detail-${point}`">
                      ・{{ point }}
                    </p>
                  </div>
                  <div
                    v-if="project.tags?.length"
                    class="mt-6 flex flex-wrap gap-2"
                  >
                    <span
                      v-for="tag in project.tags"
                      :key="`${project.title}-detail-${tag}`"
                      class="text-body-3 rounded-full border border-white/20 px-3 py-1 text-[#CCC]"
                    >
                      {{ tag }}
                    </span>
                  </div>
                  <dl
                    v-if="detailCredits.length"
                    class="text-body-3 mt-8 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 border-t border-white/[0.16] pt-5"
                  >
                    <template
                      v-for="credit in detailCredits"
                      :key="`${project.title}-${credit.label}-${credit.name}`"
                    >
                      <dt class="text-[#CCC]">
                        {{ credit.label }}
                      </dt>
                      <dd class="text-[#CCC]">
                        {{ credit.name }}
                      </dd>
                    </template>
                  </dl>
                </aside>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.work-modal-swiper {
  width: 100%;
  height: 100%;
}

.work-info-panel {
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
}

.work-modal-enter-active,
.work-modal-leave-active,
.work-info-enter-active,
.work-info-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

.work-modal-enter-from,
.work-modal-leave-to {
  opacity: 0;
}

.work-info-enter-from,
.work-info-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  width: 44px;
  height: 44px;
  color: rgb(255 255 255 / 78%);
  mix-blend-mode: difference;
}

:deep(.swiper-button-prev::after),
:deep(.swiper-button-next::after) {
  font-size: 22px;
}

:deep(.swiper-pagination-bullet) {
  background: rgb(255 255 255 / 38%);
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background: rgb(255 255 255 / 88%);
}
</style>

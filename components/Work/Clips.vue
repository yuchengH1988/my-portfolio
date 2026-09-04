<script setup>
import { useAllStore } from '~/store/all'
import siteContent from '~/locales/site.json'

const AUTOPLAY_DELAY = 2800
const { isCursor } = storeToRefs(useAllStore())

const imageModules = import.meta.glob('../../assets/images/*.{webp,jpg,jpeg,png}', {
  eager: true,
  import: 'default'
})

const imageUrls = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [
    path.split('/').pop(),
    String(url).split('?')[0]
  ])
)

const mediaRefs = ref([])
const slideIndexes = ref({})
const isProjectModalOpen = ref(false)
const selectedProjectIndex = ref(0)
const selectedModalImageIndex = ref(0)
const autoplayTimers = new Map()
let observer = null

const splitTitle = (title) => {
  const match = String(title).match(/^(.*?)\s*\((.*)\)\s*$/)
  if (!match) { return { main: title, aside: '' } }
  return { main: match[1].trim(), aside: match[2].trim() }
}

const resolveAsset = name => imageUrls[name] || name

const normalizeImages = (item) => {
  const images = item.images?.length ? item.images : [{ desktop: item.image }]

  return images
    .filter(image => image?.desktop)
    .map(image => ({
      desktop: resolveAsset(image.desktop)
    }))
}

const selectedData = computed(() =>
  siteContent.work.projects.map(item => ({
    ...item,
    titleParts: splitTitle(item.title),
    images: normalizeImages(item),
    tags: (item.tags || []).slice(0, 3)
  }))
)

const selectedProject = computed(() => selectedData.value[selectedProjectIndex.value] || null)

function setMediaRef (el, index) {
  if (el) {
    mediaRefs.value[index] = el
  }
}

function getSlideIndex (index) {
  return slideIndexes.value[index] || 0
}

function goToNextSlide (index) {
  const item = selectedData.value[index]
  if (!item || item.images.length <= 1) { return }

  slideIndexes.value = {
    ...slideIndexes.value,
    [index]: (getSlideIndex(index) + 1) % item.images.length
  }
}

function startAutoplay (index) {
  const item = selectedData.value[index]
  if (!item || item.images.length <= 1 || autoplayTimers.has(index)) { return }

  autoplayTimers.set(index, window.setInterval(() => {
    goToNextSlide(index)
  }, AUTOPLAY_DELAY))
}

function stopAutoplay (index) {
  const timer = autoplayTimers.get(index)
  if (!timer) { return }

  window.clearInterval(timer)
  autoplayTimers.delete(index)
}

function resetSlide (index) {
  if (getSlideIndex(index) === 0) { return }

  slideIndexes.value = {
    ...slideIndexes.value,
    [index]: 0
  }
}

function handleMediaEnter (index) {
  if (!isCursor.value) { return }

  startAutoplay(index)
}

function handleMediaLeave (index) {
  if (!isCursor.value) { return }

  stopAutoplay(index)
  resetSlide(index)
}

function openProjectModal (index) {
  selectedProjectIndex.value = index
  selectedModalImageIndex.value = getSlideIndex(index)
  stopAutoplay(index)
  isProjectModalOpen.value = true
}

onMounted(async () => {
  await nextTick()

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const index = Number(entry.target.dataset.projectIndex)
      if (isCursor.value) {
        if (!entry.isIntersecting) {
          stopAutoplay(index)
          resetSlide(index)
        }
        return
      }

      if (entry.isIntersecting) {
        startAutoplay(index)
      } else {
        stopAutoplay(index)
      }
    })
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.2
  })

  mediaRefs.value.forEach((el) => {
    observer.observe(el)
  })
})

watch(isCursor, (enabled) => {
  autoplayTimers.forEach((_, index) => {
    stopAutoplay(index)
    if (enabled) {
      resetSlide(index)
    }
  })
})

onBeforeUpdate(() => {
  mediaRefs.value = []
})

onBeforeUnmount(() => {
  observer?.disconnect()
  autoplayTimers.forEach((timer) => {
    window.clearInterval(timer)
  })
  autoplayTimers.clear()
})
</script>

<template>
  <div class="relative mt-20 w-full border-t border-bgc/20">
    <div
      v-for="(item, idx) in selectedData"
      :key="item.title"
      class="project-row group grid grid-cols-12 gap-4 border-b border-bgc/20 py-4 text-bgc transition-colors duration-500 last:border-b-0 lg:items-center lg:gap-x-4"
      @mouseenter="handleMediaEnter(idx)"
      @mouseleave="handleMediaLeave(idx)"
    >
      <div class="col-span-12 flex flex-col items-center justify-center gap-2 lg:col-span-9 lg:flex-row lg:justify-start lg:gap-8">
        <span class="text-body-3 mr-auto text-bgc/60">
          {{ String(idx + 1).padStart(2, '0') }}
        </span>
        <h3 class="text-display-2 text-balance pb-4 text-center lg:w-1/2 lg:pb-0 lg:text-left">
          <a
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-opacity duration-300 hover:opacity-60"
          >
            {{ item.titleParts.main }}
          </a>
          <span
            v-if="item.titleParts.aside"
            class="text-head-2 ml-2 mt-0 text-bgc/60 lg:ml-0 lg:mt-1 lg:block"
          >
            {{ item.titleParts.aside }}
          </span>
        </h3>
        <div class="max-w-[300px] sm:max-w-none lg:w-1/2">
          <p class="text-body-2 text-bgc/90">
            {{ item.description }}
          </p>
          <div
            v-if="item.highlight?.length"
            class="text-body-3 mt-2 space-y-1 text-bgc/60 lg:mt-4"
          >
            <p v-for="point in item.highlight.slice(0, 3)" :key="point">
              - {{ point }}
            </p>
          </div>
          <div
            v-if="item.tags.length"
            class="mt-4 flex flex-wrap gap-2"
            aria-label="Project skills"
          >
            <span
              v-for="tag in item.tags"
              :key="`${item.title}-${tag}`"
              class="text-body-3 rounded-full border border-bgc/25 px-3 py-1 text-bgc/70"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
      <button
        :ref="el => setMediaRef(el, idx)"
        :data-project-index="idx"
        type="button"
        class="project-media relative col-span-12 mx-auto aspect-[4/3] w-full max-w-[300px] overflow-hidden rounded-lg lg:col-span-3 lg:max-w-none"
        :aria-label="`Open ${item.titleParts.main} project images`"
        @click="openProjectModal(idx)"
      >
        <div class="absolute inset-0 size-full">
          <div
            v-for="(image, imageIndex) in item.images"
            :key="`${item.title}-${image.desktop}`"
            class="absolute inset-0 block size-full"
            :class="imageIndex === getSlideIndex(idx) ? 'project-slide is-active' : 'project-slide'"
          >
            <img
              :src="image.desktop"
              :alt="item.alt || item.title"
              class="block size-full object-cover"
              :class="[idx === 2 && 'object-left lg:object-center']"
              loading="lazy"
            />
          </div>
        </div>
        <div
          v-if="item.images.length > 1"
          class="pointer-events-none absolute bottom-2 left-2 z-[2] flex items-center gap-1.5 rounded-full px-2 py-1 mix-blend-difference"
          aria-hidden="true"
        >
          <span
            v-for="(_, imageIndex) in item.images"
            :key="`${item.title}-dot-${imageIndex}`"
            class="block size-1.5 rounded-full transition-all duration-300"
            :class="imageIndex === getSlideIndex(idx) ? 'w-4 bg-white' : 'bg-white/45'"
          ></span>
        </div>
        <span class="pointer-events-none absolute bottom-2 right-2 z-[2] flex items-center justify-center text-white mix-blend-difference transition-transform duration-300 group-hover:scale-[1.2]">
          <AtomIcon name="info" class="size-6" />
        </span>
      </button>
    </div>
    <WorkProjectModal
      v-model="isProjectModalOpen"
      :project="selectedProject"
      :initial-index="selectedModalImageIndex"
    />
  </div>
</template>

<style scoped>
.project-slide {
  z-index: 0;
  opacity: 0;
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
  transform: translateX(100%);
  will-change: opacity, transform;
}

.project-slide.is-active {
  z-index: 1;
  opacity: 1;
  transform: translateX(0);
}

@media (hover: hover) and (pointer: fine) {
  .project-media .project-slide.is-active img {
    filter: grayscale(1);
    transition: filter 0.7s ease;
  }

  .project-row:hover .project-media .project-slide.is-active img {
    filter: grayscale(0);
  }
}
</style>

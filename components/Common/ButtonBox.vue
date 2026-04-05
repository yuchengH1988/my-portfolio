<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'button'
  }
})

const emit = defineEmits(['click'])

const boxChars = ['█', '▇', '▆', '▅', '▄', '▃', '▂', '▁', '▁', '▂', '▃', '▄', '▅', '▆', '▇', '█']
const displayChars = ref(props.label.split(''))
const activeTimers = []
let activeIntervals = []
let isAnimating = false

const syncLabel = () => {
  displayChars.value = props.label.split('')
}

const clearAnimation = () => {
  activeTimers.forEach(timer => clearTimeout(timer))
  activeTimers.length = 0

  activeIntervals.forEach(timer => clearInterval(timer))
  activeIntervals = []
}

const animateChar = (index, originalChar) => {
  let frame = 0

  const interval = window.setInterval(() => {
    if (frame < boxChars.length) {
      displayChars.value[index] = boxChars[frame]
      displayChars.value = [...displayChars.value]
      frame += 1
      return
    }

    displayChars.value[index] = originalChar
    displayChars.value = [...displayChars.value]
    clearInterval(interval)
    activeIntervals = activeIntervals.filter(timer => timer !== interval)

    if (!activeIntervals.length && !activeTimers.length) {
      isAnimating = false
    }
  }, 28)

  activeIntervals.push(interval)
}

const handleHover = () => {
  if (isAnimating) { return }

  isAnimating = true
  clearAnimation()
  syncLabel()

  props.label.split('').forEach((char, index) => {
    if (char === ' ') { return }

    const timer = window.setTimeout(() => {
      activeTimers.splice(activeTimers.indexOf(timer), 1)
      animateChar(index, char)
    }, index * 45)

    activeTimers.push(timer)
  })

  if (!props.label.trim()) {
    isAnimating = false
  }
}

watch(() => props.label, () => {
  clearAnimation()
  isAnimating = false
  syncLabel()
})

onBeforeUnmount(() => {
  clearAnimation()
})
</script>

<template>
  <button
    :type="type"
    :title="title || label"
    @mouseenter="handleHover"
    @focus="handleHover"
    @click="emit('click')"
  >
    <span class="sr-only">{{ label }}</span>
    <span aria-hidden="true" class="inline-flex items-center">
      <span
        v-for="(char, index) in displayChars"
        :key="`${label}-${index}`"
        class="inline-block whitespace-pre"
      >
        {{ char }}
      </span>
    </span>
  </button>
</template>

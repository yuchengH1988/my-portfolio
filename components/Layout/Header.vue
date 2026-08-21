<script setup>
import siteContent from '~/locales/site.json'

const { $lenis, $gsap, $ScrollTrigger } = useNuxtApp()
const headerRef = ref(null)
const isMenuOpen = ref(false)
let headerTrigger = null
let introTimeline = null
let mm = null

const headerContent = siteContent.header
const navItems = headerContent.nav
const HEADER_BREAKPOINTS = [
  ['(max-width: 767px)', 'calc(100vw - 24px)', 0],
  ['(min-width: 768px)', '640px', 12]
]

function applyHeaderAnimation (width, pad) {
  if (!headerRef.value) { return }

  const isScrolled = window.scrollY > 10
  const getProps = scrolled => ({
    left: '50%',
    xPercent: -50,
    top: scrolled ? 12 : 0,
    width: scrolled ? width : '100vw',
    paddingLeft: scrolled ? pad : 0,
    paddingRight: scrolled ? pad : 0,
    '--header-cut': scrolled ? '16px' : '0px',
    backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.72)' : 'rgba(0, 0, 0, 0.3)',
    backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
    boxShadow: scrolled ? '0 12px 40px rgba(0, 0, 0, 0.18)' : '0 0 0 rgba(0, 0, 0, 0)'
  })

  headerTrigger?.kill()
  $gsap.set(headerRef.value, getProps(isScrolled))

  headerTrigger = $ScrollTrigger.create({
    start: 10,
    end: 'max',
    onEnter: () => {
      $gsap.to(headerRef.value, {
        ...getProps(true),
        duration: 1,
        ease: 'power2.out'
      })
    },
    onLeaveBack: () => {
      $gsap.to(headerRef.value, {
        ...getProps(false),
        duration: 1,
        ease: 'power2.out'
      })
    }
  })

  return () => {
    headerTrigger?.kill()
    headerTrigger = null
  }
}

function scrollTo (id) {
  const el = document.getElementById(id)

  if (el) {
    $lenis.scrollTo(el, {
      duration: 0.3,
      easing: t => t
    })
  }

  isMenuOpen.value = false
}

function toggleMenu () {
  isMenuOpen.value = !isMenuOpen.value
}

function handleResize () {
  if (window.innerWidth >= 768) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  nextTick(() => {
    if (!headerRef.value) { return }

    introTimeline = $gsap.timeline()
    introTimeline.fromTo(headerRef.value, {
      opacity: 0,
      y: -100
    }, {
      opacity: 1,
      y: 0,
      duration: 1
    })

    mm = $gsap.matchMedia()
    HEADER_BREAKPOINTS.forEach(([query, width, pad]) => {
      mm.add(query, () => applyHeaderAnimation(width, pad))
    })
  })

  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  mm?.revert()
  introTimeline?.kill()
  headerTrigger?.kill()
  window.removeEventListener('resize', handleResize)
})
</script>
<template>
  <header
    ref="headerRef"
    class="site-header fixed top-0 z-100 w-full overflow-hidden bg-black/30 px-0 opacity-0"
  >
    <div class="text-body-2 set relative flex w-full items-center justify-between text-white">
      <CommonButtonBox
        :label="headerContent.brand"
        :title="headerContent.brand"
        class="cursor-pointer py-2 transition duration-200 hover:text-white/40"
        @click="scrollTo('home')"
      />
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition duration-250 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <nav
          v-if="isMenuOpen"
          class="smd:hidden absolute -right-5 top-1/2 z-[101] flex h-12  -translate-y-1/2 items-center border border-white bg-white px-5 pr-[90px] text-black shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
        >
          <template v-for="item in navItems" :key="`mobile-${item.target}`">
            <CommonButtonBox
              :label="item.label"
              :title="item.label"
              class="cursor-pointer px-3 py-2 transition duration-200 hover:text-black/40"
              @click="scrollTo(item.target)"
            />
          </template>
        </nav>
      </transition>
      <nav
        class="hidden items-center gap-5 sm:gap-15 md:flex"
      >
        <template v-for="item in navItems" :key="item.target">
          <CommonButtonBox
            :label="item.label"
            :title="item.label"
            class="cursor-pointer py-2 transition duration-200 hover:text-white/40"
            @click="scrollTo(item.target)"
          >
          </CommonButtonBox>
        </template>
      </nav>
      <button
        type="button"
        :aria-label="headerContent.menuToggleLabel"
        class="relative z-[102] flex h-12 w-12 items-center justify-center md:hidden"
        @click="toggleMenu"
      >
        <span
          class="ease-out relative block h-5 w-7 transition-transform duration-300"
          :class="isMenuOpen ? 'rotate-90' : 'rotate-0'"
        >
          <span
            class="ease-out absolute left-0 top-0 h-[2px] w-7 transition-all duration-300"
            :class="isMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45 bg-black' : 'bg-white'"
          />
          <span
            class="ease-out absolute left-0 top-1/2 h-[2px] w-7 -translate-y-1/2 transition-all duration-300"
            :class="isMenuOpen ? 'bg-black opacity-0' : 'bg-white opacity-100'"
          />
          <span
            class="ease-out absolute bottom-0 left-0 h-[2px] w-7 transition-all duration-300"
            :class="isMenuOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45 bg-black' : 'bg-white'"
          />
        </span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  --header-cut: 0;

  clip-path:
    polygon(
      var(--header-cut) 0,
      calc(100% - var(--header-cut)) 0,
      100% 50%,
      calc(100% - var(--header-cut)) 100%,
      var(--header-cut) 100%,
      0 50%
    );
}
</style>

<script setup>
const { $lenis } = useNuxtApp()

function scrollTo (id) {
  const el = document.getElementById(id)

  if (el) {
    $lenis.scrollTo(el, {
      duration: 0.3,
      easing: t => t
    })
  }
}
</script>
<template>
  <header class="fixed top-0 z-100 w-screen bg-black/30 px-0 md:px-10">
    <div class="set flex items-center justify-between text-[18px] text-white">
      <p class="cursor-pointer py-2" @click="scrollTo('home')">
        CALVIN
      </p>
      <nav
        class="flex items-center gap-5  sm:gap-15"
      >
        <template v-for="item in ['INTRO', 'WORK', 'CONTACT']" :key="item">
          <button
            :title="item"
            class="cursor-pointer py-2 transition duration-200 hover:text-white/40"
            @click="scrollTo(item.toLowerCase())"
          >
            {{ item }}
          </button>
        </template>
      </nav>
    </div>
  </header>
</template>

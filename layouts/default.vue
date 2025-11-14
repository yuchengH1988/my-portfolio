<script setup>
import { useAllStore } from '@/store/all'
const { globalData, webLoading } = toRefs(useAllStore())

</script>

<template>
  <div class="layout">
    <div class="fixed inset-0 z-[-2] bg-black"></div>
    <LayoutHeader />
    <slot />
    <div id="subField" class="relative z-[500]">
    </div>
    <div id="cookieField" class="relative z-[1000]">
    </div>
    <div id="sideField" class="relative z-[1001]">
    </div>
    <div id="modalsField" class="relative z-[1002]">
    </div>
    <div id="loadingField" class="relative z-[1005]">
    </div>
  </div>
</template>

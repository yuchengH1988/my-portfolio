<script setup>
import siteContent from '~/locales/site.json'

const uiContent = siteContent.ui
</script>

<template>
  <div class="space-y-1">
    <p>{{ uiContent.descriptionLabel }}</p>
    <slot></slot>
  </div>
</template>

<template>
  <div
    class="glass-panel absolute inset-0 rounded-[28px]"
    aria-hidden="true"
  />
</template>

<style scoped>
.glass-panel {
  overflow: hidden;
  background:
    linear-gradient(145deg, rgb(255 255 255 / 36%), rgb(255 255 255 / 14%) 42%, rgb(255 255 255 / 22%)),
    rgb(255 255 255 / 12%);
  border: 1px solid rgb(255 255 255 / 34%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 72%),
    inset 0 -1px 0 rgb(255 255 255 / 18%),
    inset 18px 0 34px rgb(255 255 255 / 8%),
    inset -18px 0 34px rgb(0 0 0 / 8%),
    0 18px 48px rgb(0 0 0 / 20%);
  -webkit-backdrop-filter: blur(14px) saturate(190%) contrast(112%);
  backdrop-filter: blur(14px) saturate(150%) contrast(112%);
}

.glass-panel::before,
.glass-panel::after {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
}

.glass-panel::before {
  background:
    linear-gradient(180deg, rgb(255 255 255 / 58%), rgb(255 255 255 / 6%) 34%, transparent 72%),
    radial-gradient(circle at 18% 12%, rgb(255 255 255 / 55%), transparent 28%),
    radial-gradient(circle at 84% 100%, rgb(0 0 0 / 14%), transparent 34%);
  mix-blend-mode: screen;
}

.glass-panel::after {
  background-image: repeating-radial-gradient(circle at 0 0, rgb(255 255 255 / 42%) 0 1px, transparent 1px 3px);
  background-size: 4px 4px;
  mix-blend-mode: overlay;
  opacity: 0.28;
}
</style>

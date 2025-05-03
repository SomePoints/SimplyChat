<template>
  <span class="inline-block text-left min-w-8 px-4 py-3">
    <span v-for="n in 3" :key="n" :class="`dot dot-${n}`">•</span>
  </span>
</template>

<style scoped>
.dot {
  @apply text-2xl opacity-40 leading-4;
  animation: blink 1.4s infinite both;
}

.dot-2 {
  animation-delay: 0.2s;
}

.dot-3 {
  animation-delay: 0.4s;
}

@keyframes blink {
  0%, 80%, 100% { opacity: 0.4; }
  40% { opacity: 1; }
}
</style>

<template>
  <article class="message-row" :class="[message.isUser ? 'user' : 'assistant']">
    <DotLoading v-if="message.isInteracting" />
    <div v-else class="bubble">
      <p v-if="message.isUser">{{ message.sendText }}</p>
      <p v-else>{{ message.responseText }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import DotLoading from '@/components/DotLoading.vue';
import type { MessageRow } from '@/stores/chatStore';

defineProps<{ message: MessageRow }>();
</script>

<style scoped lang="postcss">
.message-row {
  @apply flex items-start gap-4;

  &.user {
     @apply justify-end;
  }

  &.assistant {
    @apply justify-start;
  }

  .bubble {
    @apply relative break-words px-4 py-3 rounded-xl transition-all;
  }

  &.user .bubble {
    @apply bg-gray-100 max-w-[75%];
  }

  &.assistant .bubble {
    @apply pl-0;
  }
}
</style>

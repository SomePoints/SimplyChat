<template>
  <div class="chat-view">
    <el-scrollbar ref="scrollbarRef">
      <div class="h-full flex flex-col px-4 md:px-6 lg:px-8">
        <div ref="innerRef" class="relative grow">
          <div class="py-5 bg-white sticky top-0 z-10 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-gradient-to-r before:from-black/[0.06] before:via-black/10 before:to-black/[0.06]">
            <div class="flex items-center justify-between gap-2">
              <nav aria-label="breadcrumb">
                <ol class="text-gray-500 flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-1.5">
                  <li class="inline-flex items-center gap-1.5">
                    <a class="hover:text-gray-600 transition-colors" href="#">Playground</a>
                  </li>
                  <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </li>
                  <li data-slot="breadcrumb-item" class="inline-flex items-center gap-1.5">
                    <span aria-disabled="true" class="text-gray-600 font-normal">Chat</span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div class="my-8" />

          <div class="messages">
            <template v-for="message in messages" :key="message.id">
              <MessageRow :message="message" />
            </template>
          </div>
        </div>

        <div class="sticky bottom-0 pt-4 md:pt-8 z-50">
          <div class="mx-auto bg-white rounded-2xl pb-4 md:pb-8">
            <el-form class="bottom-bar">
              <textarea
                v-model="inputMessage"
                placeholder="Ask me anything..."
                id="message"
                :rows="1"
                autocomplete="off"
                @keydown.enter.prevent="submit"
              />
              <div class="flex items-center justify-between gap-2 p-3">
                <div class="flex items-center gap-2" />
                <div class="flex items-center gap-2">
                  <el-button
                    class="shadow-sm h-6"
                    type="primary"
                    size="default"
                    round
                    @click="submit"
                  >
                    Ask Bart
                  </el-button>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import MessageRow from '@/components/MessageRow.vue';
import type { ScrollbarInstance } from 'element-plus';
import { ref, watch } from 'vue';
import { useChatStore } from '@/stores/chatStore';

const chatStore = useChatStore();
const { messages, inputMessage, isInteracting } = storeToRefs(chatStore);
const { sendMessage } = chatStore;

const innerRef = ref<HTMLDivElement>();
const scrollbarRef = ref<ScrollbarInstance>();

const submit = () => {
  if (isInteracting.value) return;
  sendMessage();
};

watch(() => messages, () => {
  const innerHeight = innerRef.value?.clientHeight;
  if (!innerHeight) return;
  setTimeout(() => {
    scrollbarRef.value?.setScrollTop(innerHeight);
  }, 0);
}, { deep: true });
</script>

<style scoped lang="postcss">
.chat-view {
  @apply mx-auto max-w-3xl h-screen font-light py-10;

  .messages {
    @apply space-y-6;
  }

  .bottom-bar {
    @apply relative rounded-2xl border border-transparent bg-gray-100 transition-colors focus-within:bg-gray-50 focus-within:border-gray-300;
    @apply has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 [&:has(input:is(:disabled))_*]:pointer-events-none;
  }

  .bottom-bar > textarea {
    @apply flex sm:min-h-[84px] w-full bg-transparent px-4 py-3 placeholder:text-gray-400 focus-visible:outline-none [resize:none];
  }

  :deep(.el-scrollbar) {
    .el-scrollbar__view {
      @apply h-full;
    }
  }
}
</style>

import { defineStore } from 'pinia';
import { ref } from 'vue';
import useChat from '@/api/mock';

export interface MessageRow {
  id: string
  sendText: string
  responseText: string
  isInteracting: boolean,
  isError?: boolean,
  isUser: boolean
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<MessageRow[]>([]);
  const inputMessage = ref('');
  const isInteracting = ref(false);

  const { sendMessageStream } = useChat();

  async function sendMessage() {
    if (!inputMessage.value.trim()) return;
    const text = inputMessage.value;
    inputMessage.value = '';
    isInteracting.value = true;
    const id = Date.now().toString();
    messages.value.push({
      id: `${id}-user`,
      sendText: text,
      responseText: '',
      isInteracting: false,
      isUser: true,
    });

    try {
      const stream = sendMessageStream([
        { role: 'user', content: text },
      ]);

      messages.value.push({
        id: `${id}-assistant`,
        sendText: text,
        responseText: '',
        isInteracting: true,
        isUser: false,
      });
      const message = messages.value.find((m) => m.id === `${id}-assistant`);
      for await (const chunk of stream) {
        if (!message) return;
        message.isInteracting = false;
        message.responseText += chunk;
      }
    } catch (e: any) {
      const message = messages.value.find((m) => m.id === `${id}-assistant`);
      if (message) message.isError = e.message || 'Error';
    } finally {
      const message = messages.value.find((m) => m.id === `${id}-assistant`);
      if (message) message.isInteracting = false;
      isInteracting.value = false;
    }
  }

  return {
    messages,
    inputMessage,
    isInteracting,
    sendMessage,
  };
});

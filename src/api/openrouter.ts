export interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface SendMessageOptions {
  model?: string;
  apiKey?: string;
  referer?: string;
  title?: string;
}

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export default function () {
  async function* sendMessageStream(
    messages: OpenRouterMessage[],
    options: SendMessageOptions = {},
  ) {
    const {
      model = 'tngtech/deepseek-r1t-chimera:free',
      apiKey = OPENROUTER_API_KEY,
      referer = '',
      title = '',
    } = options;

    if (!apiKey) throw new Error('OpenRouter API key is required');

    const headers: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };
    if (referer) headers['HTTP-Referer'] = referer;
    if (title) headers['X-Title'] = title;

    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model,
        messages,
        stream: true,
      }),
    });
    if (!res.body) throw new Error('Нет ответа от сервера');
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let buffer = '';
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') return;
          try {
            const json = JSON.parse(data);
            yield json.choices?.[0]?.delta?.reasoning || '';
          } catch { /* empty */ }
        }
      }
    }
  }

  return {
    sendMessageStream,
  };
}

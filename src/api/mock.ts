export default function () {
  async function* sendMessageStream(_messages: [{ role: string, content: string }]) {
    await new Promise((resolve) => { setTimeout(resolve, 1000); });
    yield 'Who are you? I didn\'t invite you! Go fuck yourself!';
  }

  return {
    sendMessageStream,
  };
}

export default function () {
  async function* sendMessageStream(_messages: [{ role: string, content: string }]) {
    await new Promise((resolve) => { setTimeout(resolve, 1000); });
    yield 'Hello World!';
  }

  return {
    sendMessageStream,
  };
}

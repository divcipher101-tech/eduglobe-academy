import { StreamingTextResponse } from "ai";

// We're creating a mocked streaming response because we don't have an OpenAI API key yet.
// This allows the frontend `useChat` hook to work perfectly as if it was connected to GPT-4.
export async function POST(req: Request) {
  const { messages } = await req.json();

  const lastMessage = messages[messages.length - 1].content;

  // Generate a mock response based on the user's input
  let responseText = `I am your EduGlobe AI Learning Assistant. You asked: "${lastMessage}".\n\n`;
  responseText += `Currently, I am running in "Mock Mode" because no OpenAI/Anthropic API key was provided. However, this streaming interface works exactly as it will in production. Once an API key is added, I will provide real educational insights, tutor you on complex topics, and help you ace your exams!`;

  // Create a stream that emits words one by one to simulate typing
  const words = responseText.split(" ");
  let i = 0;

  const stream = new ReadableStream({
    async start(controller) {
      function push() {
        if (i < words.length) {
          // Encode the word + space
          controller.enqueue(new TextEncoder().encode(words[i] + " "));
          i++;
          setTimeout(push, 50); // 50ms delay between words
        } else {
          controller.close();
        }
      }
      push();
    },
  });

  // Return the stream via Vercel AI SDK's StreamingTextResponse
  return new StreamingTextResponse(stream);
}

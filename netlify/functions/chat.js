import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT } from '../../src/lib/chatContext.js';

// Google's free tier covers this model generously. If Google retires this
// model name later, the API error message will tell you the replacement.
const MODEL = 'gemini-3.6-flash';

// Guardrails so a bad or abusive request can't run up the bill.
const MAX_HISTORY = 12; // messages actually sent to the model
const MAX_MESSAGES = 40; // messages accepted in one request
const MAX_MESSAGE_CHARS = 2000; // per message

export default async (req) => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return json({ error: 'The assistant is not configured yet (missing API key).' }, 500);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const messages = Array.isArray(body?.messages) ? body.messages : [];
  if (messages.length === 0) {
    return json({ error: 'No messages provided.' }, 400);
  }
  if (messages.length > MAX_MESSAGES) {
    return json({ error: 'This conversation is too long. Please start a new one.' }, 400);
  }
  for (const message of messages) {
    if (typeof message?.content !== 'string' || message.content.trim() === '') {
      return json({ error: 'Every message needs text content.' }, 400);
    }
    if (message.content.length > MAX_MESSAGE_CHARS) {
      return json({ error: `Messages are limited to ${MAX_MESSAGE_CHARS} characters.` }, 400);
    }
  }

  // Gemini calls the assistant role "model"; the browser sends "assistant".
  const contents = messages.slice(-MAX_HISTORY).map((message) => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: message.content }],
  }));

  let modelStream;
  try {
    const ai = new GoogleGenAI({ apiKey });
    modelStream = await ai.models.generateContentStream({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.6,
        maxOutputTokens: 800,
      },
    });
  } catch (err) {
    console.error('Gemini request failed:', err);
    return json(
      { error: 'The assistant is having trouble right now. Please try again in a moment.' },
      502,
    );
  }

  // Relay the model's tokens to the browser as they arrive.
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of modelStream) {
          const text = chunk.text;
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch (err) {
        console.error('Gemini stream ended early:', err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Accel-Buffering': 'no',
    },
  });
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

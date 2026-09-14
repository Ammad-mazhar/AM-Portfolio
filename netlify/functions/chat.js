import { SYSTEM_PROMPT } from '../../src/lib/chatContext.js';
import { LANGUAGE_NAMES } from '../../src/i18n/languages.js';

// "-latest" alias so this never breaks when Google retires a dated model name —
// it always resolves to Google's current recommended lite-flash model. Lite
// models also carry a much higher free-tier daily quota than plain "flash",
// which matters for a chatbot getting real, unpredictable visitor traffic.
const MODEL = 'gemini-flash-lite-latest';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`;

// Guardrails so a bad or abusive request can't run up the bill.
const MAX_HISTORY = 12; // messages actually sent to the model
const MAX_MESSAGES = 40; // messages accepted in one request
const MAX_MESSAGE_CHARS = 2000; // per message
const UPSTREAM_TIMEOUT_MS = 45_000; // stay well under Netlify's 60s function cap

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

  // The portfolio's own knowledge base stays in English — Gemini translates
  // it naturally when told which language to answer in, so no need to keep
  // a translated copy of the facts themselves.
  const languageName = LANGUAGE_NAMES[body?.language] ?? LANGUAGE_NAMES.en;
  const systemInstruction =
    languageName === LANGUAGE_NAMES.en
      ? SYSTEM_PROMPT
      : `${SYSTEM_PROMPT}\n\nRespond in ${languageName}, regardless of what language the visitor writes in — the rest of the site is currently displayed in ${languageName}. If a visitor explicitly asks you to switch languages, go ahead and do that instead.`;

  let geminiRes;
  try {
    geminiRes = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: { temperature: 0.6, maxOutputTokens: 800 },
      }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (err) {
    console.error('Gemini request failed:', err);
    return json(
      { error: 'The assistant is having trouble right now. Please try again in a moment.' },
      502,
    );
  }

  if (!geminiRes.ok || !geminiRes.body) {
    const errText = await geminiRes.text().catch(() => '');
    console.error('Gemini request failed:', geminiRes.status, errText);
    return json(
      { error: 'The assistant is having trouble right now. Please try again in a moment.' },
      502,
    );
  }

  // Gemini's SSE stream sends one "data: {...}" line per chunk. Parse those and
  // re-emit just the text deltas as plain text — the client reads a plain stream.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const stream = new ReadableStream({
    async start(controller) {
      const reader = geminiRes.body.getReader();
      let buffer = '';
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? ''; // keep a trailing partial line for next read

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const payload = trimmed.slice(5).trim();
            if (!payload || payload === '[DONE]') continue;

            try {
              const parsed = JSON.parse(payload);
              const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) controller.enqueue(encoder.encode(text));
            } catch {
              // Malformed/partial SSE fragment — skip it, the stream will recover.
            }
          }
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

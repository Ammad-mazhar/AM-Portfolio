import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageSquare, RotateCcw, Send, Square, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { EASE_OUT_EXPO } from '../lib/utils.js';
import './Chatbot.css';

const GREETING = {
  role: 'assistant',
  content:
    "Hey! I'm Ammad's AI Assistant. Ask me about his projects, skills, experience, tech stack, or the services he can build.",
};

const SUGGESTIONS = [
  { label: 'View projects', prompt: 'What are his strongest projects?' },
  { label: 'Tech stack', prompt: 'What technologies does Ammad use?' },
  { label: 'CRM project', prompt: 'Tell me about the CRM project.' },
  { label: 'React & backend', prompt: "What is his experience with React and back-end work?" },
  { label: 'Availability', prompt: 'Is Ammad available for freelance work?' },
];

const ENDPOINT = '/.netlify/functions/chat';
const MAX_MESSAGE_CHARS = 2000;

// Assistant bubbles render Markdown; open links in a new, safe tab.
const MARKDOWN_COMPONENTS = {
  // Strip react-markdown's internal `node` prop so it isn't spread onto the DOM element.
  // eslint-disable-next-line no-unused-vars
  a: ({ node, ...props }) => <a {...props} target="_blank" rel="noreferrer" />,
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reduceMotion = useReducedMotion();
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const atBottomRef = useRef(true);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Grow the textarea with its content, up to the CSS max-height.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input]);

  // Auto-scroll to the newest content — but only if the reader is already
  // near the bottom, so we never yank them away from something they scrolled up to read.
  useEffect(() => {
    const node = listRef.current;
    if (node && atBottomRef.current) node.scrollTop = node.scrollHeight;
  }, [messages, loading]);

  // Abort any in-flight request if the widget unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  const handleScroll = useCallback(() => {
    const node = listRef.current;
    if (!node) return;
    atBottomRef.current = node.scrollHeight - node.scrollTop - node.clientHeight < 80;
  }, []);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      if (trimmed.length > MAX_MESSAGE_CHARS) {
        setError(`Please keep messages under ${MAX_MESSAGE_CHARS} characters.`);
        return;
      }

      const outgoing = [...messages, { role: 'user', content: trimmed }];
      // Add the assistant's placeholder up front (not inside the stream loop) so every
      // chunk below can blindly append to "the last message" — no flag, no race.
      setMessages([...outgoing, { role: 'assistant', content: '' }]);
      setInput('');
      setError(null);
      setLoading(true);
      atBottomRef.current = true;

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Drop the static greeting (index 0) — the model doesn't need it.
          body: JSON.stringify({ messages: outgoing.slice(1) }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Request failed (${res.status})`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let receivedAny = false;

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          if (!chunk) continue;

          receivedAny = true;
          setMessages((prev) => {
            const next = prev.slice();
            const last = next[next.length - 1];
            next[next.length - 1] = { ...last, content: last.content + chunk };
            return next;
          });
        }

        if (!receivedAny) {
          throw new Error('The assistant returned an empty response.');
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          // User pressed Stop — keep whatever streamed in so far.
        } else {
          setError(err.message || 'Something went wrong. Please try again.');
        }
      } finally {
        setLoading(false);
        abortRef.current = null;
        // Drop the placeholder if nothing ever streamed into it (error/abort before
        // the first token), so we never leave a blank assistant bubble behind.
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          return last?.role === 'assistant' && last.content === '' ? prev.slice(0, -1) : prev;
        });
      }
    },
    [loading, messages],
  );

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  }

  function stopGeneration() {
    abortRef.current?.abort();
  }

  function newConversation() {
    abortRef.current?.abort();
    setMessages([GREETING]);
    setInput('');
    setError(null);
    setLoading(false);
    atBottomRef.current = true;
    inputRef.current?.focus();
  }

  const panelMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.96 },
        transition: { duration: 0.28, ease: EASE_OUT_EXPO },
      };

  return (
    <div className="chatbot">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            className="chatbot__panel"
            role="dialog"
            aria-label="Chat with Ammad's AI assistant"
            {...panelMotion}
          >
            <header className="chatbot__header">
              <span className="chatbot__title">
                <span className="chatbot__status-dot" aria-hidden="true" />
                <span>
                  Ammad&apos;s AI Assistant
                  <span className="chatbot__status-text">Online • Portfolio trained</span>
                </span>
              </span>
              <div className="chatbot__header-actions">
                <button
                  type="button"
                  className="chatbot__icon-btn"
                  onClick={newConversation}
                  aria-label="Start a new conversation"
                  title="New conversation"
                >
                  <RotateCcw aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="chatbot__icon-btn"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                >
                  <X aria-hidden="true" />
                </button>
              </div>
            </header>

            <div
              className="chatbot__messages"
              ref={listRef}
              onScroll={handleScroll}
              aria-live="polite"
            >
              {messages.map((message, index) => {
                // The assistant's placeholder renders as typing dots until its first token lands.
                if (message.role === 'assistant' && message.content === '') {
                  return (
                    <div
                      key={index}
                      className="chatbot__msg chatbot__msg--assistant chatbot__msg--typing"
                    >
                      <span className="chatbot__sr-only">Assistant is typing…</span>
                      <span aria-hidden="true" />
                      <span aria-hidden="true" />
                      <span aria-hidden="true" />
                    </div>
                  );
                }

                return (
                  <div key={index} className={`chatbot__msg chatbot__msg--${message.role}`}>
                    {message.role === 'assistant' ? (
                      <div className="chatbot__markdown">
                        <ReactMarkdown components={MARKDOWN_COMPONENTS}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                );
              })}

              {error && (
                <p className="chatbot__error" role="alert">
                  {error}
                </p>
              )}
            </div>

            {messages.length === 1 && !loading && (
              <div className="chatbot__suggestions">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="chatbot__suggestion"
                    onClick={() => sendMessage(item.prompt)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            <form className="chatbot__form" onSubmit={handleSubmit}>
              <textarea
                ref={inputRef}
                className="chatbot__input"
                rows={1}
                placeholder="Ask about my skills, projects, or experience…"
                value={input}
                maxLength={MAX_MESSAGE_CHARS}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              {loading ? (
                <button
                  type="button"
                  className="chatbot__icon-btn chatbot__send"
                  onClick={stopGeneration}
                  aria-label="Stop generating"
                >
                  <Square aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="chatbot__icon-btn chatbot__send"
                  aria-label="Send message"
                  disabled={!input.trim()}
                >
                  <Send aria-hidden="true" />
                </button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        className="chatbot__fab"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close chat' : 'Ask my AI assistant'}
        aria-expanded={open}
      >
        {open ? <X aria-hidden="true" /> : <MessageSquare aria-hidden="true" />}
      </button>
    </div>
  );
}

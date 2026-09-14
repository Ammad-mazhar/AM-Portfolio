import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageSquare, RotateCcw, Send, Square, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useI18n } from '../i18n/useI18n.js';
import { EASE_OUT_EXPO } from '../lib/utils.js';
import './Chatbot.css';

const ENDPOINT = '/.netlify/functions/chat';
const MAX_MESSAGE_CHARS = 2000;
// A cold serverless function can occasionally time out on its first request.
// One silent retry smooths that over without the visitor needing to resend.
const MAX_SEND_ATTEMPTS = 2;
const RETRY_DELAY_MS = 600;

// Assistant bubbles render Markdown; open links in a new, safe tab.
const MARKDOWN_COMPONENTS = {
  // Strip react-markdown's internal `node` prop so it isn't spread onto the DOM element.
  // eslint-disable-next-line no-unused-vars
  a: ({ node, ...props }) => <a {...props} target="_blank" rel="noreferrer" />,
};

export default function Chatbot() {
  const { lang, t } = useI18n();
  const greeting = { role: 'assistant', content: t.chatbot.greeting };

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([greeting]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastLang, setLastLang] = useState(lang);

  const reduceMotion = useReducedMotion();
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const atBottomRef = useRef(true);

  // Switching the site language mid-chat would leave stale-language UI strings
  // and an assistant replying in the old language — start fresh instead. This
  // adjusts state during render (React's sanctioned pattern for "reset on prop
  // change") rather than in an effect, so there's no extra commit/flash.
  if (lang !== lastLang) {
    setLastLang(lang);
    abortRef.current?.abort();
    setMessages([greeting]);
    setInput('');
    setError(null);
    setLoading(false);
    atBottomRef.current = true;
  }

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
        setError(t.chatbot.charLimitError.replace('{n}', MAX_MESSAGE_CHARS));
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

      let lastError = null;

      // A cold serverless function can occasionally be slow enough to time out on
      // the very first request. That's transient, not a real failure, so retry once
      // automatically — but only if nothing streamed in yet (never risk duplicating
      // a partial reply) and the user didn't press Stop themselves.
      for (let attempt = 1; attempt <= MAX_SEND_ATTEMPTS; attempt++) {
        const controller = new AbortController();
        abortRef.current = controller;
        let receivedAny = false;

        try {
          const res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Drop the static greeting (index 0) — the model doesn't need it.
            body: JSON.stringify({ messages: outgoing.slice(1), language: lang }),
            signal: controller.signal,
          });

          if (!res.ok || !res.body) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || t.chatbot.requestFailedError.replace('{status}', res.status));
          }

          const reader = res.body.getReader();
          const decoder = new TextDecoder();

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
            throw new Error(t.chatbot.emptyResponseError);
          }

          lastError = null;
          break;
        } catch (err) {
          if (err.name === 'AbortError') {
            lastError = null; // user-initiated Stop, not a failure
            break;
          }
          lastError = err;
          if (receivedAny || attempt === MAX_SEND_ATTEMPTS) break;
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        }
      }

      if (lastError) {
        setError(lastError.message || t.chatbot.genericError);
      }

      setLoading(false);
      abortRef.current = null;
      // Drop the placeholder if nothing ever streamed into it (error/abort before
      // the first token), so we never leave a blank assistant bubble behind.
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        return last?.role === 'assistant' && last.content === '' ? prev.slice(0, -1) : prev;
      });
    },
    [loading, messages, lang, t],
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
    setMessages([{ role: 'assistant', content: t.chatbot.greeting }]);
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
            aria-label={t.chatbot.dialogAriaLabel}
            {...panelMotion}
          >
            <header className="chatbot__header">
              <span className="chatbot__title">
                <span className="chatbot__status-dot" aria-hidden="true" />
                <span>
                  {t.chatbot.title}
                  <span className="chatbot__status-text">{t.chatbot.statusText}</span>
                </span>
              </span>
              <div className="chatbot__header-actions">
                <button
                  type="button"
                  className="chatbot__icon-btn"
                  onClick={newConversation}
                  aria-label={t.chatbot.newConversation}
                  title={t.chatbot.newConversationTitle}
                >
                  <RotateCcw aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="chatbot__icon-btn"
                  onClick={() => setOpen(false)}
                  aria-label={t.chatbot.closeChat}
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
                      <span className="chatbot__sr-only">{t.chatbot.typingLabel}</span>
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
                {t.chatbot.suggestions.map((item) => (
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
                placeholder={t.chatbot.placeholder}
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
                  aria-label={t.chatbot.stopGenerating}
                >
                  <Square aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="chatbot__icon-btn chatbot__send"
                  aria-label={t.chatbot.sendMessage}
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
        aria-label={open ? t.chatbot.closeChat : t.chatbot.openChat}
        aria-expanded={open}
      >
        {open ? <X aria-hidden="true" /> : <MessageSquare aria-hidden="true" />}
      </button>
    </div>
  );
}

# Ammad Mazhar — Portfolio

React + Vite portfolio site.

## AI assistant (chatbot)

A floating chat widget (bottom-right) answers visitor questions about Ammad using
Google's Gemini model. The API key stays server-side in a Netlify Function — it is
never shipped to the browser.

Features: streamed token-by-token replies, Markdown formatting, "new conversation"
reset, a Stop button, suggestion chips, and intelligent auto-scroll. The whole
widget loads as a separate chunk, so it never slows the portfolio's first paint.

### One-time setup

1. Get a free key at https://aistudio.google.com/app/apikey
2. Copy `.env.example` to `.env` and paste the key:
   ```
   GEMINI_API_KEY=your-key-here
   ```

### Running locally

- `npm run dev` — the site only (chatbot will error, no backend running).
- `npm run dev:chat` — runs `netlify dev`, which serves the site **and** the
  chat function together. Use this to test the chatbot.

### Deploying (Netlify)

Push to a repo, "Add new site" in Netlify, then add `GEMINI_API_KEY` under
**Site settings → Environment variables**. `netlify.toml` handles the rest.

### What powers it

| Piece | File |
| --- | --- |
| Chat widget UI (lazy-loaded) | `src/components/Chatbot.jsx` / `.css` |
| Bio/knowledge sent to the model | `src/lib/chatContext.js` (built from `src/data/`) |
| Secure backend relay + streaming + input limits | `netlify/functions/chat.js` |

To change what the assistant knows, edit `src/data/content.js` and
`src/data/projects.js` — `chatContext.js` rebuilds the prompt automatically.

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

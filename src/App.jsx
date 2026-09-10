import { lazy, Suspense } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Skills from './components/Skills.jsx';
import About from './components/About.jsx';
import Expertise from './components/Expertise.jsx';
import Projects from './components/Projects.jsx';
import BuildLog from './components/BuildLog.jsx';
import Credentials from './components/Credentials.jsx';
import Footer from './components/Footer.jsx';

// Loaded in its own chunk so the chatbot (and its Markdown renderer) never
// slows the portfolio's first paint or blocks it if that chunk fails.
const Chatbot = lazy(() => import('./components/Chatbot.jsx'));

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Skills />
        <About />
        <Expertise />
        <Projects />
        <BuildLog />
        <Credentials />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </>
  );
}

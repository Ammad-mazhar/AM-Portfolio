import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <SectionHeader number="01" title="About" />
        <div className="about__grid">
          <Reveal className="about__text">
            <p>
              I&apos;m a full stack developer in training, currently completing a 3-year
              Software Engineering diploma at Aptech while shipping real client and freelance
              work on the side. Most of what I know comes from building things that actually
              have to run for someone else — not just coursework.
            </p>
            <p>
              My frontend focus is React.js with Vite — fast, component-driven interfaces
              with state, routing, and responsive layouts that stay quick to iterate on. On
              the backend, I&apos;m building out my skills with Express.js and PHP/Laravel,
              wiring up the REST endpoints, authentication, and data handling that sit behind
              the UI.
            </p>
            <p>
              On a given week I&apos;m moving across the whole stack — building React
              components and state, then dropping into Express or Laravel to design MySQL
              schemas and the CRUD flows on top of them. The entire project stays under
              version control with Git and GitHub, and I try to keep branches and commits
              clean enough that someone else could pick the work up.
            </p>
            <p>
              Before development, I worked in practical SEO — on-page and off-page
              optimization, keyword research, and traffic analysis with Google Analytics and
              SEMrush. That background still shapes how I build: semantic markup, an eye on
              performance and page structure, and a habit of measuring what actually ships
              instead of guessing.
            </p>
            <p>
              Right now my main project is Custom Field Pros, a CRM application built to
              manage field-service operations end to end — a React and Vite frontend backed
              by an Express API. Alongside it, I maintain a production site for Aero Tech
              Solution Inc. that has been live for over a year, working across frontend and
              backend to ship features and fixes for a long-term client.
            </p>
            <p>
              I also take on freelance website and SEO work — building and deploying business
              sites, then running the on-page and off-page strategy and tracking performance
              in Google Analytics and SEMrush so the site keeps growing after launch.
            </p>
            <p>
              A few things I&apos;m proud of along the way: Project of the Month in February
              2025, a top-10 finish at the Contest Azam competition, and an &quot;AI
              Champ&quot; recognition in 2025 for my AI assessments and projects. I&apos;ve
              also competed in the Techwiz Global IT Competition, Techon, and the Developer
              Super League, and hold an A2 English Language certificate.
            </p>
            <p>
              I&apos;m currently open to full-time roles and freelance projects — ideally
              full stack work where I can own a feature from the interface down to the API
              and keep learning from people who&apos;ve shipped more than I have.
            </p>
          </Reveal>

          <Reveal className="about__portrait">
            <img src="/2.jpeg" alt="Ammad Mazhar" width="960" height="1280" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// English is the canonical shape — every other translation file must mirror
// these exact keys. Add a new string here first, then add it to every other
// language file, or that language will silently fall back to English for it.
export default {
  nav: {
    home: 'Ammad Mazhar — home',
    toggleMenu: 'Toggle navigation menu',
    skills: 'Skills',
    about: 'About',
    expertise: 'Expertise',
    work: 'Work',
    buildLog: 'Build Log',
    credentials: 'Credentials',
    contact: 'Contact',
  },

  hero: {
    eyebrow: 'Available for full-time & freelance work',
    intro:
      'I build and ship full stack products — from React interfaces down to the Express and Laravel APIs behind them. Currently completing a Software Engineering diploma at Aptech while working hands-on with real client and freelance projects.',
    actions: {
      viewWork: 'View Work',
      downloadCV: 'Download CV',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'Email',
    },
    titleBlock: {
      role: { label: 'Role', value: 'Full Stack Developer' },
      stack: { label: 'Stack', value: 'React · Express · Laravel' },
      basedIn: { label: 'Based in', value: 'Pakistan (Remote)' },
      status: { label: 'Status', value: 'Open to opportunities' },
    },
  },

  skillsOrbit: {
    eyebrow: 'Skills',
    title: 'A constellation, not a checklist.',
    lede: 'Hover any node for the detail — the stack spans frontend, backend, and the SEO work that got me here.',
    items: {
      react: { name: 'React', category: 'UI Library' },
      javascript: { name: 'JavaScript', category: 'Language' },
      vite: { name: 'Vite', category: 'Build Tool' },
      html: { name: 'HTML', category: 'Markup' },
      css: { name: 'CSS', category: 'Styling' },
      nodejs: { name: 'Node.js', category: 'Runtime' },
      express: { name: 'Express', category: 'Web Framework' },
      laravel: { name: 'Laravel', category: 'PHP Framework' },
      php: { name: 'PHP', category: 'Language' },
      restApis: { name: 'REST APIs', category: 'Integration' },
      mysql: { name: 'MySQL', category: 'Database' },
      gitGithub: { name: 'Git & GitHub', category: 'Version Control' },
      seo: { name: 'SEO', category: 'Growth' },
      keywordResearch: { name: 'Keyword Research', category: 'Growth' },
      googleAnalytics: { name: 'Google Analytics', category: 'Analytics' },
      semrush: { name: 'SEMrush', category: 'Analytics' },
      crmDevelopment: { name: 'CRM Development', category: 'Business Systems' },
      aiIntegration: { name: 'AI Integration', category: 'Intelligence' },
    },
  },

  about: {
    sectionTitle: 'About',
    paragraphs: [
      "I'm a full stack developer in training, currently completing a 3-year Software Engineering diploma at Aptech while shipping real client and freelance work on the side. Most of what I know comes from building things that actually have to run for someone else — not just coursework.",
      "My frontend focus is React.js with Vite — fast, component-driven interfaces with state, routing, and responsive layouts that stay quick to iterate on. On the backend, I'm building out my skills with Express.js and PHP/Laravel, wiring up the REST endpoints, authentication, and data handling that sit behind the UI.",
      "On a given week I'm moving across the whole stack — building React components and state, then dropping into Express or Laravel to design MySQL schemas and the CRUD flows on top of them. The entire project stays under version control with Git and GitHub, and I try to keep branches and commits clean enough that someone else could pick the work up.",
      'Before development, I worked in practical SEO — on-page and off-page optimization, keyword research, and traffic analysis with Google Analytics and SEMrush. That background still shapes how I build: semantic markup, an eye on performance and page structure, and a habit of measuring what actually ships instead of guessing.',
      'Right now my main project is Custom Field Pros, a CRM application built to manage field-service operations end to end — a React and Vite frontend backed by an Express API. Alongside it, I maintain a production site for Aero Tech Solution Inc. that has been live for over a year, working across frontend and backend to ship features and fixes for a long-term client.',
      'I also take on freelance website and SEO work — building and deploying business sites, then running the on-page and off-page strategy and tracking performance in Google Analytics and SEMrush so the site keeps growing after launch.',
      'A few things I\'m proud of along the way: Project of the Month in February 2025, a top-10 finish at the Contest Azam competition, and an "AI Champ" recognition in 2025 for my AI assessments and projects. I\'ve also competed in the Techwiz Global IT Competition, Techon, and the Developer Super League, and hold an A2 English Language certificate.',
      "I'm currently open to full-time roles and freelance projects — ideally full stack work where I can own a feature from the interface down to the API and keep learning from people who've shipped more than I have.",
    ],
  },

  expertise: {
    sectionTitle: 'Expertise',
    lede: "One request, four layers. Here's what I reach for at each stage of the stack — from the interface a user touches to the growth work that brings them there.",
    items: {
      interface: {
        node: 'Client',
        title: 'Interface',
        blurb:
          'Component-driven React interfaces on Vite — state, routing, and responsive layouts that stay fast to iterate on.',
        note: 'Daily driver',
      },
      server: {
        node: 'Server',
        title: 'API & Server',
        blurb:
          'The logic behind the UI — REST endpoints, authentication, and data handling with Express and Laravel.',
        note: 'Actively building',
      },
      data: {
        node: 'Data',
        title: 'Data & Tooling',
        blurb: 'Relational schema design, CRUD flows, and version control kept clean across the whole project.',
        note: 'Comfortable',
      },
      growth: {
        node: 'Growth',
        title: 'Growth & SEO',
        blurb: 'On/off-page and technical SEO, keyword research, and analytics to grow what gets shipped.',
        note: 'Prior focus',
      },
    },
  },

  projects: {
    sectionTitle: 'Selected Work',
    filterAriaLabel: 'Filter projects by stack',
    filters: {
      All: 'All',
      React: 'React',
      'Next.js': 'Next.js',
      'HTML/CSS/JS': 'HTML/CSS/JS',
    },
    sheetLabel: 'SHEET',
    status: {
      'In Progress': 'In Progress',
      Live: 'Live',
    },
    tags: {
      React: 'React',
      Vite: 'Vite',
      'Express.js': 'Express.js',
      CRM: 'CRM',
      'Next.js': 'Next.js',
      Netlify: 'Netlify',
      Services: 'Services',
      'React.js': 'React.js',
      Maintenance: 'Maintenance',
      'Client Work': 'Client Work',
      Vercel: 'Vercel',
      'E-commerce': 'E-commerce',
      'HTML/CSS/JS': 'HTML/CSS/JS',
      Deployed: 'Deployed',
    },
    viewProject: 'View project',
    noLiveLink: 'No live link',
    items: {
      '01': { description: 'A CRM application built to manage field service operations end to end.' },
      '02': { description: 'Service website for a home HVAC and appliance repair company.' },
      '03': { description: 'Long-term client site, live for 1+ year, with full stack maintenance.' },
      '04': { description: 'Next.js e-commerce storefront, live on a custom domain.' },
      '05': {
        description: 'Marketing site for a commercial general contractor, built and deployed for the client.',
      },
      '06': { description: 'Corporate site for an industrial engineering and construction firm.' },
      '07': { description: 'Product site for a professional grooming-tools brand.' },
      '08': { description: 'Booking-focused site for an appliance repair and property maintenance service.' },
    },
  },

  buildLog: {
    sectionTitle: 'Build Log',
    tags: {
      'Client Project': 'Client Project',
      'SEO Project': 'SEO Project',
    },
    items: {
      'aero-tech': {
        range: 'Ongoing · 1+ yr',
        role: 'Full Stack Developer — Aero Tech Solution Inc.',
        bullets: [
          'Building and maintaining a live production site end to end using React.js.',
          'Working across frontend and backend to ship features and fixes for a long-term client.',
        ],
      },
      'freelance-seo': {
        range: 'Ongoing',
        role: 'Full Stack Website Developer — Freelance',
        bullets: [
          'Running on-page and off-page SEO strategy, keyword research, and content optimization.',
          'Tracking traffic and performance using Google Analytics and SEMrush.',
        ],
      },
    },
  },

  credentials: {
    sectionTitle: 'Credentials',
    groups: {
      education: 'Education',
      achievements: 'Achievements',
      competitions: 'Competitions',
    },
    lists: {
      education: [
        'Intermediate',
        '3-year Diploma in Software Engineering — Aptech (ongoing)',
        'SEO (online course)',
      ],
      achievements: [
        'Project of the Month — Feb 2025',
        'Top 10, Contest Azam Competition — 2024',
        '"AI Champ" — top AI assessments & projects, 2025',
      ],
      competitions: [
        'Techwiz Global IT Competition — 2024 (team)',
        'Techon — 2024 (team)',
        'Developer Super League — 2025',
        'English Language A2 Certificate (Lingo)',
      ],
    },
  },

  footer: {
    stamp: 'Open to opportunities',
    heading: "Let's build something.",
    line: 'Reach out for full-time roles, freelance work, or just to talk shop.',
    actions: {
      whatsapp: 'WhatsApp',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      downloadCV: 'Download CV',
    },
    builtWith: 'Built with React + Vite',
  },

  chatbot: {
    title: "Ammad's AI Assistant",
    statusText: 'Online • Portfolio trained',
    dialogAriaLabel: "Chat with Ammad's AI assistant",
    greeting:
      "Hey! I'm Ammad's AI Assistant. Ask me about his projects, skills, experience, tech stack, or the services he can build.",
    suggestions: [
      { label: 'View projects', prompt: 'What are his strongest projects?' },
      { label: 'Tech stack', prompt: 'What technologies does Ammad use?' },
      { label: 'CRM project', prompt: 'Tell me about the CRM project.' },
      { label: 'React & backend', prompt: 'What is his experience with React and back-end work?' },
      { label: 'Availability', prompt: 'Is Ammad available for freelance work?' },
    ],
    placeholder: 'Ask about my skills, projects, or experience…',
    newConversation: 'Start a new conversation',
    newConversationTitle: 'New conversation',
    closeChat: 'Close chat',
    openChat: 'Ask my AI assistant',
    stopGenerating: 'Stop generating',
    sendMessage: 'Send message',
    typingLabel: 'Assistant is typing…',
    charLimitError: 'Please keep messages under {n} characters.',
    emptyResponseError: 'The assistant returned an empty response.',
    genericError: 'Something went wrong. Please try again.',
    requestFailedError: 'Request failed ({status})',
  },

  languageSwitcher: {
    label: 'Language',
  },
};

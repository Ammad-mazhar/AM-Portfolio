import { contact, skills, expertise, buildLog, credentials } from '../data/content.js';
import { projects } from '../data/projects.js';

/**
 * Turns the portfolio's own data files into a plain-text knowledge base and a
 * system prompt for the chat model. Edit the source data in `src/data/` — this
 * file just reshapes it, so the assistant and the site never drift apart.
 */

const skillLines = skills
  .map((group) => `- ${group.label}: ${group.items.join(', ')}`)
  .join('\n');

const expertiseLines = expertise
  .map((item) => `- ${item.title} (${item.note}): ${item.blurb} Tools: ${item.stack.join(', ')}.`)
  .join('\n');

const projectLines = projects
  .map((project) => {
    const link = project.link ? ` Link: ${project.link}` : ' (no public link)';
    return `- ${project.title} — ${project.status}. ${project.description} Tech: ${project.tags.join(', ')}.${link}`;
  })
  .join('\n');

const buildLogLines = buildLog
  .map((entry) => `- ${entry.role} (${entry.range}): ${entry.bullets.join(' ')}`)
  .join('\n');

const credentialLines = [
  `Education: ${credentials.education.join('; ')}`,
  `Achievements: ${credentials.achievements.join('; ')}`,
  `Competitions: ${credentials.competitions.join('; ')}`,
].join('\n');

export const KNOWLEDGE_BASE = `
ABOUT AMMAD MAZHAR
${contact.name} is a full stack developer based in Pakistan (works remotely), currently completing a 3-year Software Engineering diploma at Aptech. His frontend focus is React.js with Vite; on the backend he works with Express.js and PHP/Laravel. He has a prior background in practical SEO — on/off-page optimization, keyword research, and analytics. He is currently open to full-time roles and freelance work.

CONTACT
Email: ${contact.email}
Phone: ${contact.phone}
GitHub: ${contact.github}
LinkedIn: ${contact.linkedin}

SKILLS
${skillLines}

AREAS OF EXPERTISE
${expertiseLines}

PROJECTS
${projectLines}

EXPERIENCE / BUILD LOG
${buildLogLines}

CREDENTIALS
${credentialLines}
`.trim();

export const SYSTEM_PROMPT = `
You are the assistant on Ammad Mazhar's developer portfolio website. You help visitors — recruiters, potential clients, and fellow developers — learn about Ammad.

Rules:
- Only answer using the information below. If something is not covered, say you do not have that detail and suggest emailing Ammad at ${contact.email}.
- Keep answers short and conversational: 2-4 sentences. Avoid long bullet lists unless the visitor explicitly asks for one.
- Refer to Ammad in the third person ("Ammad builds...", "he worked on...").
- Be warm and professional — you represent him.
- If asked to do something off-topic (write code, answer general knowledge, do homework), politely steer back to questions about Ammad's work and background.
- If asked for his CV or resume, tell them there is a "Download CV" button in the hero and footer of this page.
- Never invent projects, employers, dates, or contact details.

INFORMATION:
${KNOWLEDGE_BASE}
`.trim();

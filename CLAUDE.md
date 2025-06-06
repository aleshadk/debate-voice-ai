# CLAUDE.md

## Project: AI Debate Assistant

This is a monorepo project designed to showcase a voice-based AI assistant for debating practice. The application allows users to respond to a debate prompt by voice, receive AI-powered feedback on their answer, and choose from 3 follow-up questions generated by the assistant.

---

## Goals

- Demonstrate use of the Web Speech API for voice input in a real-world setting.
- Show prompt engineering skills by using Claude 3 Sonnet to:
  - Evaluate argument quality (clarity, logic, relevance, language)
  - Generate follow-up questions based on user'sо voice answer
- Keep the backend minimal, secure (API key not exposed), and easily deployable
- Create a clean, intuitive UI using Tailwind and React Router
- Share a working public version and open-source code

---

## Tech Stack

### Frontend (apps/frontend)

- React + TypeScript
- Vite
- TailwindCSS
- React Router
- FSD (feature-sliced design)

### Backend (apps/backend)

- Node.js + Express
- TypeScript
- REST API with a single `/analyze` route
- Claude 3 Sonnet integration via Anthropic API

### Shared Tools

- Monorepo with PNPM
- GitHub for version control
- Cursor for AI pair programming

---

## Project Scope

- No SSR or PWA
- No database or session persistence
- Focus entirely on the live interaction and user flow
- Fast iteration, clear separation of concerns
- Support for Russian (default) and English languages
- 30-second limit for voice responses
- Minimalist UI with voice visualization and timer

---

## Claude Integration Details

Claude should:

- Evaluate user's voice-based argument (received as plain text)
- Return structured feedback in JSON format: strengths, weaknesses, suggestions
- Generate 3 new questions to continue the debate

The system prompt for Claude should ensure:

- Polite and constructive tone
- Encouragement of structured reasoning
- Clear and concise follow-ups

---

## User Flow

1. User enters debate topic in a textarea
2. User records their voice response (max 30 seconds)
3. System processes the response and shows:
   - Voice visualization during recording
   - Countdown timer
   - Structured feedback from Claude
   - 3 follow-up questions to continue the debate

---

## UI Style Guide

This app should have a minimal, clean, modern UI inspired by Tailwind defaults and shadcn/ui components.

Design rules:

- Use neutral tones (gray, white, light background), accent color: indigo
- Large readable fonts, plenty of spacing
- 2xl rounded corners, soft drop shadows
- Grid-based layout with clear hierarchy
- Animations: subtle (fade/scale), use Framer Motion when needed
- Interactive elements (buttons, voice controls) should have clear hover/focus/disabled states
- Avoid clutter: only show essential elements at a time
- Mobile-first responsive

Component examples:

- Button: rounded-md, bg-indigo-600, text-white, hover:bg-indigo-700
- Card: rounded-xl, shadow-sm, border, padding-6, bg-white
- VoiceButton: circular button with animated mic icon, status ring if recording

Layout structure:

- Max width: 3xl (48rem)
- Vertical rhythm: space-y-8 between major sections
- Horizontal padding: px-4 sm:px-6 lg:px-8
- Vertical padding: py-8 sm:py-12

Typography:

- Headings: font-bold, text-3xl sm:text-4xl
- Body text: text-gray-600, text-base sm:text-lg
- Small text: text-sm text-gray-500

Interactive elements:

- Textarea: rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
- Language switcher: text-2xl hover:scale-110 transition-transform
- Voice button: w-24 h-24 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all
- Feedback cards: bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow

## Commit Policy

This project follows the **Conventional Commits** specification to ensure consistent and meaningful commit history.

Each commit message must follow this format:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing ones
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Other changes that do not modify src or test files
- `revert`: Reverts a previous commit

> Note: Do not use scopes in commit messages. Keep them simple and direct.

> Example: `feat: add support for speech recognition timeout`

This convention helps maintain a readable changelog and supports automated release pipelines.

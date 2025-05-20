# 🧠 Debate Voice AI Assistant [[Live demo]](https://aleshadk.github.io/debate-voice-ai)

> 🇬🇧 English version is below

> ⚠️ **Важно**: Бэкенд размещён на бесплатном Render-сервере. Он может "засыпать", поэтому **первый запрос** после долгого простоя может обрабатываться **дольше обычного**.

## Что это?

Этот небольшой pet-проект с использованием **AI** и **Voice API**, который я сделал специально под вакансию от **getmatch**

Приложение позволяет:

- ввести тему для дебатов,
- **записать ответ голосом**,
- получить **развёрнутый фидбек** от AI,
- выбрать одну из трёх follow-up тем для продолжения дискуссии.

## Для ревьюера

Наибольший интерес представляют [`логика с распознаванием речи`](https://github.com/aleshadk/debate-voice-ai/tree/main/apps/frontend/src/features/debate/speech-recognition). Проект на 90% писался при помощи Claude, но эти файлы я отрефакторил вручную. Очень хотел избежать большого god-файла, а попытка декомпозиции вызвала усложнение отдельных компонентов. Но мне это все равно нравится больше одного гигантского файла. Хотел ещё написать тесты, но на это не хватило энергии.

## Технологии

### Архитектура

- **pnpm монорепозиторий**
- **TypeScript**

### Фронтенд

- React + Vite
- React Query
- TailwindCSS
- FSD-подход

### Бэкенд

- Express.js
- Claude 3.7 (Sonnet) в роли ассистента

### CI/CD

- GitHub Actions + GitHub Pages (для фронтенда)
- Render (для бэкенда)

### AI-инструменты

- Claude 3.7
- Cursor
- ChatGPT

## 🧹 Что можно улучшить

### Общее

- Вынести валидацию схем в общий `zod`-пакет для фронта и бэка
- Добавить eslint

### Frontend

- Классы Tailwind в духе "вайбкодинга" — можно причесать
- Привести структуру FSD к более каноничному виду
- Переработать дизайн — сейчас это базовый каркас

### Backend

- Добавить защиту от частого использования AI (rate limiting)

### Как продукт

Проект скорее демонстрационный. Всё это можно реализовать и в чат-боте, но, тем не менее, я вижу такие варианты:

- Прокачивать **prompt'ы**, чтобы добиться лучшего фидбека от AI
- **Сохранять истории** дебатов
- Развивать **комьюнити**:
  - делиться темами,
  - публиковать свои ответы,
  - комментировать аргументы других

# English version

> ⚠️ **Note**: The backend is hosted on a free Render instance. It may fall asleep after inactivity, so the **first request** might be **slower than usual**.

## What is this?

This is a small pet project using **AI** and **Voice API**, created specifically for a job opening at **getmatch**.

The app allows you to:

- enter a debate topic,
- **record your response via microphone**,
- receive **detailed feedback** from an AI assistant,
- choose one of three follow-up topics to continue the debate.

## For reviewers

The most interesting part is the [`speech recognition logic`](https://github.com/aleshadk/debate-voice-ai/tree/main/apps/frontend/src/features/debate/speech-recognition).  
About 90% of the project was written with Claude's help, but I manually refactored these files. I really wanted to avoid a giant god-file. My attempt to decompose the logic led to slightly more complex individual components — but I still prefer it over one massive file.  
I also wanted to write tests, but ran out of energy.

## Technologies

### Architecture

- **pnpm monorepo**
- **TypeScript**

### Frontend

- React + Vite
- React Query
- TailwindCSS
- Feature-Sliced Design (FSD)

### Backend

- Express.js
- Claude 3.7 (Sonnet) as the assistant

### CI/CD

- GitHub Actions + GitHub Pages (for frontend)
- Render (for backend)

### AI Tools

- Claude 3.7
- Cursor
- ChatGPT

## 🧹 What could be improved

### General

- Move validation schemas to a shared `zod` package (frontend + backend)
- Add ESLint

### Frontend

- Tailwind classes were written in a “vibe coding” style — could use cleanup
- Refine the FSD structure to be more canonical
- Improve the visual design — currently it’s just a barebones layout

### Backend

- Add rate limiting to prevent excessive use of the AI API

### As a product

This is mostly a demo project — everything here could easily be implemented in a chatbot. Still, I see some potential directions:

- Improve the **prompt engineering** to get better AI feedback
- **Persist debate history**
- Build a **community**:
  - share debate topics,
  - publish your own answers,
  - comment on others’ arguments

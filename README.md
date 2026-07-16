# Global Dent web presentation

Интерактивная B2B-презентация из девяти слайдов на React, TypeScript и Vite.

## Запуск

```bash
npm install
npm run dev
```

## Production-сборка

```bash
npm run typecheck
npm run build
```

Исходные 3D-рендеры находятся в `artwork/source`. Команда `npm run optimize:images` пересобирает облегченные WebP-версии для сайта.

Навигация работает стрелками, Page Up / Page Down, пробелом, нижними кнопками и свайпом. Прямые ссылки используют хеши `#slide-1` ... `#slide-9`.

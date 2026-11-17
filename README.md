# GameStore

Каталог бесплатных игр с фильтрами, сортировкой, поиском и личным вишлистом.
Данные — [FreeToGame API](https://www.freetogame.com/api-docs).

**Демо:** https://valerontestesteron.github.io/gamestore

![Каталог игр](docs/screenshot1.png)
![Вишлист и поиск](docs/screenshot2.png)

## Стек

React 19 · TypeScript · Redux Toolkit + RTK Query · React Router 7 · Tailwind CSS 4 · Vite · Vitest + React Testing Library

## Возможности

- Каталог игр через RTK Query: кэширование, дедупликация одинаковых запросов
- Фильтрация по жанрам, сортировка (дата выхода / алфавит / популярность)
- Поиск с дебаунсом
- Страница игры: описание, скриншоты, системные требования
- **Личный вишлист** — клиентская фича (у API нет такого эндпоинта):
  добавление/удаление, отметка «сыграл / хочу сыграть», сохранение между сессиями в localStorage
- Тёмная тема с сохранением выбора
- Скелетоны загрузки, попапы через createPortal

## Запуск

```bash
git clone https://github.com/valerontestesteron/gamestore
cd gamestore
npm install
npm run dev     # http://localhost:5173
npm run test    # тесты
npm run build   # прод-сборка
```

## Деплой

GitHub Pages (project page). `base: '/gamestore/'` в `vite.config.ts`.

## Планы

- Фильтры хранятся в URL (`?category=strategy`) — ссылкой можно поделиться
- Страница 404, ленивая загрузка страниц (React.lazy + Suspense)
- Тесты: Vitest + React Testing Library

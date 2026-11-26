# Пісня туманів

Українська енциклопедія сюжету та лору живограй-серіалу
[«Кавалерія: Пісня туманів»](https://www.youtube.com/playlist?list=PL2zoJ5Mco28pMShErqXngbEWYwr65IDCb).
Перший сезон ще публікується; огляди охоплюють лише опубліковані епізоди.

Правила джерел, структури статей та агентного збагачення вмісту викладено в
[AGENTS.md](AGENTS.md). Прочитайте їх перед редагуванням матеріалів.

## Локальна збірка

Сайт використовує [Quartz 5.2.2](https://github.com/jackyzha0/quartz/releases/tag/v5.2.2).
Потрібні Node.js 22.22 або новіша підтримувана версія та npm 10.9.2 або новіший.

```sh
npm ci
npm run build
npm start
```

`npm run build` збирає сайт у `public/`. `npm start` запускає локальний перегляд
на `http://localhost:8080`. Налаштування сайту й плагінів містяться в
`quartz.config.yaml`. Версії плагінів зафіксовано в `package-lock.json`.

## Розгортання на GitHub Pages

Адреса: https://undead404.github.io/pisnia-tumaniv/.

1. У налаштуваннях репозиторію відкрийте **Settings → Pages** і виберіть
   **GitHub Actions** у полі **Build and deployment → Source**.
2. Завантажте зміни з `.github/workflows/deploy-pages.yaml` у гілку `main`.
   Workflow збере сайт і опублікує його; наступні оновлення `main` також
   запускатимуть розгортання автоматично.
3. Перевірте результат у вкладці **Actions**. Для повторного запуску виберіть
   **Deploy to GitHub Pages → Run workflow**.

Домен у полі **Custom domain** вказувати не потрібно. Для збірки GitHub Pages
workflow задає `QUARTZ_BASE_URL=undead404.github.io/pisnia-tumaniv`.
Без цієї змінної використовується адреса Cloudflare Pages, тому наявне
розгортання там зберігає свою конфігурацію.

Докладніше про налаштування та плагіни можна прочитати в
[документації Quartz](https://quartz.jzhao.xyz/).

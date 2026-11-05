# Пісня туманів

Українська енциклопедія сюжету та лору живограй-серіалу
[«Кавалерія: Пісня туманів»](https://www.youtube.com/playlist?list=PL2zoJ5Mco28pMShErqXngbEWYwr65IDCb).
Перший сезон ще публікується; огляди охоплюють лише опубліковані епізоди.

Правила джерел, структури статей та агентного збагачення вмісту викладено в
[AGENTS.md](AGENTS.md). Прочитайте їх перед редагуванням матеріалів.

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

## Quartz v4

> “[One] who works with the door open gets all kinds of interruptions, but [they] also occasionally gets clues as to what the world is and what might be important.” — Richard Hamming

Quartz is a set of tools that helps you publish your [digital garden](https://jzhao.xyz/posts/networked-thought) and notes as a website for free.

🔗 Read the documentation and get started: https://quartz.jzhao.xyz/

[Join the Discord Community](https://discord.gg/cRFFHYye7t)

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/jackyzha0">
    <img src="https://cdn.jsdelivr.net/gh/jackyzha0/jackyzha0/sponsorkit/sponsors.svg" />
  </a>
</p>

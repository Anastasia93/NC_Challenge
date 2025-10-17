# Natural Cycles Countdown Challenge

A responsive single-page countdown app built with **Angular 17+**.  
The project dynamically adjusts text to fit its container, adapts to orientation changes,  
and persists user input across sessions.

🌐 **Live Demo:** [https://anastasia93.github.io/NC_Challenge/](https://anastasia93.github.io/NC_Challenge/)

---

## 🚀 Features

- Reusable `AutoFitTextDirective` for responsive text fitting.
- Real-time countdown timer.
- Custom event name and date stored in `localStorage`.
- Random "Quote of the Day" fetched from `https://dummyjson.com/quotes/random`.
- Layout adapts to both portrait and landscape modes.

---

## 🧑‍💻 Tech Stack

- **Angular 20+**
- **TypeScript**
- **SCSS**
- **RxJS** for reactive updates
- **Prettier** for consistent code formatting

---

## ⚙️ Development

### Run locally

```bash
npm install
npm start
```

Then open http://localhost:4200

### Build and Deploy
To build the project for GitHub Pages:

```bash
npm run build:pages
```

This command:

Builds the app with --base-href ./

Copies the production files to the docs folder
(which GitHub Pages uses for deployment)

After that, the project is automatically available at
https://<your-username>.github.io/<repository-name>/

---

## 🫶 Author

Developed by Anastasiia as a part of the Natural Cycles Frontend Challenge 2025.

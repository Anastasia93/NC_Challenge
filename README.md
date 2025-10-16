# Natural Cycles Countdown Challenge

A responsive countdown app built with **Angular 17+**.  
The project dynamically fits all text to a single line, adapts to orientation changes,  
and persists user input across sessions.

---

## 🚀 Features

- Reusable `AutoFitTextDirective` that resizes text to fit its container width.
- Countdown timer that updates in real-time.
- User-defined event name and date, stored in `localStorage`.
- Random "Quote of the Day" fetched from `https://dummyjson.com/quotes/random`.
- Adaptive layout that responds to portrait and landscape orientations.

---

## 🧑‍💻 Tech Stack

- Angular 17  
- TypeScript  
- SCSS  
- RxJS (for countdown updates)  
- Prettier for code formatting  

---

## ⚙️ Development

### Run locally

```bash
npm install
npm start
```

Then open http://localhost:4200

### Build for production
```bash ng build --configuration production```

Output will be in the dist/ folder.

---

## 🫶 Author

Developed by Anastasiia as a part of the Natural Cycles Frontend Challenge 2025.

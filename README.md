# 🎬 MoviesAtFingertips

A sleek, responsive movie browsing web app built with **Vanilla JavaScript** and the **TMDB API**. Browse trending, top-rated, popular, and upcoming movies — and watch trailers instantly, all in your browser.

🔗 **Live Demo:** [soham-cyber-dev.github.io/Movie-Website](https://soham-cyber-dev.github.io/Movie-Website/)

---

## 📸 Preview

> Cinematic dark UI with horizontal movie carousels, star ratings, and an in-app trailer modal.

---

## ✨ Features

- 🔍 **Search** any movie by name in real time
- 🎞️ **Trailer Modal** — watch up to 4 YouTube trailers per movie without leaving the page
- ⭐ **Star Ratings & Release Year** displayed on every movie card
- 📦 **Skeleton Loaders** — smooth loading placeholders while fetching data
- 🔥 **4 curated sections** — Trending Today, Top Rated, Popular Now, Coming Soon
- 📱 **Fully Responsive** — works on mobile, tablet, and desktop
- 🎨 **Cinematic dark theme** with gold accents and smooth animations
- ⌨️ **Keyboard support** — press `Esc` to close the trailer modal

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, flexbox, animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Data | [TMDB REST API](https://www.themoviedb.org/documentation/api) |
| Fonts | Google Fonts — Bebas Neue, Outfit |
| Hosting | GitHub Pages |

---

## 📁 Project Structure
Movie-Website/
├── index.html          # App shell & layout
├── style.css           # All styling & animations
├── app.js              # UI logic, rendering, modal, search
├── apiTransaction.js   # All TMDB API fetch functions
├── logo.png            # App logo
└── Icon.ico            # Browser favicon

---

## 🚀 Getting Started

### Run Locally

No build tools or installs needed. Just clone and open:

```bash
git clone https://github.com/soham-cyber-dev/Movie-Website.git
cd Movie-Website
```

Then open `index.html` directly in your browser — or use VS Code's **Live Server** extension for a better experience.

### Using Live Server (recommended)

1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Your app opens at `http://127.0.0.1:5500`

---

## 🔑 API Reference

This project uses the **TMDB (The Movie Database) API v3**.

| Endpoint | Used For |
|---|---|
| `/trending/movie/day` | Trending Today section |
| `/movie/top_rated` | Top Rated section |
| `/movie/popular` | Popular Now section |
| `/movie/upcoming` | Coming Soon section |
| `/search/movie?query=` | Search feature |
| `/movie/{id}/videos` | Trailer modal |

> API Base: `https://api.themoviedb.org/3`
> Image Base: `https://image.tmdb.org/t/p/w500`

To use your own API key:
1. Sign up at [themoviedb.org](https://www.themoviedb.org/)
2. Go to **Settings → API** and generate a key
3. Replace the key in `apiTransaction.js`:

```js
const MOVIE_DB_API = 'your_api_key_here';
```

---

## 📱 Responsive Design

| Screen | Behaviour |
|---|---|
| Desktop (>640px) | Full navbar with inline search, wide movie cards |
| Mobile (≤640px) | Stacked navbar, smaller cards, touch-friendly scroll |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# 1. Fork the repo on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/Movie-Website.git

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Make your changes, then commit
git add .
git commit -m "Add: your feature description"

# 5. Push and open a Pull Request
git push origin feature/your-feature-name
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Soham** — [@soham-cyber-dev](https://github.com/soham-cyber-dev)

---

> Data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.

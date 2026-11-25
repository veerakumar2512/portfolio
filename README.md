# ⚡ Veera Kumar R — Personal Portfolio

> A modern, responsive, accessible personal portfolio built with pure HTML5, CSS3 & Vanilla JavaScript. No frameworks, no build step.

[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-96%2B-00d2ff?style=flat-square)](https://developers.google.com/web/tools/lighthouse)
[![License](https://img.shields.io/badge/License-MIT-7c3aed?style=flat-square)](LICENSE)
[![Deploy Status](https://img.shields.io/badge/Deploy-GitHub%20Pages-success?style=flat-square)](https://veerakumar-r.github.io)

---

## ✨ Features

- 📱 **Fully responsive** — works on all screen sizes
- ⚡ **Scroll-triggered animations** via Intersection Observer API
- 🎛️ **Project filter** by category (Web, Python, Data/SQL)
- 📊 **Animated stat counters**
- 🔍 **Project detail modals** with full descriptions
- 📬 **Contact form** with real-time validation + Formspree integration
- 🔤 **Typing animation** for hero subtitle
- ♿ **Accessible** — semantic HTML, ARIA labels, keyboard navigation
- 🔍 **SEO optimized** — meta tags, structured data, canonical URL

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Main single-page app
├── css/
│   └── style.css           # Design system + all section styles
├── js/
│   ├── main.js             # Nav, animations, counters
│   ├── projects.js         # Project data + rendering + modals
│   └── form.js             # Contact form validation + submission
├── assets/
│   ├── images/
│   │   ├── profile.jpg     # Your profile photo (replace this!)
│   │   └── projects/       # Project screenshots (optional)
│   └── resume/
│       └── veera-kumar-resume.pdf  # ← ADD YOUR RESUME HERE
└── README.md
```

---

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Open** `index.html` in your browser — it works immediately, no build step!
3. For live development with auto-reload, install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code

---

## ✏️ Customization Guide

### 1. Update Your Info
Edit `index.html` and replace:
- `Veera Kumar R` → your full name
- `veerakumar@example.com` → your email
- `veerakumar-r` → your GitHub username
- University, degree, GPA, experience in the Resume section

### 2. Add Your Projects
Edit `js/projects.js` → update the `PROJECTS` array:
```js
{
  id: 7,
  title: "Your Project Title",
  desc: "Short description (1–2 lines)",
  longDesc: "Full description shown in modal",
  tags: ["Python", "Flask", "SQLite"],
  category: "web",        // "web" | "python" | "data"
  date: "Nov 2026",
  github: "https://github.com/yourname/repo",
  live: "https://yourproject.live",
  outcome: "✦ Key metric / achievement",
  emoji: "🚀",
  color: "#00d2ff"
}
```

### 3. Add Your Resume
Drop your PDF at: `assets/resume/veera-kumar-resume.pdf`

### 4. Connect the Contact Form
1. Sign up at [Formspree.io](https://formspree.io) (free)
2. Create a new form → copy your Form ID
3. In `js/form.js`, replace:
   ```js
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
   ```

### 5. Update Social Links
In `index.html`, update all `href` values for:
- GitHub: `https://github.com/YOUR_USERNAME`
- LinkedIn: `https://linkedin.com/in/YOUR_USERNAME`
- Email: `mailto:YOUR_EMAIL`

---

## 🌐 Deployment

### GitHub Pages (Recommended — Free)
```bash
# 1. Create repo: YOUR_USERNAME.github.io
# 2. Push all files to main branch
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
# 3. Go to Settings → Pages → Source: Deploy from branch → main
# Live at: https://YOUR_USERNAME.github.io
```

### Netlify (Drag & Drop — Instant)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your entire `portfolio/` folder
3. Done! Get a free `*.netlify.app` subdomain

### Vercel
```bash
npm i -g vercel
vercel --prod
```

---

## 🔧 Tech Stack

| Tech | Purpose |
|---|---|
| HTML5 (Semantic) | Structure + Accessibility |
| CSS3 (Custom Properties) | Design system + Animations |
| Vanilla JS (ES6+) | Interactivity + DOM |
| Formspree | Contact form backend |
| Google Fonts | Typography (Inter + Fira Code) |
| Intersection Observer API | Scroll animations |

---

## 📈 SEO & Performance Checklist

- [x] Descriptive `<title>` and `<meta name="description">`
- [x] Open Graph tags for social sharing
- [x] Twitter Card meta tags
- [x] JSON-LD structured data (Person schema)
- [x] Semantic HTML5 elements
- [x] `alt` attributes on all images
- [x] Canonical URL tag
- [x] `loading="lazy"` on below-fold images
- [x] Single `<h1>` per page
- [x] ARIA labels on all interactive elements
- [x] Keyboard navigation support

---

## 📞 Contact

**Veera Kumar R**
- 📧 [veerakumar@example.com](mailto:veerakumar@example.com)
- 🐙 [github.com/veerakumar-r](https://github.com/veerakumar-r)
- 💼 [linkedin.com/in/veerakumar-r](https://linkedin.com/in/veerakumar-r)

---

*Built with ❤️ as part of my personal branding journey as a B.Tech AI&DS student.*

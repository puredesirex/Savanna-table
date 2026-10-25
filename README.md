# Savanna Table — Restaurant & Lounge
A fictional, premium African restaurant website, built as **Project 1** for the **Godwin Digital Solution** web development portfolio. Pure HTML5, CSS3 and vanilla JavaScript. No backend, database, build step or API keys.

## Features
Responsive mobile navigation, hero, popular dishes, filterable full menu (Starters, Main Courses, Local Specials, Drinks, Desserts), about story, responsive gallery, validated reservation form with WhatsApp hand-off, fictional sample testimonials, opening hours and contact, footer, floating WhatsApp button, skip link, keyboard focus styles, and reduced-motion support.

## Folder structure
```
savanna-table/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/img/   (local SVG images)
```

## Important notes
- **WhatsApp number:** `+2347049625916` is the developer's demo number. **Replace it with the restaurant owner's number before real use** (see below).
- **Reservations are a frontend demo.** The form sends nothing to a server. After validation, the guest taps a button that opens WhatsApp with the details pre-filled.
- **Images:** the bundled images are original local SVG plate illustrations in the brand palette, not photographs, because photos could not be downloaded when this project was built. To use real photography, put your own `.jpg`/`.webp` files in `assets/img/` and change the `src` paths in `index.html` and the `i:` names in `script.js` (for example `i:"jollof"` loads `assets/img/jollof.svg`; change the `.svg` in the `card()` function to `.jpg`). Use licensed or self-shot photos only, and compress them (under 200 KB each).
- Restaurant, reviews, hours, prices and email are fictional samples. The address is a placeholder.

## Editing restaurant details
- **Top of `script.js` (`CONFIG`)**: WhatsApp number (digits only, country code, no `+`), displayed phone, email, restaurant name, and reservation times.
- **`MENU` array in `script.js`**: dish name `n`, description `d`, price `p` (naira), category `c`, image `i`. Items with `pop:1` show in Popular dishes.
- **`index.html`**: about text, opening hours (also repeated in the footer), address placeholder, testimonials, and social links (currently the platforms' home pages; replace with real profiles).

## Preview locally
Open `index.html` in a browser, or run `python3 -m http.server 8000` and visit `http://localhost:8000`.

## Upload to GitHub (Android phone)
1. Extract the ZIP with your file manager.
2. In the GitHub app or browser (desktop site), create a new repository, e.g. `savanna-table`.
3. Tap **Add file → Upload files**, upload `index.html`, `style.css`, `script.js`, `README.md`, and the whole `assets` folder (keep the `assets/img/` structure), then **Commit changes**.
   If your browser cannot upload folders, create files inside the repo with the path `assets/img/NAME.svg` and paste each file's contents.

## Deploy on Render (Static Site)
1. Log in at render.com → **New → Static Site** → connect your GitHub repo.
2. Settings: **Build Command:** leave blank. **Publish Directory:** `.`  (a single dot). Branch: `main`.
3. Click **Create Static Site**. Render gives you a free `onrender.com` URL.

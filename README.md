# John Aldwin Arguelles — Portfolio

A personal portfolio site for an Information Technology student specializing in Network Technology at Batangas State University. Built with plain HTML5, Tailwind CSS (via CDN), and vanilla JavaScript — no build step, no framework, no backend. Ready to deploy directly on GitHub Pages.

## Tech stack

- **HTML5** — semantic structure
- **Tailwind CSS** (CDN) — utility-first styling, with a small custom config for color tokens and fonts
- **Vanilla JavaScript** — all interactivity in `js/script.js`
- **Lucide icons** (CDN) — lightweight icon set
- **Google Fonts** — Bricolage Grotesque (display) + Inter (body)

## File structure

```
portfolio/
├── index.html
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── profile.svg
│   │   ├── redspartan.svg
│   │   ├── safehaven.svg
│   │   └── smoke2snack.svg
│   └── icons/
└── README.md
```

## Replacing the placeholder images

The `assets/images/` folder ships with original SVG placeholder graphics (an abstract profile silhouette and three abstract project covers) so the layout works out of the box with no external images. To use your real photos and screenshots:

1. Add your files to `assets/images/` (e.g. `profile.jpg`, `redspartan.jpg`, `safehaven.jpg`, `smoke2snack.jpg`).
2. In `index.html`, update the corresponding `<img src="...">` attributes to point to your new filenames.
3. Keep the aspect ratios roughly similar (portrait for the profile photo, ~16:10 landscape for project covers) so the layout doesn't shift.

## Features implemented

- Sticky nav with blur-on-scroll and active-section highlighting
- Mobile hamburger menu with animated slide-down
- Smooth scrolling to all sections
- Hero section with typing effect and an "available for opportunities" status pill
- Animated statistic counters (OJT hours, projects, technologies) triggered on scroll
- Filterable skills grid (Frontend / Backend / Networking / Tools)
- Filterable, editorial-style project grid with hover zoom
- A large featured-project split layout for RedSpartanData
- Timeline-based Experience and Education sections
- Services ("What I Can Do") card grid
- Contact form with client-side validation and inline success/error messaging
- Dark / light mode toggle (persisted via `localStorage`)
- Back-to-top button
- Automatic current year in the footer
- `loading="lazy"` on all images
- Fully responsive from 375px mobile up to 1920px desktop, with no horizontal scroll

## Running locally

No build step is required. Just open `index.html` in a browser, or serve the folder with any static server, e.g.:

```bash
npx serve .
```

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Set the source to your default branch and the `/ (root)` folder.
4. Your site will be published at `https://<username>.github.io/<repo-name>/`.

## Customizing

- **Colors**: edit the `tailwind.config` block at the top of `index.html` (`brand`, `ink`, `paper`, `line`).
- **Fonts**: change the Google Fonts `<link>` and the `fontFamily` values in the same config block.
- **Content**: all copy lives directly in `index.html` — update project descriptions, skills, and contact links there.
- **Email address**: search the file for `YOUR_EMAIL@example.com` (Contact and Footer sections) and replace it with your real email.
- **Social links**: search the file for `YOUR_GITHUB_URL`, `YOUR_FACEBOOK_URL`, and `YOUR_LINKEDIN_URL` and replace each with your actual profile URL. The project card and case-study GitHub links still point to a generic `https://github.com/` placeholder — update those too if you'd like.

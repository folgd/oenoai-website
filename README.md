# OenoAI — Static site

Pure HTML / CSS / JavaScript. No build step, no Node, no React. Open `index.html`
directly in a browser or deploy the whole folder as-is.

## File layout

```
dist/
├── index.html      Single-page entry. All markup + a tiny inline script
│                   that sets data-mood / data-voice / data-rhythm before
│                   the rest of the CSS loads (no FOUC).
├── style.css       All visual styling. Design tokens at the top.
├── script.js       SPA routing (hash-based), language toggle, scroll
│                   reveals, header state, contact form stub.
├── content.js      All visible text (Japanese + English). Edit only here
│                   when changing copy.
├── images/         logo.png, hero.png, producer/importer/restaurant.png
└── .nojekyll       Tells GitHub Pages to serve files as-is.
```

## Deploying to GitHub Pages

1. Push the contents of this folder to the `main` branch (or any branch)
   of a GitHub repo.
2. Repo → Settings → Pages → Source: select that branch, root.
3. Done. The site is served at `https://<user>.github.io/<repo>/`.

If you push to the **root** of a `user.github.io` repo it serves at the
bare user URL. If you push to a project repo, all asset paths in this
project are relative (`images/...`, `style.css`, etc.) so they work
under either deployment.

## Editing content

All Japanese and English copy lives in `content.js`. The `data-lang`
attribute on `<html>` decides which dictionary is active; the language
toggle in the header rewrites every node that carries a
`data-content-key="path.to.value"` attribute.

## Theme variants

The site supports three orthogonal axes via attributes on `<html>`:

* `data-mood`   — `champagne` (default) · `bordeaux` · `sancerre` · `onyx`
* `data-voice`  — `editorial` (default) · `modern` · `display`
* `data-rhythm` — `standard` (default) · `compact` · `spacious`

Change the three lines inside the inline `<script>` in `index.html` to
ship a different default. Each variant is defined in `style.css`.

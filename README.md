# fedethics.ca

Marketing and publishing site for FedEthics Inc., built with [Astro](https://astro.build)
and deployed as static files to Namecheap shared hosting.

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321
```

| Command | Does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve `dist/` locally, as it will be served in production |

## Layout

```
src/
  layouts/
    BaseLayout.astro     <html>/<head>: meta, canonical, OG, consent, GTM, fonts
    PageLayout.astro     BaseLayout + nav, newsletter band, footer, cookie banner
  components/
    Nav.astro            One nav for the whole site; takes `active`, `imprint`, `cta`
    Footer.astro         Server-rendered, so crawlers see it
    Newsletter.astro     Sitewide signup band (plain JS, no framework)
    CookieBanner.astro   Consent prompt; pairs with the defaults in BaseLayout
    Icon.astro           Inlines Lucide SVGs at build time
    SubscribeForm.jsx    React island — the translated form on /newsletter/
  scripts/
    subscribe.js         The one newsletter submit implementation
    modals.js            openModal/closeModal, used by the two book pages
  i18n/subscribe.js      en/fr/es/pt copy for /newsletter/
  pages/                 One .astro per route
  styles/global.css      The single :root and all shared component styles
public/                  Copied verbatim into dist/
```

### Conventions

- **`global.css` owns `:root`.** Pages may define extra tokens only for values that
  are genuinely page-specific (the two book palettes do this); never redefine a
  shared token to a different value.
- **Page `<style>` blocks are scoped.** A rule that must reach a child component's
  DOM (for example the `<svg>` inside `<Icon>`) needs `:global(...)`.
- **Keep JavaScript off pages that don't need it.** Ten of the eleven routes ship
  under 1 KB of JS. Reach for a React island only when the interaction genuinely
  warrants it, as `/newsletter/` does with four languages and a state machine.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
FTPs `dist/` to `/public_html/`. Requires the `FTP_SERVER`, `FTP_USERNAME`, and
`FTP_PASSWORD` repository secrets.

### Things that will break if you move them

- **`/subscribe/` is an API, not a page.** It is a Python app mounted by
  `public/subscribe/.htaccess`, and it is where the newsletter form POSTs. The
  newsletter *page* lives at `/newsletter/` precisely so the two don't collide.
  Never let a deploy delete `/public_html/subscribe/`.
- **`public/pages/bonus/*.pdf`** keeps that exact path because printed books and QR
  codes link to it.
- **`/Book/`** is a QR-code shortcut redirected in `public/.htaccess`.
- Old `/pages/*.html` URLs are 301'd in `public/.htaccess`. Keep those redirects.

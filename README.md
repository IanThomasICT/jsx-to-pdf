# JSX to PDF - Minimal application

Stack

-   React w/ Vite
-   Express.js

## Summary

Using JSX to quickly construct static pages and reports, this application uses `ReactDOMServer` to convert static JSX pages into HTML and `puppeteer` (server-side only) to convert that HTML page into a pdf file.

-   `Vite` is used to provide simple live reloading and bundling for React development
-   `Express` is used to provide a small API server that will serve the React app (bundled by Vite), handle DB calls, and PDF generation using `puppeteer`.

### Getting started

-   Requires `Node` LTS (v20.10 in 01/2024)

#### Clone the repository

```sh
git clone https://github.com/spectrum-ian/jsx-to-pdf.git
```

#### Install dependencies and configure and seed database with data

```
pnpm install
npx prisma db push
npx prisma generate
npx prisma db seed
```

#### Run application in dev mode

```
pnpm dev
```

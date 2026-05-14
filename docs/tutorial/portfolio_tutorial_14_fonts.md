---
layout: default
title: "14. Fonts"
parent: Tutorial
nav_order: 14
has_children: false
---

#### Prof. Dr. Lena Gieseke | lena.gieseke@filmuniversitaet.de  
  
# Tutorial - A Portfolio Page

## 14. Fonts

With a simplified layout and large texts like the one on this page, fonts do matter. Hence in the following, we setup the code for being able to use different fonts.  
  
The font setup has two parts. First, Next.js loads the font files and exposes them as CSS custom properties. Second, `globals.css` assigns those properties to semantic aliases (`--font-headers`, `--font-body`) that the rest of the stylesheet uses. This two-step approach means switching fonts later only requires changing one small block in `globals.css`, nothing else needs to change.

### 14.1 Loading Fonts

`next/font/google` downloads font files from Google Fonts **at build time** and serves them from your own domain. 

The old way was to use a `<link>` tag pointing at `fonts.googleapis.com` (e.g. `<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />`). With a `<link>` tag, when a visitor opens your site, their browser makes a separate request to `fonts.googleapis.com` to fetch the font. This has the downsides that it sends the visitor's IP address to Google (a privacy concern), and the font only starts downloading after the browser has already loaded your page and parsed the `<link>` tag — adding a delay before the correct font appears.

**`next/font/google` solves both.** Instead of fetching from Google at runtime, Next.js downloads the font files from Google **at build time**, when you run `npm run build` as a developer. The font is then bundled alongside your other static files and served from your own domain. The visitor's browser never contacts Google, and the font is available immediately with no extra round-trip.

**Using local font files** is also possible with `next/font/local`. This is useful for commercial or custom fonts that are not on Google Fonts — you simply place the font files in your project and point Next.js at them:

```tsx
import localFont from "next/font/local";

const myFont = localFont({
    src: "./fonts/MyFont.woff2",
    variable: "--font-custom",
    display: "swap",
});
```

The font file can live anywhere in the project and a common convention is `app/fonts/`. Everything else (attaching it to `<html>`, creating CSS aliases) works exactly the same as with `next/font/google`.

### 14.2 Load the Font in `layout.tsx

We use [Inter](https://rsms.me/inter/) (developed by [Rasmus Andersson](https://rsms.me/)), a clean variable font well-suited to portfolio sites. Obviously, feel free to use a different font, every font listed under [https://fonts.google.com/](https://fonts.google.com/) works with the following setup.


**`app/layout.tsx`**:
```tsx
import "./globals.css";

import Header from "@/app/components/Header";
import Footer from "./components/Footer";

//ADD;
import { Inter } from "next/font/google";

/*
  Inter is a variable font — all weights (100–900) are included automatically.
  variable: "--font-inter" exposes it as a CSS custom property on the element
  it is applied to.
  display: "swap" shows a system fallback font immediately, then swaps in
  Inter once it has loaded — prevents invisible text during page load.
*/
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (


        /*
          CHANGE
          className={inter.variable} attaches --font-inter to <html>,
          making it available as a CSS variable in every child element
          on the page.
        */
        <html lang="en" className={`${inter.variable}`}>
        
        {/* ... */}
    );
}
```

### 14.3 Add Font Variables to `globals.css`

`next/font/google` injects `--font-inter` onto `<html>`, but nothing uses it yet. Add semantic aliases and apply them to `body` and headings.

**`app/globals.css`**:
```css
/* ADD */
/* --- Font Variables ------------------------------------------------- */
/*
  --font-inter is injected onto <html> by next/font/google in layout.tsx.
  We create semantic aliases so the rest of the CSS refers to
  --font-headers and --font-body rather than a specific font name.
  To switch fonts later, only this block needs updating.
*/
:root {
    --font-headers: var(--font-inter);
    --font-body:    var(--font-inter);
}
```

Then apply them inside `@layer base`.

**`app/globals.css`**:
```css
body {

    /* ADD: */
    font-family: var(--font-body);
    font-weight: 300;
    font-feature-settings: 'rlig' 1, 'calt' 1;
    background-color: white;
}

h1, h2, h3 {
     /* ADD: */
    font-family: var(--font-headers);
    font-weight: 800;
    overflow-wrap: anywhere;
}
```

### 14.4 Additional Fonts

Let's say we want a different font for the body sections of our page, e.g. [Playwrite](https://fonts.google.com/specimen/Playwrite+GB+J+Guides?preview.script=Latn).

You have to import it. For that you can find the name under the `@import` section. On the Google Fonts page for a font, click "Get font" then "Get embed code" and switch to the @import tab. You'll see something like `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display');`. Take the family name (Playfair Display), replace spaces with underscores, and that's your Next.js import name: Playfair_Display. 


**`app/layout.tsx`**:
```tsx
import { Inter, Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
    variable: "--font-playfair",
    display: "swap",
});
```

Send it also to the browser.

**`app/layout.tsx`**:
```tsx
<html lang="en" className={`${inter.variable} ${playfair.variable}`}>
```

And use it in `globals.css`.

**`app/globals.css`**:
```css
:root {
    --font-headers: var(--font-inter);
    --font-body:    var(--font-playfair);
}
```

Everything that uses `--font-headers` updates automatically.






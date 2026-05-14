# A Portfolio with Next.js

Website and tutorial developed by Lena Gieseke, 2025–26.  
  
> Claude and Claude Code assisted with code and text generation. All concept, structure, and content decisions were made solely by me. Generated material was reviewed and thoroughly adjusted throughout. Claude was instructed to draw from the official documentation of all technologies used. Those documentations should be considered reference material throughout.


The template page, we are implementing: [https://portfolio-01-t2.onrender.com/](https://portfolio-01-t2.onrender.com/)
The same setup, individualized for my webpage: [www.lenagieseke.com/](https://www.lenagieseke.com/)



* [A Portfolio with Next.js](#a-portfolio-with-nextjs)
    * [What We Are Building](#what-we-are-building)
        * [What You Will Learn](#what-you-will-learn)
        * [Prerequisites](#prerequisites)
    * [1. Tech Stack](#1-tech-stack)
        * [1.1 Static vs. Dynamic Websites](#11-static-vs-dynamic-websites)
        * [1.2 npm and Node.js](#12-npm-and-nodejs)
        * [1.3 Next.js](#13-nextjs)
        * [1.4 React](#14-react)
        * [1.5 TypeScript](#15-typescript)
            * [1.5.1  Custom Types For Component Props](#151--custom-types-for-component-props)
        * [1.6 Tailwind CSS](#16-tailwind-css)
        * [1.7 MDX](#17-mdx)
    * [2. Project Setup](#2-project-setup)
        * [2.1 Installing Node.js](#21-installing-nodejs)
        * [2.2 Creating the Project](#22-creating-the-project)
        * [2.3 The Generated File Structure](#23-the-generated-file-structure)
        * [2.4 Cleaning Up the Defaults](#24-cleaning-up-the-defaults)
        * [2.5 Prettier](#25-prettier)
        * [2.6 TypeScript Configuration](#26-typescript-configuration)
        * [2.7 React DevTools](#27-react-devtools)
    * [3. Routing](#3-routing)
        * [3.1 What Is Routing?](#31-what-is-routing)
        * [3.2 File-System Routing in Next.js](#32-file-system-routing-in-nextjs)
        * [3.3 layout.tsx Skeleton](#33-layouttsx-skeleton)
        * [3.4 Route Groups](#34-route-groups)
        * [3.5 Dynamic Routes](#35-dynamic-routes)
        * [3.6 Server and Client Components](#36-server-and-client-components)
        * [3.7 Creating All Page Stubs](#37-creating-all-page-stubs)
    * [4. Header and Footer](#4-header-and-footer)
        * [4.1 Header](#41-header)
            * [4.1.1 Header — Plain HTML First](#411-header--plain-html-first)
            * [4.1.2 Wire the Header into the Layout](#412-wire-the-header-into-the-layout)
        * [4.2 Footer](#42-footer)
            * [4.2.1 Footer — Plain HTML First](#421-footer--plain-html-first)
    * [5. Tailwind CSS](#5-tailwind-css)
        * [5.1 How Tailwind v4 Works](#51-how-tailwind-v4-works)
        * [5.2 globals.css](#52-globalscss)
        * [5.3 Tailwind Layers](#53-tailwind-layers)
        * [5.4 Add Tailwind Styling for Spacing](#54-add-tailwind-styling-for-spacing)
            * [5.4.1 What each class does in this example](#541-what-each-class-does-in-this-example)
        * [5.5 Responsive Design in Tailwind](#55-responsive-design-in-tailwind)
        * [5.5 Update globals.css with Header/Footer Styles](#55-update-globalscss-with-headerfooter-styles)
            * [5.5.1 Apply Tailwind New Classes](#551-apply-tailwind-new-classes)
    * [6. Navigation](#6-navigation)
        * [6.1 — Extract The `nav` Into Its Own Component](#61--extract-the-nav-into-its-own-component)
        * [6.2 — Replace inline classes with named CSS classes](#62--replace-inline-classes-with-named-css-classes)
            * [6.2.1 aria-label](#621-aria-label)
        * [6.3 — Add a mobile menu toggle button](#63--add-a-mobile-menu-toggle-button)
        * [6.4 — The Dropdown Menu](#64--the-dropdown-menu)
            * [6.4.1 — Close on Escape key](#641--close-on-escape-key)
            * [6.4.2 —  Close on outside click](#642---close-on-outside-click)
            * [6.4.3 — Add a chevron icon](#643--add-a-chevron-icon)
            * [6.4.4 — Refactor: One Link List for Both Menus](#644--refactor-one-link-list-for-both-menus)
        * [6.5 — A "Say Hi" Button](#65--a-say-hi-button)
        * [6.5.1 — Integrate Button Into Header.tsx](#651--integrate-button-into-headertsx)
    * [7. Footer](#7-footer)
    * [8. The Home Page](#8-the-home-page)
        * [8.1 Components](#81-components)
        * [8.1.1 Utility Components](#811-utility-components)
        * [8.1.2 Combining Components](#812-combining-components)
        * [8.2 Putting the Components on the Home Page](#82-putting-the-components-on-the-home-page)
        * [8.3 Styling](#83-styling)
    * [9. The About Page - Overview](#9-the-about-page---overview)
        * [9.1 TextImageBox Component](#91-textimagebox-component)
        * [9.2 HeroSectionTextImage Component](#92-herosectiontextimage-component)
        * [9.3 Putting It Together](#93-putting-it-together)
    * [10. The About Page - Details in an Accordion Stack](#10-the-about-page---details-in-an-accordion-stack)
        * [10.1 Installing MDX Support](#101-installing-mdx-support)
            * [10.1.1 Configuring next.config.ts](#1011-configuring-nextconfigts)
            * [10.1.2 mdx-components.tsx](#1012-mdx-componentstsx)
            * [10.1.3 mdx.d.ts — Type Declarations](#1013-mdxdts--type-declarations)
            * [10.1.4 Typography Plugin](#1014-typography-plugin)
        * [10.2 The MDX Files](#102-the-mdx-files)
        * [10.3 The Accordion](#103-the-accordion)
            * [10.3.1 The AccordionEntry Skeleton](#1031-the-accordionentry-skeleton)
            * [10.3.2 The Toggle Button](#1032-the-toggle-button)
            * [10.3.3 AccordionAbout Skeleton](#1033-accordionabout-skeleton)
            * [10.3.4 Update the About Page](#1034-update-the-about-page)
            * [10.3.5 Load MDX data into AccordionAbout](#1035-load-mdx-data-into-accordionabout)
            * [10.3.6 Style the Content Area](#1036-style-the-content-area)
            * [10.3.7 Responsive Table Styles](#1037-responsive-table-styles)
    * [11. Impressum](#11-impressum)
    * [12. Contact](#12-contact)
    * [13. Projects](#13-projects)
        * [13.1 Data Layer](#131-data-layer)
        * [13.2 Listing Page Skeleton](#132-listing-page-skeleton)
        * [13.3 Detail Page Skeleton](#133-detail-page-skeleton)
        * [13.4 ProjectCard](#134-projectcard)
        * [13.5 Project Page with ProjectCards](#135-project-page-with-projectcards)
        * [13.6 Project MDX Content Files](#136-project-mdx-content-files)
        * [13.7 ProjectImageGallery](#137-projectimagegallery)
        * [13.8 Project Detail Page](#138-project-detail-page)
        * [13.9 Category Filtering](#139-category-filtering)
        * [13.10 Verify the Build](#1310-verify-the-build)
    * [14. Fonts](#14-fonts)
        * [14.1 Loading Fonts](#141-loading-fonts)
        * [14.2 Load the Font in \`layout.tsx](#142-load-the-font-in-layouttsx)
        * [14.3 Add Font Variables to `globals.css`](#143-add-font-variables-to-globalscss)
        * [14.4 Additional Fonts](#144-additional-fonts)
    * [15. Summary](#15-summary)
    * [15.1 The Complete File Structure](#151-the-complete-file-structure)
        * [15.2 What to Personalise](#152-what-to-personalise)
    * [16. Build and Deploy](#16-build-and-deploy)
        * [16.1 Git and GitHub](#161-git-and-github)
        * [16.2 Render](#162-render)
        * [16.3 Updating the Site](#163-updating-the-site)
        * [16.4 A Custom Domain](#164-a-custom-domain)
    * [17. References and Links](#17-references-and-links)


---

## What We Are Building

The goal is a personal portfolio website with six pages: home (animated shader hero), about (collapsible CV), projects listing with category filtering, individual project detail pages, a contact page, and a legal impressum.


### What You Will Learn

- How Next.js App Router structures a multi-page site using the file system
- How to separate server-rendered and client-side-interactive code
- How to write typed data and components in TypeScript
- How to use Tailwind CSS v4 as a design system
- How to write rich content in MDX (Markdown with embedded React components)
- How to build a dynamic route (`/projects/[slug]`) generating all pages at compile time
- How WebGL 2 works and how to write a fragment shader in GLSL

### Prerequisites

You should be comfortable with basic HTML, CSS, and JavaScript fundamentals. You do not need to know React, TypeScript, or Next.js — each is introduced from scratch when it first appears.

---

## 1. Tech Stack

### 1.1 Static vs. Dynamic Websites

There are two broad categories of website:

**Dynamic sites** run a server that generates the page HTML on every request. The server might query a database, check who is logged in, or personalise the content for each visitor. Examples: social networks, online shops, news feeds. Dynamic sites require an always-running server process.

**Static sites** generate all HTML at build time — once, ahead of any visitor arriving. The result is a folder of plain files (`.html`, `.css`, `.js`, images) that any file server can deliver. There is no computation at request time. Static sites are fast, cheap to host, and have no server to maintain.

This portfolio is a static site. `npm run build` compiles the entire site into an `out/` folder. That folder can be uploaded to GitHub Pages, Netlify, Vercel, or any file host — no backend required.

The trade-off: static sites cannot show truly real-time or per-user content. For a portfolio that changes only when you rebuild and re-deploy, this trade-off is a good deal.


### 1.2 npm and Node.js

JavaScript started as a browser language. **Node.js** brought it to the server and the command line. Everything in this project — the build tools, the development server, the package installer — runs on Node.js.

**npm** (Node Package Manager) comes bundled with Node.js. It installs packages (reusable code libraries) from the public registry and manages them in `package.json`. When you run `npm install`, npm reads `package.json`, downloads the listed packages into `node_modules/`, and writes a `package-lock.json` that locks exact versions so every developer gets the same result.

Key npm commands you will use:
```bash
npm install             # install all dependencies from package.json
npm install <package>   # add a new package
npm run dev             # start the development server
npm run build           # compile the production site
```

### 1.3 Next.js

[Next.js](https://nextjs.org/) is a framework built on top of React. React describes how to build UI components; it says nothing about routing, build optimisation, or server rendering. Next.js adds all of that.

Think of React as the engine and Next.js as the complete car: React powers the rendering, Next.js provides everything else (routing, file conventions, build pipeline, image optimisation, font loading).

Key features this project uses:

- **File-system routing** — a file at `app/about/page.tsx` automatically becomes the URL `/about`. No router configuration.
- **Server components** — React 19 components that render at build time (or on the server). They produce HTML and send zero JavaScript to the browser, keeping pages fast.
- **Static export** — one config option (`output: "export"`) compiles the whole site to static files.
- **Turbopack** — the dev server uses a very fast Rust-based bundler. Production builds always use a separate optimising compiler.

### 1.4 React

[React](https://react.dev/) is a library for building user interfaces out of **components**. A component is a JavaScript function that returns a description of what to show on screen.

```tsx
// A minimal React component
function Greeting() {
    return <h1>Hello, world!</h1>;
}
```

That `<h1>` inside a JavaScript function looks like HTML but is actually **JSX** — a syntax extension that lets you write HTML-like markup directly in JavaScript. Under the hood, JSX is compiled into regular function calls before the browser ever sees it:

```tsx
// JSX:
const element = <h1 className="title">Hello</h1>;

// What it compiles to:
const element = React.createElement("h1", { className: "title" }, "Hello");
```

JSX rules to know:
- Use `className` instead of `class` (because `class` is a reserved word in JavaScript)
- Every element must be closed: `<img />` not `<img>`
- A component must return a single root element — wrap multiple elements in `<>...</>` (a React Fragment)
- JavaScript expressions inside JSX go in curly braces: `<p>{name}</p>`

**Props** are the data you pass into a component, like HTML attributes:
```tsx
function Greeting({ name }: { name: string }) {
    return <h1>Hello, {name}!</h1>;
}

// Usage:
<Greeting name="Ernie" />
```

React 19 introduced two kinds of components:

**Server components** (the default in Next.js App Router) render at build time or on the server. Advantages: zero JavaScript shipped to the browser, can read files and databases directly, fast initial load. Disadvantages: no browser APIs, no event handlers, no `useState` or `useEffect`.

**Client components** run in the browser. Add `"use client"` as the very first line of the file to opt in. Advantages: can respond to user input, hold local state, use browser APIs. Disadvantages: their code is included in the JavaScript bundle sent to every visitor, slightly more complex.

The rule: add `"use client"` only when you actually need interactivity. Everything else stays as a server component.

### 1.5 TypeScript

[TypeScript](https://www.typescriptlang.org/) is JavaScript with type annotations. You declare what type a variable, parameter, or function return value must be:

```ts
// JavaScript — the typo 'naem' goes undetected until runtime
function greet(name) {
    return "Hello, " + naem;
}

// TypeScript — 'naem' is flagged as an error immediately
function greet(name: string): string {
    return "Hello, " + naem; // Error: Cannot find name 'naem'
}
```

TypeScript is compiled away before shipping — the browser only ever sees plain JavaScript. The cost is a small amount of extra syntax; the benefit is that an entire class of bugs is caught before they reach users.


#### 1.5.1  Custom Types For Component Props

In React, every component receives its inputs as a props object. TypeScript lets you define exactly what shape that object must have using a type declaration:

```ts
type ButtonEmailProps = {
    email: string;       // required
    subject?: string;    // optional — the ? means it can be omitted
    children?: ReactNode;
};

```
This type is then attached to the component's parameter:

```tsx
function ButtonEmail({ email, subject, children }: ButtonEmailProps) { ... }
```

Now TypeScript knows that email must always be provided and must be a string. Passing a number, or forgetting it entirely, is a compile error. The `?` on subject tells TypeScript the caller may omit it — the component must handle the case where it is undefined.

You will see this pattern in some of the components in this project.

### 1.6 Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) is a **utility-first** CSS framework. "Utility-first" means: instead of writing custom CSS class names and then writing CSS rules for them, you apply small, single-purpose class names directly in your HTML. Each class does exactly one thing.

```html
<!-- Traditional approach: two files to maintain -->
<!-- HTML: -->   <div class="hero-title">Projects</div>
<!-- CSS:  -->   .hero-title { font-size: 2.5rem; font-weight: 800; line-height: 1; }

<!-- Tailwind approach: everything in one place -->
<div class="text-4xl font-bold leading-none">Projects</div>
```

The benefit: you never leave your HTML file to style an element. The class names are a vocabulary — once you know `font-bold`, `text-gray-800`, and `px-4`, you can compose any style.

**Tailwind v4 (the version this project uses)** removed the `tailwind.config.ts` configuration file. The only setup required is one line in your CSS file and a PostCSS plugin. This is noted in the relevant section below.

### 1.7 MDX

[MDX](https://mdxjs.com/) is a file format that combines Markdown with JSX. Plain Markdown is great for text content (headings, lists, paragraphs, links) but cannot include interactive React components. MDX adds that ability.

Why use MDX for this portfolio? The About page contains a CV with sections (Vita, Publications, Grants). Each section is primarily text — a good fit for Markdown. But the sections need to be collapsible accordion panels — a React component. MDX lets the content author write plain text while React handles the interactive wrapper.

```mdx
export const metadata = { title: "Vita" }

## Professional Experience

I am a researcher at [Institution]...

<!-- A React component embedded in Markdown: -->
<SomeHighlightBox>Key achievement here</SomeHighlightBox>

More text continues normally.
```

---

## 2. Project Setup

### 2.1 Installing Node.js


Verify the installation:
```bash
node -v   # should print v20 or higher
npm -v    # comes with Node.js
```

If you don't have it, download and install [Node.js](https://nodejs.org/).

### 2.2 Creating the Project

`create-next-app` scaffolds a complete Next.js project in one command. Run it in the parent folder where you want your project to live:

```bash
npx create-next-app@latest portfolio
```

`npx` means "download this tool temporarily and run it once" — the tool is not installed permanently.

The wizard asks several questions. Answer as follows:

```
Would you like to use the recommended Next.js defaults? No
Would you like to use TypeScript?                       Yes
Which linter would you like to use?                     ESLint
Would you like to use React Compiler?                   No
Would you like to use Tailwind CSS?                     Yes
Would you like your code inside a src/ directory?       No
Would you like to use App Router?                       Yes
Would you like to use Turbopack for next dev?           Yes
Would you like to customize the import alias?           No  (keep @/*)
Would you like to include AGENTS.md?                    No
```

Why each choice:

- **TypeScript: Yes** — type checking catches bugs before they reach users; no runtime cost.
- **ESLint: Yes** — a linter flags common mistakes automatically.
- **React Compiler: No** — an experimental optimiser; leave it off for a simpler setup.
- **Tailwind CSS: Yes** — installs Tailwind and creates the initial CSS and PostCSS config.
- **src/ directory: No** — application code lives directly under `app/` at the project root, next to the config files. Simpler path structure.
- **App Router: Yes** — the modern Next.js routing system; this tutorial uses it exclusively.
- **Turbopack: Yes** — fast Rust-based dev server; production builds use a separate compiler regardless.
- **Keep @/\*: No customisation** — `@/` is an alias for the project root, so `@/app/components/Header` resolves to `app/components/Header` from anywhere in the project.
- **AGENTS.md: No** — a file for AI coding assistants; not needed here.

Now enter the project folder and start the development server:

```bash
cd portfolio
npm run dev
```

Open `http://localhost:3000`. You should see the default Next.js welcome page.

### 2.3 The Generated File Structure

After scaffolding, the project looks like this:

```
portfolio/
├── app/
│   ├── favicon.ico        Browser tab icon
│   ├── globals.css        Global styles — Tailwind entry point
│   ├── layout.tsx         Root layout — wraps every page
│   └── page.tsx           Home page (route: /)
├── public/                    Static assets (images, fonts, robots.txt)
├── eslint.config.mjs          ESLint configuration
├── next.config.ts             Next.js configuration
├── next-env.d.ts              Auto-generated TypeScript declarations for Next.js
├── package.json               Dependencies and npm scripts
├── package-lock.json          Locked dependency versions
├── postcss.config.mjs         PostCSS configuration (runs Tailwind)
├── tsconfig.json              TypeScript configuration
├── AGENTS.md / README.md      Documentation (can be ignored)
└── node_modules/              Installed packages (never edit manually)
```

All application code lives under `app/`. Config files sit at the project root. The `public/` folder is served at `/` — a file at `public/img/example.jpg` is accessible at `http://localhost:3000/img/example.jpg`.

*On a Side Note*:

`.tsx` is the file extension for TypeScript files that contain JSX.

* `.ts` — plain TypeScript (logic, types, data — no markup)
* `.tsx` — TypeScript + JSX (components, pages — anything that returns HTML-like markup)

In practice: if a file contains a `return (...)` with HTML tags, it is `.tsx`.  
If it only contains functions, types, or data, it is `.ts`.



### 2.4 Cleaning Up the Defaults

`create-next-app` generates placeholder content, which we don't need and are going to clean up in the following. In total, we replace three files.

1. **`app/page.tsx`** — the home page:

```tsx
// page.tsx is the component rendered at the route /.
// const defines an arrow function component named Home.
// It receives no props (no data from outside).
// It returns JSX — the markup that React renders to HTML.
const Home = () => {
    return (
        <div>Hello World</div>
    );
};

// Every page.tsx must have a default export — this is what Next.js renders.
export default Home;
```

2. **`app/layout.tsx`** — the root layout (the shell that wraps every page):

```tsx
import "./globals.css"; // Import global styles so they apply everywhere

// RootLayout wraps every page in the site.
// children is the page currently being rendered.
export default function RootLayout({
    children, // pulls 'children' out of the props object
}: Readonly<{ // A TypeScript utility type that makes every field in the object read-only.
    children: React.ReactNode; // TypeScript type for that parameter: Any valid React content
}>) {
    return (
        <html lang="en">
            <body>
                {children} {/* The current page renders here */}
            </body>
        </html>
    );
}
```

3. **`app/globals.css`** — global styles. For now, reduce to the single line that loads Tailwind:

```css
@import "tailwindcss";
```

Finally, delete everything inside the `public/` folder (the placeholder images are not needed).

The dev server reloads automatically. You should see plain "Hello World" on a white page.

### 2.5 Prettier

Prettier is a code formatter. It reads TypeScript, CSS, and Markdown files and rewrites them with consistent style — indentation, quote style, trailing commas, line length. It eliminates all manual formatting decisions.

Create `prettier.config.mjs` at the project root.

**`prettier.config.mjs`**:
```js
const config = {
    semi: true,           // Add semicolons at end of statements
    tabWidth: 4,          // Indent with 4 spaces
    trailingComma: 'all', // Add trailing commas wherever valid (arrays, objects, args)
    singleQuote: true,    // Use 'single quotes' instead of "double quotes"
    printWidth: 80,       // Wrap lines at 80 characters
};

export default config;
```

Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) in VS Code and enable **Format on Save** in your settings (search for `editor.formatOnSave`). From this point on, every file formats automatically when you save.

### 2.6 TypeScript Configuration

Open `tsconfig.json`. Most settings are correct from `create-next-app`. The important ones explained.

**`tsconfig.json`**:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    // The JavaScript version produced. ES2022 allows modern features
    // (optional chaining, nullish coalescing, top-level await).

    "lib": ["dom", "dom.iterable", "esnext"],
    // Type definitions to include. "dom" gives you browser API types
    // (document, window, HTMLElement, etc.). "esnext" adds the latest
    // JavaScript standard library types.

    "allowJs": true,
    // Allow .js files alongside .ts files in the same project.

    "skipLibCheck": true,
    // Skip type-checking .d.ts declaration files inside node_modules.
    // Saves time; third-party type errors are rarely actionable.

    "strict": true,
    // Enable ALL strict type checks. This is the most important setting.
    // It catches null/undefined errors, implicit any types, and more.
    // Leave this on.

    "noEmit": true,
    // Don't write any output files. Next.js handles compilation;
    // TypeScript is only used here for type checking.

    "esModuleInterop": true,
    // Allows default imports from CommonJS modules (older Node.js style).
    // Needed for some packages.

    "module": "esnext",
    // Use the modern ES module format (import/export statements).

    "moduleResolution": "bundler",
    // Use the resolution algorithm that bundlers like Turbopack use.
    // More permissive than Node's algorithm; required for Tailwind v4 imports.

    "resolveJsonModule": true,
    // Allow importing .json files directly: import data from "./data.json"

    "isolatedModules": true,
    // Ensure each file can be compiled independently (no cross-file type
    // tricks). Required for fast builds with Turbopack.

    "jsx": "react-jsx",
    // Use the modern JSX transform — no need to import React in every file.

    "incremental": true,
    // Cache compilation results between runs for faster rebuilds.

    "plugins": [{ "name": "next" }],
    // Next.js TypeScript plugin — adds warnings for common Next.js mistakes
    // directly in the editor.

    "paths": { "@/*": ["./*"] }
    // Import alias: @/app/components/Header → app/components/Header
    // Use @/ instead of ../../.. for any import from within the project.
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```


Change to `target` to `"target":"ES2022",` and make sure that `"strict": true,`.

### 2.7 React DevTools

Install the **React DevTools** browser extension ([Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)). It adds a **Components** tab to the browser developer tools where you can inspect the component tree, see which props each component received, and watch state changes in real time.

This is valuable for debugging. When something looks wrong on screen, open DevTools → Components and inspect what data your component actually received.

---

## 3. Routing

### 3.1 What Is Routing?

A website with multiple pages needs a way to decide: "when the user visits `/about`, show the About page." That decision is made by a **router**.

There are several approaches to routing:

- **Server-side routing** (traditional): the server receives the URL, picks the right file, and sends back HTML. Every navigation is a full page reload.
- **Client-side routing** (SPAs): JavaScript intercepts link clicks, updates the URL without reloading, and swaps the page content in place. Faster navigations; more complex setup.
- **File-system routing** (Next.js): the folder structure of your code is the router. No configuration file, no route registration — the file's location is the URL.

### 3.2 File-System Routing in Next.js

Every folder inside `app/` that contains a file named `page.tsx` becomes a URL route:

```
app/page.tsx                       → /
app/about/page.tsx                 → /about
app/(routes)/projects/page.tsx     → /projects
app/(routes)/projects/[slug]/page.tsx → /projects/generative-art
                                              /projects/shader-studies
                                              (any value)
```

There is no router configuration file. The file system is the router.

### 3.3 layout.tsx Skeleton

A `layout.tsx` file wraps every page in its folder and all nested folders below it. The root `app/layout.tsx` wraps the entire site.

Unlike `page.tsx`, a layout does **not re-render** when navigating between pages. The header and footer live here because they never change between pages.

A layout receives `children` as a prop — that is the page currently being rendered:

```tsx
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main>{children}</main>  {/* current page goes here */}
                <Footer />
            </body>
        </html>
    );
}
```

### 3.4 Route Groups

Wrapping a folder name in parentheses creates a **route group**. The folder organises files without adding a URL segment:

```
app/(routes)/about/page.tsx    → still just /about  (not /routes/about)
app/(routes)/contact/page.tsx  → still just /contact
```

Route groups are a purely organisational tool. We use `(routes)/` to keep all secondary pages together without affecting their URLs.

### 3.5 Dynamic Routes

A folder wrapped in square brackets creates a dynamic route segment — any URL value matches it:

```
app/(routes)/projects/[slug]/page.tsx
```

This one file handles `/projects/generative-art`, `/projects/shader-studies`, and any other value in that position. Inside the component, `params.slug` gives you the actual URL value.

### 3.6 Server and Client Components

Already introduced in Part 1, but worth repeating as the guiding rule for everything that follows:

|                    | Server Component                        | Client Component                                      |
| ------------------ | --------------------------------------- | ----------------------------------------------------- |
| **Default?**       | Yes                                     | No — requires `"use client"` at top of file           |
| **Runs where?**    | Server / build time                     | Browser                                               |
| **Can use**        | Files, databases, secrets               | `useState`, `useEffect`, event handlers, browser APIs |
| **Cannot use**     | `useState`, `useEffect`, event handlers | Secrets, direct file/database access                  |
| **JS to browser?** | None                                    | Yes (adds to bundle size)                             |
| **Use when**       | Displaying data, static content         | Interactivity, user input, animation                  |

### 3.7 Creating All Page Stubs

Before writing any of the actual content, let's create our page structure with stub `page.tsx` files for every route (a stub page is a page that exists structurally but has minimal or placeholder content). This lets the site build and navigate without errors from the start.



Create these folders and files:

**`app/(routes)/about/page.tsx`**:
```tsx
const About = () => {
    return <div>About page</div>;
};

export default About;
```

**`app/(routes)/contact/page.tsx`**:
```tsx
const Contact = () => {
    return <div>Contact page</div>;
};

export default Contact;
```

**`app/(routes)/impressum/page.tsx`**:
```tsx
const Impressum = () => {
    return <div>Impressum page</div>;
};

export default Impressum;
```

**`app/(routes)/projects/page.tsx`**:
```tsx
const Projects = () => {
    return <div>Projects page</div>;
};

export default Projects;
```


TODO: Move to when we build the projects page
**`app/(routes)/projects/[slug]/page.tsx`**:
```tsx
// params.slug will hold the actual URL segment, e.g. "generative-art"
type Props = { params: Promise<{ slug: string }> };

const ProjectPage = async ({ params }: Props) => {
    const { slug } = await params;
    return <div>Project: {slug}</div>;
};

export default ProjectPage;
```

│       ├── [slug]/
│       │   └── page.tsx

END TODO:

Now visit `http://localhost:3000/about` — you should see "About page". All routes are wired up even though they contain placeholder content.

**The complete folder structure at this point:**

```
app/
├── (routes)/
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── impressum/
│   │   └── page.tsx
│   └── projects/
│       └── page.tsx
├── globals.css
├── layout.tsx
└── page.tsx
```


---

## 4. Header and Footer

We will build the header and footer in two steps: first as plain HTML with no styling, so the structure is clear and the site compiles. Then we add Tailwind classes.

### 4.1 Header
#### 4.1.1 Header — Plain HTML First

For links in the navigation bar, we are using the  React component [`<Link>`](https://nextjs.org/docs/pages/api-reference/components/link) that extends the HTML <a> element to provide prefetching and client-side navigation between routes. With that page transitions feel instant because the HTML was prefetched.

**`app/components/Header.tsx`**:
```tsx
import Link from "next/link";


const Header = () => {
    return (
        <header>
            {/* Site name — clicking returns to the home page */}
            <Link href="/">[Your Name]</Link>

            {/* Navigation placeholder — we will add HeaderNav here in Part 7 */}
            <nav>
                <Link href="/">HOME</Link>
                <Link href="/projects">PROJECTS</Link>
                <Link href="/about">ABOUT</Link>
                <Link href="/contact">CONTACT</Link>
            </nav>
        </header>
    );
};

export default Header;
```

#### 4.1.2 Wire the Header into the Layout

Update `app/layout.tsx` to include Header.

**`app/layout.tsx`**:
```tsx
import "./globals.css"; // Import global styles so they apply everywhere

//ADD:
import Header from "@/app/components/Header";


// RootLayout wraps every page in the site.
// children is the page currently being rendered.
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode; // Any valid React content
}>) {
    return (
        // lang="en" tells browsers and screen readers the page language
        <html lang="en">
            <body>

                {/* ADD: */}
                <Header />
                 {/* CHANGE: */}
                <main>{children}</main>
                {children} {/* The current page renders here */}
            </body>
        </html>
    );
}
```

### 4.2 Footer

Try to re-create the above steps for an empty (for now) footer without following the tutorial. Use `<footer></footer>`


#### 4.2.1 Footer — Plain HTML First

**`app/components/Footer.tsx`**:
```tsx
const Footer = () => {
    return (
        <footer>
            My Footer
        </footer>
    );
};

export default Footer;
```

Run the dev server. You should now see a plain, unstyled header and footer on every page.




## 5. Tailwind CSS

### 5.1 How Tailwind v4 Works

`create-next-app` already set up Tailwind. Two things happened:

1. `app/globals.css` got `@import "tailwindcss"` — this single line loads the entire Tailwind toolkit.
2. `postcss.config.mjs` was created with the `@tailwindcss/postcss` plugin — PostCSS is the build tool that processes CSS; this plugin runs Tailwind during that processing.

*On a Side Note:* Tailwind v4 needs no `tailwind.config.ts`. It automatically scans every file in the project for class names and includes only the utilities you actually use.

### 5.2 globals.css

`globals.css` is the single CSS file loaded by the root layout. We will add to it gradually — only adding the styles needed for each new feature.

Right now it should contain only:

**`app/globals.css`**:
```css
@import "tailwindcss";
```

That is enough for all Tailwind utility classes to work. As we add components, we will return here and add more.

### 5.3 Tailwind Layers

However, we will already add the following Tailwind layers, which has the CSS cascade in a specific order.

**`app/globals.css`**:
```css
@layer base {
    /* Styles for raw HTML elements: body, h1, p, a, etc.
       These integrate cleanly with Tailwind's CSS reset. */
}

@layer components {
    /* Reusable class names built from Tailwind utilities.
       Define .btn, .main-nav, .site-header here — things used
       across multiple components. */
}

/* Utility classes (generated by Tailwind) are the third layer,
   applied last — they always win over base and components. */
```

We will add content to these layers as we build each feature.



### 5.4 Add Tailwind Styling for Spacing

Now we add Tailwind classes to the layout and components.

Update `app/layout.tsx` with the following body and main content.

**`app/layout.tsx`**:
```tsx
<body className="flex flex-col min-h-screen">
    {/* flex flex-col: stack header, main, footer vertically */}
    {/* min-h-screen: body spans at least the full viewport height */}
    <Header />

    <main className="flex-grow w-full">
        {/* flex-grow: main expands to fill all space between header and footer */}
        {/* w-full: always full width */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[min(90vw,1600px)]">
            {/* mx-auto: centre the content block horizontally */}
            {/* px-*: horizontal breathing room at each breakpoint */}
            {/* max-w-[min(90vw,1600px)]: never wider than 90% of the viewport,
                capped at 1600px on very large screens */}
            {children}
        </div>
    </main>

    <Footer />
</body>
```


#### 5.4.1 What each class does in this example

```tsx
<body className="flex flex-col min-h-screen">
```

* `flex flex-col` turns `<body>` into a vertical stack. Header sits on top, footer on the bottom, main in between — at every screen size.  
* `min-h-screen` ensures the body is at least as tall as the viewport. Without it, a page with little content would have a footer floating in the middle.

```tsx
<main className="flex-grow w-full">
```
* `flex-grow` tells this flex child to claim all remaining vertical space. That pushes the footer to the bottom even on short pages.

```tsx
<div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[min(90vw,1600px)]">
```
* `mx-auto` centres the block by setting equal left/right margins.  
* `px-4 sm:px-6 lg:px-8` is responsive padding: small gap on mobile, more breathing room as the screen grows.  
* `max-w-[min(90vw,1600px)]` caps the width — it can never exceed 90% of the viewport width, and even on a very wide monitor it stops growing at 1600px. The brackets `[...]` are Tailwind's **arbitrary value** syntax for values not in the predefined scale.




### 5.5 Responsive Design in Tailwind

Responsive design in tailwind is implemented with breakpoints. A breakpoint is a screen width at which the layout changes.

In CSS, breakpoints are implemented with @media rules:

```css
/* applies on all screens */
.nav { display: none; }

/* applies at 768px and wider */
@media (min-width: 768px) {
    .nav { display: flex; }
}
```

Tailwind's prefixes (md:, lg:, etc.) are shorthand for exactly these @media rules — md:flex compiles to the block above. You write the condition in the class name instead of a separate CSS file.  
  

| Prefix   | Min-width | Typical target             |
| -------- | --------- | -------------------------- |
| *(none)* | 0px       | mobile (default)           |
| `sm:`    | 640px     | large phone / small tablet |
| `md:`    | 768px     | tablet                     |
| `lg:`    | 1024px    | laptop                     |
| `xl:`    | 1280px    | desktop                    |
| `2xl:`   | 1536px    | wide desktop               |

All breakpoints are min-width — they activate at that width and remain active for everything wider. You can also invert with max-*: prefixes (max-sm:, max-md:, etc.) to target below a breakpoint, but that's rarely needed in mobile-first design.  
  
Tailwind is **mobile-first**: a class without a prefix applies at *all* screen sizes. A prefixed class *overrides* it at that breakpoint and wider.

```
px-4          → applies everywhere (mobile and up)
sm:px-6       → overrides at ≥ 640px
lg:px-8       → overrides at ≥ 1024px
```

The browser reads them left to right, last-matching wins. On a phone you get `px-4`. On a tablet `sm:px-6` is used. On desktop `lg:px-8`.
  

The pattern in plain English:  
> Start with the mobile layout. Use `sm:` and `lg:` prefixes to progressively widen spacing and adjust layout as more screen space becomes available.



### 5.5 Update globals.css with Header/Footer Styles

Add the component-layer definitions for the header and footer classes. These are defined in `@layer components` so individual utility classes can still override them. With `@apply` you can use the Tailwind class names directly (instead of CSS).

**`app/globals.css`**:
```css
@import "tailwindcss";



html {
    scrollbar-gutter: stable;
}

html:focus-within {
    scroll-behavior: smooth;
}

@layer base {
    /* Styles for raw HTML elements: body, h1, p, a, etc.
       These integrate cleanly with Tailwind's CSS reset. */
}


/* --- Components Layer ---------------------------------------------- */
@layer components {

    /* Shared horizontal padding for header and footer */
    .site-header,
    .site-footer {
        @apply px-4 py-2;
    }

    /* The site name in the header — large, bold, tight tracking */
    .site-header-name {
        font-family: var(--font-headers); /* CSS custom property do not work with apply */
        font-weight: 800; /* Could also be written as @apply font-extrabold */
        @apply tracking-tight text-lg sm:text-xl lg:text-2xl;
    }

    .site-header {
        /* sticky: stays visible at the top when the user scrolls */
        /* backdrop-blur: frosted-glass effect when content scrolls under it */
        @apply sticky top-0 z-50 flex items-center justify-between
               bg-white/80 backdrop-blur;
    }

    .site-footer {
        @apply border-t border-gray-300 bg-white;
    }

    .site-footer p {
        @apply text-gray-600 text-sm;
    }

    /* Footer rows: stacked on mobile, inline on sm and above */
    .footer-content {
        @apply flex flex-col gap-1 pl-4
               sm:flex-row sm:justify-between sm:items-center;
    }
}
```

Create a @layer components class when the same combination of styles appears in multiple places. Define it once, use the name everywhere. Or use it if you would like the semantic structuring of a className. 
  
Use inline Tailwind classes (directly in className="") for everything else — which is most things.

A practical rule:
> If you find yourself copying the same group of classes to a second component, that's the moment to extract a class name.



#### 5.5.1 Apply Tailwind New Classes

Update `app/components/Header.tsx` to use the new tailwind `className`s and some further stylings.

**`app/components/Header.tsx`**:
```tsx
import Link from "next/link";

const Header = () => {
    return (
        <header className="site-header">
            <Link href="/" className="site-header-name">
                [Your Name]
            </Link>

            <nav className="flex items-center gap-6">
                <Link href="/" className="text-sm font-medium text-gray-800 hover:text-gray-400">HOME</Link>
                <Link href="/projects" className="text-sm font-medium text-gray-800 hover:text-gray-400">PROJECTS</Link>
                <Link href="/about" className="text-sm font-medium text-gray-800 hover:text-gray-400">ABOUT</Link>
                <Link href="/contact" className="text-sm font-medium text-gray-800 hover:text-gray-400">CONTACT</Link>
            </nav>
        </header>
    );
};

export default Header;
```


Update `app/components/Footer.tsx` to use the new classes.

**`app/components/Footer.tsx`**:
```tsx
const Footer = () => {

    return (
        <footer className="site-footer">
            <div className="footer-content">
                <p>Footer</p>
            </div>
        </footer>
    );
};

export default Footer;
```



The site should now display a styled sticky header and footer. The navigation is visible on medium+ screens and hidden on mobile — we will fix mobile in a later part.


## 6. Navigation

The header currently has an inline `<nav>` with links that only appear on desktop. This section makes it fully responsive: a horizontal row on desktop, a dropdown on mobile.
  
*On a Side Note:* You can toggle in Firefox to mobile mode under `More Tools`  →  `Responsive Design Mode` (learn the hotkey!)
  

---

### 6.1 — Extract The `nav` Into Its Own Component

The inline nav in `Header.tsx` will grow. Move it into a new file now so `Header.tsx` stays readable.

**`app/components/HeaderNav.tsx`**:
```tsx
import Link from "next/link";

const HeaderNav = () => {
    return (
            <nav className="flex items-center gap-6">
                <Link href="/" className="text-sm font-medium text-gray-800 hover:text-gray-400">HOME</Link>
                <Link href="/projects" className="text-sm font-medium text-gray-800 hover:text-gray-400">PROJECTS</Link>
                <Link href="/about" className="text-sm font-medium text-gray-800 hover:text-gray-400">ABOUT</Link>
                <Link href="/contact" className="text-sm font-medium text-gray-800 hover:text-gray-400">CONTACT</Link>
            </nav>
    );
};

export default HeaderNav;
```

Update `app/components/Header.tsx` to import and use it — replace the `<nav>` block.

**`app/components/Header.tsx`**:
```tsx
import Link from "next/link";
import HeaderNav from "./HeaderNav";

const Header = () => {
    return (
        <header className="site-header">
            <Link href="/" className="site-header-name">
                [Your Name]
            </Link>
            <HeaderNav />
        </header>
    );
};

export default Header;
```

Nothing looks different yet in the browser, we have only moved code into its own file.

---

### 6.2 — Replace inline classes with named CSS classes

The nav links have long chains of Tailwind classes repeated four times. Define them once in `globals.css` and use the names in the component instead.

Add to the `@layer components` block.

**`app/globals.css`**:
```css
/* Navigation */
.main-nav {
    @apply hidden md:flex items-center gap-6;
}

.main-nav-link {
    @apply text-sm font-medium text-gray-800 hover:text-gray-400;
}
```

The `hidden md:flex` in .main-nav means:

* below md: the nav links are hidden — only the mobile button shows (we don't have that button yet)
* md and above: the nav links appear as a row — the mobile button is hidden
* If we kept `flex items-center gap-6` without hidden, the desktop nav links and the mobile button would both be visible at the same time on small screens, which is not what you want.

Update `app/components/HeaderNav.tsx` to use the new class names.

**`app/components/HeaderNav.tsx`**:
```tsx
import Link from "next/link";

const HeaderNav = () => {
    return (
        <nav className="main-nav" aria-label="Main navigation">
            <Link href="/" className="main-nav-link">HOME</Link>
            <Link href="/projects" className="main-nav-link">PROJECTS</Link>
            <Link href="/about" className="main-nav-link">ABOUT</Link>
            <Link href="/contact" className="main-nav-link">CONTACT</Link>
        </nav>
    );
};

export default HeaderNav;
```

Same appearance, less repetition, one place to change the link style later.


#### 6.2.1 aria-label

`aria-label` is an HTML attribute that provides a text description of an element for screen readers — assistive software used by people with visual impairments. aria stands for Accessible Rich Internet Applications.  
  
Screen readers announce what an element is when the user focuses it. Without a label, a screen reader might just say "navigation" or "button", which is not helpful when there are multiple of those on the page.

```tsx
<nav aria-label="Main navigation">
```

A screen reader will announce: "Main navigation, navigation landmark" instead of just "navigation".

```tsx
<button aria-label="Close menu">X</button>
```

Without aria-label a screen reader would say "X, button", with it: "Close menu, button".

---

### 6.3 — Add a mobile menu toggle button

On small screens, the desktop nav is hidden. We need a button that opens a dropdown instead. This button needs to track whether the dropdown is open or closed — that is a **state**.

**`useState`** is a React hook for storing a value inside a component. When you update it, React re-renders the component with the new value:

```tsx
const [open, setOpen] = useState(false);
//     ↑          ↑
//current value  function to update it
```

`HeaderNav` needs to run in the browser to respond to button clicks, so it must be a **client component**. Add `"use client"` as the first line.

**`app/components/HeaderNav.tsx`**:
```tsx
"use client"; // ← ADD
/*
  "use client" must be the very first line of the file.
  It marks this module as a Client Component:
  - It is included in the JavaScript bundle sent to the browser.
  - It can use useState, useEffect, and event handlers.
  Without this directive, Next.js renders this on the server,
  where useState and event handlers do not exist.
*/


import { useState } from "react"; // ← ADD: import the state hook
import Link from "next/link";

const HeaderNav = () => {
    
    // open: whether the mobile dropdown is visible.
    // setOpen: the function to update it. Calling setOpen triggers a re-render.
    const [open, setOpen] = useState(false); // ← ADD

    // console.log("open:", open); // ← logs every time the component re-renders

    return (
        <div className="flex items-center gap-4"> {/* ← CHANGED: was <nav>, now a <div> wrapping two children */}

            {/* Desktop nav — unchanged */}
            <nav className="main-nav" aria-label="Main navigation">
                <Link href="/" className="main-nav-link">HOME</Link>
                <Link href="/projects" className="main-nav-link">PROJECTS</Link>
                <Link href="/about" className="main-nav-link">ABOUT</Link>
                <Link href="/contact" className="main-nav-link">CONTACT</Link>
            </nav>

            {/* Mobile toggle — only visible below md breakpoint */}
            {/* ↓ ADD block */}
            <div className="relative md:hidden">
                <button
                    type="button"
                    onClick={() => setOpen(prev => !prev)}
                    className="btn btn-mobile"
                >
                    Menu
                </button>
            </div>

        </div>
    );
};

export default HeaderNav;
```

Summary of changes:
* `"use client"` — required because `useState` only works in the browser
* `useState(false)` — stores whether the menu is open (true) or closed (false)
* The outer `<nav>` became a `<div>` to hold two children: the desktop nav and the new mobile button
* The mobile button calls `setOpen(prev => !prev)` — flips the state between true and false on each click
* `md:hidden` on the button's wrapper hides it on desktop, where the inline nav is shown instead
  
Note: the button does not yet show or hide a dropdown — open is tracked but not yet used. That comes in the next step.

Add the button classes.

**`app/globals.css`**:
```css
.btn {
    @apply inline-flex items-center gap-2 border px-3 py-1
           text-sm text-gray-800
           hover:bg-gray-50 hover:text-gray-400
           focus-visible:outline-none focus-visible:ring-2
           focus-visible:ring-gray-300 cursor-pointer;
}

/* Only shown below the md breakpoint */
.btn-mobile {
    @apply md:hidden;
}
```

Now, a "Menu" button appears on narrow screens. Clicking it does not open anything yet — `open` is `true` or `false`, but nothing renders based on it.

---

### 6.4 — The Dropdown Menu

Update `HeaderNav.tsx` to add the dropdown panel below the button. 
  
We use **conditional rendering** — `{open && <element />}` — meaning the panel exists in the DOM only when `open` is `true`. When `open` is `false`, it is entirely absent, not just hidden.

*On a Side Note:* In JavaScript, && evaluates left to right and stops as soon as it finds a falsy value — when open is false, JavaScript never looks at the right side, so the element is never created. When open is true, evaluation continues and React renders the element.

Add inside the `<div className="relative md:hidden">` block, after the `</button>`.

**`app/components/HeaderNav.tsx`**:
```tsx
{/* {open && <element />}: conditional rendering.
    When open is false the dropdown is absent from the DOM entirely —
    not hidden with CSS, but not there at all. */}
{open && (
    <div id="main-menu" className="menu-panel">
        <nav aria-label="Mobile navigation">
            <ul className="menu-panel-list">
                <li><Link href="/" className="menu-panel-link" onClick={() => setOpen(false)}>Home</Link></li>
                <li><Link href="/projects" className="menu-panel-link" onClick={() => setOpen(false)}>Projects</Link></li>
                <li><Link href="/about" className="menu-panel-link" onClick={() => setOpen(false)}>About</Link></li>
                <li><Link href="/contact" className="menu-panel-link" onClick={() => setOpen(false)}>Contact</Link></li>
            </ul>
        </nav>
    </div>
)}
```

Each link calls `setOpen(false)` on click so the menu closes after navigation.

Add the panel classes.

**`app/globals.css`**:
```css
.menu-panel {
    @apply absolute right-0 mt-2 w-48 border bg-white shadow-lg md:hidden;
}

.menu-panel-list {
    @apply py-1;
}

.menu-panel-link {
    @apply block px-3 py-2 text-sm text-gray-800
           hover:bg-gray-50 hover:text-gray-400;
}
```

The dropdown now opens and closes. We would like to add two more features: pressing Escape and clicking outside should close the menu.


#### 6.4.1 — Close on Escape key

**`useEffect`** is a React hook for running code that has side effects — things outside the render itself, like attaching event listeners to `document`.

It takes two arguments: a function to run, and a **dependency array**. React re-runs the effect whenever a value in the dependency array changes.

Add this effect to `HeaderNav` (after the `useState` line, before `return`).

**`app/components/HeaderNav.tsx`**:
```tsx
import { useState, useEffect } from "react"; // ← CHANGE

// ...

// ADD: 
// Close when the user presses Escape
useEffect(() => {
    // If the menu is closed, there is nothing to listen for.
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);

    // The return value is a cleanup function.
    // React calls it before the next run, and when the component is removed.
    // Without cleanup, listeners pile up with every re-render.
    return () => document.removeEventListener("keydown", onKey);
}, [open]); // [open] dependency array: re-run whenever 'open' changes.
```

---

#### 6.4.2 —  Close on outside click

When the menu is open, a click anywhere outside it should close it. We need to know which DOM elements count as "inside" — the toggle button and the panel itself. **`useRef`** stores a reference to a DOM element. Unlike state, updating a ref does not trigger a re-render.

Add refs and a second effect.

**`app/components/HeaderNav.tsx`**:
```tsx
import { useState, useEffect, useRef } from "react";  // ← CHANGE

// ...

// ADD: 
// useRef stores a reference to a DOM element.
// Changing a ref does NOT re-render — used here to detect outside clicks.
const btnRef = useRef<HTMLButtonElement>(null);
const menuRef = useRef<HTMLDivElement>(null);


// ADD: 
// Close when the user clicks outside the menu
useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
        const target = e.target as Node;
        // If the click was inside the menu or on the toggle button, ignore it
        if (menuRef.current?.contains(target) || btnRef.current?.contains(target)) return;
        setOpen(false);
    };

    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
}, [open]);
```

Then attach the refs to the elements in the JSX.

On the button:

**`app/components/HeaderNav.tsx`**:
```tsx
<button
    ref={btnRef}
    type="button"
    onClick={() => setOpen(prev => !prev)}
    className="btn btn-mobile"
    aria-haspopup="true"
    aria-expanded={open}
    aria-controls="main-menu"
>
```

On the dropdown panel:

**`app/components/HeaderNav.tsx`**:
```tsx
<div ref={menuRef} id="main-menu" className="menu-panel">
```

The three `aria-*` attributes on the button are for screen readers: `aria-haspopup` signals that the button controls a popup, `aria-expanded` reports whether it is currently open, and `aria-controls` links it to the panel by id.

---

#### 6.4.3 — Add a chevron icon

A small visual cue that rotates when the menu opens. Add it inside the button, after the text `Menu`.

**`app/components/HeaderNav.tsx`**:
```tsx
Menu
{/* ADD: */}
{/* Chevron rotates 180° when open — pure CSS transform */}
<svg
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
>
    <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.06 1.06l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
    />
</svg>
```

The Chevron SVG:
* **SVG** is a format for drawing vector graphics directly in HTML.
* This one draws a small downward-pointing arrow (chevron) icon.
    * `viewBox="0 0 20 20"` — the drawing canvas is 20×20 units.  
    * `fill="currentColor"` — the icon inherits the text color of its parent element.  
    * `aria-hidden="true"` — screen readers skip this icon entirely; it is decorative.
* The `<path>` contains the actual shape as a series of drawing instructions (`d="..."` -  the path data was copied from an icon library).

The Rotation
* The className uses a template literal (backtick string) to combine fixed classes with a conditional one.
* `open ? "rotate-180" : ""` is a compact if/else:
    * when open is true → adds rotate-180 (CSS transform: rotate(180deg))
    * when open is false → adds nothing
* `transition-transform` makes the rotation animate smoothly instead of snapping instantly.
  
No JavaScript animation is involved — it is purely CSS reacting to a class being added or removed by React when open changes.


#### 6.4.4 — Refactor: One Link List for Both Menus

Both the desktop `<nav>` and the mobile `<ul>` contain the same four href/label pairs. Any time you want to add a page, you have to add it in two places. The fix is to define the links once and render them twice using `.map()`.

Add a `links` array above the component.

**`app/components/HeaderNav.tsx`**:
```tsx
// ADD above the component:
const links = [
    { href: "/", label: "HOME" },
    { href: "/projects", label: "PROJECTS" },
    { href: "/about", label: "ABOUT" },
    { href: "/contact", label: "CONTACT" },
];
```

Replace the four hardcoded `<Link>` elements in the desktop `<nav>`.

**`app/components/HeaderNav.tsx`**:
```tsx
<nav className="main-nav" aria-label="Main navigation">
    {links.map(({ href, label }) => (
        <Link key={href} href={href} className="main-nav-link">{label}</Link>
    ))}
</nav>
```

Replace the four hardcoded `<li>` elements in the mobile `<ul>`.

**`app/components/HeaderNav.tsx`**:
```tsx
<ul className="menu-panel-list">
    {links.map(({ href, label }) => (
        <li key={href}>
            <Link href={href} className="menu-panel-link" onClick={() => setOpen(false)}>
                {label}
            </Link>
        </li>
    ))}
</ul>
```

`.map()` loops over the array and returns one JSX element per item. The `key` prop is required by React whenever you render a list — it lets React identify which item changed if the list updates. Using `href` as the key works because every href is unique.

Adding a new page now means one extra line in `links` — both menus update automatically.

---

### 6.5 — A "Say Hi" Button

We want a "Say hi!" email button next to the navigation in the header, with a `mailto:` link that opens the visitor's email client with the address and subject pre-filled.

**`app/components/ButtonEmail.tsx`**:
```tsx
import type { ReactNode } from "react";
// "import type" marks this as a type-only import — stripped entirely at
// compile time, never included in the JavaScript bundle.

type ButtonEmailProps = {
    email: string;
    subject?: string;     // optional: pre-filled subject line
    className?: string;   // allows callers to add Tailwind classes
    children?: ReactNode; // the label shown inside the button
};

/*
  Builds a mailto: URL.
  encodeURIComponent encodes spaces and special characters so the URL is valid:
  "Hello from the website" → "Hello%20from%20the%20website".
*/
function buildMailto(email: string, subject?: string) {
    if (!subject) return `mailto:${email}`;
    return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export function ButtonEmail({
    email,
    subject,
    className,
    children = "Say hi!", // default label if none is passed
}: ButtonEmailProps) {
    const href = buildMailto(email, subject);

    return (
        <a
            href={href}
            className={className}
            aria-label={`Email ${email}`}
        >
            {children}
        </a>
    );
}
```


### 6.5.1 — Integrate Button Into Header.tsx

Update `app/components/Header.tsx` to add the email button.

**`app/components/Header.tsx`**:
```tsx
// ADD:
import ButtonEmail from "./ButtonEmail";


//...

// ADD:
{/* Keeping everything on the right side: 
    nav + button grouped together */}
<div className="flex items-center gap-4">
    <HeaderNav />
    <ButtonEmail
        email="hello@example.com"
        subject="Hello from the website"
        className="btn"
    >
        Say hi!
    </ButtonEmail>
</div>

```

The header now shows a responsive nav — inline row on desktop, a dropdown on mobile — and a "Say hi!" button that opens the visitor's email client.





## 7. Footer

Let's put some actual data into the footer.

**`app/components/Footer.tsx`**:
```tsx
const Footer = () => {
    /*
      new Date() runs at build time with output: "export".
      The resulting HTML is frozen at the build date — exactly right
      for a "Last update" notice on a static portfolio.
    */
    const currentYear = new Date().getFullYear();
    const currentDate = new Date().toLocaleDateString("de-DE", {
        year: "numeric",
        month: "short",
    });

    return (
        <footer className="site-footer">
            <div className="footer-content">
                <p>© {currentYear} [Your Name] | <a href="/impressum" className="underline">Impressum</a></p>
                <div className="text-gray-500 text-xs">{`Last update: ${currentDate} | Scraping or use in AI training prohibited.`}</div>
                <p>Made in [Your City] with ❤️</p>
            </div>
        </footer>
    );
};

export default Footer;
```

The middle line uses Tailwind utility classes directly — `text-gray-500 text-xs` — rather than a separate component, since this styling is only needed in one place.








---

## 8. The Home Page

As of now home page has three sections stacked vertically (of course you can change that eventually):

1. A short intro sentence
2. A "hero canvas", which for now is an image but could also be a glsl shader, a three.js or p5 element.
3. A title and paragraph below the canvas (`HeroSectionText`)

First we are going to build the overall structure of the page, and then refine its styling.

### 8.1 Components
### 8.1.1 Utility Components

Add the following new class to the `@layer components` block.

**`app/globals.css`**:
```css
    /* Centred flex container — full-width row with responsive top padding */
    .content-center {
        @apply flex items-center justify-center w-full pt-3 sm:pt-6 lg:pt-10;
    }

```

This creates a full-width horizontal centering container with responsive top padding, which we will use for some of the elements.

* `flex items-center justify-center` — centres its child both horizontally and vertically within the flex container
* `w-full` — spans the full available width
* `pt-3 sm:pt-6 lg:pt-10` — top padding that grows with screen size: small on mobile, medium on tablet, large on desktop


**`app/components/HeroTitle.tsx`**:

```tsx
/*
  Large page-level h1. text-balance makes all lines roughly equal width.
  The actual font size comes from the h1 rule in globals.css (clamp fluid type).
*/
const HeroTitle = ({ text }: { text: string }) => {
    return (
        <div className="relative w-full">
            <h1 className="text-left text-balance">{text}</h1>
        </div>
    );
};

export default HeroTitle;
```


**`app/components/HeroImage.tsx`**:

```tsx

import Image from "next/image";

type HeroImageProps = {
    src: string;
    alt: string;
    priority?: boolean;
};

const HeroImage = ({ src, alt, priority = false }: HeroImageProps) => {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover"
        />
    );
};

export default HeroImage;
```

`next/image` is Next.js's built-in image component. It wraps the standard HTML <img> tag and adds:
* Automatic sizing — with fill, the image stretches to fit its parent container
* Lazy loading — images below the fold are not loaded until the user scrolls to them
* Format optimisation — serves modern formats (WebP, AVIF) to browsers that support them
  

* The `alt` prop is required, it describes the image for screen readers and is shown if the image fails to load.  
* `fill` makes the image stretch to cover its parent container completely in both width and height. But for this to work, the parent container must have `position: relative` and explicit dimensions for fill to work.
* `priority` tells the browser to load this image as fast as possible. The prop defaults to `false` — only pass `priority` when the image is the first thing visible on the page (the LCP element), because unnecessarily prioritising images below the fold hurts performance.
  
With these utility components in place, we further put together in the following.

### 8.1.2 Combining Components

**`app/components/HeroSectionText.tsx`**:
```tsx
import HeroTitle from "./HeroTitle";

type HeroSectionTextProps = {
    title: string;
    text: string;
};

const HeroSectionText = ({ title, text }: HeroSectionTextProps) => {
    return (
        <section className="relative w-full">
            <HeroTitle text={title} />
            <div className="content-center">
                <p>{text}</p>
            </div>
        </section>
    );
};

export default HeroSectionText;
```
  

**`app/components/HeroCanvas.tsx`**:
```tsx
/*
  h-[50vh]: 50% viewport height.
  overflow-hidden: clips the canvas if it overflows.
  relative: positioning context so the ShaderCanvas can use absolute inset-0.
*/
const HeroCanvas = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="relative w-full h-[50vh] overflow-hidden">
            {children}
        </section>
    );
};

export default HeroCanvas;
```

### 8.2 Putting the Components on the Home Page

Now, we are using the newly created components to put the HOME page together.

**`app/page.tsx`**:
```tsx
import HeroSectionText from "@/app/components/HeroSectionText";
import HeroImage from "@/app/components/HeroImage";
import HeroCanvas from "@/app/components/HeroCanvas";

const Home = () => {
    return (
        <>
            <div className="content-center py-4 sm:py-6 lg:py-10">
                <p className="intro">[One sentence capturing what you do.]</p>
            </div>
            <HeroCanvas>
                <HeroImage
                    src="/img/home/home-hero.jpg"
                    alt="[Description of the image]"
                    priority
                />
            </HeroCanvas>
            <HeroSectionText
                title="[YOUR TITLE]"
                text="[A short paragraph introducing your field or practice.]"
            />
        </>
    );
};

export default Home;
```

The Image Ratio:
* The container is 100vw × 50vh with object-cover, so the image is cropped to fit that area across all screen sizes. The critical thing is that the subject stays visible after cropping.
* 16:9 is the closest standard ratio to a typical viewport at 50vh, and works well. In practice, anything wider than tall — 16:9, 3:2 landscape, 2:1 — is fine since object-cover will crop the sides on very wide screens or the top/bottom on narrow ones. Make sure the main subject is centred so it survives both crops.




### 8.3 Styling

For the needed styling, we use `@layer base`, and with that we target HTML elements directly (`body`, `h1`, `p`, etc.) rather than creating class names. These styles apply globally — every `<h1>` on every page automatically gets the same font size and weight without needing a class added to it.

This is appropriate for elements that should always look the same everywhere. For styles that only apply in specific contexts, we use `@layer components` with class names instead.

**`app/globals.css`**:
```css
@import "tailwindcss";



/* Prevent layout shift when scrollbar appears/disappears between pages */
html {
    scrollbar-gutter: stable;
}

/* Smooth scroll for anchor links — only when something is focused
   to avoid slowing down keyboard navigation */
html:focus-within {
    scroll-behavior: smooth;
}

/* --- Base Layer ---------------------------------------------------- */
@layer base {

    /* Prevent touch-scroll gestures from interfering with the WebGL canvas */
    canvas {
        touch-action: none;
    }

    body {
        font-weight: 300;         /* Light weight as the default body font */
        font-feature-settings: 'rlig' 1, 'calt' 1; /* Enable ligatures and contextual alternates */
        background-color: white;
    }

    h1, h2, h3 {
        font-weight: 800;         /* Extra bold headings */
        overflow-wrap: anywhere;  /* Break very long words rather than overflow */
    }

    /*
      Fluid type: font-size scales with viewport width between 1rem and 10rem.
      clamp(min, preferred, max)
    */
    h1 {
        @apply leading-none;
        font-size: clamp(1rem, 8vw + 0.3rem, 10rem);
    }

    h2 {
        @apply text-3xl sm:text-4xl lg:text-6xl leading-tight;
    }

    h3 {
        @apply text-xl sm:text-2xl lg:text-4xl leading-tight;
    }

    /* Consistent vertical padding on every section, growing with screen size */
    section {
        @apply p-3 sm:p-6 lg:p-12;
    }

    p {
        @apply text-base leading-relaxed text-left sm:text-lg lg:text-xl lg:leading-loose;
        max-width: 66ch; /* ~66 characters per line — optimal reading width */
        hyphens: auto;   /* Break long words at syllable boundaries */
    }

    /* Variant for intro/hero paragraphs — tighter leading, balanced line wrapping */
    p.intro {
        @apply leading-tight text-left text-balance;
    }
}


/* ... */

```

The home page is now complete. Later we could replace the HeroImage with a shader component, for example.

---

## 9. The About Page - Overview

The About page serves two purposes: a quick introduction about yourself on first sight, and deeper background, e.g. your CV, grants, publications, for those want to know more about you.

For that, the page has two visual sections:
1. A portrait image with introductory text alongside it (`HeroSectionTextImage`)
2. A collapsible accordion showing the CV sections (`AccordionAbout`)

We start with building the first part with a text and image.


### 9.1 TextImageBox Component

The top of the about page shows a portrait image with text flowing beside it.

**`app/components/TextImageBox.tsx`**:
```tsx
import Image from "next/image";

// Export the type so HeroSectionTextImage can reuse it
export type TextImageProps = {
    text: string;
    src: string;
    alt: string;
    priority?: boolean; // set true when this image is the LCP element
};

/*
  Float-based image + text layout.
  On md+ screens the image floats left and text fills the space to its right.
  On small screens the float is not applied — the image sits above the text.
*/
const TextImageBox = ({ text, src, alt, priority = false }: TextImageProps) => {
    return (
        <section className="overflow-hidden">
            {/* Float the image left on md+ screens, stack on mobile */}
            {/* overflow-hidden creates a block formatting context that contains the float */}
            <div className="md:float-left md:mr-12 mb-6 md:w-[300px] lg:w-[380px]">
                <Image
                    src={src}
                    alt={alt}
                    width={800}   // source image resolution (not display size)
                    height={800}
                    className="w-full h-auto object-cover rounded-sm"
                    priority={priority}
                />
            </div>
            <p className="p-2 md:max-w-[70ch] xl:max-w-[100ch]">{text}</p>
        </section>
    );
};

export default TextImageBox;
```

### 9.2 HeroSectionTextImage Component

This component composes `HeroTitle` and `TextImageBox` — the same pattern as `HeroSectionText` but with an image.

**`app/components/HeroSectionTextImage.tsx`**:
```tsx
import HeroTitle from "./HeroTitle";
import TextImageBox, { TextImageProps } from "./TextImageBox";

type HeroSectionTextImageProps = {
    title: string;
} & TextImageProps;
/*
  The & operator intersects two types.
  HeroSectionTextImageProps has title plus everything in TextImageProps
  (text, src, alt) — without repeating those fields here.
*/

const HeroSectionTextImage = ({ title, text, src, alt, priority }: HeroSectionTextImageProps) => {
    return (
        <section className="relative w-full">
            <HeroTitle text={title} />
            <TextImageBox text={text} src={src} alt={alt} priority={priority} />
        </section>
    );
};

export default HeroSectionTextImage;
```


### 9.3 Putting It Together

**`app/(routes)/about/page.tsx`**:
```tsx
import HeroSectionTextImage from "@/app/components/HeroSectionTextImage";

const About = () => {
    return (
        <>
            {/* Top section: portrait image + introductory text */}
            <HeroSectionTextImage
                title="[Your Name]"
                text="[Your personal introduction — interests, practice, professional focus.]"
                src="/img/portrait.jpg"
                alt="Portrait of [Your Name]"
                priority
            />

        </>
    );
};

export default About;
```

Add your portrait photo at `public/img/portrait.jpg`. The `public/` folder is served at the root URL — `src="/img/portrait.jpg"` maps directly to that file path on disk.




## 10. The About Page - Details in an Accordion Stack

So far, every page in this project has its content written directly in TypeScript — as strings passed to components as props, or as JSX elements. That works fine for short, stable text. But a CV is different: it is long, structured, and changes regularly. Writing and maintaining it as JSX would be tedious.

This is where **MDX** comes in. MDX is a file format that lets you write content in plain **Markdown**, meaning in the same lightweight syntax used in README files and documentation. The difference is that MDX also understands JSX, so you can embed React components wherever you need them. This means your content stays readable and easy to edit, while React components handle the structure wherever you need it.

A `.mdx` file might look like this:

```mdx
export const metadata = { title: "Vita" }

## Professional Experience

I am a Creative Technologist at [Company].

* Project A
* Project B
```

The `export const metadata` line at the top is JavaScript and it exports structured data (here, a title) that the parent component can read. Everything below is plain Markdown that MDX compiles into React components automatically.

For our about page we use MDX in two ways:
- Each CV section (Vita, Thematic Focus, Grants, Publications) lives in its own `.mdx` file
- A React accordion component wraps each file and makes it collapsible

This separation means that editing the content for your About page implies editing a `.mdx` file, not touching any source code of the page.

### 10.1 Installing MDX Support

Install three packages:

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
```

What each does:
- `@next/mdx` — wires MDX into the Next.js build pipeline
- `@mdx-js/loader` — the Turbopack loader that compiles `.mdx` files into React components
- `@mdx-js/react` — the React-side MDX runtime

#### 10.1.1 Configuring next.config.ts

We need to tell Next.js that .mdx files should be treated as pages/components. While we're editing the config file, we'll also set output: "export", which tells Next.js to generate plain HTML/CSS/JS files that can be hosted without a server. The two settings are unrelated; it's just convenient to add both at once.

**`next.config.ts`**:
```ts
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// createMDX returns a wrapper function that adds MDX support to Next.js.
// remark and rehype plugins can be added here later if needed.
const withMDX = createMDX({});

const nextConfig: NextConfig = {
    reactStrictMode: true,

    /*
      output: "export" compiles the entire site to static files at build time.
      The result is an out/ folder with plain HTML, CSS, and JS — no server needed.
      Trade-off: server-only features (API routes, image optimisation) are unavailable.
    */
    output: "export",

    /*
      Treat .md and .mdx files as valid page/component files,
      in addition to the default .ts and .tsx.
    */
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

    images: {
        /*
          Next.js image optimisation requires a running server.
          With static export we disable it — images are served as-is.
        */
        unoptimized: true,
    },
};

// Wrap nextConfig with MDX support and export the result
export default withMDX(nextConfig);
```


#### 10.1.2 mdx-components.tsx

Next.js requires a file named `mdx-components.tsx` at the project root when using `@next/mdx`. It lets you override how MDX renders standard Markdown elements (headings, paragraphs, links, etc.). For now we leave everything as default.

**`mdx-components.tsx`**:
```tsx
import type { MDXComponents } from 'mdx/types';

// components: the default renderers MDX uses for each Markdown element
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components, // keep all defaults
        // Override specific elements when needed, for example:
        // h2: (props) => <h2 className="text-2xl font-bold mt-8" {...props} />
    };
}
```

#### 10.1.3 mdx.d.ts — Type Declarations

TypeScript does not know what to expect when you import a .mdx file as there's no built-in type for it. The declaration file tells TypeScript to treat any .mdx import as a React component.

**`mdx.d.ts`**:
```ts
declare module "*.mdx" {
    import type { ComponentType } from "react";

    // The default export of any .mdx file is a React component —
    // render it with <Component /> just like any other component.
    const MDXComponent: ComponentType<any>;
    export default MDXComponent;

    // MDX files can also export named values (like metadata).
    // We declare the shape of the metadata object we will use.
    export interface MDXMetadata {
        title: string;
    }

    export const metadata: MDXMetadata;
}
```

* `.d.ts` is the extension for a TypeScript declaration file and TypeScript recognizes this extension specifically and knows the file contains only type information. 
    * The tsconfig.json in the project has an include field (or defaults) that tells TypeScript which files to scan.
* mdx.d.ts — the mdx prefix is just a human-readable name, it has no special meaning to TypeScript. 

Without this file, TypeScript would show a red error on every MDX import.

#### 10.1.4 Typography Plugin

`@tailwindcss/typography` is an official Tailwind plugin that adds a single prose class. Apply prose to a container and it automatically styles all HTML elements inside it, e.g., headings get sizes, paragraphs get spacing, lists get bullets, links get underlines, and so on.

Normally with Tailwind you add utility classes directly to your JSX, like <h2 className="text-xl font-bold">. That works when you write the JSX yourself. But MDX compiles Markdown into HTML automatically, you never write those <h2> or <ul> tags directly, so there's nowhere to attach Tailwind classes. However at the same time, Tailwind injects its own CSS reset that overrides and neutralizes the browser defaults, so they no longer have any visible effect. By default also, from our MDX compiled HTML, which would render completely unstyled. Wrapping the MDX output in a prose container fixes this as it restyles all the generated HTML elements by tag name, without you needing to touch each one individually.


Install it:

```bash
npm install @tailwindcss/typography
```

Add one line directly after the Tailwind import.

**`app/globals.css`**:
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

The plugin adds `prose` utility classes we will apply to the accordion content later.


### 10.2 The MDX Files

Create the folder `app/(routes)/about/content/` and add the following three files.

**`vita.mdx`**:

```mdx
export const metadata = { title: "Vita" }

## TEXTUAL CV

*For programs, announcements, and similar contexts:*

[Your Name] is a [position] at [Institution].

---

## TABULAR CV

### Professional Experience

<table>
  <thead>
    <tr>
      <th>Position</th><th>Period</th><th>Institution</th><th>Location</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>[Title]</strong></td>
      <td>[MM/YYYY–now]</td>
      <td>[Institution]</td>
      <td>[City, Country]</td>
    </tr>
  </tbody>
</table>
```

A few things to notice:
* `export const metadata` at the top is JavaScript, not Markdown. MDX allows both in the same file!
* The `---` is a Markdown horizontal rule
* The `<table>` block is raw HTML. You can drop plain HTML anywhere in an .mdx file and it passes through as-is to the browser.



**`topics.mdx`**:
```mdx
export const metadata = { title: "Thematic Focus" }

The following topics reflect my focus.

* [Primary area, e.g. Computer Graphics]
* [Secondary area, e.g. Generative AI]
* [Another focus, e.g. Human-Computer Interaction]
```

**`grants.mdx`**:
```mdx
export const metadata = { title: "Grants and Projects" }

<table>
  <thead>
    <tr><th>Grant</th><th>Project</th><th>Period</th><th>Role</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>[Funding Body]</strong></td>
      <td>[Project Title]</td>
      <td>[YYYY–YYYY]</td>
      <td>[Your role]</td>
    </tr>
  </tbody>
</table>
```

**`publications.mdx`**:
```mdx
export const metadata = { title: "Publications" }

[Last], [First]. [YYYY]. <a href="[DOI]" target="_blank" rel="noopener noreferrer">[Title]</a>. *[Venue].*
```

---
### 10.3 The Accordion


#### 10.3.1 The AccordionEntry Skeleton

We present all biographical details in an accordion, which is a list of collapsible sections. Clicking a header expands that section's content and closes whichever section was open before, so only one is visible at a time.

Technically, we create an `AccordionAbout` parent component that manages the open/closed state, and an `AccordionEntry` component that renders a single collapsible section. `AccordionAbout` maps over a sections array to produce one `AccordionEntry` per MDX file. `AccordionEntry` is a controlled component — it does not manage its own open/closed state. Instead, the parent owns the state and passes down which index is currently open. `AccordionEntry` only receives that value and reports back when the user clicks.

Start by creating the file with the type definition and an empty component body.  

**`app/components/AccordionEntry.tsx`**:
```tsx
"use client";

import { ReactNode } from "react";

// Props this component receives from its parent (AccordionAbout)
type AccordionEntryProps = {
    title: string;
    index: number;                     // this entry's position in the list
    openIndex: number | null;          // which index the parent says is open (null = none)
    onToggle: (index: number) => void; // callback: report back to the parent when clicked
    children: ReactNode;               // the MDX content rendered inside
};

// AccordionEntry is a controlled component — it does not track its own open/closed state.
// The parent (AccordionAbout) owns the state and passes it down via openIndex.
const AccordionEntry = ({ title, index, openIndex, onToggle, children }: AccordionEntryProps) => {
    return (
        <div className="border-b border-gray-300">
            {/* content added in the next step */}
        </div>
    );
};

export default AccordionEntry;
```

#### 10.3.2 The Toggle Button

Add the `isOpen` variable and the clickable header button.

**`app/components/AccordionEntry.tsx`**:
```tsx
"use client";

import { ReactNode } from "react";

type AccordionEntryProps = {
    title: string;
    index: number;
    openIndex: number | null;
    onToggle: (index: number) => void;
    children: ReactNode;
};

const AccordionEntry = ({ title, index, openIndex, onToggle, children }: AccordionEntryProps) => {


    // ADD:
    // This entry is open when its own index matches the one the parent says is open
    const isOpen = openIndex === index;

    return (
        <div className="border-b border-gray-300">


            {/* ADD: */}
            {/* Clicking the button reports this entry's index back to the parent via onToggle */}
            <button
                onClick={() => onToggle(index)}
                className={
                    "w-full flex justify-between items-center py-3 px-4 transition-colors " +
                    (isOpen
                        ? "bg-gray-100 font-medium rounded-t-sm border-b border-gray-300"
                        : "bg-transparent hover:bg-gray-50 rounded-sm")
                }
            >
                <span>{title}</span>
                {/* Minus when open, plus when closed */}
                <span className="text-2xl leading-none">{isOpen ? "−" : "+"}</span>
            </button>
            
            {/*
              && short-circuit: the article only exists in the DOM when isOpen is true.
              Unlike CSS display:none, the content is completely absent when closed.
            */}
            {isOpen && (
                <article className="py-3 px-4 bg-gray-50 rounded-b-lg">
                    {children}
                </article>
            )}

        </div>
    );
};

export default AccordionEntry;
```



#### 10.3.3 AccordionAbout Skeleton

`AccordionAbout` is the parent that owns the open/closed state and renders one `AccordionEntry` per MDX file. Start by setting up the imports and the `sections` data array.

**`app/components/AccordionAbout.tsx`**:
```tsx
"use client";

import { useState } from "react";
import AccordionEntry from "@/app/components/AccordionEntry";

// Temporary placeholder data — will be replaced with MDX imports
const data: Array<{ title: string; content: string }> = [
    { title: "Test 1", content: "Coming soon." },
    { title: "Test 2", content: "Coming soon." },
];

const AccordionAbout = () => {
    // null = no section open; a number = that section's index is open
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        // If the clicked section is already open, close it — otherwise open it
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative w-full mb-6 px-3 sm:px-6 lg:px-12 text-left">
            {/*
              Map over data to render one AccordionEntry per item.
              key={index} is required by React to track list items efficiently.
            */}
            {data.map(({ title, content }, index) => (
                <AccordionEntry
                    key={index}
                    title={title}
                    index={index}
                    openIndex={openIndex}  // tells this entry whether it is open
                    onToggle={toggle}      // called when the user clicks this entry
                >
                    <p>{content}</p>
                </AccordionEntry>
            ))}
        </section>
    );
};

export default AccordionAbout;
```

`data.map(...)` iterates over the data array and returns one `<AccordionEntry>` for each item. The result is an array of JSX elements that React renders as siblings. Breaking down the individual parts:
`({ title, content }, index)`
* The callback receives two arguments: the current array item and its position number. The item is destructured immediately — instead of writing item.title and item.content, you unpack both into named variables in the function signature.

`index`
* The position of the current item in the array (0, 1, 2, …). It is used in three places:
* key={index} — required by React to track each item in the list efficiently when re-rendering
    * `index={index}` — tells AccordionEntry its own position
    * `openIndex={openIndex}` — the entry compares its index against openIndex to decide whether it is open

`=> (...)`
* Parentheses instead of curly braces mean the arrow function implicitly returns whatever is inside — no return keyword needed. In this case this is an AccordionEntry.

`<AccordionEntry ...> <p>{content}</p> </AccordionEntry>`
* The JSX placed between the opening and closing tags becomes the children prop inside AccordionEntry, which renders it as the collapsible content.



#### 10.3.4 Update the About Page

**`app/(routes)/about/page.tsx`**:
```tsx

// ADD:
import AccordionAbout from "@/app/components/AccordionAbout";
import HeroSectionTextImage from "@/app/components/HeroSectionTextImage";

const About = () => {
    return (
        <>
            {/* Top section: portrait image + introductory text */}
            <HeroSectionTextImage
                title="[Your Name]"
                text="[Your personal introduction — research interests, practice, professional focus.]"
                src="/img/about/portrait.jpg"
                alt="Portrait of [Your Name]"
            />

            {/* ADD: */}
            {/* CV accordion — content comes from the .mdx files */}
            <AccordionAbout />
        </>
    );
};

export default About;
```

You should have two accordion entries with the temporary data now.






#### 10.3.5 Load MDX data into AccordionAbout

The accordion works with placeholder data. Now we replace it with real MDX content. Three things change in `AccordionAbout.tsx`:

1. The placeholder `sections` array is replaced with imports from the four `.mdx` files.
2. The `sections` type changes from `{ title: string; content: string }` to `{ title: string; Component: ComponentType }` — each entry now holds a React component rather than a plain string.
3. In the render, `<p>{content}</p>` becomes `<Component />` — the MDX file itself is rendered as a React component.

**`app/components/AccordionAbout.tsx`**:
```tsx
"use client";

import { useState, type ComponentType } from "react";
import AccordionEntry from "@/app/components/AccordionEntry";


// CHANGE
// Import each MDX file as both a React component (default) and its metadata (named)
import Vita, { metadata as vitaMetadata }
    from "@/app/(routes)/about/content/vita.mdx";
import Topics, { metadata as topicsMetadata }
    from "@/app/(routes)/about/content/topics.mdx";
import Grants, { metadata as grantsMetadata }
    from "@/app/(routes)/about/content/grants.mdx";
import Publications, { metadata as publicationsMetadata }
    from "@/app/(routes)/about/content/publications.mdx";

/*
  Pair each MDX component with its title from the metadata.
  ComponentType is a built-in React type for any valid React component function.
  To add a new CV section: import the .mdx file above and add one entry here.
*/
const sections: Array<{ title: string; Component: ComponentType }> = [
    { title: vitaMetadata.title,         Component: Vita },
    { title: topicsMetadata.title,       Component: Topics },
    { title: grantsMetadata.title,       Component: Grants },
    { title: publicationsMetadata.title, Component: Publications },
];

const AccordionAbout = () => {
    // null = no section open; a number = that section's index is open
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        // If the clicked section is already open, close it — otherwise open it
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative w-full mb-6 px-3 sm:px-6 lg:px-12 text-left">
            {/*
              Map over sections to render one AccordionEntry per item.
              key={index} is required by React to track list items efficiently.
            */}

            {/* CHANGE */}
            {sections.map(({ title, Component }, index) => (

                <AccordionEntry
                    key={index}
                    title={title}
                    index={index}
                    openIndex={openIndex}  // tells this entry whether it is open
                    onToggle={toggle}      // called when the user clicks this entry
                >
                
                    {/* CHANGE */}
                    {/* Render the MDX file as a React component */}
                    <Component />
                </AccordionEntry>
            ))}
        </section>
    );
};

export default AccordionAbout;
```

The accordion should now show four entries with the titles from the MDX metadata. The content will be visible when expanded, but the typography will look bad. That is fixed next.

#### 10.3.6 Style the Content Area

Tailwind's reset stripped the browser's default typography styles from the rendered Markdown. The `@tailwindcss/typography` plugin's `prose` class restores them. Update the `<article>` element.

**`app/components/AccordionEntry.tsx`**:
```tsx
{isOpen && (
    /*
      prose: restores heading sizes, list bullets, and paragraph spacing
             that Tailwind's reset stripped from the Markdown-rendered HTML.
      about-table: our custom class for responsive table layout (added in 10.3.7).
      [&_tr]:border-gray-300: Tailwind arbitrary variant — targets <tr> elements
             inside this article without writing a separate CSS rule.
      prose-*: modifier classes that fine-tune prose font sizes and spacing.
    */

    /* CHANGE: */
    <article className="
        about-table
        [&_tr:last-child]:border-b [&_tr]:border-gray-300
        prose prose-neutral max-w-none py-3 px-4 bg-gray-50 rounded-b-lg
        prose-p:text-sm prose-p:leading-snug prose-p:max-w-none
        prose-li:text-sm prose-li:leading-snug
        prose-h2:text-base prose-h3:text-base
        prose-h2:mt-10 prose-h3:mt-8
        hyphens-auto pb-12
    ">
        {children}
    </article>
)}
```
- `about-table` — our custom CSS class that handles responsive table layout on mobile (defined in globals.css)
- `[&_tr:last-child]:border-b [&_tr]:border-gray-300` — adds a gray bottom border to every table row; `[&_tr:last-child]` targets the last row specifically to close the bottom edge
- `prose prose-neutral max-w-none py-3 px-4 bg-gray-50 rounded-b-lg` — enables typography plugin styles with neutral colors; `max-w-none` removes the default max-width prose applies; adds padding and a light gray background with rounded bottom corners
- `prose-p:text-sm prose-p:leading-snug prose-p:max-w-none` — makes paragraph text small with tight line height; overrides any max-width on paragraphs
- `prose-li:text-sm prose-li:leading-snug` — same small size and tight line height for list items
- `prose-h2:text-base prose-h3:text-base` — reduces `<h2>` and `<h3>` to base font size so headings don't dominate in the compact accordion layout
- `prose-h2:mt-10 prose-h3:mt-8` — adds top margin above headings to separate CV sections visually
- `hyphens-auto pb-12` — enables automatic word hyphenation for long words in narrow columns; adds bottom padding so content doesn't feel cut off


Headings, lists, and paragraph spacing should now look correct inside each expanded section.

#### 10.3.7 Responsive Table Styles

On small screens, tables with many columns no longer fit side-by-side. Add the following inside the `@layer base` block to collapse table rows into vertical blocks on mobile.

**`app/globals.css`**:
```css
/* Collapse tables into stacked rows on small screens */
@media (max-width: 768px) {
    .about-table table,
    .about-table thead,
    .about-table tbody,
    .about-table th,
    .about-table td,
    .about-table tr {
        display: block;
        width: 100%;
    }

    /* Hide the header row — column names become redundant when stacked */
    .about-table thead { display: none; }

    .about-table tr {
        margin-bottom: 0.75rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 0.5rem;
        background-color: #ffffff;
    }

    .about-table td {
        padding: 0.1rem 0;
        line-height: 1.2;
    }

    /* First cell acts as a label — make it stand out */
    .about-table td:first-child {
        font-weight: 600;
        font-size: 0.9rem;
        margin-bottom: 0.2rem;
    }
}
```


---

## 11. Impressum

German law requires websites to display a legal notice (Impressum).  

**`app/(routes)/impressum/page.tsx`**:
```tsx
import Image from "next/image";

const Impressum = () => {
    return (
        <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12 lg:py-16">
            <h1>Impressum</h1>

            <h3 className="mt-8">(Legal Notice)</h3>
            <p className="mt-8">
                <strong>[Your Name]</strong><br />
                [Street Address]<br />
                [Postal Code] [City]<br />
                [Country]
            </p>

            <p>
                E-mail:{" "}
                {/* Email shown as an image to prevent scraping by bots */}
                <Image
                    src="/img/contact/email_01.png"
                    alt="Email address"
                    width={120}
                    height={120}
                    className="w-42 sm:w-50 md:w-58 ml-4 h-auto inline-block"
                />
            </p>

            <h3 className="mt-8">Responsible under § 18 (2) MStV</h3>
            <p className="mt-8">
                [Your Name]<br />
                (address as above)
            </p>

            <h3 className="mt-8">Disclaimer</h3>
            <p className="mt-8">
                I do not assume any liability for the content of external links. The operators of the linked pages are solely responsible for their content.
            </p>

            <h3 className="mt-8">Terms of Use</h3>
            <p className="mt-8">
                The content of this website may not be accessed, copied, or used for the purposes of training machine learning models or automated data mining.
            </p>
        </div>
    );
};

export default Impressum;
```

Create a small screenshot of your email address (approximately 200–250 px wide), save it as `public/img/contact/email_01.png`. Showing the email as an image rather than text prevents email-harvesting bots from reading it.

---

## 12. Contact

The contact page uses icons from [Lucide React](https://lucide.dev/). Lucide React is an open-source icon library that provides icons as React components. Instead of managing SVG files manually or using an icon font, you import individual icons directly:

`import { ChevronDown } from "lucide-react";`

This approach has several advantages:
* Tree-shaking — only the icons you actually import end up in the final bundle, not the entire library
* Consistent sizing and style — all icons share the same design language and accept the same props (size, strokeWidth, className) so they scale and align predictably with text
* No SVG boilerplate — instead of copying and maintaining raw SVG markup, each icon is a self-contained component
* Tailwind-friendly — you can style icons with Tailwind classes directly via className, just like any other element


Install it:

```bash
npm install lucide-react
```

**`app/(routes)/contact/page.tsx`**:
```tsx
// Mail, Phone, MapPin are Lucide React icon components — each renders as an inline SVG.
// Props like h-5 w-5 and text-gray-700 are standard Tailwind classes applied directly
// to the SVG element, controlling size and color without any extra wrapper.
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import HeroTitle from "@/app/components/HeroTitle";

const Contact = () => {
    return (
        <>
            <section className="relative w-full">
                <HeroTitle text="Contact" />
            </section>
        <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12 lg:py-16">

            <p className="text-base italic sm:text-lg lg:text-xl leading-relaxed mb-6 py-4">
                If you would like to discuss a project, ask for a talk, or simply say hello, send me a message!
            </p>

            {/*
              Email is displayed as an image rather than plain text to prevent
              bots from scraping the address. The Mail icon acts as a visual label.
            */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                <Mail className="h-5 w-5 text-gray-700" />
                <span className="font-medium">Email:</span>
                <Image
                    src="/img/contact/email_01.png"
                    alt="Email address"
                    width={120}
                    height={120}
                    className="w-36 sm:w-44 md:w-52 h-auto"
                />
            </div>

            {/* tel: opens the phone dialler on mobile devices */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                <Phone className="h-5 w-5 text-gray-700" />
                <a
                    href="tel:+490000000000"
                    className="text-gray-800 hover:text-gray-500 underline-offset-2 hover:underline"
                >
                    +49 000 0000000
                </a>
            </div>

            {/*
              items-start keeps the icon aligned to the first line of text
              rather than vertically centred against the whole address block.
              mt-0.5 nudges the icon down slightly to optically align it with
              the text baseline.
            */}
            <div className="flex items-start gap-2 sm:gap-3 mt-4">
                <MapPin className="h-5 w-5 text-gray-700 mt-0.5" />
                <div className="space-y-0.5 text-gray-800">
                    <p>[Institution Name]</p>
                    <p>[Street Address]</p>
                    <p>[Postal Code] [City]</p>
                    <p>[Country]</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default Contact;
```

---

## 13. Projects

The Projects section has three parts that work together:

**A listing page** (`/projects`) that shows all projects as cards. The page itself is a Server Component — it reads the data at build time. Interactive category filtering is handled by a separate Client Component that the listing page renders as a child.

**Dynamic detail pages** (`/projects/[slug]`) — one page per project, pre-generated at build time. `generateStaticParams` tells Next.js which slugs exist so it can render one HTML file per project. Each detail page displays an intro image and text from the data layer, plus longer written content from an MDX file.

**Shared components**: `ProjectCard` (thumbnail, description, and link — used in the listing grid) and `ProjectImageGallery` (an asymmetric four-image grid — used in each detail page).

The data flows like this: `app/(routes)/projects/projects.ts` is the single source of truth. The listing page reads `projects` and `categories` from it and passes them to `ProjectCategoryFilter`. The detail page reads `projects` to find the current project by slug and renders the matching MDX component directly from the project object.

We build this in layers: first get both routes working with minimal placeholder content so you can verify the navigation, then fill each page with its full components, and add category filtering last.

### 13.1 Data Layer

Each project lives entirely in a single MDX file — all structured data (title, slug, category, images) is exported as `metadata`, and the long-form prose content (Context, Process, Results) is the body of the file. `projects.ts` imports from these MDX files and assembles the `projects` array. This way there is only one file to edit per project.

*On a Side Note*: The About MDX files work differently — they export only a title and have no structured data. Projects need richer metadata because the listing page, the category filter, and the detail page all read different fields from the same project object.

**`app/(routes)/projects/projects.ts`**:
```ts
import type { ComponentType } from 'react';

// Import each MDX file as both a React component (default) and its metadata (named)
import Project1Component, { metadata as project1Meta }
    from './[slug]/content/project1.mdx';
import Project2Component, { metadata as project2Meta }
    from './[slug]/content/project2.mdx';
import Project3Component, { metadata as project3Meta }
    from './[slug]/content/project3.mdx';

/*
  ProjectMetadata describes the shape of the metadata export in each .mdx file.
  TypeScript cannot infer the full type from MDX exports automatically,
  so we cast each import against this type to get proper type checking.
*/
export type ProjectMetadata = {
    slug: string;
    title: string;
    category: string[];
    /** Path to the 3:2 thumbnail shown on the listing page */
    thumbnail: string;
    thumbnailAlt: string;
    /** Short description shown below the thumbnail */
    description: string;
    /** Intro paragraph shown alongside the intro image on the detail page */
    introText: string;
    introImage: string;
    introImageAlt: string;
    /** Exactly four images for the asymmetric gallery */
    galleryImages: { src: string; alt: string }[];
};

// Project extends ProjectMetadata with the MDX component
export type Project = ProjectMetadata & {
    /** The MDX file rendered as a React component on the detail page */
    Component: ComponentType;
};

/*
  Each project is defined entirely in its MDX file.
  The metadata export provides all structured data; the default export is the component.
  To add a project: create a new .mdx file and add one import and one entry here.
*/
export const projects: Project[] = [
    { ...(project1Meta as ProjectMetadata), Component: Project1Component },
    { ...(project2Meta as ProjectMetadata), Component: Project2Component },
    { ...(project3Meta as ProjectMetadata), Component: Project3Component },
];

/*
  Derive the category list automatically from the projects array.
  Array.from(new Set(...)) removes duplicates.
  'All' is prepended so there is always a "show everything" option.
  This list never needs manual maintenance — it updates when projects change.
*/
export const categories = [
    'All',
    ...Array.from(new Set(projects.flatMap((p) => p.category))),
];
```

* `projects.flatMap((p) => p.category)` — iterates over every project and flattens each project's `category` array into one flat list, e.g. `["Category 1", "Category 2", "Category 1", "Category 3"]`. `flatMap` is needed because each project now has an array of categories rather than a single string.
* `new Set(...)` — a `Set` is a JavaScript data structure that only stores unique values. Passing the array into it automatically removes duplicates, leaving `{"Category 1", "Category 2", "Category 3"}`.
* `Array.from(...)` — converts the `Set` back into a plain array, because `Set` objects can't be spread or mapped directly in JSX.
* `'All', ...` — the spread operator `...` unpacks the array inline. `'All'` is prepended as a fixed first entry so the user can reset to showing all projects.

The final result is something like `["All", "Category 1", "Category 2", "Category 3"]` — a deduplicated list of all categories that exist in the data, with "All" always first. The advantage is that you never have to maintain this list manually — it updates automatically whenever you add or change a project's category.

The `/** ... */` JSDoc comments appear as tooltips in VS Code when you hover over a field name anywhere in the project.

*On a Side Note*: This setup works well for a portfolio of up to around 20–30 projects. Because `projects.ts` imports every MDX file upfront, all MDX components end up in the JavaScript bundle of every page that imports from `projects.ts` — even the listing page, which never renders any of them. For a small portfolio this overhead is negligible. If the project count grows significantly, the better approach is to split the data back out: keep only plain serialisable fields (slug, title, category, thumbnail, description, introText, introImage, galleryImages) in `projects.ts` as plain objects, and move the MDX content to a separate `contentMap` in the detail page that maps each slug to its imported component. The listing page then only loads the lightweight metadata; each MDX component is only bundled with the detail page that actually uses it.

### 13.2 Listing Page Skeleton

Before building any components, get the routing working with the simplest possible output — a plain list of project titles as links. This confirms that the data layer is wired up and that clicking a project navigates to the right URL.

**`app/(routes)/projects/page.tsx`**:
```tsx
import Link from 'next/link';
import HeroTitle from '@/app/components/HeroTitle';
import { projects } from './projects';

// Server Component — reads project data at build time, no interactivity needed yet
const Projects = () => {
    return (
        <>
            <section className="relative w-full">
                <HeroTitle text="Projects" />
            </section>
            <section className="px-4 py-8">

                {/*TO BE CHANGED"*/}
                <ul className="space-y-2">
                    {projects.map((project) => (
                        // project.slug becomes the URL segment: /projects/[slug]
                        <li key={project.slug}>
                            <Link
                                href={`/projects/${project.slug}`}
                                className="hover:underline"
                            >
                                {project.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};

export default Projects;
```

### 13.3 Detail Page Skeleton

Before adding any content components, let's confirm that the dynamic route works, meaning clicking a project title from the listing should land on a page that shows the project's title and category.

The following page file does two things. First, it tells Next.js which pages to generate at build time via `generateStaticParams` — without this, Next.js would not know which slugs exist and could not pre-render the detail pages. Second, it renders the page for a given slug by reading that slug from params and looking up the matching project in the data.


**`app/(routes)/projects/[slug]/page.tsx`**:
```tsx
import { notFound } from 'next/navigation';
import { projects } from '../projects';

/*
    Next.js calls generateStaticParams at build time to collect 
    the full list of slugs, then pre-renders one HTML file per slug.
    It never runs in the browser and never runs on a per-request basis,
    it is purely a build-time function.
*/
export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

// In Next.js 15+, params is a Promise — the component must be async to await it
type Props = { params: Promise<{ slug: string }> };

const ProjectPage = async ({ params }: Props) => {
    const { slug } = await params;

    // Find the matching project by slug — show 404 if it does not exist
    const project = projects.find((p) => p.slug === slug);
    if (!project) notFound();
    /*
      notFound() throws a special Next.js error that renders the nearest
      not-found.tsx (or the default 404 page). It never returns — TypeScript
      knows project is non-null after this point.
    */

    return (
        <section className="px-4 py-8">
            <h1>{project.title}</h1>
            <p className="text-gray-500">{project.category}</p>
        </section>
    );
};

export default ProjectPage;
```

Open the listing page in the browser, click a project title, and confirm you land on a page showing its title and category. The routing is verified — now we fill in the details.

Dynamic Routing
* params is how Next.js passes the dynamic segment value into your page component. When a visitor opens /projects/project1, Next.js resolves params.slug to "project1" and passes it in. In Next.js 15 and later, params is a Promise — a value that is not available immediately but will be ready shortly. Marking the component async and using await tells JavaScript to pause and wait for the Promise to resolve before continuing. Once the slug is available, projects.find(...) looks up the matching entry in the data array — if nothing matches, notFound() triggers the 404 page.
* Projects are accessed with a `[slug]` URL, which varies per project as `[slug]` is Next.js file-system routing syntax for a dynamic segment. A file at app/(routes)/projects/[slug]/page.tsx matches any URL of the form /projects/anything. The value of anything is captured and passed into the page component as params.slug. So /projects/project1 gives slug = "project1", and /projects/project2 gives slug = "project2". One file handles all project detail pages — the slug is what distinguishes them. The square brackets are the convention Next.js uses to signal "this segment is a variable, not a literal folder name."

Asynchrony
* Normally a React component is a regular function that runs synchronously and with that it executes top to bottom and returns JSX immediately. Adding `async`, as done here, means the function can pause mid-execution to wait for something, for a promise specifically. This is necessary here because in Next.js 15, params is a Promise by design — Next.js hands it to you as a Promise rather than a plain object, so you must await it before you can read the slug value.
* With making params a Promise, Next.js 15 supports a feature called partial prerendering — the ability to start streaming a page to the browser before all dynamic values are known. If params were a plain object, the component would have to wait for the routing to fully resolve before it could start rendering at all. By making it a Promise, Next.js can begin executing the component and only pause at the exact point where await params appears.
* However, with output: "export", all pages are pre-generated at build time and served as plain HTML files anyway. There is no server, no streaming, and no runtime routing — so the Promise design brings no practical benefit here. However, Next.js uses the same page component API regardless of whether you are building a static site, a server-rendered app, or a streaming app. Rather than having different rules depending on your output mode, Next.js standardises on the Promise-based params everywhere, so your code works the same way across all setups.



### 13.4 ProjectCard

`ProjectCard` renders a single project as a thumbnail image, a short description, and a link. It is used by the listing page's grid.

**`app/components/ProjectCard.tsx`**:
```tsx
import Image from 'next/image';
import Link from 'next/link';
import type { ProjectMetadata } from '@/app/(routes)/projects/projects';

// Receives a full Project object and renders one card
const ProjectCard = ({ project }: { project: ProjectMetadata }) => {
    return (
        <div className="flex flex-col gap-3">
            {/* Thumbnail image — wrapped in Link so clicking it navigates to the detail page */}
            <Link href={`/projects/${project.slug}`}>
                <div className="relative aspect-3/2 w-full overflow-hidden rounded-sm bg-gray-100">
                    {/*
                      aspect-3/2: locks the container to a 3:2 aspect ratio.
                      relative + fill: the Image expands to fill the container exactly.
                      overflow-hidden: clips the image to the rounded corners.
                      bg-gray-100: placeholder colour shown while the image loads.
                    */}
                    <Image
                        src={project.thumbnail}
                        alt={project.thumbnailAlt}
                        fill
                        className="object-cover transition-opacity hover:opacity-80"
                    />
                </div>
            </Link>

            {/* Short description from the data layer */}
            <p className="text-sm leading-snug max-w-none">
                {project.description}
            </p>

            {/* Link to the detail page — slug becomes the URL segment */}
            <Link
                href={`/projects/${project.slug}`}
                className="text-sm font-medium hover:text-gray-400 transition-colors"
            >
                → {project.title}
            </Link>
        </div>
    );
};

export default ProjectCard;
```

When using `fill` on `next/image`, the parent container must have `position: relative` and explicit dimensions. `aspect-3/2` combined with `w-full` provides both.

### 13.5 Project Page with ProjectCards

Replace the plain list with a two-column card grid. The filtering component is not added yet — that comes last.  

**`app/(routes)/projects/page.tsx`**:
```tsx
import HeroTitle from '@/app/components/HeroTitle';
import { projects } from './projects';
// ADD:
import ProjectCard from '@/app/components/ProjectCard';

/*
  Server Component: reads the project data at build time and renders the grid.
  No "use client" — no interactivity yet. Category filtering is added later
  as a separate Client Component.
*/
const Projects = () => {
    return (
        <>
            <section className="relative w-full">
                <HeroTitle text="Projects" />
            </section>
            <section className="px-4 py-8">

                {/* CHANGE */}
                {/* 2-column grid on sm+, single column on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                    {projects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Projects;
```

### 13.6 Project MDX Content Files

Each project is a single MDX file that contains both all structured data as `metadata` and the long-form prose content as the body. Create the folder `app/(routes)/projects/[slug]/content/` and add one file per project.

The `metadata` export must match the `ProjectMetadata` type defined in `projects.ts` — every field is required.

**`app/(routes)/projects/[slug]/content/project1.mdx`**:

```mdx
export const metadata = {
    slug: 'project1',
    title: 'Project 1',
    category: ['Category 1'],
    thumbnail: '/img/projects/project01/project01-thumb.jpg',
    thumbnailAlt: '[Description]',
    description: '[One or two sentences shown below the thumbnail.]',
    introText: '[Intro paragraph shown on the detail page alongside the image.]',
    introImage: '/img/projects/project01/project01-intro.jpg',
    introImageAlt: '[Description]',
    galleryImages: [
        { src: '/img/projects/project01/project01-01.jpg', alt: '[Caption]' },
        { src: '/img/projects/project01/project01-02.jpg', alt: '[Caption]' },
        { src: '/img/projects/project01/project01-03.jpg', alt: '[Caption]' },
        { src: '/img/projects/project01/project01-04.jpg', alt: '[Caption]' },
    ],
}

## Context

[Conceptual context for this project. What question or impulse motivated it?]

## Process

[Methods, tools, and workflow you used.]

## Results

[Result, exhibition, publication, or insight.]
```

The filename must match the slug exactly — `project1.mdx` for slug `project1`, `project2.mdx` for slug `project2`, and so on.

Because the MDX body is full JSX, you can go beyond plain text. To display images inline at full width — larger than the gallery grid — import `next/image` at the top of the file and place `<Image>` elements directly in the body. The `import` must come before the `export const metadata`.

**`app/(routes)/projects/[slug]/content/project1.mdx`**:
```mdx
import Image from 'next/image';

export const metadata = {
    slug: 'project1',
    ...
}

## Process

[Methods, tools, and workflow you used.]

<Image src="/img/projects/project01/project01-01.jpg" alt="[Caption]" width={1600} height={1067} className="w-full h-auto" />

<Image src="/img/projects/project01/project01-02.jpg" alt="[Caption]" width={1600} height={1067} className="w-full h-auto" />

## Results

[Result, exhibition, publication, or insight.]
```

`width` and `height` tell Next.js the intrinsic dimensions of the source file so it can calculate the aspect ratio — they do not control the display size. `className="w-full h-auto"` makes the image stretch to the full width of the article container while preserving its proportions.

### 13.7 ProjectImageGallery

ProjectImageGallery receives an array of four images. On small screens the images stack in a single column; on `sm+` they switch to an asymmetric grid where the first image spans two rows:

```
mobile               sm+
┌──────────┐         ┌──────────┬──────────────────────┐
│  img 1   │         │          │        img 2         │  row 1
├──────────┤         │  img 1   ├──────────┬───────────┤
│  img 2   │         │ (tall)   │  img 3   │   img 4   │  row 2
├──────────┤         └──────────┴──────────┴───────────┘
│  img 3   │
├──────────┤
│  img 4   │
└──────────┘
```

The asymmetric column ratio (`2fr 3fr 3fr`) cannot be expressed with Tailwind utility classes, so it is set via inline `style`. But inline styles have no breakpoint support — they always apply. To work around this, we use two separate containers toggled by breakpoint: `sm:hidden` hides the mobile stack on larger screens, `hidden sm:grid` shows the grid only on `sm+`.

**`app/components/ProjectImageGallery.tsx`**:
```tsx
import Image from 'next/image';

type GalleryImage = { src: string; alt: string };

const ProjectImageGallery = ({ images }: { images: GalleryImage[] }) => {
    if (images.length < 4) return null;

    return (
        <section>
            {/*
              Mobile: single column stack — each image fills full width at a 3:2 ratio.
              The asymmetric grid cannot be expressed responsively via inline styles,
              so we use two separate containers toggled by breakpoint.
            */}
            <div className="grid grid-cols-1 gap-2 sm:hidden">
                {images.map((img, i) => (
                    <div key={i} className="relative aspect-3/2 overflow-hidden rounded-sm bg-gray-100">
                        <Image src={img.src} alt={img.alt} fill className="object-cover" />
                    </div>
                ))}
            </div>

            {/*
              sm+: asymmetric grid.
              The column ratio (2fr 3fr 3fr) cannot be expressed with Tailwind utility
              classes, so we set it via inline style.
            */}
            <div
                className="hidden sm:grid gap-4"
                style={{
                    gridTemplateColumns: '2fr 3fr 3fr',
                    gridTemplateRows: '1fr 1fr',
                    aspectRatio: '16 / 9',
                }}
            >
                {/* Column 1 — row-span-2 makes this cell tall, spanning both rows */}
                <div className="relative row-span-2 overflow-hidden rounded-sm bg-gray-100">
                    <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" />
                </div>

                {/* Columns 2–3, row 1 — col-span-2 stretches across both remaining columns */}
                <div className="relative col-span-2 overflow-hidden rounded-sm bg-gray-100">
                    <Image src={images[1].src} alt={images[1].alt} fill className="object-cover" />
                </div>

                {/* Column 2, row 2 */}
                <div className="relative overflow-hidden rounded-sm bg-gray-100">
                    <Image src={images[2].src} alt={images[2].alt} fill className="object-cover" />
                </div>

                {/* Column 3, row 2 */}
                <div className="relative overflow-hidden rounded-sm bg-gray-100">
                    <Image src={images[3].src} alt={images[3].alt} fill className="object-cover" />
                </div>
            </div>
        </section>
    );
};

export default ProjectImageGallery;
```

### 13.8 Project Detail Page

Now fill in the detail page with the intro image, intro text, MDX body, and gallery. The intro section reuses `TextImageBox` — the same float-based image and text layout already used on the About page. Because each project object already carries its own `Component` (imported from its MDX file via `projects.ts`), there is no `contentMap` needed — we simply destructure `Component` from the matched project and render it.

**`app/(routes)/projects/[slug]/page.tsx`**:
```tsx
import { notFound } from 'next/navigation';
import TextImageBox from '@/app/components/TextImageBox';
import ProjectImageGallery from '@/app/components/ProjectImageGallery';
import { projects } from '../projects';

/*
  generateStaticParams tells Next.js which [slug] values exist at build time.
  With output: "export", every page must be pre-generated — there is no server
  to handle unknown routes at runtime. This function provides the complete list.
*/
export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

// In Next.js 15+, params is a Promise — the component must be async to await it
type Props = { params: Promise<{ slug: string }> };

const ProjectPage = async ({ params }: Props) => {
    const { slug } = await params;

    // Find the matching project — show 404 if the slug does not exist
    const project = projects.find((p) => p.slug === slug);
    if (!project) notFound();
    /*
      notFound() throws a special Next.js error that renders the nearest
      not-found.tsx (or the default 404 page). It never returns — TypeScript
      knows project is non-null after this point.
    */

    // Component comes directly from the project object — no separate contentMap needed
    const { Component } = project;

    return (
        <>
            {/* Page title */}
            <section className="relative w-full text-center">
                <h1 className="text-center text-balance">{project.title}</h1>
            </section>

            <TextImageBox
                text={project.introText}
                src={project.introImage}
                alt={project.introImageAlt}
            />

            {/*
              MDX body — wrapped in a prose container so Tailwind's typography
              plugin restores heading sizes, list bullets, and paragraph spacing.
              pt-0 removes the top padding that the global section rule adds,
              keeping the article close to the TextImageBox above it.
            */}
            <section className="pt-0">
                <article className="
                    prose prose-neutral max-w-none
                    prose-p:text-base prose-p:leading-relaxed
                    prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-3
                    prose-h3:text-base prose-h3:mt-8
                    hyphens-auto
                ">
                    <Component />
                </article>
            </section>

            {/* Asymmetric four-image gallery from the galleryImages data */}
            <ProjectImageGallery images={project.galleryImages} />
        </>
    );
};

export default ProjectPage;
```

### 13.9 Category Filtering

For the time when we have dozens of projects, we would like to have some filtering based on categories.

For that we add a Client Component (`ProjectCategoryFilter`) that manages the active category and re-renders the grid when it changes. We need a Client Component here, as we have interactivity that can not be "pre-processed". The filtering by category requires state that responds to user clicks. This is a reason to reach for a Client Component. `ProjectCategoryFilter` handles exactly that, while the listing page itself stays a Server Component, which loads the data and passes it down.


**`app/components/ProjectCategoryFilter.tsx`**:
```tsx
"use client";

import { useState } from 'react';
import type { ProjectMetadata } from '@/app/(routes)/projects/projects';
import ProjectCard from './ProjectCard';

type ProjectCategoryFilterProps = {
    projects: ProjectMetadata[];  // metadata-only — Component is stripped before crossing the server/client boundary
    categories: string[];  // deduplicated list from projects.ts
};

const ProjectCategoryFilter = ({ projects, categories }: ProjectCategoryFilterProps) => {
    // activeCategory is the currently selected filter — 'All' shows every project
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = activeCategory === 'All'
        ? projects
        : projects.filter((p) => p.category.includes(activeCategory));

    return (
        <>
            {/* One button per category */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-1 rounded-full text-sm border transition-colors ${
                            activeCategory === cat
                                ? 'bg-neutral-900 text-white border-neutral-900'
                                : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-600'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Filtered project grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                {filtered.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </>
    );
};

export default ProjectCategoryFilter;
```

Now update the listing page to pass both the project list and the category list to the new component.

**`app/(routes)/projects/page.tsx`**:
```tsx
import HeroTitle from '@/app/components/HeroTitle';

// CHANGE
import { projects, categories } from './projects';

// ADD
import ProjectCategoryFilter from '@/app/components/ProjectCategoryFilter';

// Server Component — reads project data at build time, passes it to the client filter
const Projects = () => {
    /*
      Strip the Component field before passing to the Client Component.
      Functions cannot cross the server/client boundary — only plain serialisable
      data can. ProjectCategoryFilter and ProjectCard only need metadata fields.
    */
    const projectMeta = projects.map(({ Component: _, ...meta }) => meta);

    return (
        <>
            <section className="relative w-full">
                <HeroTitle text="Projects" />
            </section>
            <section className="px-4 py-8">
                <ProjectCategoryFilter projects={projectMeta} categories={categories} />
            </section>
        </>
    );
};

export default Projects;
```

The listing page itself stays a Server Component. It reads the data at build time and passes the full lists down as props. `ProjectCategoryFilter` is the only part that runs in the browser — it owns the `activeCategory` state and re-renders the grid on every click.

### 13.10 Verify the Build

Run the production build to confirm that every static page generates correctly and there are no TypeScript or MDX errors:

```bash
npm run build
```

A successful build ends with output in `/out` similar to:

```
Route (app)                              Size     First Load JS
┌ ○ /                                    ...
├ ○ /about                               ...
├ ○ /contact                             ...
├ ○ /projects                            ...
└ ● /projects/[slug]                     ...
    ├ /projects/project1
    ├ /projects/project2
    └ /projects/project3

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
```

If the build fails, Next.js prints the file and line number. Common issues at this stage:

- A `metadata` field name in an MDX file does not match the `ProjectMetadata` type in `projects.ts` — check for typos.
- An image path in `metadata` does not exist in `public/` — the build succeeds but the image will be broken at runtime.
- A missing import in `projects.ts` — make sure every project has an MDX import and an entry in the `projects` array.






---

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





## 15. Summary

## 15.1 The Complete File Structure

After all steps:

```
portfolio/
├── app/
│   ├── (routes)/
│   │   ├── about/
│   │   │   ├── content/
│   │   │   │   ├── vita.mdx
│   │   │   │   ├── topics.mdx
│   │   │   │   ├── grants.mdx
│   │   │   │   ├── publications.mdx
│   │   │   │   └── community.mdx
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── impressum/
│   │   │   └── page.tsx
│   │   └── projects/
│   │       ├── [slug]/
│   │       │   ├── content/
│   │       │   │   ├── project1.mdx
│   │       │   │   ├── project2.mdx
│   │       │   │   └── project3.mdx
│   │       │   └── page.tsx
│   │       ├── page.tsx
│   │       └── projects.ts           Project data + types
│   ├── components/
│   │   ├── AccordionAbout.tsx        Accordion state manager (client)
│   │   ├── AccordionEntry.tsx        Single collapsible section (client)
│   │   ├── ButtonEmail.tsx           Mailto link component
│   │   ├── Footer.tsx                Site footer
│   │   ├── Header.tsx                Site header (server)
│   │   ├── HeaderNav.tsx             Navigation + mobile menu (client)
│   │   ├── HeroCanvas.tsx            Full-width section container
│   │   ├── HeroImage.tsx             Full-cover image for hero
│   │   ├── HeroSectionText.tsx       Title + text section
│   │   ├── HeroSectionTextImage.tsx  Title + image/text section
│   │   ├── HeroTitle.tsx             Large h1 heading
│   │   ├── ProjectCard.tsx           Single project card
│   │   ├── ProjectCategoryFilter.tsx Filter pills + grid (client)
│   │   ├── ProjectImageGallery.tsx   Asymmetric 4-image grid
│   │   └── TextImageBox.tsx          Float image + text
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── img/
│       ├── about/portrait.jpg
│       ├── contact/email_01.png
│       ├── home/home-hero.jpg
│       └── projects/<slug>/
│           ├── <slug>-thumb.jpg
│           ├── <slug>-intro.jpg
│           └── <slug>-01..04.jpg
├── eslint.config.mjs
├── mdx-components.tsx
├── mdx.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── prettier.config.mjs
└── tsconfig.json
```

### 15.2 What to Personalise

Replace every `[bracket]` placeholder before publishing:

- `app/components/Header.tsx` — your name and email address
- `app/components/Footer.tsx` — your name and city
- `app/page.tsx` — intro sentence, title, description
- `app/(routes)/about/page.tsx` — name, bio, portrait
- `app/(routes)/about/content/*.mdx` — your CV data
- `app/(routes)/contact/page.tsx` — phone and address
- `app/(routes)/impressum/page.tsx` — legal information
- `app/(routes)/projects/projects.ts` — your projects and images
- `app/(routes)/projects/[slug]/content/*.mdx` — project write-ups



## 16. Build and Deploy

This portfolio is a **static site** and `npm run build` compiles every page to plain HTML, CSS, and JavaScript in an `out/` folder. There is no server running, no database, just files. This makes hosting straightforward: put the `out/` folder (it is generated by Next's `build` command) somewhere that serves files over the web and the site is live.

The workflow we will set up is:

1. **Git** and **GitHub** to track changes and to hold a copy of your code online, reachable from anywhere
2. **Render** watches your GitHub repository and rebuilds and publishes the site automatically every time you push new code

### 16.1 Git and GitHub

Check that the latest version of the page builds without any errors.

```bash
npm run build
```

We are not publishing that folder, it is just a test (Render is running the command later on automatically). Now, publish the project folder in a GitHub repository.

create-next-app` already generated a `.gitignore` in your project root. This file lists paths that git should not track:
- `node_modules/` — the thousands of installed packages; they can always be recreated from `package.json` by running `npm install`
- `.next/` — the build cache
- `out/` — the compiled output; Render will build this itself from your source code

You do not need to edit `.gitignore`.

Initialise the repository and make the first commit:

```bash
git init
git add .
git commit -m "initial commit"
```

`git init` creates a hidden `.git/` folder where git stores the entire project history.

`git add .` stages every file not excluded by `.gitignore` — it tells git "include these in the next snapshot."

`git commit -m "..."` records the staged snapshot permanently, with a short message describing what changed. Every commit is a save point you can return to.

Publish that repository on GitHub with:

1. Go to [github.com](https://github.com) and sign in, or create a free account.
2. Click **New** (the green button on the dashboard) to create a new repository.
3. Give it a name such as `portfolio`. Leave the visibility set to **Public** so Render's free tier can access it. Do not add a README or `.gitignore` — your project already has those. Click **Create repository**.
4. GitHub shows a page with setup instructions. Find the section **"…or push an existing local repository from the command line"** and run those commands in your terminal. They look like this — replace `your-username` with your actual GitHub username:

```bash
git remote add origin https://github.com/lenagieseke/portfolio_01_t2.git
git branch -M main
git push -u origin main
```

After the push, refresh the GitHub page — all your project files should now appear there.

### 16.2 Render

Render is a cloud hosting platform. Its free tier can serve static sites with no time limit.

1. Go to [render.com](https://render.com) and sign up. You can log in directly with your GitHub account, which makes the next step easier.
2. On the Render dashboard click **New** and then **Static Site**.
3. Connect your GitHub account if prompted, then find and select your `portfolio` repository.
4. Render shows a configuration form. You can keep everything as it, just add `out` as Publish Directory.

    | Setting           | Value                               |
    | ----------------- | ----------------------------------- |
    | Name              | `portfolio` (or any label you like) |
    | Branch            | `main`                              |
    | Build Command     | `npm run build`                     |
    | Publish Directory | `out`                               |

    The build command tells Render how to compile your project. The publish directory tells Render which folder holds the finished files — `out` is where Next.js writes the static export.

5. Click **Deploy Static Site**.

Render clones your repository, runs `npm run build`, and serves the contents of `out/`. The first deploy takes a few minutes. When it finishes, Render shows you a live URL ending in `.onrender.com` — your portfolio is online and publicly accessible.

### 16.3 Updating the Site

Every time you want to publish a change — new content, a style tweak, a new project — the workflow is always the same three commands:

```bash
git add .
git commit -m "describe what changed"
git push
```

Render detects the push automatically and starts a new build. When it finishes the live site is updated. The URL stays the same.

### 16.4 A Custom Domain

Domain names are bought and managed through a separate service called a **domain registrar**. Common ones are [Namecheap](https://www.namecheap.com), [Porkbun](https://porkbun.com), or [Hover](https://www.hover.com), I am using [HostEurope](https://www.hosteurope.de/). You pay an annual fee (typically 10–20 EUR) and the registrar gives you control over a specific domain's DNS settings.

Connecting a domain requires one change on each side (Render and your domain registrar). You tell Render which domain to expect, and you tell the registrar to route traffic for that domain to Render's servers.

To connect a domain you own to your Render site:

1. Open your static site on the Render dashboard and go to **Settings → Custom Domains**.
2. Click **Add Custom Domain** and type your domain name (e.g. `yourname.com`). Render will show you a `CNAME` record — a hostname and a value — that you need to add on the registrar side.
3. Log in to your domain registrar, find the DNS settings for your domain, and add that `CNAME` record exactly as Render shows it.
4. DNS changes can take up to 24 hours to propagate, though it is often much faster. Once Render detects the record it automatically issues an HTTPS certificate and your domain goes live.

For me this step needed a bit of trial and error but eventually worked just fine.


## 17. References and Links

**Runtime and Package Management**

* [Node.js](https://nodejs.org/) — JavaScript runtime that executes JavaScript outside the browser; required to run the development server and all build tools.
* [npm](https://www.npmjs.com/) — Package manager bundled with Node.js; installs, updates, and manages all project dependencies via `package.json`.

**Framework and Language**

* [Next.js](https://nextjs.org/) — React framework that adds file-system routing, static site export, image optimisation, and font loading on top of React.
* [React](https://react.dev/) — JavaScript library for building user interfaces from composable, reusable components.
* [TypeScript](https://www.typescriptlang.org/) — Typed superset of JavaScript that catches errors at development time before they reach the browser.

**Styling**

* [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework where single-purpose class names are applied directly in markup instead of writing custom CSS.
* [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) — Official Tailwind plugin providing the `prose` class, which restores readable heading, list, and paragraph styles to HTML generated from Markdown or MDX.
* [PostCSS](https://postcss.org/) — CSS processing tool used internally by Tailwind to compile utility classes during the build.

**Content**

* [MDX](https://mdxjs.com/) — File format that combines Markdown prose with JSX components, used here for the CV sections and project write-ups.
* [@next/mdx](https://nextjs.org/docs/app/guides/mdx) — Next.js plugin that wires `.mdx` files into the build pipeline so they can be imported as React components.
* [@mdx-js/loader](https://mdxjs.com/packages/loader/) — Bundler loader that compiles `.mdx` source files into React components at build time.
* [@mdx-js/react](https://mdxjs.com/packages/react/) — React-side MDX runtime that provides the component context used when rendering MDX content.

**Icons**

* [Lucide React](https://lucide.dev/) — Open-source icon library that ships each icon as an individual React component, used on the Contact page.

**Fonts**

* [Google Fonts](https://fonts.google.com/) — Google's free web font catalogue; fonts are downloaded at build time via `next/font/google` so no request is made to Google at runtime.
* [Inter](https://rsms.me/inter/) — Clean, highly legible variable font by Rasmus Andersson, used as the default typeface throughout the portfolio.

**Developer Tooling**

* [Prettier](https://prettier.io/) — Opinionated code formatter that automatically enforces consistent indentation, quotes, and line length on save.
* [ESLint](https://eslint.org/) — Static analysis tool that flags common JavaScript and TypeScript mistakes as you type.
* [Turbopack](https://turbo.build/pack) — Rust-based bundler used by Next.js for fast incremental rebuilds during development.
* [VS Code](https://code.visualstudio.com/) — Code editor used throughout this tutorial.
* [React DevTools](https://react.dev/learn/react-developer-tools) — Browser extension for inspecting the React component tree, props, and state at runtime.

**Version Control and Deployment**

* [Git](https://git-scm.com/) — Distributed version control system for tracking every change to the project source code.
* [GitHub](https://github.com/) — Cloud platform for hosting Git repositories and sharing code publicly.
* [Render](https://render.com/) — Cloud hosting platform used to deploy and serve the compiled static site automatically on every push.

---
layout: default
title: 1. Tech Stack
parent: Tutorial
nav_order: 1
has_children: false
---

#### Prof. Dr. Lena Gieseke | lena.gieseke@filmuniversitaet.de  
  
# Tutorial - A Portfolio Page


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

### Next

* [1. Tech Stack](portfolio_tutorial_01_stack)
* [2. Project Setup](portfolio_tutorial_02_setup)
* [3. Routing](portfolio_tutorial_03_routing)
* [4. Header and Footer](portfolio_tutorial_04_header_footer)
* [5. Tailwind CSS](portfolio_tutorial_05_tailwind)
* [6. Navigation](portfolio_tutorial_06_navigation)
* [7. Footer](portfolio_tutorial_07_footer)
* [8. The Home Page](portfolio_tutorial_08_home)
* [9. The About Page – Overview](portfolio_tutorial_09_about_overview)
* [10. The About Page – Accordion](portfolio_tutorial_10_about_accordion)
* [11. Impressum](portfolio_tutorial_11_impressum)
* [12. Contact](portfolio_tutorial_12_contact)
* [13. Projects](portfolio_tutorial_13_projects)
* [14. Fonts](portfolio_tutorial_14_fonts)
* [15. Summary](portfolio_tutorial_15_summary)
* [16. Build and Deploy](portfolio_tutorial_16_deploy)
* [17. References and Links](portfolio_tutorial_17_references)


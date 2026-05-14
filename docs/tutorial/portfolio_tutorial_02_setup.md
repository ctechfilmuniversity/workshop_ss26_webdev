---
layout: default
title: "2. Project Setup"
parent: Tutorial
nav_order: 2
has_children: false
---

#### Prof. Dr. Lena Gieseke | lena.gieseke@filmuniversitaet.de  
  
# Tutorial - A Portfolio Page

## Previous

* [1. Tech Stack](portfolio_tutorial_01_stack)


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


## Next

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


---

## Following

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


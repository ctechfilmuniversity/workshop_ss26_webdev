---
layout: default
title: "17. References and Links"
parent: Tutorial
nav_order: 17
has_children: false
---

#### Prof. Dr. Lena Gieseke | lena.gieseke@filmuniversitaet.de  
  
# Tutorial - A Portfolio Page

## Previous

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


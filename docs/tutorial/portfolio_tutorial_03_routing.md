---
layout: default
title: "3. Routing"
parent: Tutorial
nav_order: 3
has_children: false
---

#### Prof. Dr. Lena Gieseke | lena.gieseke@filmuniversitaet.de  
  
# Tutorial - A Portfolio Page

## Previous

* [1. Tech Stack](portfolio_tutorial_01_stack)
* [2. Project Setup](portfolio_tutorial_02_setup)


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


---

## Following

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


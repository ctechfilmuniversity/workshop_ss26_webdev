---
layout: default
title: "6. Navigation"
parent: Tutorial
nav_order: 6
has_children: false
---

#### Prof. Dr. Lena Gieseke | lena.gieseke@filmuniversitaet.de  
  
# Tutorial - A Portfolio Page

### Previous

* [1. Tech Stack](portfolio_tutorial_01_stack)
* [2. Project Setup](portfolio_tutorial_02_setup)
* [3. Routing](portfolio_tutorial_03_routing)
* [4. Header and Footer](portfolio_tutorial_04_header_footer)
* [5. Tailwind CSS](portfolio_tutorial_05_tailwind)


## 6. Navigation

* [6. Navigation](#6-navigation)
    * [6.1 — Extract The `nav` Into Its Own Component](#61--extract-the-nav-into-its-own-component)
    * [6.2 — Replace inline classes with named CSS classes](#62--replace-inline-classes-with-named-css-classes)
        * [6.2.1 aria-label](#621-aria-label)
    * [6.3 — Add a mobile menu toggle button](#63--add-a-mobile-menu-toggle-button)
        * [React Hooks (Why you can't just use a JS variable)](#react-hooks-why-you-cant-just-use-a-js-variable)
    * [6.4 — The Dropdown Menu](#64--the-dropdown-menu)
        * [6.4.1 — Close on Escape key](#641--close-on-escape-key)
        * [6.4.2 —  Close on outside click](#642---close-on-outside-click)
        * [6.4.3 `useState` vs. `useEffect` vs. `useRef`](#643-usestate-vs-useeffect-vs-useref)
        * [6.4.4 — Add a chevron icon](#644--add-a-chevron-icon)
        * [6.4.5 — Refactor: One Link List for Both Menus](#645--refactor-one-link-list-for-both-menus)
    * [6.5 — A "Say Hi" Button](#65--a-say-hi-button)
    * [6.5.1 — Integrate Button Into Header.tsx](#651--integrate-button-into-headertsx)
    * [Next](#next)



The header currently has an inline `<nav>` with links that only appear on desktop. This section makes it fully responsive: a horizontal row on desktop, a dropdown on mobile.
  
*On a Side Note:* You can toggle in Firefox to mobile mode under `More Tools`  →  `Responsive Design Mode` (learn the hotkey!)
  


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

**`useState`** is a React hook for storing a value inside a component. Hooks are how a component reaches beyond "take input, return JSX" and connects to React's internal machinery. 

When you update `open`, React re-renders the component with the new value:

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

**`app/globals.css`** in `@layer components {}`:
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


#### React Hooks (Why you can't just use a JS variable)

In React, a component is a function that runs every time React needs to re-render. Consider:

```jsx
const Counter = () => {
    let count = 0;  // reset to 0 on every render

    return (
        <button onClick={() => { count++; console.log(count); }}>
            Count: {count}
        </button>
    );
};
```
When the button is clicked:

* `count` increments to `1` in the console — the variable works
* But the screen still shows Count: `0` — nothing re-rendered
* Even if React did re-render, the function runs again and resets `count = 0`
* Two problems: no re-render is triggered, and the variable doesn't survive a re-render anyway.


`const [count, setCount] = useState(0);` does two things a plain variable cannot:

1. Stores the value outside the function — React keeps it in its own memory, so it survives each time the component function re-runs.
2. Tells React to re-render when it changes — calling `setCount(1)` schedules a re-render, so the screen updates.  
A plain variable does neither.

The general rule: Any value that should cause the UI to update when it changes must live in state. Values that are just intermediate calculations within a single render (e.g., a formatted string built from props) are fine as plain variables — they don't need to survive or trigger re-renders.

For the accordion `openIndex` must be state because clicking an entry should visually open/close it. If it were a variable, clicks would silently update it and nothing on screen would change.




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

#### 6.4.3 `useState` vs. `useEffect` vs. `useRef`

**useState** — "React, please remember this for me"
* Stores a value that belongs to the component and triggers a re-render when it changes. That's its only job.
* You write to it by calling the setter (`setOpen`). You read from it directly (`open`). Nothing happens automatically — it only reacts when you call the setter.

> Every time React re-runs the component function, all local variables are gone. useState is how you tell React: "keep this value safe between runs, and if it changes, re-run the component so the screen updates.

**useEffect** — "React, please do this after you've updated the screen"
* Runs a side effect after the component renders. A side effect is anything that reaches outside the component's own output: fetching data, reading the DOM, setting up an event listener, starting a timer.

```jsx
useEffect(() => {
    document.title = `${count} clicks`;
}, [count]);  // re-runs whenever count changes
```

The second argument (the dependency array) controls when it runs:

* `[]` — once, after the first render only
* `[count]` — after every render where count changed
* no array — after every render (rarely what you want)

> Sometimes you need to do something that goes outside the component, e.g., talk to a server, set the page title, listen for keyboard events. You can't do those things in the middle of rendering because rendering should be fast and predictable.


**useRef** — "React, please remember this, but don't bother re-drawing when it changes"
* Stores a value that persists across renders — just like useState — but changing it does not cause a re-render.
* The most common use is holding a reference to a DOM element so you can read or manipulate it directly (e.g. checking whether a click happened inside or outside a menu).

```jsx
const menuRef = useRef(null);

// attach to a DOM element:
<div ref={menuRef}>...</div>

// later, read the actual DOM node:
if (!menuRef.current.contains(event.target)) {
    setOpen(false);
}
```
* `ref.current` always holds the latest value and is readable immediately — no setter, no re-render cycle.
* For our navigation component, useRef is used exactly this way, to detect outside clicks and close the mobile menu.

> Like useState, it survives re-renders. Unlike useState, updating it does not cause React to re-run the component.


|             | useState                           | useEffect                                 | useRef                                 |
| ----------- | ---------------------------------- | ----------------------------------------- | -------------------------------------- |
| Purpose     | store + remember a value           | run code in response to renders           | hold a reference without re-rendering  |
| Triggers    | your code calls the setter         | React calls it automatically after render | you read/write `.current` directly     |
| Re-renders  | yes, calling the setter causes one | no — effects don't trigger re-renders     | no — changing `.current` is silent     |
| Typical use | UI state (open/closed, count)      | fetch data, set up listeners, timers      | reference a DOM node, store a timer ID |

> `useState` connects to React's memory. `useEffect` connects to React's render lifecycle. `useRef` connects to the actual DOM.

#### 6.4.4 — Add a chevron icon

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


#### 6.4.5 — Refactor: One Link List for Both Menus

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
import { ButtonEmail } from "./ButtonEmail";


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

---

### Next

* [7. The Home Page](portfolio_tutorial_07_home)
* [8. The About Page – Overview](portfolio_tutorial_08_about_overview)
* [9. The About Page – Accordion](portfolio_tutorial_09_about_accordion)
* [10. Impressum](portfolio_tutorial_10_impressum)
* [11. Contact](portfolio_tutorial_11_contact)
* [12. Projects](portfolio_tutorial_12_projects)
* [13. Fonts](portfolio_tutorial_13_fonts)
* [14. Summary](portfolio_tutorial_14_summary)
* [15. Build and Deploy](portfolio_tutorial_15_deploy)
* [16. The Landing Page](portfolio_tutorial_16_landingpage)
* [17. References and Links](portfolio_tutorial_17_references)


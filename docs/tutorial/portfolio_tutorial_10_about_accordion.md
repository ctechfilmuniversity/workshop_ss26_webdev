---
layout: default
title: "10. The About Page – Accordion"
parent: Tutorial
nav_order: 10
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


---

## Following

* [11. Impressum](portfolio_tutorial_11_impressum)
* [12. Contact](portfolio_tutorial_12_contact)
* [13. Projects](portfolio_tutorial_13_projects)
* [14. Fonts](portfolio_tutorial_14_fonts)
* [15. Summary](portfolio_tutorial_15_summary)
* [16. Build and Deploy](portfolio_tutorial_16_deploy)
* [17. References and Links](portfolio_tutorial_17_references)


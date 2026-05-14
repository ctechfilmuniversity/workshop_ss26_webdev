---
layout: default
title: "13. Projects"
parent: Tutorial
nav_order: 13
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


---

## Following

* [14. Fonts](portfolio_tutorial_14_fonts)
* [15. Summary](portfolio_tutorial_15_summary)
* [16. Build and Deploy](portfolio_tutorial_16_deploy)
* [17. References and Links](portfolio_tutorial_17_references)


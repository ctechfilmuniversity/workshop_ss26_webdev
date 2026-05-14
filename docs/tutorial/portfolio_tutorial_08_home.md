---
layout: default
title: "8. The Home Page"
parent: Tutorial
nav_order: 8
has_children: false
---

#### Prof. Dr. Lena Gieseke | lena.gieseke@filmuniversitaet.de  
  
# Tutorial - A Portfolio Page

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


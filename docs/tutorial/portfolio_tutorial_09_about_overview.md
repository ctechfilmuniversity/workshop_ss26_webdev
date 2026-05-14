---
layout: default
title: "9. The About Page – Overview"
parent: Tutorial
nav_order: 9
has_children: false
---

#### Prof. Dr. Lena Gieseke | lena.gieseke@filmuniversitaet.de  
  
# Tutorial - A Portfolio Page

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





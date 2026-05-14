---
layout: default
title: "9. The About Page – Overview"
parent: Tutorial
nav_order: 9
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
* [6. Navigation](portfolio_tutorial_06_navigation)
* [7. Footer](portfolio_tutorial_07_footer)
* [8. The Home Page](portfolio_tutorial_08_home)


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


---

### Next

* [10. The About Page – Accordion](portfolio_tutorial_10_about_accordion)
* [11. Impressum](portfolio_tutorial_11_impressum)
* [12. Contact](portfolio_tutorial_12_contact)
* [13. Projects](portfolio_tutorial_13_projects)
* [14. Fonts](portfolio_tutorial_14_fonts)
* [15. Summary](portfolio_tutorial_15_summary)
* [16. Build and Deploy](portfolio_tutorial_16_deploy)
* [17. References and Links](portfolio_tutorial_17_references)


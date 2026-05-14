---
layout: default
title: "15. Summary"
parent: Tutorial
nav_order: 15
has_children: false
---

#### Prof. Dr. Lena Gieseke | lena.gieseke@filmuniversitaet.de  
  
# Tutorial - A Portfolio Page

## 15. Summary

## 15.1 The Complete File Structure

After all steps:

```
portfolio/
├── app/
│   ├── (routes)/
│   │   ├── about/
│   │   │   ├── content/
│   │   │   │   ├── vita.mdx
│   │   │   │   ├── topics.mdx
│   │   │   │   ├── grants.mdx
│   │   │   │   ├── publications.mdx
│   │   │   │   └── community.mdx
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── impressum/
│   │   │   └── page.tsx
│   │   └── projects/
│   │       ├── [slug]/
│   │       │   ├── content/
│   │       │   │   ├── project1.mdx
│   │       │   │   ├── project2.mdx
│   │       │   │   └── project3.mdx
│   │       │   └── page.tsx
│   │       ├── page.tsx
│   │       └── projects.ts           Project data + types
│   ├── components/
│   │   ├── AccordionAbout.tsx        Accordion state manager (client)
│   │   ├── AccordionEntry.tsx        Single collapsible section (client)
│   │   ├── ButtonEmail.tsx           Mailto link component
│   │   ├── Footer.tsx                Site footer
│   │   ├── Header.tsx                Site header (server)
│   │   ├── HeaderNav.tsx             Navigation + mobile menu (client)
│   │   ├── HeroCanvas.tsx            Full-width section container
│   │   ├── HeroImage.tsx             Full-cover image for hero
│   │   ├── HeroSectionText.tsx       Title + text section
│   │   ├── HeroSectionTextImage.tsx  Title + image/text section
│   │   ├── HeroTitle.tsx             Large h1 heading
│   │   ├── ProjectCard.tsx           Single project card
│   │   ├── ProjectCategoryFilter.tsx Filter pills + grid (client)
│   │   ├── ProjectImageGallery.tsx   Asymmetric 4-image grid
│   │   └── TextImageBox.tsx          Float image + text
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── img/
│       ├── about/portrait.jpg
│       ├── contact/email_01.png
│       ├── home/home-hero.jpg
│       └── projects/<slug>/
│           ├── <slug>-thumb.jpg
│           ├── <slug>-intro.jpg
│           └── <slug>-01..04.jpg
├── eslint.config.mjs
├── mdx-components.tsx
├── mdx.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── prettier.config.mjs
└── tsconfig.json
```

### 15.2 What to Personalise

Replace every `[bracket]` placeholder before publishing:

- `app/components/Header.tsx` — your name and email address
- `app/components/Footer.tsx` — your name and city
- `app/page.tsx` — intro sentence, title, description
- `app/(routes)/about/page.tsx` — name, bio, portrait
- `app/(routes)/about/content/*.mdx` — your CV data
- `app/(routes)/contact/page.tsx` — phone and address
- `app/(routes)/impressum/page.tsx` — legal information
- `app/(routes)/projects/projects.ts` — your projects and images
- `app/(routes)/projects/[slug]/content/*.mdx` — project write-ups




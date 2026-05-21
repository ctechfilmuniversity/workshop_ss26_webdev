---
layout: default
title: "14. Summary"
parent: Tutorial
nav_order: 14
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
* [7. The Home Page](portfolio_tutorial_07_home)
* [8. The About Page – Overview](portfolio_tutorial_08_about_overview)
* [9. The About Page – Accordion](portfolio_tutorial_09_about_accordion)
* [10. Impressum](portfolio_tutorial_10_impressum)
* [11. Contact](portfolio_tutorial_11_contact)
* [12. Projects](portfolio_tutorial_12_projects)
* [13. Fonts](portfolio_tutorial_13_fonts)


## 14. Summary

## 14.1 The Complete File Structure

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

### 14.2 What to Personalise

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


---

### Next

* [15. Build and Deploy](portfolio_tutorial_15_deploy)
* [16. References and Links](portfolio_tutorial_16_references)


---
layout: default
title: "12. Contact"
parent: Tutorial
nav_order: 12
has_children: false
---

#### Prof. Dr. Lena Gieseke | lena.gieseke@filmuniversitaet.de  
  
# Tutorial - A Portfolio Page

## 12. Contact

The contact page uses icons from [Lucide React](https://lucide.dev/). Lucide React is an open-source icon library that provides icons as React components. Instead of managing SVG files manually or using an icon font, you import individual icons directly:

`import { ChevronDown } from "lucide-react";`

This approach has several advantages:
* Tree-shaking — only the icons you actually import end up in the final bundle, not the entire library
* Consistent sizing and style — all icons share the same design language and accept the same props (size, strokeWidth, className) so they scale and align predictably with text
* No SVG boilerplate — instead of copying and maintaining raw SVG markup, each icon is a self-contained component
* Tailwind-friendly — you can style icons with Tailwind classes directly via className, just like any other element


Install it:

```bash
npm install lucide-react
```

**`app/(routes)/contact/page.tsx`**:
```tsx
// Mail, Phone, MapPin are Lucide React icon components — each renders as an inline SVG.
// Props like h-5 w-5 and text-gray-700 are standard Tailwind classes applied directly
// to the SVG element, controlling size and color without any extra wrapper.
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import HeroTitle from "@/app/components/HeroTitle";

const Contact = () => {
    return (
        <>
            <section className="relative w-full">
                <HeroTitle text="Contact" />
            </section>
        <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12 lg:py-16">

            <p className="text-base italic sm:text-lg lg:text-xl leading-relaxed mb-6 py-4">
                If you would like to discuss a project, ask for a talk, or simply say hello, send me a message!
            </p>

            {/*
              Email is displayed as an image rather than plain text to prevent
              bots from scraping the address. The Mail icon acts as a visual label.
            */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                <Mail className="h-5 w-5 text-gray-700" />
                <span className="font-medium">Email:</span>
                <Image
                    src="/img/contact/email_01.png"
                    alt="Email address"
                    width={120}
                    height={120}
                    className="w-36 sm:w-44 md:w-52 h-auto"
                />
            </div>

            {/* tel: opens the phone dialler on mobile devices */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                <Phone className="h-5 w-5 text-gray-700" />
                <a
                    href="tel:+490000000000"
                    className="text-gray-800 hover:text-gray-500 underline-offset-2 hover:underline"
                >
                    +49 000 0000000
                </a>
            </div>

            {/*
              items-start keeps the icon aligned to the first line of text
              rather than vertically centred against the whole address block.
              mt-0.5 nudges the icon down slightly to optically align it with
              the text baseline.
            */}
            <div className="flex items-start gap-2 sm:gap-3 mt-4">
                <MapPin className="h-5 w-5 text-gray-700 mt-0.5" />
                <div className="space-y-0.5 text-gray-800">
                    <p>[Institution Name]</p>
                    <p>[Street Address]</p>
                    <p>[Postal Code] [City]</p>
                    <p>[Country]</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default Contact;
```

---


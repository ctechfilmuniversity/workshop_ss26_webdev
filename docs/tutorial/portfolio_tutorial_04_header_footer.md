---
layout: default
title: "4. Header and Footer"
parent: Tutorial
nav_order: 4
has_children: false
---

#### Prof. Dr. Lena Gieseke | lena.gieseke@filmuniversitaet.de  
  
# Tutorial - A Portfolio Page

## Previous

* [1. Tech Stack](portfolio_tutorial_01_stack)
* [2. Project Setup](portfolio_tutorial_02_setup)
* [3. Routing](portfolio_tutorial_03_routing)


## 4. Header and Footer

We will build the header and footer in two steps: first as plain HTML with no styling, so the structure is clear and the site compiles. Then we add Tailwind classes.

### 4.1 Header
#### 4.1.1 Header — Plain HTML First

For links in the navigation bar, we are using the  React component [`<Link>`](https://nextjs.org/docs/pages/api-reference/components/link) that extends the HTML <a> element to provide prefetching and client-side navigation between routes. With that page transitions feel instant because the HTML was prefetched.

**`app/components/Header.tsx`**:
```tsx
import Link from "next/link";


const Header = () => {
    return (
        <header>
            {/* Site name — clicking returns to the home page */}
            <Link href="/">[Your Name]</Link>

            {/* Navigation placeholder — we will add HeaderNav here in Part 7 */}
            <nav>
                <Link href="/">HOME</Link>
                <Link href="/projects">PROJECTS</Link>
                <Link href="/about">ABOUT</Link>
                <Link href="/contact">CONTACT</Link>
            </nav>
        </header>
    );
};

export default Header;
```

#### 4.1.2 Wire the Header into the Layout

Update `app/layout.tsx` to include Header.

**`app/layout.tsx`**:
```tsx
import "./globals.css"; // Import global styles so they apply everywhere

//ADD:
import Header from "@/app/components/Header";


// RootLayout wraps every page in the site.
// children is the page currently being rendered.
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode; // Any valid React content
}>) {
    return (
        // lang="en" tells browsers and screen readers the page language
        <html lang="en">
            <body>

                {/* ADD: */}
                <Header />
                 {/* CHANGE: */}
                <main>{children}</main>
                {children} {/* The current page renders here */}
            </body>
        </html>
    );
}
```

### 4.2 Footer

Try to re-create the above steps for an empty (for now) footer without following the tutorial. Use `<footer></footer>`


#### 4.2.1 Footer — Plain HTML First

**`app/components/Footer.tsx`**:
```tsx
const Footer = () => {
    return (
        <footer>
            My Footer
        </footer>
    );
};

export default Footer;
```

Run the dev server. You should now see a plain, unstyled header and footer on every page.


---

## Following

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


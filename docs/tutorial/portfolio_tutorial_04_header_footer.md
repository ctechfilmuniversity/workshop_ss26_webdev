---
layout: default
title: "4. Header and Footer"
parent: Tutorial
nav_order: 4
has_children: false
---

#### Prof. Dr. Lena Gieseke | lena.gieseke@filmuniversitaet.de  
  
# Tutorial - A Portfolio Page

### Previous

* [1. Tech Stack](portfolio_tutorial_01_stack)
* [2. Project Setup](portfolio_tutorial_02_setup)
* [3. Routing](portfolio_tutorial_03_routing)


## 4. Header and Footer

* [4. Header and Footer](#4-header-and-footer)
    * [4.1 Header](#41-header)
        * [4.1.1 Header — Plain HTML First](#411-header--plain-html-first)
        * [4.1.2 Wire the Header into the Layout](#412-wire-the-header-into-the-layout)
    * [4.2 Footer](#42-footer)
        * [4.2.1 Footer — Plain HTML First](#421-footer--plain-html-first)
        * [4.2.2 Footer Content](#422-footer-content)
    * [Next](#next)


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

#### 4.2.2 Footer Content

Let's put some actual data into the footer.

**`app/components/Footer.tsx`**:
```tsx
const Footer = () => {
    /*
      new Date() runs at build time with output: "export".
      The resulting HTML is frozen at the build date — exactly right
      for a "Last update" notice on a static portfolio.
    */
    const currentYear = new Date().getFullYear();
    const currentDate = new Date().toLocaleDateString("de-DE", {
        year: "numeric",
        month: "short",
    });

    return (
        <footer className="site-footer">
            <div className="footer-content">
                <p>© {currentYear} [Your Name] | <a href="/impressum" className="underline">Impressum</a></p>
                <div className="text-gray-500 text-xs">{`Last update: ${currentDate} | Scraping or use in AI training prohibited.`}</div>
                <p>Made in [Your City] with ❤️</p>
            </div>
        </footer>
    );
};

export default Footer;
```

The middle line uses Tailwind utility classes directly — `text-gray-500 text-xs` — rather than a separate component, since this styling is only needed in one place.

---

### Next

* [5. Tailwind CSS](portfolio_tutorial_05_tailwind)
* [6. Navigation](portfolio_tutorial_06_navigation)
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


---
layout: default
title: "4. Header and Footer"
parent: Tutorial
nav_order: 4
has_children: false
---

#### Prof. Dr. Lena Gieseke | lena.gieseke@filmuniversitaet.de  
  
# Tutorial - A Portfolio Page

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





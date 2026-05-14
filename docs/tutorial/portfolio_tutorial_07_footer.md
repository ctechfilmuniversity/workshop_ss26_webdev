---
layout: default
title: "7. Footer"
parent: Tutorial
nav_order: 7
has_children: false
---

#### Prof. Dr. Lena Gieseke | lena.gieseke@filmuniversitaet.de  
  
# Tutorial - A Portfolio Page

## 7. Footer

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


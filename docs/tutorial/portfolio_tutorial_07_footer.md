---
layout: default
title: "7. Footer"
parent: Tutorial
nav_order: 7
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

### Next

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


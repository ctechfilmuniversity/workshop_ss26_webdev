---
layout: default
title: "11. Impressum"
parent: Tutorial
nav_order: 11
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
* [9. The About Page – Overview](portfolio_tutorial_09_about_overview)
* [10. The About Page – Accordion](portfolio_tutorial_10_about_accordion)


## 11. Impressum

German law requires websites to display a legal notice (Impressum).  

**`app/(routes)/impressum/page.tsx`**:
```tsx
import Image from "next/image";

const Impressum = () => {
    return (
        <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12 lg:py-16">
            <h1>Impressum</h1>

            <h3 className="mt-8">(Legal Notice)</h3>
            <p className="mt-8">
                <strong>[Your Name]</strong><br />
                [Street Address]<br />
                [Postal Code] [City]<br />
                [Country]
            </p>

            <p>
                E-mail:{" "}
                {/* Email shown as an image to prevent scraping by bots */}
                <Image
                    src="/img/contact/email_01.png"
                    alt="Email address"
                    width={120}
                    height={120}
                    className="w-42 sm:w-50 md:w-58 ml-4 h-auto inline-block"
                />
            </p>

            <h3 className="mt-8">Responsible under § 18 (2) MStV</h3>
            <p className="mt-8">
                [Your Name]<br />
                (address as above)
            </p>

            <h3 className="mt-8">Disclaimer</h3>
            <p className="mt-8">
                I do not assume any liability for the content of external links. The operators of the linked pages are solely responsible for their content.
            </p>

            <h3 className="mt-8">Terms of Use</h3>
            <p className="mt-8">
                The content of this website may not be accessed, copied, or used for the purposes of training machine learning models or automated data mining.
            </p>
        </div>
    );
};

export default Impressum;
```

Create a small screenshot of your email address (approximately 200–250 px wide), save it as `public/img/contact/email_01.png`. Showing the email as an image rather than text prevents email-harvesting bots from reading it.

---

### Next

* [12. Contact](portfolio_tutorial_12_contact)
* [13. Projects](portfolio_tutorial_13_projects)
* [14. Fonts](portfolio_tutorial_14_fonts)
* [15. Summary](portfolio_tutorial_15_summary)
* [16. Build and Deploy](portfolio_tutorial_16_deploy)
* [17. References and Links](portfolio_tutorial_17_references)


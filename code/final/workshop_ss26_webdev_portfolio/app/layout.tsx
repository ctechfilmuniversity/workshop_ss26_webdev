import "./globals.css"; // Import global styles so they apply everywhere

import Header from "@/app/components/Header";
import Footer from "./components/Footer";

import { Inter, Playfair_Display } from "next/font/google";
/*
  Inter is a variable font — all weights (100–900) are included automatically.
  variable: "--font-inter" exposes it as a CSS custom property on the element
  it is applied to.
  display: "swap" shows a system fallback font immediately, then swaps in
  Inter once it has loaded — prevents invisible text during page load.
*/
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});


const playfair = Playfair_Display({
    variable: "--font-playfair",
    display: "swap",
});

// RootLayout wraps every page in the site.
// children is the page currently being rendered.
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode; // Any valid React content
}>) {
    return (
        // lang="en" tells browsers and screen readers the page language
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
        <body className="flex flex-col min-h-screen">
            {/* flex flex-col: stack header, main, footer vertically */}
            {/* min-h-screen: body spans at least the full viewport height */}
            <Header />

            <main className="flex-grow w-full">
                {/* flex-grow: main expands to fill all space between header and footer */}
                {/* w-full: always full width */}
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[min(90vw,1600px)]">
                    {/* mx-auto: centre the content block horizontally */}
                    {/* px-*: horizontal breathing room at each breakpoint */}
                    {/* max-w-[min(90vw,1600px)]: never wider than 90% of the viewport,
                        capped at 1600px on very large screens */}
                    {children}
                </div>
            </main>

            <Footer />
        </body>
        </html>
    );
}
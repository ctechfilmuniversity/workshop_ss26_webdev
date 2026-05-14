import Link from "next/link";
import HeaderNav from "./HeaderNav";
import ButtonEmail from "./ButtonEmail";

/*
  Link from next/link is Next.js's enhanced anchor element.
  It prefetches linked pages and performs client-side navigation —
  page transitions feel instant because the HTML was prefetched.
*/
const Header = () => {
    return (
        <header className="site-header">
            <Link href="/" className="site-header-name">
                [Your Name]
            </Link>

        {/* Right side: nav + button grouped together */}
        <div className="flex items-center gap-4">
            <HeaderNav />
            <ButtonEmail
                email="hello@example.com"
                subject="Hello from the website"
                className="btn"
            >
                Say hi!
            </ButtonEmail>
        </div>
        </header>
    );
};


export default Header;
/*
  Large page-level h1. text-balance makes all lines roughly equal width.
  The actual font size comes from the h1 rule in globals.css (clamp fluid type).
*/
const HeroTitle = ({ text }: { text: string }) => {
    return (
        <div className="relative w-full">
            <h1 className="text-left text-balance">{text}</h1>
        </div>
    );
};

export default HeroTitle;
import HeroSectionText from "@/app/components/HeroSectionText";
import HeroImage from "@/app/components/HeroImage";
import HeroCanvas from "@/app/components/HeroCanvas";

const Home = () => {
    return (
        <>
            <div className="content-center py-4 sm:py-6 lg:py-10">
                <p className="intro">[One sentence capturing what you do.]</p>
            </div>
                <HeroCanvas>
                    <HeroImage
                        src="/img/home/home-hero.jpg"
                        alt="[Description of the image]"
                        priority
                    />
                </HeroCanvas>
                <HeroSectionText
                    title="[YOUR TITLE]"
                    text="[A short paragraph introducing your field or practice.]"
                />
        </>
    );
};

// Every page.tsx must have a default export — this is what Next.js renders.
export default Home;
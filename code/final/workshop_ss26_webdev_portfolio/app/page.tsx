import HeroSectionText from "@/app/components/HeroSectionText";
import HeroCanvas from "@/app/components/HeroCanvas";
import HeroImage from "@/app/components/HeroImage";
// import P5Canvas from "@/app/components/P5Canvas";
// import ThreeCanvas from "@/app/components/ThreeCanvas";
// import VideoCarousel from "@/app/components/VideoCarousel";
// import ShaderCanvas from "@/app/components/ShaderCanvas";




const Home = () => {
    return (
        <>
            {/* <div className="fixed inset-0 -z-10">
                <ShaderCanvas />
            </div> */}

            <div className="content-center py-4 sm:py-6 lg:py-10">
                <p className="intro">[One sentence capturing what you do.]</p>
            </div>
                <HeroCanvas>
                    <HeroImage
                        src="/img/home/home-hero.jpg"
                        alt="[Description of the image]"
                        priority
                    />
                    {/* <P5Canvas /> */}
                    {/* <ThreeCanvas /> */}
                     {/* <VideoCarousel /> */}
                     {/* <ShaderCanvas /> */}
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
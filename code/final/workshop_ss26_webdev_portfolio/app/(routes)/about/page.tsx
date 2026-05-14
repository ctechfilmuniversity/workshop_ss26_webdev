import AccordionAbout from "@/app/components/AccordionAbout";
import HeroSectionTextImage from "@/app/components/HeroSectionTextImage";

const About = () => {
    return (
        <>
        <HeroSectionTextImage
            title="[Your Name]"
            text="[Your personal introduction — interests, practice, professional focus.]"
            src="/img/about/portrait.jpg"
            alt="Portrait of [Your Name]"
            priority
        />

        {/* CV accordion — content comes from the .mdx files */}
        <AccordionAbout />
        </>
    );
};

export default About;
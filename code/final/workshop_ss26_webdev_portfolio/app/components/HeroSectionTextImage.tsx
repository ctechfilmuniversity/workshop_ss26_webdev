import HeroTitle from "./HeroTitle";
import TextImageBox, { TextImageProps } from "./TextImageBox";

type HeroSectionTextImageProps = {
    title: string;
} & TextImageProps;
/*
  The & operator intersects two types.
  HeroSectionTextImageProps has title plus everything in TextImageProps
  (text, src, alt) — without repeating those fields here.
*/

const HeroSectionTextImage = ({ title, text, src, alt, priority }: HeroSectionTextImageProps) => {
    return (
        <section className="relative w-full">
            <HeroTitle text={title} />
            <TextImageBox text={text} src={src} alt={alt} priority={priority} />
        </section>
    );
};

export default HeroSectionTextImage;
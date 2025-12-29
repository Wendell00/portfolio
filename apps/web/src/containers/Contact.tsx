"use client";

import { Wrapper } from "@/components";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { contactSection } from "@/lib/content/contact";
import { SECTION_IDS } from "@/lib/utils/config";

import { getSectionAnimation } from "@/styles/animations";

const Contact = () => {
  const { subtitle, title, paragraphs, link } = contactSection;
  return (
    <Wrapper
      id={SECTION_IDS.CONTACT}
      className="max-w-xl mx-auto text-center  !py-16 md:!py-24 mb-20 md:mb-32"
      {...getSectionAnimation}
    >
      <p className="mb-3 font-mono text-sm capitalize text-accent">{subtitle}</p>
      <h2 className="heading-secondary !mb-5">{title}</h2>

      {paragraphs.map((paragraph, i) => (
        <p key={paragraph + i.toString()}>{paragraph}</p>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => window.open(link, "_blank")}
        size={"lg"}
        hoverScale={1}
        tapScale={0.95}
        className="bg-transparent border-accent text-accent hover:text-white mt-8 h-12"
      >
        Say Hello
      </Button>
    </Wrapper>
  );
};

export default Contact;

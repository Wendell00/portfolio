import { NavbarSectionType } from "@/lib/types/sections";
import { resumeFileName } from "@/lib/utils/config";

export const navbarSection: NavbarSectionType = {
  navLinks: [
    { name: "home", url: "/#home" },
    { name: "about", url: "/#about" },
    { name: "blog", url: "/#blog" },
  ],
  cta: {
    title: "resume",
    url: `/${resumeFileName}`,
  },
};

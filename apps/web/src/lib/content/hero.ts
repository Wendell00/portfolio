import type { HeroSectionType } from "@/lib/types/sections";
import { resumeFileName } from "@/lib/utils/config";

export const heroSection: HeroSectionType = {
	subtitle: "Hi, my name is",
	title: "Wendell Borges.",
	tagline: "I create visually pleasing interfaces for the web.",
	description:
		"I'm a passionate Full-Stack web developer with hands-on experience in building web applications using React.js & Next.js with TypeScript, TailwindCSS, NestJs and Prisma, with UI/UX designing.",
	specialText: "Currently available for job opportunities",
	cta: {
		title: "see my resume",
		url: `/${resumeFileName}`,
		hideInDesktop: true,
	},
};

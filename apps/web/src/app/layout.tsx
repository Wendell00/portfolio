import Cursor from "@/components/ui/Cursor";
import { seoData } from "@/lib/content/portfolio";
import fontVariables from "@/lib/utils/fonts";

import "../styles/globals.css";

import type { Metadata } from "next";
import { Email } from "@/components/email/email";
import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import Social from "@/components/social/social";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
	title: seoData.title,
	authors: [
		{
			name: seoData.author,
		},
	],
	description: seoData.description,
	keywords: seoData.keywords.join(","),
	metadataBase: new URL(seoData.url),
	alternates: {
		canonical: seoData.url,
	},
	openGraph: {
		type: "website",
		url: seoData.url,
		title: seoData.title,
		description: seoData.description,
		images: seoData.image,
		siteName: seoData.title,
	},
	twitter: {
		card: "summary_large_image",
		title: seoData.title,
		description: seoData.description,
		images: seoData.image,
		site: seoData.url,
	},
	icons: [
		{
			rel: "apple-touch-icon",
			sizes: "120x120",
			url: "/favicons/apple-touch-icon.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "512x512",
			url: "/favicons/android-chrome-512x512.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "192x192",
			url: "/favicons/android-chrome-192x192.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "32x32",
			url: "/favicons/favicon-32x32.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "16x16",
			url: "/favicons/favicon-16x16.png",
		},
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={`text-text bg-bg ${fontVariables}`}>
				<Cursor className="block" />
				<ThemeProvider
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					<main
						className={`mx-auto px-6 sm:px-8 md:px-28 lg:px-20 xl:px-0 max-w-screen-lg`}
					>
						{children}
					</main>
					<Footer />
					<Social />
					<Email />
				</ThemeProvider>
			</body>
		</html>
	);
}

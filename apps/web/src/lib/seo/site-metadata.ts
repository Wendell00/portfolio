import type { Metadata } from "next";
import { seoData } from "@/lib/content/portfolio";

export const siteMetadata: Metadata = {
  title: seoData.title,
  authors: [{ name: seoData.author }],
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
      url: "/favicons/web-app-manifest-512x512.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/favicons/web-app-manifest-192x192.png",
    },
    {
      rel: "icon",
      sizes: "32x32",
      url: "/favicons/favicon.svg",
    },
    {
      rel: "icon",
      sizes: "16x16",
      url: "/favicons/favicon.svg",
    },
  ],
};

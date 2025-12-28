import Cursor from "@/components/ui/Cursor";
import fontVariables from "@/lib/utils/fonts";
import "../styles/globals.css";
import { Email } from "@/components/email/email";
import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import Social from "@/components/social/social";
import { siteMetadata } from "@/lib/seo/site-metadata";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`text-text bg-bg ${fontVariables}`}>
        <Cursor className="block" />
        <ThemeProvider defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="mx-auto px-6 sm:px-8 md:px-28 lg:px-20 xl:px-0 max-w-screen-lg">
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

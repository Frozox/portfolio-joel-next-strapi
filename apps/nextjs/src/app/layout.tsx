import type { Metadata } from "next";
import { Lato as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/libs/utils";
import MainNav from "@/components/mainNav";
import { ThemeProvider } from "@/helpers/provider/theme/themeProvider"
import { ArtCategoryProvider } from "@/helpers/provider/strapi/artCategoryProvider";

export const fontSans = FontSans({ weight: "400", subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Joel Chapeau",
  description: "Portfolio de Joel",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
  return (
    <html lang="fr">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="white"
          enableSystem
          disableTransitionOnChange
        >
          <ArtCategoryProvider>
            <MainNav className="sticky md:fixed md:bg-background" />
            <main className="h-screen w-full md:pt-24">
              {children}
            </main>
          </ArtCategoryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
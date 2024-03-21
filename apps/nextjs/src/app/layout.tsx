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
      <body className={cn("h-screen bg-background font-sans antialiased", fontSans.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="white"
          enableSystem
          disableTransitionOnChange
        >
          <ArtCategoryProvider>
            <header className="h-28">
              <MainNav className="sticky md:fixed md:bg-background" />
            </header>
            <main className="h-full w-full">
              {children}
            </main>
          </ArtCategoryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
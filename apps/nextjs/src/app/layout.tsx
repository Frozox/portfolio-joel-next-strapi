import MainNav from '@/components/nav/mainNav';
import QueryClientProvider from '@/helpers/provider/react-query/queryClientProvider';
import { ArtCategoryProvider } from '@/helpers/provider/strapi/artCategoryProvider';
import { ThemeProvider } from '@/helpers/provider/theme/themeProvider';
import { cn } from '@/libs/utils';
import type { Metadata } from 'next';
import { Lato as FontSans } from 'next/font/google';
import './globals.css';

export const fontSans = FontSans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Joel Chapeau',
  description: 'Portfolio de Joel',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className="scroll-smooth scrollbar-hide"
    >
      <body
        className={cn(
          fontSans.className,
          'mx-auto h-screen max-w-[2500px] self-center bg-background align-middle font-sans antialiased',
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="white"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider>
            <ArtCategoryProvider>
              <header className="h-28">
                <MainNav className="sticky mx-auto h-28 w-full max-w-[2500px] md:fixed md:bg-background" />
              </header>
              <main className="h-[calc(100vh-7rem)] w-full">{children}</main>
            </ArtCategoryProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

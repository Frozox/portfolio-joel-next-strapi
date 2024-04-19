import MainNav from '@/components/mainNav';
import QueryClientProvider from '@/helpers/provider/react-query/queryClientProvider';
import { ArtCategoryProvider } from '@/helpers/provider/strapi/artCategoryProvider';
import { ThemeProvider } from '@/helpers/provider/theme/themeProvider';
import { cn } from '@/libs/utils';
import type { Metadata } from 'next';
import { Lato as FontSans } from 'next/font/google';
import './globals.css';

export const fontSans = FontSans({ weight: '400', subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Joel Chapeau',
  description: 'Portfolio de Joel',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
  return (
    <html lang="fr" suppressHydrationWarning className="scrollbar-hide">
      <body className={cn(fontSans.className, 'h-screen bg-background font-sans antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="white"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider>
            <ArtCategoryProvider>
              <header className="h-28">
                <MainNav className="sticky h-28 md:fixed md:bg-background" />
              </header>
              <main className="h-[calc(100vh-7rem)] w-full">
                {children}
              </main>
            </ArtCategoryProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
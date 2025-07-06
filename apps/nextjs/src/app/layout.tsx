import MainNav from '@/components/nav/mainNav';
import { ThemeToggle } from '@/components/theme/themeToggle';
import getQueryClient from '@/helpers/hook/react-query';
import { prefetchArtCategories, prefetchArts } from '@/helpers/hook/strapi/request';
import { ContactProvider } from '@/helpers/provider/contact/contactProvider';
import QueryClientProvider from '@/helpers/provider/react-query/queryClientProvider';
import { ArtCategoryProvider } from '@/helpers/provider/strapi/artCategoryProvider';
import { ThemeProvider } from '@/helpers/provider/theme/themeProvider';
import { cn } from '@/libs/utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Lato as FontSans } from 'next/font/google';
import './globals.css';

type TLayoutProps = {
  children: React.ReactNode
}

export const fontSans = FontSans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Joel Chapeau',
  description: 'Portfolio de Joel',
};

const RootLayout = async ({ children }: Readonly<TLayoutProps>) => {
  const queryClient = getQueryClient();
  await prefetchArtCategories(queryClient, { populate: 'image' });
  await prefetchArts(queryClient, { populate: 'thumbnail', filters: { id: { $in: [null] }, sold_out: { $eq: false } } });

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
            <HydrationBoundary state={dehydrate(queryClient)}>
              <ArtCategoryProvider>
                <ContactProvider>
                  <header className="h-28">
                    <MainNav className="sticky mx-auto h-28 w-full max-w-[2500px] md:fixed md:bg-background" />
                  </header>
                  <main className="h-[calc(100vh-7rem)] w-full">{children}</main>
                  <div className='fixed bottom-4 right-4'>
                    <ThemeToggle />
                  </div>
                </ContactProvider>
              </ArtCategoryProvider>
            </HydrationBoundary>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

import Footer from '@components/nav/footer';
import MainNav from '@components/nav/mainNav';
import JsonLdLoader from '@components/seo/jsonLdLoader';
import { ThemeToggle } from '@components/theme/themeToggle';
import { env } from '@env';
import getQueryClient from '@helpers/hook/react-query';
import {
  prefetchArtCategories,
  prefetchArts,
} from '@helpers/hook/strapi/request';
import { ContactProvider } from '@helpers/provider/contact/contactProvider';
import QueryClientProvider from '@helpers/provider/react-query/queryClientProvider';
import { ArtCategoryProvider } from '@helpers/provider/strapi/artCategoryProvider';
import { ThemeProvider } from '@helpers/provider/theme/themeProvider';
import { cn } from '@libs/utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Lato as FontSans } from 'next/font/google';
import { Organization, WithContext } from 'schema-dts';
import './globals.css';

type TLayoutProps = {
  children: React.ReactNode;
};

export const fontSans = FontSans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sans',
});

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: {
      template: '%s • Joel Chapeau',
      default: 'Joel Chapeau',
    },
    description:
      'Joël Chapeau est un artiste plasticien contemporain français dont les œuvres explorent la mémoire, la matière et l’abstraction à travers des techniques mixtes.',
    applicationName: 'Portfolio de Joel Chapeau',
    openGraph: {
      images: new URL(`${env.NEXT_PUBLIC_FRONTEND_HOST}/og-image.jpg`),
      description:
        'Joël Chapeau est un artiste plasticien français dont le travail mêle abstraction, mémoire et matière. À travers la peinture, l’assemblage et l’expérimentation, il explore la trace, le geste et le temps, proposant une œuvre profondément sensorielle et introspective.',
      title: 'Joël Chapeau',
      url: new URL(env.NEXT_PUBLIC_FRONTEND_HOST),
    },
    authors: [{ name: 'Joël Chapeau' }, { name: 'Tom Cuillandre' }],
    generator: 'Next.js',
    keywords: [
      'joel chapeau',
      'joel artiste',
      'joel peinture',
      'joel sculpture',
      'artiste plasticien',
      'artiste grenade',
    ],
    referrer: 'origin-when-cross-origin',
    creator: 'Joël Chapeau',
    publisher: 'Joël Chapeau',
    metadataBase: new URL(env.NEXT_PUBLIC_FRONTEND_HOST),
    alternates: {
      canonical: '/',
    },
  };
};
const RootLayout = async ({ children }: Readonly<TLayoutProps>) => {
  const queryClient = getQueryClient();
  await prefetchArtCategories(queryClient, { sort: 'id', populate: 'image' });
  await prefetchArts(queryClient, {
    populate: 'thumbnail',
    filters: { id: { $in: [null] }, sold_out: { $eq: false } },
  });

  const organizationStructuredJsonLd: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: env.NEXT_PUBLIC_FRONTEND_HOST,
    logo: `${env.NEXT_PUBLIC_FRONTEND_HOST}/joel.jpg`,
    name: 'Joël Chapeau',
    description:
      'Joël Chapeau est un artiste plasticien contemporain français dont les œuvres explorent la mémoire, la matière et l’abstraction à travers des techniques mixtes.',
  };

  return (
    <html
      lang='fr'
      suppressHydrationWarning
      className='scroll-smooth scrollbar-hide'
    >
      <body
        className={cn(
          fontSans.className,
          'mx-auto h-screen max-w-[2500px] self-center bg-background align-middle font-sans antialiased'
        )}
      >
        <JsonLdLoader
          key='organization'
          jsonLd={organizationStructuredJsonLd}
        />
        <QueryClientProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ArtCategoryProvider>
              <ContactProvider>
                <header className='h-28'>
                  <MainNav className='sticky mx-auto h-28 w-full max-w-[2500px] md:fixed md:bg-background' />
                </header>
                <main className='min-h-[calc(100vh-7rem)] w-full'>
                  {children}
                </main>
                <footer className='w-full max-w-[2500px] px-10 pb-8'>
                  <Footer />
                </footer>
                <div className='fixed bottom-4 right-4'>
                  <ThemeProvider
                    attribute='class'
                    defaultTheme='white'
                    enableSystem
                    disableTransitionOnChange
                  >
                    <ThemeToggle />
                  </ThemeProvider>
                </div>
              </ContactProvider>
            </ArtCategoryProvider>
          </HydrationBoundary>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;

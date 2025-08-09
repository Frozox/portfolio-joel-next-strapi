import { Title } from '@components/ui/title';
import getQueryClient from '@helpers/hook/react-query';
import { prefetchNews } from '@helpers/hook/strapi/request';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

type TLayoutProps = {
  children: React.ReactNode;
};

export const generateMetadata = (): Metadata => {
  return {
    title: 'Expositions',
    description:
      'Découvrez les expositions de Joël Chapeau, artiste peintre à Grenade : aquarelles, acryliques et techniques mixtes présentées en galeries et espaces culturels.',
    keywords: [
      'joel chapeau exposition',
      'joel exposition',
      'exposition grenade',
    ],
    alternates: {
      canonical: 'expositions',
    },
  };
};

const NewsLayout = async ({ children }: Readonly<TLayoutProps>) => {
  const queryClient = getQueryClient();
  await prefetchNews(queryClient, { populate: 'content.media' });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Title
        h1='expositions'
        h2='Expositions & Actualités'
        className='mb-10 mt-8'
      />
      {children}
    </HydrationBoundary>
  );
};

export default NewsLayout;

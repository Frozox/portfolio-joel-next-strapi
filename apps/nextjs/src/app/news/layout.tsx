import { Title } from '@/components/ui/title';
import getQueryClient from '@/helpers/hook/react-query';
import { prefetchNews } from '@/helpers/hook/strapi/request';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

type TLayoutProps = {
  children: React.ReactNode
}

export const generateMetadata = (): Metadata => {
  return {
    title: 'Joel Chapeau • News',
  };
};

const NewsLayout = async ({children} : Readonly<TLayoutProps>) => {
  const queryClient = getQueryClient();
  await prefetchNews(queryClient, { populate: 'content.media' });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Title title='nouveautés'  className='mb-10 mt-8'/>
      {children}
    </HydrationBoundary>
  );
};

export default NewsLayout;
import { ArtFilter } from '@/components/artFilter/artFilter';
import { Title } from '@/components/ui/title';
import getQueryClient from '@/helpers/hook/react-query';
import { prefetchArts, prefetchArtTagCategories } from '@/helpers/hook/strapi/request';
import { ArtFilterProvider } from '@/helpers/provider/strapi/artFilterProvider';
import { defaultPaginationFilter } from '@/libs/pagination';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

type TLayoutProps = {
  children: React.ReactNode
  params: {
    categorySlug: string
  },
}

export const generateMetadata = ({ params }: TLayoutProps): Metadata => {
  return {
    title: `Joel Chapeau • ${params.categorySlug.replace(/./, c => c.toUpperCase())}`,
  };
};

const CategoryLayout = async ({ children, params }: Readonly<TLayoutProps>) => {
  const queryClient = getQueryClient();
  await prefetchArtTagCategories(queryClient, { populate: '*', sort: 'display_name', filters: { art_categories: { slug: params.categorySlug } } });
  await prefetchArts(queryClient, { populate: '*', filters: { art_category: { slug: params.categorySlug } }, pagination: defaultPaginationFilter });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Title title={params.categorySlug} className='mb-10 mt-8'/>
      <ArtFilterProvider activeCategorySlug={params.categorySlug}>
        <div className="h-11">
          <ArtFilter className="sticky mx-auto h-11 max-w-[2500px] bg-background md:fixed" />
        </div>
        <div className="h-[calc(100%-2.75rem)] w-full">
          {children}
        </div>
      </ArtFilterProvider>
    </HydrationBoundary>
  );
};

export default CategoryLayout;
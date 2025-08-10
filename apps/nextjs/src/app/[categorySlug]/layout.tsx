import { ArtFilter } from '@components/artFilter/artFilter';
import JsonLdLoader from '@components/seo/jsonLdLoader';
import { Title } from '@components/ui/title';
import getQueryClient from '@helpers/hook/react-query';
import {
  fetchArtCategories,
  prefetchArts,
  prefetchArtTagCategories,
} from '@helpers/hook/strapi/request';
import { ArtFilterProvider } from '@helpers/provider/strapi/artFilterProvider';
import { getMediaFromFormat } from '@libs/mediaFormat';
import { defaultPaginationFilter } from '@libs/pagination';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Product, WithContext } from 'schema-dts';

type TLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    categorySlug: string;
  }>;
};

const getCurrentArtCategory = async (slug: string) => {
  const queryClient = getQueryClient();
  const { data } = await fetchArtCategories(queryClient, {
    filters: { slug },
    populate: 'image',
  });
  if (!data.length) redirect('/');
  return data[0];
};

export const generateMetadata = async ({
  params,
}: TLayoutProps): Promise<Metadata> => {
  const { categorySlug } = await params;
  const currentArtCategory = await getCurrentArtCategory(categorySlug);

  return {
    title: currentArtCategory.name,
    description: currentArtCategory.metaDescription,
    keywords: currentArtCategory.metaKeywords,
    alternates: {
      canonical: currentArtCategory.slug,
    },
  };
};

const CategoryLayout = async ({ children, params }: Readonly<TLayoutProps>) => {
  const { categorySlug } = await params;
  const queryClient = getQueryClient();
  await prefetchArtTagCategories(queryClient, {
    populate: '*',
    sort: 'display_name',
    filters: { art_categories: { slug: categorySlug } },
  });
  await prefetchArts(queryClient, {
    filters: { art_category: { slug: categorySlug } },
    pagination: defaultPaginationFilter,
    sort: 'sortOrder',
    populate: '*',
  });
  await prefetchArts(queryClient, {
    filters: {
      $and: [{ art_tags: { $or: [] } }],
      art_category: { slug: categorySlug },
    },
    pagination: defaultPaginationFilter,
    sort: 'sortOrder',
    populate: '*',
  });
  const currentArtCategory = await getCurrentArtCategory(categorySlug);

  const formatedThumbnail = getMediaFromFormat(
    currentArtCategory.image,
    'thumbnail'
  );

  const artCategoryStructuredJsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: currentArtCategory.name,
    image: formatedThumbnail.url,
    description: currentArtCategory.metaDescription,
  };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JsonLdLoader
        key={currentArtCategory.slug}
        jsonLd={artCategoryStructuredJsonLd}
      />
      <ArtFilterProvider activeCategorySlug={categorySlug}>
        <div className='h-11'>
          <ArtFilter className='sticky mx-auto h-11 max-w-[2500px] bg-background md:fixed' />
        </div>
        <div className='h-[calc(100%-2.75rem)] w-full'>
          <Title
            h1={currentArtCategory.name}
            h2={currentArtCategory.title}
            className='mb-8 mt-14 lg:mb-0'
          />
          {children}
        </div>
      </ArtFilterProvider>
    </HydrationBoundary>
  );
};

export default CategoryLayout;

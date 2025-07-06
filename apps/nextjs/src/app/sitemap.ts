import { env } from '@/env.mjs';
import { StrapiContentTypes, strapiInstance } from '@/helpers/hook/strapi';
import { ArtCategory } from '@portfolio/strapi/src/api/art-category/content-types/art-category/art-category';
import { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const { data: artCategories } = await strapiInstance.find<ArtCategory[]>(StrapiContentTypes.ArtCategories);
  return [
    {url: env.NEXT_PUBLIC_FRONTEND_HOST,lastModified: new Date(), priority: 1},
    {url: `${env.NEXT_PUBLIC_FRONTEND_HOST}/news`,lastModified: new Date(), priority: 0.5},
    {url: `${env.NEXT_PUBLIC_FRONTEND_HOST}/contact`,lastModified: new Date(), priority: 0.8},
    ...artCategories.map(artCategory => ({url: `${env.NEXT_PUBLIC_FRONTEND_HOST}/${artCategory.attributes.slug}`, lastModified: new Date(), priority: 0.7}))
  ];
};

export default sitemap;
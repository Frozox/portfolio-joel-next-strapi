import { env } from '@env';
import { StrapiContentTypes, strapiInstance } from '@helpers/hook/strapi';
import type { ArtCategory_Plain } from '@portfolio/strapi/src/api/art-category/content-types/art-category/art-category';
import type { MetadataRoute } from 'next';

const generateDynamicSiteMap = async (): Promise<MetadataRoute.Sitemap> => {
  const { data: artCategories } = await strapiInstance.find<
    ArtCategory_Plain[]
  >(StrapiContentTypes.ArtCategories);
  return artCategories.map((artCategory) => ({
    url: `${env.NEXT_PUBLIC_FRONTEND_HOST}/${artCategory.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));
};
const generateSiteMap = async (): Promise<MetadataRoute.Sitemap> => {
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: env.NEXT_PUBLIC_FRONTEND_HOST,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${env.NEXT_PUBLIC_FRONTEND_HOST}/expositions`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${env.NEXT_PUBLIC_FRONTEND_HOST}/contact`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ];

  try {
    const dynamicSitemap = await generateDynamicSiteMap();
    sitemap.push(...dynamicSitemap);
  } catch {}
  return sitemap;
};

export default generateSiteMap;

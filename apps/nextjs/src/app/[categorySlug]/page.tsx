'use client';

import { ArtFilterPagination } from '@/components/artFilter';
import { ContentLoader } from '@/components/loading';
import { env } from '@/env.mjs';
import { useArtFilter } from '@/helpers/context/strapi/artFilterContext';
import Image from 'next/image';

type TCategoryProps = {
  params: {
    categorySlug: string
  }
}

const Category = ({ params }: TCategoryProps) => {
  const { artsQuery: { response, isError, isLoading } } = useArtFilter();

  return (
    <div className="size-full">
      <ContentLoader isLoading={isLoading} isError={isError} className='relative h-1/2'>
        <div className="animate-content-load">
          {
            response?.data.map(art => (
              <div key={art.id}>
                {art.id} | {art.attributes.name}
                <Image src={`${env.NEXT_PUBLIC_BACKEND_HOST}${art.attributes.thumbnail.data.attributes.url}`} blurDataURL={art.attributes.thumbnail.data.attributes.placeholder} alt={''} width={100} height={100} />
                <hr></hr>
              </div>
            ))
          }
        </div>
      </ContentLoader>
      <div className='sticky inset-x-0 bottom-0 mb-2'>
        <ArtFilterPagination />
      </div>
    </div>
  );
};

export default Category;
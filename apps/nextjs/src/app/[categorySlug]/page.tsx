'use client';

import { ArtFilterPagination } from '@/components/artFilter';
import { ContentLoader } from '@/components/loading';
import { useArtFilter } from '@/helpers/context/strapi/artFilterContext';

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
                <hr></hr>
              </div>
            ))
          }
        </div>
      </ContentLoader>
      <ArtFilterPagination />
    </div>
  );
};

export default Category;
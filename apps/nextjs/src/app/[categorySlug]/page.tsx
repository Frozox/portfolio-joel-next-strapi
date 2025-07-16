'use client';

import { ArtCaroussel } from '@/components/artFilter/artCaroussel';
import { ArtFilterPagination } from '@/components/artFilter/artFilter';
import { useArtFilter } from '@/helpers/context/strapi/artFilterContext';
import { KeenSliderProvider } from '@/helpers/provider/keen/keenSliderProvider';

type TCategoryProps = {
  params: {
    categorySlug: string
  }
}

const Category = ({ params }: TCategoryProps) => {
  const { artsQuery: { isError, isLoading } } = useArtFilter();

  return (
    <div className="flex size-full flex-col justify-between">
      <div className="animate-content-load">
        <KeenSliderProvider
          options={{
            mode: 'snap',
            slides: {
              perView: 1,
              spacing: 20,
              origin: 'center',
            },
            defaultAnimation: {
              duration: 800,
            },
          }}
        >
          <ArtCaroussel />
        </KeenSliderProvider>
      </div>
      <div>
        <ArtFilterPagination className='bg-background py-2' />
      </div>
    </div>
  );
};

export default Category;
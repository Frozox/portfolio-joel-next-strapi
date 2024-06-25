'use client';

import { ArtCaroussel } from '@/components/artFilter/artCaroussel';
import { ArtFilterPagination } from '@/components/artFilter/artFilter';
import { ContentLoader } from '@/components/ui/loading';
import { useArtFilter } from '@/helpers/context/strapi/artFilterContext';

type TCategoryProps = {
  params: {
    categorySlug: string
  }
}

const Category = ({ params }: TCategoryProps) => {
  const { artsQuery: { isError, isLoading } } = useArtFilter();

  return (
    <div className="flex size-full flex-col justify-between">
      <ContentLoader isLoading={isLoading} isError={isError} className='relative h-1/2'>
        <div className="animate-content-load">
          {/* <div className='container'>
            <div className='columns-1 justify-center p-8'>
            </div>
            <div className='columns-1 justify-center gap-4 space-y-4 p-8 md:columns-2 lg:columns-3'>            
              {response?.data.map(art => {
                const thumbnail = art.attributes.thumbnail.data.attributes;
                return (
                  <motion.div
                    key={art.id}
                    className='h-min w-full'
                    whileHover={{ scale:0.98 }}>
                    <Image
                      src={`${env.NEXT_PUBLIC_BACKEND_HOST}${thumbnail.url}`}
                      blurDataURL={thumbnail.placeholder}
                      placeholder={thumbnail.placeholder ? 'blur' : 'empty'}
                      alt={thumbnail.name}
                      width={thumbnail.width}
                      height={thumbnail.height}
                      className='cursor-pointer object-cover' />
                  </motion.div>
                );
              })}
            </div>
          </div> */}
          <ArtCaroussel/>
        </div>
      </ContentLoader>
      <div>
        <ArtFilterPagination className='bg-background py-2' />
      </div>
    </div>
  );
};

export default Category;
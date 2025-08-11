import Slider from '@components/slider/slider';
import { ContentLoader } from '@components/ui/loading';
import { env } from '@env';
import { useKeenSlider } from '@helpers/context/keen/keenSliderContext';
import { useArtCategory } from '@helpers/context/strapi/artCategoryContext';
import { getMediaFromFormat } from '@libs/mediaFormat';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { Button } from '../ui/button';
import { DirectionAwareHover } from '../ui/directionAwareHover';
import type { TKeenSlideProps } from '../ui/keenSlider';

const HomeSlider = () => {
  const { artCategories, isError, isLoading } = useArtCategory();
  const { setSlides, slides: keenSlides } = useKeenSlider();

  const slides = useMemo<TKeenSlideProps[]>(() => {
    if (artCategories.length === 0) return [];
    const formatedSlides: TKeenSlideProps[] = artCategories.map((item) => {
      const formatedImage = getMediaFromFormat(item.image, 'large');

      return {
        children: (
          <DirectionAwareHover
            imageUrl={`${env.NEXT_PUBLIC_BACKEND_HOST}${formatedImage.url}`}
            // @ts-expect-error - thumbhash not exists in media type
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            thumbhash={item.image.thumbhash}
          >
            <div className='m-4'>
              <p className='pb-10 text-5xl md:text-6xl'>{item.name}</p>
              <Link href={`/${item.slug}`}>
                <Button
                  type='button'
                  variant='outline'
                  className='w-fit border-white bg-transparent p-6 text-xl hover:bg-background md:min-w-60 md:text-2xl'
                >
                  Voir les travaux
                </Button>
              </Link>
            </div>
          </DirectionAwareHover>
        ),
      };
    });
    return formatedSlides;
  }, [artCategories]);

  useEffect(() => {
    setSlides(slides);
  }, [slides, setSlides]);

  return (
    <ContentLoader
      isLoading={isLoading || (!keenSlides.length && !!slides.length)}
      isError={isError}
      className='h-[30vh] w-full lg:h-[50vh] xl:h-[70vh] 2xl:h-[80vh]'
    >
      <Slider className='lg:h-[50vh] xl:h-[70vh] 2xl:h-[80vh]' />
    </ContentLoader>
  );
};

export default HomeSlider;

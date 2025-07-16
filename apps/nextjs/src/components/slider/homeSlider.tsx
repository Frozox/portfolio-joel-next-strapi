import Slider from '@/components/slider/slider';
import { ContentLoader } from '@/components/ui/loading';
import { env } from '@/env.mjs';
import { useKeenSlider } from '@/helpers/context/keen/keenSliderContext';
import { useArtCategory } from '@/helpers/context/strapi/artCategoryContext';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { DirectionAwareHover } from '../ui/directionAwareHover';
import { TKeenSlideProps } from '../ui/keenSlider';

const HomeSlider = () => {
  const { artCategories, isError, isLoading } = useArtCategory();
  const { setSlides, slides: keenSlides } = useKeenSlider();

  const slides = React.useMemo<TKeenSlideProps[]>(() => {
    if (artCategories.length === 0) return [];
    const formatedSlides: TKeenSlideProps[] = artCategories.map((item) => {
      const image = item.attributes.image.data;
      return {
        children: (
          <DirectionAwareHover imageUrl={`${env.NEXT_PUBLIC_BACKEND_HOST}${image.attributes.formats.large.url}`} blurData={
            // @ts-expect-error,
            image.attributes.placeholder
          }>
            <div className="m-4">
              <p className="pb-10 text-5xl md:text-6xl">{item.attributes.name}</p>
              <Link href={`/${item.attributes.slug}`}>
                <Button type="button" variant="outline" className="w-fit border-white bg-transparent p-6 text-xl hover:bg-background md:min-w-60 md:text-2xl">Voir les travaux</Button>
              </Link>
            </div>
          </DirectionAwareHover>
        )
      };
    });
    return formatedSlides;
  }, [artCategories]);
  
  React.useEffect(() => {
    setSlides(slides);
  }, [slides, setSlides]);

  return (
    <ContentLoader isLoading={isLoading || !keenSlides.length && !!slides.length} isError={isError} className='h-[30vh] w-full lg:h-[50vh] xl:h-[70vh] 2xl:h-[80vh]'>
      <Slider className='lg:h-[50vh] xl:h-[70vh] 2xl:h-[80vh]'/>
    </ContentLoader>
  );
};

export default HomeSlider;
import Slider from '@/components/slider/slider';
import { env } from '@/env.mjs';
import { useKeenSlider } from '@/helpers/context/keen/keenSliderContext';
import { useArtCategory } from '@/helpers/context/strapi/artCategoryContext';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { DirectionAwareHover } from '../ui/directionAwareHover';
import { TKeenSlideProps } from '../ui/keenSlider';

const HomeSlider = () => {
  const { artCategories } = useArtCategory();
  const { setSlides } = useKeenSlider();

  const slides = React.useMemo<TKeenSlideProps[]>(() => {
    if (artCategories.length === 0) return [];
    const formatedSlides: TKeenSlideProps[] = artCategories.map((item) => {
      const image = item.attributes.image.data;
      return {
        children: (
          <DirectionAwareHover imageUrl={`${env.NEXT_PUBLIC_BACKEND_HOST}${image.attributes.url}`} blurData={
            image.attributes.placeholder
          }>
            <div className="m-4">
              <div className="pb-10 text-5xl md:text-6xl">{item.attributes.name}</div>
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
    <Slider className='lg:h-[50vh] xl:h-[70vh] 2xl:h-[80vh]'/>
  );
};

export default HomeSlider;
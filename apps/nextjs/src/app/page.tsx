'use client';

import HomeSlider from '@/components/homeSlider';
import { ContentLoader } from '@/components/loading';
import { Button } from '@/components/ui/button';
import { DirectionAwareHover } from '@/components/ui/directionAwareHover';
import { TKeenSlideProps } from '@/components/ui/keenSlider';
import { env } from '@/env.mjs';
import { useArtCategory } from '@/helpers/context/strapi/artCategoryContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Home = () => {
  const [slides, setSlides] = React.useState<TKeenSlideProps[]>([]);
  const { artCategories, isError, isLoading } = useArtCategory();

  React.useEffect(() => {
    if (artCategories.length === 0) return;
    const formatedSlides: TKeenSlideProps[] = artCategories.map((item) => {
      const image = item.attributes.image.data;

      return {
        children: (
          <DirectionAwareHover imageUrl={`${env.NEXT_PUBLIC_BACKEND_HOST}${image.attributes.url}`} blurData={
            // TODO add missing placeholder value
            // @ts-expect-error
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

    setSlides(formatedSlides);
  }, [artCategories]);

  return (
    <div className="size-full">
      <ContentLoader isLoading={isLoading} isError={isError}>
        <div className="h-full animate-content-load">
          <HomeSlider slides={slides} className="h-4/5 md:h-3/5" />
          <div className="mt-16 flex flex-col items-center justify-center text-center md:mt-20">
            <Image src="/joel.jpg" className="rounded-full" height={200} width={200} alt="joel" />
            <div className="mt-8">nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis</div>
            <hr className="my-8 h-px w-64 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-foreground to-transparent opacity-25" />
            <div className="mb-8">enim praesent elementum</div>
          </div>
        </div>
      </ContentLoader>
    </div>
  );
};

export default Home;
'use client';

import Slider from '@/components/slider/slider';
import { Button } from '@/components/ui/button';
import { TKeenSlideProps } from '@/components/ui/keenSlider';
import { env } from '@/env.mjs';
import { useContact } from '@/helpers/context/contact/contactContext';
import { useKeenSlider } from '@/helpers/context/keen/keenSliderContext';
import { useArtFilter } from '@/helpers/context/strapi/artFilterContext';
import { cn } from '@/libs/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

type TArtCaroussel = React.HTMLAttributes<HTMLElement> & {};

type TArtCarousselSlider = React.HTMLAttributes<HTMLElement> & {
  name: string;
  slides: TArtCarousselImage[];
};

type TArtCarousselImage = {
  url: string;
  placeholder: string;
  width: number;
  height: number;
};

type TArtCarousselItem = {
  id: number;
  name: string;
  height: number;
  width: number;
  depth?: number;
  description?: string;
  sold_out?: boolean;
  thumbnail: TArtCarousselImage;
  images: TArtCarousselImage[];
  art_tags?: TArtCarousselItemTag[];
};

type TArtCarousselItemTag = {
  id: number;
  tag: string;
};

export const ArtCarousselSlider = ({ ...props }: TArtCarousselSlider) => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  return (
    <div className='relative size-full'>
      {props.slides.map((image, index) => {
        return (
          <div key={index} className={cn('size-full transition-opacity duration-300 ease-in-out', index !== activeSlide && 'opacity-0 size-0')}>
            <canvas
              height={image.height}
              width={image.width}
              className="max-h-full max-w-full"
            />
            <Image
              src={image.url}
              alt={props.name}
              width={image.width}
              height={image.height}
              placeholder='blur'
              blurDataURL={image.placeholder}
              className="absolute bottom-0"
            />
          </div>
        );
      })}
      <div className='absolute inset-x-0 bottom-2 flex justify-center gap-3'>
        {props.slides.length > 1 && props.slides.map((image, index) => (
          <div key={index} className={cn('size-4 rounded-full border border-black bg-white transition-all duration-300 ease-in-out', index === activeSlide && 'w-8')} onClick={() => setActiveSlide(index)} />
        ))}
      </div>
    </div>
  );
};

export const ArtCaroussel = ({ ...props }: TArtCaroussel) => {
  const {
    artsQuery: { response },
  } = useArtFilter();
  const { sliderInstance, setSlides } = useKeenSlider();
  const { savedArts, toggleSavedArt } = useContact();

  const selectedArtItemRef = React.useRef<HTMLDivElement>(null);
  const artItems = React.useMemo<TArtCarousselItem[]>(
    () =>
      response?.data.map(
        (art): TArtCarousselItem => ({
          id: art.id,
          name: art.attributes.name,
          thumbnail: {
            url: `${env.NEXT_PUBLIC_BACKEND_HOST}${art.attributes.thumbnail.data.attributes.url}`,
            placeholder: art.attributes.thumbnail.data.attributes.placeholder,
            width: art.attributes.thumbnail.data.attributes.width,
            height: art.attributes.thumbnail.data.attributes.height,
          },
          images: art.attributes?.images?.data?.map(
            (image): TArtCarousselImage => ({
              url: `${env.NEXT_PUBLIC_BACKEND_HOST}${image.attributes.url}`,
              placeholder: image.attributes.placeholder,
              width: image.attributes.width,
              height: image.attributes.height,
            }),
          ) ?? [],
          art_tags: art.attributes?.art_tags?.data.map(
            (tag): TArtCarousselItemTag => ({
              id: tag.id,
              tag: tag.attributes.tag,
            }),
          ),
          height: art.attributes.height,
          width: art.attributes.width,
          depth: art.attributes.depth,
          description: art.attributes.description,
          sold_out: art.attributes.sold_out,
        }),
      ) ?? [],
    [response?.data],
  );

  const slides = React.useMemo<TKeenSlideProps[]>(() => {
    return artItems.map(
      (item): TKeenSlideProps => ({
        children: (
          <div
            className="flex size-full flex-col justify-center px-2 lg:flex-row lg:px-4"
            key={item.id}
          >
            <div className="self-center lg:self-auto">
              <ArtCarousselSlider name={item.name} slides={[item.thumbnail, ...item.images]}/>
            </div>
            <div className="mt-6 flex justify-center lg:relative lg:mx-10 lg:mt-0 lg:w-64 lg:justify-start lg:self-end">
              <div>
                <h2 className="mb-4 text-xl font-medium md:text-2xl">{item.name}</h2>
                <div>
                  {item.art_tags?.map((tag) => (
                    <p className="text-foreground" key={tag.id}>
                      {tag.tag}
                    </p>
                  ))}
                  <p className="text-foreground">
                    {item.depth
                      ? `${item.height} x ${item.width} x ${item.depth} cm`
                      : `${item.height} x ${item.width} cm`}
                  </p>
                  <div className={cn(item?.sold_out ? 'cursor-not-allowed' : 'cursor-pointer')}>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => toggleSavedArt({
                        id: item.id,
                        name: item.name,
                        thumbnail: item.thumbnail,
                      })}
                      disabled={item?.sold_out ?? false}
                      className="mt-4 w-fit border-foreground bg-transparent p-6 text-xl text-foreground hover:bg-foreground hover:text-background md:min-w-60 md:text-2xl"
                    >
                      {item?.sold_out ? 'Indisponible' : (
                        savedArts.find((savedArt) => savedArt.id === item.id) ? 'Enregistré 💾' :  'Enregistrer'
                      )}
                    </Button>
                  </div>
                  <p className='mt-4 text-sm text-foreground'>les œuvres enregistrés se retrouvent dans la page de contact</p>
                </div>
              </div>
            </div>
          </div>
        ),
      }),
    );
  }, [artItems, savedArts, toggleSavedArt]);

  React.useEffect(() => {
    setSlides(slides);
  }, [slides, setSlides]);

  const selectArtItem = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    artItem: TArtCarousselItem,
  ) => {
    if (window.scrollY === 0) {
      sliderInstance.current?.moveToIdx(artItems.indexOf(artItem));
      return;
    }

    const scrollController = new AbortController();

    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 200);

    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 0) return;
        sliderInstance.current?.moveToIdx(artItems.indexOf(artItem));
        scrollController.abort();
      },
      { signal: scrollController.signal },
    );
  };

  return (
    <div>
      <motion.div
        className="flex py-2 lg:h-[calc(100vh-15rem)]"
        ref={selectedArtItemRef}
      >
        <Slider
          className="relative"
        />
      </motion.div>
      <div className="md:container">
        <div className="columns-2 justify-center gap-4 space-y-4 p-2 lg:columns-3 lg:p-8">
          {artItems.map((artItem) => (
            <motion.div
              key={artItem.id}
              className="h-min w-full"
              whileHover={{ scale: 0.98 }}
              onClick={(e) => selectArtItem(e, artItem)}
            >
              <Image
                src={artItem.thumbnail.url}
                blurDataURL={artItem.thumbnail.placeholder}
                placeholder={artItem.thumbnail.placeholder ? 'blur' : 'empty'}
                alt={artItem.name}
                width={artItem.thumbnail.width}
                height={artItem.thumbnail.height}
                className="cursor-pointer object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

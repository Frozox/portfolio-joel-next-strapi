'use client';

import HomeSlider from '@/components/slider/homeSlider';
import { ContentLoader } from '@/components/ui/loading';
import { useArtCategory } from '@/helpers/context/strapi/artCategoryContext';
import { KeenSliderProvider } from '@/helpers/provider/keen/keenSliderProvider';
import { easeInOutBack } from '@/libs/easing';
import { autoSlider, moveToSelectedSlide } from '@/libs/keenPlugins';
import Image from 'next/image';

const Home = () => {
  const { isError, isLoading } = useArtCategory();

  return (
    <div className="size-full">
      <ContentLoader isLoading={isLoading} isError={isError}>
        <div className="h-full animate-content-load">
          <div className='items-center lg:flex lg:h-full'>
            <KeenSliderProvider options={{
              mode: 'snap',
              slides: {
                perView: 2,
                spacing: 20,
                origin: 'center',
              },
              defaultAnimation: {
                duration: 1800,
                easing: easeInOutBack
              },
              breakpoints: {
                '(max-width: 1024px)': {
                  slides: {
                    perView: 1,
                    spacing: 20,
                    origin: 'center',
                  }
                }
              },
            }}
            plugins={[autoSlider, moveToSelectedSlide]}
            >
              <HomeSlider />
            </KeenSliderProvider>
          </div>
          <div className="mt-16 flex flex-col items-center justify-center text-center lg:mt-0 xl:mt-8">
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
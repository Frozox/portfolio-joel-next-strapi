'use client';

import type { TKeenSlideProps } from '@components/ui/keenSlider';
import KeenSliderContext from '@helpers/context/keen/keenSliderContext';
import type { KeenSliderOptions, KeenSliderPlugin } from 'keen-slider/react';
import { useKeenSlider as useDefaultKeenSlider } from 'keen-slider/react';
import React, { useState } from 'react';

interface TKeenSliderProviderProps {
  children: React.ReactNode;
  options: KeenSliderOptions;
  plugins?: KeenSliderPlugin[];
}

export const KeenSliderProvider = ({
  children,
  options,
  plugins,
}: TKeenSliderProviderProps) => {
  const [sliderRef, sliderInstance] = useDefaultKeenSlider(options, plugins);
  const [slides, setSlides] = useState<TKeenSlideProps[]>([]);

  return (
    <KeenSliderContext.Provider
      value={{
        sliderRef,
        sliderInstance,
        slides,
        options,
        plugins: plugins ?? [],
        setSlides,
      }}
    >
      {children}
    </KeenSliderContext.Provider>
  );
};

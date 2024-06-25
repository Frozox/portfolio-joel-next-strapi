'use client';

import { TKeenSlideProps } from '@/components/ui/keenSlider';
import KeenSliderContext from '@/helpers/context/keen/keenSliderContext';
import { KeenSliderOptions, KeenSliderPlugin, useKeenSlider as useDefaultKeenSlider } from 'keen-slider/react';
import React from 'react';

type TKeenSliderProviderProps = {
  children: React.ReactNode,
  options: KeenSliderOptions,
  plugins?: KeenSliderPlugin[],
}

export const KeenSliderProvider = ({ children, options, plugins }: TKeenSliderProviderProps) => {
  const [sliderRef, sliderInstance] = useDefaultKeenSlider(options, plugins);
  const [slides, setSlides] = React.useState<TKeenSlideProps[]>([]);

  return (
    <KeenSliderContext.Provider value={{ sliderRef, sliderInstance, slides, options, plugins: plugins || [], setSlides }}>
      {children}
    </KeenSliderContext.Provider>
  );
};
'use client';

import type { TKeenSlideProps } from '@components/ui/keenSlider';
import type {
  KeenSliderInstance,
  KeenSliderOptions,
  KeenSliderPlugin,
} from 'keen-slider/react';
import type { MutableRefObject } from 'react';
import React, { createContext } from 'react';

interface TKeenSliderContext {
  sliderRef: (node: HTMLElement | null) => void;
  sliderInstance: MutableRefObject<KeenSliderInstance | null>;
  slides: TKeenSlideProps[];
  options: KeenSliderOptions;
  plugins: KeenSliderPlugin[];
  setSlides: React.Dispatch<React.SetStateAction<TKeenSlideProps[]>>;
}

const KeenSliderContext = createContext<TKeenSliderContext>({
  sliderRef: () => {},
  sliderInstance: { current: null },
  slides: [],
  options: {},
  plugins: [],
  setSlides: () => {},
});

export const useKeenSlider = () => React.use(KeenSliderContext);

export default KeenSliderContext;

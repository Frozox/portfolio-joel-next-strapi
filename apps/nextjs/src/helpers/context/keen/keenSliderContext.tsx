'use client';

import { TKeenSlideProps } from '@/components/ui/keenSlider';
import {
  KeenSliderHooks,
  KeenSliderInstance,
  KeenSliderOptions,
  KeenSliderPlugin,
} from 'keen-slider/react';
import React, { MutableRefObject } from 'react';

type TKeenSliderContext = {
  sliderRef: (node: HTMLElement | null) => void;
  sliderInstance: MutableRefObject<KeenSliderInstance<
    {},
    {},
    KeenSliderHooks
    > | null>;
  slides: TKeenSlideProps[];
  options: KeenSliderOptions;
  plugins: KeenSliderPlugin[];
  setSlides: React.Dispatch<React.SetStateAction<TKeenSlideProps[]>>;
};

const KeenSliderContext = React.createContext<TKeenSliderContext>({
  sliderRef: () => {},
  sliderInstance: { current: null },
  slides: [],
  options: {},
  plugins: [],
  setSlides: () => {},
});

export const useKeenSlider = () => React.useContext(KeenSliderContext);

export default KeenSliderContext;

import { useKeenSlider } from '@/helpers/context/keen/keenSliderContext';
import { cn } from '@/libs/utils';
import 'keen-slider/keen-slider.min.css';
import React from 'react';

export type TKeenSliderProps = {
  className?: string,
  children: React.ReactNode,
}

export interface TKeenSlideProps {
  children: React.ReactNode
  className?: string
}

export const KeenSlider = ({ className, children }: TKeenSliderProps) => {
  const {sliderRef, sliderInstance, options, plugins} = useKeenSlider();

  React.useEffect(() => {
    sliderInstance.current?.update({
      ...options,
      ...plugins
    });
  }, [sliderInstance, options, plugins, children]);

  return (
    <div ref={sliderRef} className={cn('keen-slider', className)}>
      {children}
    </div>
  );
};

export const KeenSlide = ({ className, children }: TKeenSlideProps) => {
  return (
    <div className={cn('keen-slider__slide', className)}>
      {children}
    </div>
  );
};
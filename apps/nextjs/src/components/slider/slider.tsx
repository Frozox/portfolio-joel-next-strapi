import { KeenSlide, KeenSlider, TKeenSlideProps } from '@/components/ui/keenSlider';
import { KeenSliderOptions, KeenSliderPlugin } from 'keen-slider/react';
import React from 'react';

export type TSliderProps = React.HTMLAttributes<HTMLElement> & {
    slides: TKeenSlideProps[]
    sliderOptions?: KeenSliderOptions,
    sliderPlugins?: KeenSliderPlugin[]
}

const Slider = ({ className, slides, sliderOptions, sliderPlugins, ...props }: TSliderProps) => {
  return (
    <KeenSlider options={sliderOptions} plugins={sliderPlugins} className={className} {...props}>
      {
        slides.map(({ children, ...slideProps }, idx) => {
          return (
            <KeenSlide key={idx} {...slideProps}>
              {children}
            </KeenSlide>
          );
        })
      }
    </KeenSlider>
  );
};

export default Slider;
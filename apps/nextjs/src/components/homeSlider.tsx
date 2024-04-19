import { KeenSlide, KeenSlider, TKeenSlideProps } from '@/components/ui/keenSlider';
import { easeInOutBack } from '@/libs/easing';
import { autoSlider, moveToSelectedSlide } from '@/libs/keenPlugins';
import { KeenSliderOptions, KeenSliderPlugin } from 'keen-slider/react';
import React from 'react';

export type THomeSliderProps = React.HTMLAttributes<HTMLElement> & {
  slides: TKeenSlideProps[]
}

const sliderOptions: KeenSliderOptions = {
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
};
const sliderPlugins: KeenSliderPlugin[] = [autoSlider, moveToSelectedSlide];

const HomeSlider = ({ className, content, slides, ...props }: THomeSliderProps) => {
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

export default HomeSlider;
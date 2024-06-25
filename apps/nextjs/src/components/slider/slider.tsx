import { KeenSlide, KeenSlider } from '@/components/ui/keenSlider';
import { useKeenSlider } from '@/helpers/context/keen/keenSliderContext';
import React from 'react';

export type TSliderProps = React.HTMLAttributes<HTMLElement> & {}

const Slider = ({ className, ...props }: TSliderProps) => {
  const { slides } = useKeenSlider();

  return (
    <KeenSlider className={className} {...props}>
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
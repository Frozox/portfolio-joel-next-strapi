import Slider from "@/components/slider/slider";
import { TKeenSlideProps } from "@/components/ui/keenSlider";
import { easeInOutBack } from "@/libs/easing";
import { autoSlider, moveToSelectedSlide } from "@/libs/keenPlugins";
import { KeenSliderOptions, KeenSliderPlugin } from "keen-slider/react";
import React from "react";

export type TFadeSliderProps = React.HTMLAttributes<HTMLElement> & {
  slides: TKeenSlideProps[];
  sliderOptions?: KeenSliderOptions;
  sliderPlugins?: KeenSliderPlugin[];
};

const defaultSliderOptions: KeenSliderOptions = {
  mode: "snap",
  slides: {
    perView: 2,
    spacing: 20,
    origin: "center",
  },
  defaultAnimation: {
    duration: 1800,
    easing: easeInOutBack,
  },
  breakpoints: {
    "(max-width: 1024px)": {
      slides: {
        perView: 1,
        spacing: 20,
        origin: "center",
      },
    },
  },
};
const defaultSliderPlugins: KeenSliderPlugin[] = [
  autoSlider,
  moveToSelectedSlide,
];

const FadeSlider = ({
  children,
  slides,
  sliderOptions,
  sliderPlugins,
  ...props
}: TFadeSliderProps) => {
  return (
    <Slider
      sliderOptions={sliderOptions || defaultSliderOptions}
      sliderPlugins={sliderPlugins || defaultSliderPlugins}
      slides={slides}
      {...props}
    >
      {children}
    </Slider>
  );
};

export default FadeSlider;

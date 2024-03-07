"use client"

import { easeInOutBack } from "@/libs/easing";
import { KeenSliderOptions, KeenSliderPlugin } from "keen-slider/react";
import { KeenSlide, KeenSlider, TKeenSlideProps } from "@/components/ui/keenSlider";
import { autoSlider, moveToSelectedSlide } from "@/libs/keenPlugins";

export type THomeSliderProps = React.HTMLAttributes<HTMLElement> & {
    slides: TKeenSlideProps[]
}

const HomeSlider = ({ className, content, ...props }: THomeSliderProps) => {
    const sliderOptions: KeenSliderOptions = {
        slides: {
            perView: 2,
            spacing: 20,
            origin: "center",
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
                    origin: "center",
                }
            }
        }
    }
    const sliderPlugins: KeenSliderPlugin[] = [autoSlider, moveToSelectedSlide]

    return (
        <KeenSlider options={sliderOptions} plugins={sliderPlugins} className={className} {...props}>
            {
                props.slides.map((slideProps, idx) => {
                    return (
                        <KeenSlide key={idx} {...slideProps} />
                    )
                })
            }
        </KeenSlider>
    );
};

export default HomeSlider;
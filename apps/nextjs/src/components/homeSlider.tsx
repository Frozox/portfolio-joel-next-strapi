import { easeInOutBack } from "@/libs/easing";
import { KeenSliderOptions, KeenSliderPlugin, useKeenSlider } from "keen-slider/react";
import { KeenSlide, KeenSlider, TKeenSlideProps } from "@/components/ui/keenSlider";
import { autoSlider, moveToSelectedSlide } from "@/libs/keenPlugins";
import React from "react";

export type THomeSliderProps = React.HTMLAttributes<HTMLElement> & {
    slides: TKeenSlideProps[]
}

const HomeSlider = ({ className, content, ...props }: THomeSliderProps) => {
    const [sliderOptions, setSliderOptions] = React.useState<KeenSliderOptions>({});
    const sliderPlugins: KeenSliderPlugin[] = [autoSlider, moveToSelectedSlide];

    React.useEffect(() => {
        const options: KeenSliderOptions = {
            mode: "snap",
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
            },
        }

        setSliderOptions(options)
    }, [])

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
import { cn } from "@/libs/utils"
import "keen-slider/keen-slider.min.css"
import { KeenSliderOptions, KeenSliderPlugin, useKeenSlider } from "keen-slider/react"
import React, { LegacyRef } from "react"

export type TKeenSliderProps = {
    sliderRef?: LegacyRef<any>,
    className?: string,
    options?: KeenSliderOptions
    plugins?: KeenSliderPlugin[]
    children: React.ReactNode,
}

export interface TKeenSlideProps {
    children: React.ReactNode
    className?: string
}

export const KeenSlider = ({ options, plugins, className, children }: TKeenSliderProps) => {
    const [sliderRef, sliderInstance] = useKeenSlider(options, plugins);

    React.useEffect(() => {
        sliderInstance.current?.update({
            ...options,
            ...plugins
        })
    }, [sliderInstance, options, plugins, children])

    return (
        <div ref={sliderRef} className={cn("keen-slider", className)}>
            {children}
        </div>
    );
}

export const KeenSlide = ({ className, children }: TKeenSlideProps) => {
    return (
        <div className={cn("keen-slider__slide", className)}>
            {children}
        </div>
    )
}
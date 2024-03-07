"use client"

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
    content: JSX.Element | React.ReactNode | string
    className?: string
}

export const KeenSlider = ({ options, plugins, className, children }: TKeenSliderProps) => {
    const [sliderRef, instanceRef] = useKeenSlider(options, plugins);

    return (
        <div ref={sliderRef} className={cn("keen-slider", className)}>
            {children}
        </div>
    );
}

export const KeenSlide = ({ content, className }: TKeenSlideProps) => {
    return (
        <div className={cn("keen-slider__slide", className)}>
            {content}
        </div>
    )
}
import { KeenSliderInstance } from "keen-slider/react";

export const autoSlider = (slider: KeenSliderInstance) => {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;
  function clearNextTimeout() {
    clearTimeout(timeout);
  }
  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 6000);
  }
  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
};

export const moveToSelectedSlide = (slider: KeenSliderInstance) => {
  slider.slides.forEach((slide, idx) => {
    slide.addEventListener("click", (e) => {
      if (slider.track.details.rel === idx) return;
      slider.moveToIdx(idx);
    });
  });
};

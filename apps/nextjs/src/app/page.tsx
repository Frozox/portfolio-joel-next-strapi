"use client"

import HomeSlider from "@/components/homeSlider";
import { Button } from "@/components/ui/button";
import { DirectionAwareHover } from "@/components/ui/directionAwareHover";
import { TKeenSlideProps } from "@/components/ui/keenSlider";
import { useArtCategory } from "@/helpers/hook/strapi/strapiSdk";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Loading from "@/components/loading";

const Home = () => {
  const [slides, setSlides] = React.useState<TKeenSlideProps[]>([]);
  const { artCategories } = useArtCategory()

  React.useEffect(() => {
    if (artCategories.length === 0) return;
    const formatedSlides: TKeenSlideProps[] = artCategories.map((item) => {
      const image = item.attributes.image.data;

      return {
        children: (
          <DirectionAwareHover imageUrl={`http://localhost:8000${image.attributes.url}`} blurData={image.attributes.placeholder}>
            <div className="m-4">
              <div className="pb-10 text-5xl md:text-6xl">{item.attributes.name}</div>
              <Link href={`/${item.attributes.slug}`}>
                <Button type="button" variant="outline" className="p-6 bg-transparent hover:bg-background border-white md:min-w-60 w-fit text-xl md:text-2xl">Voir les travaux</Button>
              </Link>
            </div>
          </DirectionAwareHover>
        )
      }
    })

    setSlides(formatedSlides);
  }, [artCategories])

  return (
    slides.length > 0 ? (
      <div className="h-full animate-content-load">
        <HomeSlider slides={slides} className="h-4/5 md:h-3/5" />
        <div className="t-20 md:mt-20 text-center flex flex-col justify-center items-center">
          <Image src="/joel.jpg" className="rounded-full" height={200} width={200} alt="joel" />
          <div className="mt-8">nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis</div>
          <hr className="w-64 my-8 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-foreground to-transparent opacity-25" />
          <div>enim praesent elementum</div>
        </div>
      </div>
    ) : (
      <Loading />
    )
  );
}

export default Home
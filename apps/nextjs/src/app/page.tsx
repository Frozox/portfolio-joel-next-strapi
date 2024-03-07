import HomeSlider from "@/components/homeSlider";
import { Button } from "@/components/ui/button";
import { DirectionAwareHover } from "@/components/ui/directionAwareHover";
import { TKeenSlideProps } from "@/components/ui/keenSlider";
import Link from "next/link";

const slidesProps: TKeenSlideProps[] = [
  {
    content: (
      <DirectionAwareHover imageUrl="https://picsum.photos/1200/800">
        <div className="m-4">
          <div className="pb-10 text-5xl md:text-6xl">Test 1</div>
          <Link href="/test-1">
            <Button type="button" variant="outline" className="p-6 bg-transparent hover:bg-background border-white md:min-w-60 w-fit text-xl md:text-2xl">Voir les travaux</Button>
          </Link>
        </div>
      </DirectionAwareHover>
    )
  },
  {
    content: (
      <DirectionAwareHover imageUrl="https://picsum.photos/1200/800">
        <div className="m-4">
          <div className="pb-10 text-5xl md:text-6xl">Test 2</div>
          <Link href="/test-2">
            <Button type="button" variant="outline" className="p-6 bg-transparent hover:bg-background border-white md:min-w-60 w-fit text-xl md:text-2xl">Voir les travaux</Button>
          </Link>
        </div>
      </DirectionAwareHover>
    )
  },
  {
    content: (
      <DirectionAwareHover imageUrl="https://picsum.photos/1200/800">
        <div className="m-4">
          <div className="pb-10 text-5xl md:text-6xl">Test 3</div>
          <Link href="/test-3">
            <Button type="button" variant="outline" className="p-6 bg-transparent hover:bg-background border-white md:min-w-60 w-fit text-xl md:text-2xl">Voir les travaux</Button>
          </Link>
        </div>
      </DirectionAwareHover>
    )
  },
  {
    content: (
      <DirectionAwareHover imageUrl="https://picsum.photos/1200/800">
        <div className="m-4">
          <div className="pb-10 text-5xl md:text-6xl">Test 4</div>
          <Link href="/test-4">
            <Button type="button" variant="outline" className="p-6 bg-transparent hover:bg-background border-white md:min-w-60 w-fit text-xl md:text-2xl">Voir les travaux</Button>
          </Link>
        </div>
      </DirectionAwareHover>
    )
  }
];

const Home = () => {
  return (
    <div className="h-full w-full md:pt-24">
      <HomeSlider slides={slidesProps} className="h-4/5 md:h-3/5 w-full" />
      <div className="w-full pt-32 md:pt-48 text-center flex flex-col justify-center items-center">
        <div>nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis</div>
        <hr className="w-64 my-8 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-black dark:via-white to-transparent opacity-25" />
        <div>enim praesent elementum</div>
      </div>
    </div>
  );
}

export default Home
import type { TStrapiComponent } from '@components/strapiComponent/StrapiComponentLoader';
import LazyImage from '@components/ui/lazyImage';
import { env } from '@env';
import { getMediaFromFormat } from '@libs/mediaFormat';
import { cn } from '@libs/utils';
import {
  MediaMobilePosition,
  MediaPosition,
  type TextMediaComponent_Plain,
} from '@portfolio/strapi/src/components/visual-components/interfaces/TextMediaComponent';
import DOMPurify from 'isomorphic-dompurify';

export type TStrapiTextMediaComponent =
  TStrapiComponent<TextMediaComponent_Plain>;

const StrapiTextMediaComponent = (component: TStrapiTextMediaComponent) => {
  const formatedMedia = getMediaFromFormat(component.media, 'medium');

  return (
    <div
      className={cn(
        'flex',
        component.media_position === MediaPosition.Left
          ? 'lg:flex-row'
          : 'lg:flex-row-reverse',
        component.media_mobile_position === MediaMobilePosition.Top
          ? 'flex-col'
          : 'flex-col-reverse'
      )}
    >
      <div
        className={cn(
          'flex shrink basis-2/5 flex-col justify-center',
          component.media_position === MediaPosition.Left
            ? 'lg:pr-6'
            : 'lg:pl-6',
          component.media_mobile_position === MediaMobilePosition.Top
            ? 'mb-6 lg:mb-0'
            : 'mt-6 lg:mt-0'
        )}
      >
        <LazyImage
          src={`${env.NEXT_PUBLIC_BACKEND_HOST}${formatedMedia.url}`}
          alt={component.media.name}
          title={component.media.name}
          width={formatedMedia.width}
          height={formatedMedia.height}
          // @ts-expect-error - thumbhash not exists in media type
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          thumbhash={component.media.thumbhash}
        />
      </div>
      <div className='basis-3/5'>
        {component.title && (
          <h3 className='mb-4 text-center text-2xl font-bold lg:text-left'>
            {component.title}
          </h3>
        )}
        <span
          className='text-justify'
          // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(component.content as string),
          }}
        />
      </div>
    </div>
  );
};

export default StrapiTextMediaComponent;

import LazyImage from '@components/ui/lazyImage';
import { env } from '@env';
import { getMediaFromFormat } from '@libs/mediaFormat';
import { cn } from '@libs/utils';
import { MediaComponent_Plain } from '@portfolio/strapi/src/components/visual-components/interfaces/MediaComponent';
import { TStrapiComponent } from './StrapiComponentLoader';

export type TStrapiMediaComponent = TStrapiComponent<MediaComponent_Plain>;

const StrapiMediaComponent = (component: TStrapiMediaComponent) => {
  const formatedMedia = getMediaFromFormat(component.media, 'medium');

  return (
    <div
      className={cn(
        'flex',
        component.media_position === 'left' && 'justify-start',
        component.media_position === 'center' && 'justify-center',
        component.media_position === 'right' && 'justify-end'
      )}
    >
      <LazyImage
        src={`${env.NEXT_PUBLIC_BACKEND_HOST}${formatedMedia.url}`}
        alt={component.media.name}
        title={component.media.name}
        width={formatedMedia.width}
        height={formatedMedia.height}
        // @ts-expect-error,
        thumbhash={component.media.thumbhash}
      />
    </div>
  );
};

export default StrapiMediaComponent;

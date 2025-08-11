import LazyImage from '@components/ui/lazyImage';
import { env } from '@env';
import { getMediaFromFormat } from '@libs/mediaFormat';
import { cn } from '@libs/utils';
import {
  MediaPosition,
  type MediaComponent_Plain,
} from '@portfolio/strapi/src/components/visual-components/interfaces/MediaComponent';
import type { TStrapiComponent } from './StrapiComponentLoader';

export type TStrapiMediaComponent = TStrapiComponent<MediaComponent_Plain>;

const StrapiMediaComponent = (component: TStrapiMediaComponent) => {
  const formatedMedia = getMediaFromFormat(component.media, 'medium');

  return (
    <div
      className={cn(
        'flex',
        component.media_position === MediaPosition.Left && 'justify-start',
        component.media_position === MediaPosition.Center && 'justify-center',
        component.media_position === MediaPosition.Right && 'justify-end'
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
  );
};

export default StrapiMediaComponent;

import type { Media_Plain } from '@portfolio/strapi/src/common/sharedSchemas/Media';
import type { MediaFormat } from '@portfolio/strapi/src/common/sharedSchemas/MediaFormat';

export type SupportedMediaFormats = keyof Media_Plain['formats'];

const allowToMedium: SupportedMediaFormats[] = ['large', 'medium'];
const allowToSmall: SupportedMediaFormats[] = [...allowToMedium, 'small'];
const allowToThumbnail: SupportedMediaFormats[] = [
  ...allowToSmall,
  'thumbnail',
];

export const getMediaFromFormat = (
  image: Media_Plain,
  format: SupportedMediaFormats
): MediaFormat | Media_Plain => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (image.formats.large && 'large' === format) return image.formats.large;
  else if ('large' === format) return image;
  if (allowToMedium.includes(format)) return image.formats.medium;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (image.formats.small && allowToSmall.includes(format))
    return image.formats.small;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (image.formats.thumbnail && allowToThumbnail.includes(format))
    return image.formats.thumbnail;
  return image;
};

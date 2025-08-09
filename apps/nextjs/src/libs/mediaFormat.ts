import { Media_Plain } from '@portfolio/strapi/src/common/sharedSchemas/Media';
import { MediaFormat } from '@portfolio/strapi/src/common/sharedSchemas/MediaFormat';

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
  if (image.formats.large && 'large' === format) return image.formats.large;
  else if ('large' === format) return image;
  if (allowToMedium.includes(format)) return image.formats.medium;
  if (image.formats.small && allowToSmall.includes(format))
    return image.formats.small;
  if (image.formats.thumbnail && allowToThumbnail.includes(format))
    return image.formats.thumbnail;
  return image;
};

import { Media } from '@portfolio/strapi/src/common/sharedSchemas/Media';
import { MediaFormat } from '@portfolio/strapi/src/common/sharedSchemas/MediaFormat';

export type SupportedMediaFormats = keyof Media['attributes']['formats']

const allowToMedium: SupportedMediaFormats[] = ['large', 'medium'];
const allowToSmall: SupportedMediaFormats[] = [...allowToMedium, 'small'];
const allowToThumbnail: SupportedMediaFormats[] = [...allowToSmall, 'thumbnail'];

export const getMediaFromFormat = (image: Media, format: SupportedMediaFormats): MediaFormat | Media['attributes'] => {
  if (image.attributes.formats.large && 'large' === format) return image.attributes.formats.large;
  else if ('large' === format) return image.attributes;
  if (allowToMedium.includes(format)) return image.attributes.formats.medium;
  if (image.attributes.formats.small && allowToSmall.includes(format)) return image.attributes.formats.small;
  if (image.attributes.formats.thumbnail && allowToThumbnail.includes(format)) return image.attributes.formats.thumbnail;
  return image.attributes;
};
import { thumbHashToDataURL } from 'thumbhash';

export const thumbHashArrayBufferToUrlData = (
  thumbHash: ArrayBuffer
): string => {
  return thumbHashToDataURL(new Uint8Array(thumbHash));
};

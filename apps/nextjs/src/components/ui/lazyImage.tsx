'use client';

import { thumbHashArrayBufferToUrlData } from '@libs/thumbhash';
import { cn } from '@libs/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { HTMLAttributes } from 'react';
import { useRef, useState } from 'react';

export type LazyImageProps = HTMLAttributes<HTMLImageElement> & {
  src: string;
  width: number;
  height: number;
  thumbhash?: ArrayBuffer;
  fullSize?: boolean;
  alt: string;
};

const LazyImage = ({
  src,
  thumbhash,
  className,
  alt,
  width,
  height,
  fullSize,
  ...props
}: LazyImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const onLoaded = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className={cn(fullSize && 'size-full')}>
      <div className='relative size-full'>
        {thumbhash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: !isImageLoaded ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              className,
              'pointer-events-none absolute size-full opacity-0'
            )}
          >
            <Image
              src={thumbHashArrayBufferToUrlData(thumbhash)}
              height={height}
              width={width}
              alt={alt}
              className={cn(className, 'size-full object-cover p-1 blur-sm')}
              {...props}
            />
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: !isImageLoaded && thumbhash ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className='size-full'
        >
          <Image
            ref={imageRef}
            src={src}
            height={height}
            width={width}
            alt={alt}
            onLoad={onLoaded}
            className={cn(className, 'pointer-events-auto')}
            {...props}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LazyImage;

import { env } from '@/env.mjs';
import { getMediaFromFormat } from '@/libs/mediaFormat';
import { cn } from '@/libs/utils';
import Image from 'next/image';
import { MediaComponent } from '../../../../strapi/src/components/visual-components/interfaces/MediaComponent';
import { TStrapiComponent } from './StrapiComponentLoader';

export type TStrapiMediaComponent = TStrapiComponent<MediaComponent>


const StrapiMediaComponent = (component: TStrapiMediaComponent) => {
  const formatedMedia = getMediaFromFormat(component.media.data, 'medium');

  return (
    <div className={cn('flex', component.media_position === 'left' && 'justify-start', component.media_position === 'center' && 'justify-center', component.media_position === 'right' && 'justify-end')}>
      <Image src={`${env.NEXT_PUBLIC_BACKEND_HOST}${formatedMedia.url}`} alt={component.media.data.attributes.name} title={component.media.data.attributes.name} width={formatedMedia.width} height={formatedMedia.height}/>
    </div>
  );
};

export default StrapiMediaComponent;
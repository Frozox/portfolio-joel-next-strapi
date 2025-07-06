import { env } from '@/env.mjs';
import { cn } from '@/libs/utils';
import Image from 'next/image';
import { MediaComponent } from '../../../../strapi/src/components/visual-components/interfaces/MediaComponent';
import { TStrapiComponent } from './StrapiComponentLoader';

export type TStrapiMediaComponent = TStrapiComponent<MediaComponent>


const StrapiMediaComponent = (component: TStrapiMediaComponent) => {
  return (
    <div className={cn('flex', component.media_position === 'left' && 'justify-start', component.media_position === 'center' && 'justify-center', component.media_position === 'right' && 'justify-end')}>
      <Image src={`${env.NEXT_PUBLIC_BACKEND_HOST}${component.media.data.attributes.formats.medium.url}`} alt={component.media.data.attributes.alternativeText} width={component.media.data.attributes.formats.medium.width} height={component.media.data.attributes.formats.medium.height}/>
    </div>
  );
};

export default StrapiMediaComponent;
import { env } from '@/env.mjs';
import Image from 'next/image';
import { TStrapiComponent } from '.';
import { MediaComponent } from '../../../../strapi/src/components/visual-components/interfaces/MediaComponent';

export type TStrapiMediaComponent = TStrapiComponent<MediaComponent>


const StrapiMediaComponent = (component: TStrapiMediaComponent) => {
  return (
    <div>
      <Image src={`${env.NEXT_PUBLIC_BACKEND_HOST}${component.media.data.attributes.url}`} alt={component.media.data.attributes.alternativeText} width={component.media.data.attributes.width} height={component.media.data.attributes.height}/>
    </div>
  );
};

export default StrapiMediaComponent;
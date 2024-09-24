import { env } from '@/env.mjs';
import { cn } from '@/libs/utils';
import Image from 'next/image';
import { TStrapiComponent } from '.';
import { TextMediaComponent } from '../../../../strapi/src/components/visual-components/interfaces/TextMediaComponent';

export type TStrapiTextPlusMediaComponent = TStrapiComponent<TextMediaComponent>

const StrapiTextPlusMediaComponent = (component: TStrapiTextPlusMediaComponent) => {
  return (
    <div className={cn('flex', component.media_position === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse', component.media_mobile_position === 'top' ? 'flex-col' : 'flex-col-reverse')}>
      <Image src={`${env.NEXT_PUBLIC_BACKEND_HOST}${component.media.data.attributes.url}`} alt={component.media.data.attributes.alternativeText} width={component.media.data.attributes.width} height={component.media.data.attributes.height}/>
      <span>{component.content}</span>
    </div>
  );
};

export default StrapiTextPlusMediaComponent;
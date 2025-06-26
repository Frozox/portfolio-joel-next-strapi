import { env } from '@/env.mjs';
import { cn } from '@/libs/utils';
import Image from 'next/image';
import { TStrapiComponent } from '.';
import { TextMediaComponent } from '../../../../strapi/src/components/visual-components/interfaces/TextMediaComponent';

export type TStrapiTextPlusMediaComponent = TStrapiComponent<TextMediaComponent>

const StrapiTextPlusMediaComponent = (component: TStrapiTextPlusMediaComponent) => {
  return (
    <div className={cn('flex', component.media_position === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse', component.media_mobile_position === 'top' ? 'flex-col' : 'flex-col-reverse')}>
      <div className={cn('flex shrink basis-2/5 flex-col justify-center', component.media_position === 'left' ? 'lg:pr-6' : 'lg:pl-6', component.media_mobile_position === 'top' ? 'mb-6 lg:mb-0' : 'mt-6 lg:mt-0')}>
        <Image src={`${env.NEXT_PUBLIC_BACKEND_HOST}${component.media.data.attributes.url}`} alt={component.media.data.attributes.alternativeText} width={component.media.data.attributes.width} height={component.media.data.attributes.height}/>
      </div>
      <div className='basis-3/5'>
        {component.title && <h3 className='mb-4 text-center text-2xl font-bold lg:text-left'>{component.title}</h3>}
        <span className='text-justify'  dangerouslySetInnerHTML={{ __html: component.content }}/>
      </div>
    </div>
  );
};

export default StrapiTextPlusMediaComponent;
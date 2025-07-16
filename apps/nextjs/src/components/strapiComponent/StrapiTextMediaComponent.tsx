import { TStrapiComponent } from '@/components/strapiComponent/StrapiComponentLoader';
import { env } from '@/env.mjs';
import { getMediaFromFormat } from '@/libs/mediaFormat';
import { cn } from '@/libs/utils';
import { TextMediaComponent } from '@portfolio/strapi/src/components/visual-components/interfaces/TextMediaComponent';
import Image from 'next/image';

export type TStrapiTextMediaComponent = TStrapiComponent<TextMediaComponent>

const StrapiTextMediaComponent = (component: TStrapiTextMediaComponent) => {
  const formatedMedia = getMediaFromFormat(component.media.data, 'medium');

  return (
    <div className={cn('flex', component.media_position === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse', component.media_mobile_position === 'top' ? 'flex-col' : 'flex-col-reverse')}>
      <div className={cn('flex shrink basis-2/5 flex-col justify-center', component.media_position === 'left' ? 'lg:pr-6' : 'lg:pl-6', component.media_mobile_position === 'top' ? 'mb-6 lg:mb-0' : 'mt-6 lg:mt-0')}>
        <Image src={`${env.NEXT_PUBLIC_BACKEND_HOST}${formatedMedia.url}`} alt={component.media.data.attributes.name} title={component.media.data.attributes.name} width={formatedMedia.width} height={formatedMedia.height}/>
      </div>
      <div className='basis-3/5'>
        {component.title && <h3 className='mb-4 text-center text-2xl font-bold lg:text-left'>{component.title}</h3>}
        <span className='text-justify'  dangerouslySetInnerHTML={{ __html: component.content }}/>
      </div>
    </div>
  );
};

export default StrapiTextMediaComponent;
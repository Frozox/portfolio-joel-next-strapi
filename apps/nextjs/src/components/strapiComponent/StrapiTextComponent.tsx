import { TextComponent } from '@portfolio/strapi/src/components/visual-components/interfaces/TextComponent';
import { TStrapiComponent } from './StrapiComponentLoader';

export type TStrapiTextComponent = TStrapiComponent<TextComponent>

const StrapiTextComponent = (component: TStrapiTextComponent) => {
  return (
    <div>
      {component.title && <h2 className='mb-4 text-center text-2xl font-bold lg:text-left'>{component.title}</h2>}
      <span className='text-justify'  dangerouslySetInnerHTML={{ __html: component.content }}/>
    </div>
  );
};

export default StrapiTextComponent;
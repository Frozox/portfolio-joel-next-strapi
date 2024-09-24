import { TStrapiComponent } from '.';
import { TextComponent } from '../../../../strapi/src/components/visual-components/interfaces/TextComponent';

export type TStrapiTextComponent = TStrapiComponent<TextComponent>

const StrapiTextComponent = (component: TStrapiTextComponent) => {
  console.log(component.content);
  return (
    <div dangerouslySetInnerHTML={{ __html: component.content }}/>
  );
};

export default StrapiTextComponent;
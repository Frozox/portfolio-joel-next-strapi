import { TextComponent } from '@portfolio/strapi/src/components/visual-components/interfaces/TextComponent';
import { TStrapiComponent } from '.';

export type TStrapiTextComponent = TStrapiComponent<TextComponent>

const StrapiTextComponent = (component: TStrapiTextComponent) => {
  console.log(component.content);
  return (
    <hr className="my-8 h-[2px] w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-foreground to-transparent opacity-25" />
  );
};

export default StrapiTextComponent;
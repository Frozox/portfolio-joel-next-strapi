import { TextComponent } from '@portfolio/strapi/src/components/visual-components/interfaces/TextComponent';
import { TStrapiComponent } from './StrapiComponentLoader';

export type StrapiSpacerComponent = TStrapiComponent<TextComponent>


const StrapiSpacerComponent = (component: StrapiSpacerComponent) => {
  return (
    <hr className="my-8 h-[2px] w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-foreground to-transparent opacity-25" />
  );
};

export default StrapiSpacerComponent;
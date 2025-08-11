import StrapiMediaComponent from '@components/strapiComponent/StrapiMediaComponent';
import StrapiSpacerComponent from '@components/strapiComponent/StrapiSpacerComponent';
import StrapiTextComponent from '@components/strapiComponent/StrapiTextComponent';
import StrapiTextMediaComponent from '@components/strapiComponent/StrapiTextMediaComponent';
import type { MediaComponent_Plain } from '@portfolio/strapi/src/components/visual-components/interfaces/MediaComponent';
import type { SpacerComponent_Plain } from '@portfolio/strapi/src/components/visual-components/interfaces/SpacerComponent';
import type { TextComponent_Plain } from '@portfolio/strapi/src/components/visual-components/interfaces/TextComponent';
import type { TextMediaComponent_Plain } from '@portfolio/strapi/src/components/visual-components/interfaces/TextMediaComponent';

enum StrapiComponentTypes {
  Text = 'visual-components.text-component',
  Media = 'visual-components.media-component',
  TextMedia = 'visual-components.text-media-component',
  Spacer = 'visual-components.spacer-component',
}

export type TStrapiComponent<
  T extends
    | MediaComponent_Plain
    | SpacerComponent_Plain
    | TextComponent_Plain
    | TextMediaComponent_Plain = object,
> = T & {
  id: number;
  __component: StrapiComponentTypes;
};

export const FailedLoadComponent = (component: TStrapiComponent) => {
  return (
    <div className='font-bold text-destructive'>
      Failed loading {component.__component}
    </div>
  );
};

export const StrapiComponentLoader = ({
  component,
}: {
  component: TStrapiComponent;
}) => {
  return (
    <>
      {component.__component === StrapiComponentTypes.Text && (
        <StrapiTextComponent
          {...(component as TStrapiComponent<TextComponent_Plain>)}
        />
      )}
      {component.__component === StrapiComponentTypes.Media && (
        <StrapiMediaComponent
          {...(component as TStrapiComponent<MediaComponent_Plain>)}
        />
      )}
      {component.__component === StrapiComponentTypes.TextMedia && (
        <StrapiTextMediaComponent
          {...(component as TStrapiComponent<TextMediaComponent_Plain>)}
        />
      )}
      {component.__component === StrapiComponentTypes.Spacer && (
        <StrapiSpacerComponent />
      )}
      {!Object.values(StrapiComponentTypes).includes(component.__component) && (
        <FailedLoadComponent {...component} />
      )}
    </>
  );
};

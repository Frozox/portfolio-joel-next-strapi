import StrapiMediaComponent from '@/components/strapiComponent/StrapiMediaComponent';
import StrapiSpacerComponent from '@/components/strapiComponent/StrapiSpacerComponent';
import StrapiTextComponent from '@/components/strapiComponent/StrapiTextComponent';
import StrapiTextMediaComponent from '@/components/strapiComponent/StrapiTextMediaComponent';


enum StrapiComponentTypes {
  Text = 'visual-components.text-component',
  Media = 'visual-components.media-component',
  TextMedia = 'visual-components.text-media-component',
  Spacer = 'visual-components.spacer-component'
}

export type TStrapiComponent<T = any> = T & {
    id: number;
    __component: StrapiComponentTypes;
}

export const FailedLoadComponent = (component: TStrapiComponent) => {
  return (<div className='font-bold text-destructive'>Failed loading {component.__component}</div>);
};

export const StrapiComponentLoader = ({ component }: { component: TStrapiComponent}) => {
  return (
    <>
      {component.__component === StrapiComponentTypes.Text && (<StrapiTextComponent {...component }/>) }
      {component.__component === StrapiComponentTypes.Media && (<StrapiMediaComponent {...component}/>) }
      {component.__component === StrapiComponentTypes.TextMedia && (<StrapiTextMediaComponent {...component}/>) }
      {component.__component === StrapiComponentTypes.Spacer && (<StrapiSpacerComponent {...component}/>) }
      {!Object.values(StrapiComponentTypes).includes(component.__component) && (<FailedLoadComponent {...component}/>)}
    </>
  );
};
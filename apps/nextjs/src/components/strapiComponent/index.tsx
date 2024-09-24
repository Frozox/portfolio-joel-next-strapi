import React from 'react';

export type TStrapiComponent<T={}> = T & {
    id: number;
    __component: string;
}

export const FailedLoadComponent = (props: TStrapiComponent) => {
  return (<div className='font-bold text-destructive'>Failed loading {props.__component}</div>);
};

export const StrapiComponentLoader = ({ component }: { component: TStrapiComponent}) => {
  const LazyComponent = React.lazy(() => import(`./${component.__component}`).catch(() => ({ default: FailedLoadComponent })));

  return (
    <React.Suspense>
      <LazyComponent {...component} />
    </React.Suspense>
  );
};
'use client';

import { StrapiComponentLoader, TStrapiComponent } from '@/components/strapiComponent/StrapiComponentLoader';
import { ContentLoader } from '@/components/ui/loading';
import { useGetNews } from '@/helpers/hook/strapi/request';

const News = () => {
  const { response, isLoading, isError } = useGetNews({ populate: 'content.media' });

  return (
    <ContentLoader isLoading={isLoading} isError={isError}>
      <div className="size-full">
        <div className='container'>
          {response?.data.attributes.content.map((component: TStrapiComponent, idx: number) => (
            <StrapiComponentLoader key={idx} component={component} />
          ))}
        </div>
      </div>
    </ContentLoader>
  );
};

export default News;
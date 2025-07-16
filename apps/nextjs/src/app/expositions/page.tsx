'use client';

import { StrapiComponentLoader, TStrapiComponent } from '@/components/strapiComponent/StrapiComponentLoader';
import { useGetNews } from '@/helpers/hook/strapi/request';

const News = () => {
  const { response, isLoading, isError } = useGetNews({ populate: 'content.media' });

  return (
    <div className="size-full animate-content-load">
      <div className='container'>
        {response?.data.attributes.content.map((component: TStrapiComponent, idx: number) => (
          <StrapiComponentLoader key={idx} component={component} />
        ))}
      </div>
    </div>
  );
};

export default News;
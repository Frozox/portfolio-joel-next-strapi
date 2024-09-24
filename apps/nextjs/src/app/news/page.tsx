'use client';

import { StrapiComponentLoader, TStrapiComponent } from '@/components/strapiComponent';
import { useGetNews } from '@/helpers/hook/strapi/request';

const News = () => {
  const news = useGetNews({ populate: 'content.media' });

  return (
    <div className="size-full">
      <div className='container'>
        {news.response?.data.attributes.content.map((component: TStrapiComponent) => (
          <StrapiComponentLoader key={component.id} component={component} />
        ))}
      </div>
    </div>
  );
};

export default News;
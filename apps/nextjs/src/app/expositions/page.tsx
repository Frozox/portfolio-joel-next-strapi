'use client';

import type { TStrapiComponent } from '@components/strapiComponent/StrapiComponentLoader';
import { StrapiComponentLoader } from '@components/strapiComponent/StrapiComponentLoader';
import { useGetNews } from '@helpers/hook/strapi/request';

const News = () => {
  const { response } = useGetNews({
    populate: 'content.media',
  });

  return (
    <div className='size-full animate-content-load'>
      <div className='container'>
        {(response?.data.content as TStrapiComponent[]).map(
          (component, idx) => (
            <StrapiComponentLoader key={idx} component={component} />
          )
        )}
      </div>
    </div>
  );
};

export default News;

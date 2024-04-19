import { ArtFilter } from '@/components/artFilter';
import { ArtFilterProvider } from '@/helpers/provider/strapi/artFilterProvider';
import { Metadata } from 'next';

type TLayoutProps = {
  children: React.ReactNode
  params: {
    categorySlug: string
  },
}

export const generateMetadata = ({ params }: TLayoutProps): Metadata => {
  return {
    title: params.categorySlug
  };
};

const CategoryLayout = ({ children, params }: Readonly<TLayoutProps>) => {
  return (
    <ArtFilterProvider activeCategorySlug={params.categorySlug}>
      <div className="h-11 animate-content-load">
        <ArtFilter className="sticky h-11 bg-background md:fixed" />
      </div>
      <div className="h-[calc(100%-2.75rem)] w-full">
        {children}
      </div>
    </ArtFilterProvider>
  );
};

export default CategoryLayout;
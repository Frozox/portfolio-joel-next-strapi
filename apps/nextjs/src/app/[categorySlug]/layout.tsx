import { Metadata } from "next";
import { CategoryFilter } from "@/components/categoryFilter";

type TLayoutProps = {
    children: React.ReactNode
    params: {
        categorySlug: string
    },
}

export const generateMetadata = ({ params }: TLayoutProps): Metadata => {
    return {
        title: params.categorySlug
    }
}

const CategoryLayout = ({ children, params }: Readonly<TLayoutProps>) => {
    return (
        <>
            <div className="h-11 animate-content-load">
                <CategoryFilter className="sticky md:fixed" activeCategorySlug={params.categorySlug} />
            </div>
            {children}
        </>
    );
}

export default CategoryLayout;
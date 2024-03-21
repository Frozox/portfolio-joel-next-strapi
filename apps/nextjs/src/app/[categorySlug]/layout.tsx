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
        <div className="relative animate-content-load">
            <div className="h-11">
                <CategoryFilter className="sticky md:fixed" activeCategorySlug={params.categorySlug} />
            </div>
            {children}
        </div>
    );
}

export default CategoryLayout;
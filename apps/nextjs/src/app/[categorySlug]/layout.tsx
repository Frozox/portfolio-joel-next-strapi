import { Metadata } from "next";

type TProps = {
    children: React.ReactNode,
    params: {
        categorySlug: string
    }
}

export const generateMetadata = ({ params }: TProps): Metadata => {
    return {
        title: params.categorySlug
    }
}


const CategoryLayout = ({ children, params }: Readonly<TProps>) => {
    return (
        <div className="test">
            {children}
        </div>
    );
}

export default CategoryLayout;
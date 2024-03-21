"use client"

type TCategoryProps = {
    params: {
        categorySlug: string
    }
}

const Category = ({ params }: TCategoryProps) => {
    return (
        <div className="h-screen w-full">
            {params.categorySlug}
        </div>
    );
}

export default Category;
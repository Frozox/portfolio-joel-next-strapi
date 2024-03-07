import { Card, LayoutGrid } from "@/components/ui/layoutGrid";
import { faker } from "@faker-js/faker";

type TProps = {
    params: {
        categorySlug: string
    }
}

const Category = ({ params }: TProps) => {
    const cardsNb = 10;
    const cards: Card[] = Array(cardsNb).fill(0).map((k, v) => {
        return {
            id: v,
            content: <div>test</div>,
            className: '',
            thumbnail: faker.image.urlPicsumPhotos(),
        }
    })

    return (
        <div className="h-screen w-full">
            <div>{params.categorySlug}</div>
            <LayoutGrid cards={cards} />
        </div>
    );
}

export default Category;
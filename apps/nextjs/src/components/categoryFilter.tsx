"use client"

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigationMenu";
import { cn } from "@/libs/utils";
import { FilterIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useArtCategory } from "@/helpers/hook/strapi/strapiSdk";
import React from "react";

type TCheckboxItem = {
    id: string | number,
    slug: string,
    value: string,
    defaultChecked?: boolean
}

export type TCategoryFilterCheckboxListProps = {
    title: string,
    items: TCheckboxItem[]
}

export type TCategoryFilterProps = {
    className?: string,
    activeCategorySlug?: string
}

const prefix = "filter-";
const defaultPrices: string[] = ["25€ - 50€", "50€ - 75€", "75€ - 100€", "+100€"];
const defaultDimensions: string[] = ["30x30cm", "40x40cm", "50x50cm", "+50cm"];
const defaultYears: string[] = ["2005 - 2010", "2010 - 2015", "2015 - 2020", "2020 - 2024"];

export const CategoryFilterCheckboxList = ({ title, items }: TCategoryFilterCheckboxListProps) => {
    return (
        <div>
            <div>{title}</div>
            <ul>
                {items.map((item) => (
                    <li>
                        <Checkbox defaultChecked={item.defaultChecked} className="mr-2" id={`${prefix}-${item.slug}-${item.id}`} />
                        <label className="select-none" htmlFor={`${prefix}-${item.slug}-${item.id}`}>{item.value}</label>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const CategoryFilter = ({ className, activeCategorySlug }: TCategoryFilterProps) => {
    const { artCategories, } = useArtCategory();

    const [prices, setPrices] = React.useState<TCheckboxItem[]>([]);
    const [categories, setCategories] = React.useState<TCheckboxItem[]>([]);
    const [dimensions, setDimensions] = React.useState<TCheckboxItem[]>([]);
    const [years, setYears] = React.useState<TCheckboxItem[]>([]);

    React.useEffect(() => {
        const formatedPrices: TCheckboxItem[] = defaultPrices.map((val, idx) => {
            return { id: idx, slug: "price", value: val }
        })
        setPrices(formatedPrices)
    }, [defaultPrices])

    React.useEffect(() => {
        const formatedDimensions: TCheckboxItem[] = defaultDimensions.map((val, idx) => {
            return { id: idx, slug: "dimension", value: val }
        })
        setDimensions(formatedDimensions)
    }, [defaultDimensions])

    React.useEffect(() => {
        const formatedYears: TCheckboxItem[] = defaultYears.map((val, idx) => {
            return { id: idx, slug: "year", value: val }
        })
        setYears(formatedYears)
    }, [defaultYears])

    React.useEffect(() => {
        const formatedCategories: TCheckboxItem[] = artCategories.map((category) => {
            return { id: category.id, slug: category.attributes.slug, value: category.attributes.name, defaultChecked: category.attributes.slug === activeCategorySlug }
        })
        setCategories(formatedCategories)
    }, [artCategories])

    return (
        <div className={cn("fixed w-full", className)}>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            <div className="inline-flex"><FilterIcon /><span>Filtres</span></div>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 w-[300px] md:w-[600px]">
                            <CategoryFilterCheckboxList title="Prix" items={prices} />
                            <CategoryFilterCheckboxList title="Taille" items={dimensions} />
                            <CategoryFilterCheckboxList title="Année" items={years} />
                            <CategoryFilterCheckboxList title="Catégorie" items={categories} />
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Trier</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="p-4 space-y-2 w-[250px]">
                                <li>
                                    Prix
                                </li>
                                <li>
                                    Taille
                                </li>
                                <li>
                                    Année
                                </li>
                                <li>
                                    Catégorie
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <hr className="w-full h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-foreground to-transparent opacity-25" />
        </div>
    )
}
"use client"

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigationMenu";
import { cn } from "@/libs/utils";
import { FilterIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { useGetArtTagCategories } from "@/helpers/hook/strapi/request";

type TCheckboxItem = {
    tagId: string | number,
    tagCatagoryId: string | number,
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

export const CategoryFilterCheckboxList = ({ title, items }: TCategoryFilterCheckboxListProps) => {
    return (
        <div>
            <div>{title}</div>
            <ul>
                {items.map((item) => (
                    <li>
                        <Checkbox defaultChecked={item.defaultChecked} className="mr-2" id={`${prefix}-${item.tagCatagoryId}-${item.tagId}`} />
                        <label className="select-none" htmlFor={`${prefix}-${item.tagCatagoryId}-${item.tagId}`}>{item.value}</label>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const CategoryFilter = ({ className, activeCategorySlug }: TCategoryFilterProps) => {
    const { response, isError, isLoading } = useGetArtTagCategories({ populate: "*", sort: "display_name", filters: { "art_categories": { "slug": activeCategorySlug } } })

    return (
        <div className={cn("fixed w-full", className)}>
            <hr className="w-full h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-foreground to-transparent opacity-25" />
            <NavigationMenu className="space-x-2 md:space-x-0">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger disabled={isLoading || isError}>
                            <div className="inline-flex"><FilterIcon /><span>Filtres</span></div>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 w-[calc(100vw-1rem)] md:w-[600px]">
                            {
                                response?.data.map((tagCategory) => (
                                    <CategoryFilterCheckboxList title={tagCategory.attributes.display_name} items={
                                        tagCategory.attributes.art_tags.data.map((tag) => ({
                                            tagId: tag.id,
                                            tagCatagoryId: tagCategory.id,
                                            value: tag.attributes.tag,
                                        }))
                                    } />
                                ))
                            }
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger disabled={isLoading || isError}>Trier</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="p-4 space-y-2 w-[250px]">
                                {response?.data.map((tagCategory) => (
                                    <li>{tagCategory.attributes.display_name}</li>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <hr className="w-full h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-foreground to-transparent opacity-25" />
        </div>
    )
}
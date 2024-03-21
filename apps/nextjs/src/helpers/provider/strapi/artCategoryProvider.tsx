"use client"

import React from "react";
import ArtCategoryContext from "@/helpers/context/strapi/artCategoryContext";
import { useGetAllArtCategories } from "@/helpers/hook/strapi/request";

export const ArtCategoryProvider = ({ children }: { children: React.ReactNode }) => {
    const { response, error, isError, isLoading } = useGetAllArtCategories()

    return (
        <ArtCategoryContext.Provider value={{ artCategories: response?.data ?? [], error, isError, isLoading }}>
            {children}
        </ArtCategoryContext.Provider>
    )
}
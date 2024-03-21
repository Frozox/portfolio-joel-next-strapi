"use client"

import React from "react";
import { type ArtCategory } from "@portfolio/strapi/src/api/art-category/content-types/art-category/art-category";
import { ArtCategoryContext } from "@/helpers/context/strapi/artCategoryContext";
import { useStrapiSdk } from "@/helpers/hook/strapi/strapiSdk";

export const ArtCategoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [strapiSdk] = useStrapiSdk();
    const [artCategories, setArtCategories] = React.useState<ArtCategory[]>([]);
    const [failedFetch, setFailedFetch] = React.useState(false);
    const [endedFetch, setEndedFetch] = React.useState(false);

    React.useEffect(() => {
        if (strapiSdk === undefined) return;

        strapiSdk.find<ArtCategory[]>('art-categories', { populate: "*" })
            .catch(() => setFailedFetch(true))
            .then((res) => {
                if (res === undefined) return;
                setArtCategories(res.data);
                setEndedFetch(true);
            })
    }, [strapiSdk])

    return (
        <ArtCategoryContext.Provider value={{ artCategories, failedFetch, endedFetch }}>
            {children}
        </ArtCategoryContext.Provider>
    )
}
"use client";

import { type ArtCategory } from "@portfolio/strapi/src/api/art-category/content-types/art-category/art-category";
import React from "react";
import { StrapiError } from "strapi-sdk-js";

type TArtCategoryContext = {
  artCategories: ArtCategory[],
  error: StrapiError | null
  isError: boolean,
  isLoading: boolean
}

const ArtCategoryContext = React.createContext<TArtCategoryContext>({
  artCategories: [],
  error: null,
  isError: false,
  isLoading: true,
});

export const useArtCategory = () => React.useContext(ArtCategoryContext);

export default ArtCategoryContext;
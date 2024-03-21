"use client";

import { type ArtCategory } from "@portfolio/strapi/src/api/art-category/content-types/art-category/art-category";
import React from "react";

export const initialArtCategoryContext = {
  artCategories: [] as ArtCategory[]
};

export const ArtCategoryContext = React.createContext(
  initialArtCategoryContext
);

export const ArtCategoryContextConsumer = ArtCategoryContext.Consumer;

'use client';

import type { ArtCategory_Plain } from '@portfolio/strapi/src/api/art-category/content-types/art-category/art-category';
import React, { createContext } from 'react';
import type { StrapiError } from 'strapi-sdk-js';

interface TArtCategoryContext {
  artCategories: ArtCategory_Plain[];
  error: StrapiError | null;
  isError: boolean;
  isLoading: boolean;
}

const ArtCategoryContext = createContext<TArtCategoryContext>({
  artCategories: [],
  error: null,
  isError: false,
  isLoading: true,
});

export const useArtCategory = () => React.use(ArtCategoryContext);

export default ArtCategoryContext;

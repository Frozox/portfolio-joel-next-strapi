'use client';

import type { TGenericFindQuery } from '@helpers/hook/strapi/request';
import type { ArtTagCategory_Plain } from '@portfolio/strapi/src/api/art-tag-category/content-types/art-tag-category/art-tag-category';
import type { Art_Plain } from '@portfolio/strapi/src/api/art/content-types/art/art';
import React, { createContext } from 'react';
import type { PaginationByPage } from 'strapi-sdk-js';

interface TArtFilterContext {
  artsQuery: TGenericFindQuery<Art_Plain[]>;
  artTagCategoriesQuery: TGenericFindQuery<ArtTagCategory_Plain[]>;
  filters: Record<string, unknown> | null;
  pagination: PaginationByPage;
  setFilters: React.Dispatch<
    React.SetStateAction<Record<string, unknown> | null>
  >;
  setPagination: React.Dispatch<React.SetStateAction<PaginationByPage>>;
}

const ArtFilterContext = createContext<TArtFilterContext>({
  artsQuery: {
    response: undefined,
    error: null,
    isError: false,
    isLoading: true,
  },
  artTagCategoriesQuery: {
    response: undefined,
    error: null,
    isError: false,
    isLoading: true,
  },
  filters: null,
  pagination: { page: 1, pageSize: 10 },
  setFilters: () => {},
  setPagination: () => {},
});

export const useArtFilter = () => React.use(ArtFilterContext);

export default ArtFilterContext;

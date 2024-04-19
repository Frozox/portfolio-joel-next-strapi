'use client';

import { TGenericFindQuery } from '@/helpers/hook/strapi/request';
import { ArtTagCategory } from '@portfolio/strapi/src/api/art-tag-category/content-types/art-tag-category/art-tag-category';
import { Art } from '@portfolio/strapi/src/api/art/content-types/art/art';
import React from 'react';
import { PaginationByPage } from 'strapi-sdk-js';

type TArtFilterContext = {
  artsQuery: TGenericFindQuery<Art[]>,
  artTagCategoriesQuery: TGenericFindQuery<ArtTagCategory[]>,
  filters: Record<string, unknown> | null,
  pagination: PaginationByPage,
  setFilters: React.Dispatch<React.SetStateAction<Record<string, unknown> | null>>,
  setPagination: React.Dispatch<React.SetStateAction<PaginationByPage>>,
}

const ArtFilterContext = React.createContext<TArtFilterContext>({
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
  setFilters: () => { },
  setPagination: () => { }
});

export const useArtFilter = () => React.useContext(ArtFilterContext);

export default ArtFilterContext;
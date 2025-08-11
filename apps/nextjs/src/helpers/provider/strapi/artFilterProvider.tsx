'use client';

import ArtFilterContext from '@helpers/context/strapi/artFilterContext';
import {
  useGetArtTagCategories,
  useGetArts,
} from '@helpers/hook/strapi/request';
import { defaultPaginationFilter } from '@libs/pagination';
import React, { useState } from 'react';
import type { PaginationByPage } from 'strapi-sdk-js';

interface TArtFilterProviderProps {
  activeCategorySlug: string;
  children: React.ReactNode;
}

export const ArtFilterProvider = ({
  activeCategorySlug,
  children,
}: TArtFilterProviderProps) => {
  const [filters, setFilters] = useState<Record<string, unknown> | null>(null);
  const [pagination, setPagination] = useState<PaginationByPage>(
    defaultPaginationFilter
  );
  const artTagCategoriesQuery = useGetArtTagCategories({
    populate: '*',
    sort: 'display_name',
    filters: { art_categories: { slug: activeCategorySlug } },
  });
  const artsQuery = useGetArts({
    sort: 'sortOrder',
    populate: '*',
    filters: { art_category: { slug: activeCategorySlug }, ...filters },
    pagination,
  });

  return (
    <ArtFilterContext.Provider
      value={{
        artsQuery,
        artTagCategoriesQuery,
        filters,
        pagination,
        setFilters,
        setPagination,
      }}
    >
      {children}
    </ArtFilterContext.Provider>
  );
};

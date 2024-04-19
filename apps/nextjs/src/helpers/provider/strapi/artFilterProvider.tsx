'use client';

import ArtFilterContext from '@/helpers/context/strapi/artFilterContext';
import { useGetArtTagCategories, useGetArts } from '@/helpers/hook/strapi/request';
import React from 'react';
import { PaginationByPage } from 'strapi-sdk-js';

type TArtFilterProviderProps = {
  activeCategorySlug: string,
  children: React.ReactNode
}

export const ArtFilterProvider = ({ activeCategorySlug, children }: TArtFilterProviderProps) => {
  const [filters, setFilters] = React.useState<Record<string, unknown> | null>(null);
  const [pagination, setPagination] = React.useState<PaginationByPage>({ page: 1, pageSize: 2 });
  const artTagCategoriesQuery = useGetArtTagCategories({ populate: '*', sort: 'display_name', filters: { 'art_categories': { 'slug': activeCategorySlug } } });
  const artsQuery = useGetArts({ populate: '*', filters: { 'art_category': { 'slug': activeCategorySlug }, ...filters }, pagination });

  return (
    <ArtFilterContext.Provider value={{ artsQuery, artTagCategoriesQuery, filters, pagination, setFilters, setPagination }}>
      {children}
    </ArtFilterContext.Provider>
  );
};
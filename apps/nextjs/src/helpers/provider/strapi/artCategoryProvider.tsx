'use client';

import ArtCategoryContext from '@/helpers/context/strapi/artCategoryContext';
import { useGetArtCategories } from '@/helpers/hook/strapi/request';
import React from 'react';

export const ArtCategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const { response, error, isError, isLoading } = useGetArtCategories({ populate: 'image' });

  return (
    <ArtCategoryContext.Provider value={{ artCategories: response?.data ?? [], error, isError, isLoading }}>
      {children}
    </ArtCategoryContext.Provider>
  );
};
import { strapiInstance } from '@/helpers/hook/strapi';
import { ArtCategory } from '@portfolio/strapi/src/api/art-category/content-types/art-category/art-category';
import { ArtTagCategory } from '@portfolio/strapi/src/api/art-tag-category/content-types/art-tag-category/art-tag-category';
import { ArtTag } from '@portfolio/strapi/src/api/art-tag/content-types/art-tag/art-tag';
import { Art } from '@portfolio/strapi/src/api/art/content-types/art/art';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  StrapiError,
  StrapiRequestParams,
  StrapiResponse,
} from 'strapi-sdk-js';

export type TGenericFindQuery<T> = {
  response: StrapiResponse<T> | undefined;
  error: StrapiError | null;
  isError: boolean;
  isLoading: boolean;
};

const useGenericRequestFindMany = <T>(
  contentType: string,
  params?: StrapiRequestParams
) => {
  const { data, error, isError, isLoading } = useQuery<
    StrapiResponse<T[]>,
    StrapiError
  >({
    queryKey: [contentType, params],
    queryFn: async () => {
      return await strapiInstance.find<T[]>(contentType, params);
    },
  });

  return React.useMemo(
    () => ({ response: data, error, isError, isLoading }),
    [data, error, isError, isLoading]
  );
};

export const useGetArtCategories = (params?: StrapiRequestParams) =>
  useGenericRequestFindMany<ArtCategory>('art-categories', params);

export const useGetArts = (params?: StrapiRequestParams) =>
  useGenericRequestFindMany<Art>('arts', params);

export const useGetArtTagCategories = (params?: StrapiRequestParams) =>
  useGenericRequestFindMany<ArtTagCategory>('art-tag-categories', params);

export const useGetArtTags = (params?: StrapiRequestParams) =>
  useGenericRequestFindMany<ArtTag>('art-tags', params);

import { StrapiContentTypes, strapiInstance } from '@/helpers/hook/strapi';
import { ArtCategory } from '@portfolio/strapi/src/api/art-category/content-types/art-category/art-category';
import { ArtTagCategory } from '@portfolio/strapi/src/api/art-tag-category/content-types/art-tag-category/art-tag-category';
import { ArtTag } from '@portfolio/strapi/src/api/art-tag/content-types/art-tag/art-tag';
import { Art } from '@portfolio/strapi/src/api/art/content-types/art/art';
import { New } from '@portfolio/strapi/src/api/new/content-types/new/new';
import { GenericEmail } from '@portfolio/strapi/types/email/email';
import { QueryClient, useQuery } from '@tanstack/react-query';
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
  contentType: StrapiContentTypes,
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

const useGenericRequestFindSingle = <T>(
  contentType: StrapiContentTypes,
  params?: StrapiRequestParams
) => {
  const { data, error, isError, isLoading } = useQuery<
    StrapiResponse<T>,
    StrapiError
  >({
    queryKey: [contentType, params],
    queryFn: async () => {
      return await strapiInstance.find<T>(contentType, params);
    },
  });

  return React.useMemo(
    () => ({ response: data, error, isError, isLoading }),
    [data, error, isError, isLoading]
  );
};

const genericRequestPost = async <T>(
  contentType: StrapiContentTypes,
  body: any,
  params?: StrapiRequestParams
): Promise<StrapiResponse<T>> => {
  return await strapiInstance.create<T>(contentType, body, params);
};

const prefetchQuery = (
  queryClient: QueryClient,
  contentType: StrapiContentTypes,
  params?: StrapiRequestParams
) => queryClient.prefetchQuery({
  queryKey: [contentType, params],
  queryFn: async () => {
    return await strapiInstance.find(contentType, params);
  },
});


export const useGetArtCategories = (params?: StrapiRequestParams) =>
  useGenericRequestFindMany<ArtCategory>(StrapiContentTypes.ArtCategories, params);

export const prefetchArtCategories = (queryClient: QueryClient, params?: StrapiRequestParams) =>
  prefetchQuery(queryClient, StrapiContentTypes.ArtCategories , params);

export const useGetArts = (params?: StrapiRequestParams) =>
  useGenericRequestFindMany<Art>(StrapiContentTypes.Arts, params);

export const prefetchArts = (queryClient: QueryClient, params?: StrapiRequestParams) =>
  prefetchQuery(queryClient, StrapiContentTypes.Arts, params);

export const useGetArtTagCategories = (params?: StrapiRequestParams) =>
  useGenericRequestFindMany<ArtTagCategory>(StrapiContentTypes.ArtTagCategories, params);

export const prefetchArtTagCategories = (queryClient: QueryClient, params?: StrapiRequestParams) =>
  prefetchQuery(queryClient, StrapiContentTypes.ArtTagCategories, params);

export const useGetArtTags = (params?: StrapiRequestParams) =>
  useGenericRequestFindMany<ArtTag>(StrapiContentTypes.ArtTags, params);

export const prefetchArtTags = (queryClient: QueryClient, params?: StrapiRequestParams) =>
  prefetchQuery(queryClient, StrapiContentTypes.ArtTags, params);

export const useGetNews = (params?: StrapiRequestParams) =>
  useGenericRequestFindSingle<New>(StrapiContentTypes.News, params);

export const prefetchNews = (queryClient: QueryClient, params?: StrapiRequestParams) =>
  prefetchQuery(queryClient, StrapiContentTypes.News, params);

export const sendContactForm = (body: any, params?: StrapiRequestParams) =>
  genericRequestPost<GenericEmail>(StrapiContentTypes.ContactForm, body, params);
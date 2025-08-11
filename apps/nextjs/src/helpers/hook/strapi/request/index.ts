import { StrapiContentTypes, strapiInstance } from '@helpers/hook/strapi';
import type { ArtCategory_Plain } from '@portfolio/strapi/src/api/art-category/content-types/art-category/art-category';
import type { ArtTagCategory_Plain } from '@portfolio/strapi/src/api/art-tag-category/content-types/art-tag-category/art-tag-category';
import type { ArtTag_Plain } from '@portfolio/strapi/src/api/art-tag/content-types/art-tag/art-tag';
import type { Art_Plain } from '@portfolio/strapi/src/api/art/content-types/art/art';
import type { New_Plain } from '@portfolio/strapi/src/api/new/content-types/new/new';
import type { GenericEmail } from '@portfolio/strapi/types/common/email';
import type { QueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import type {
  StrapiError,
  StrapiRequestParams,
  StrapiResponse,
} from 'strapi-sdk-js';

export interface TGenericFindQuery<T> {
  response: StrapiResponse<T> | undefined;
  error: StrapiError | null;
  isError: boolean;
  isLoading: boolean;
}

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

  return useMemo(
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

  return useMemo(
    () => ({ response: data, error, isError, isLoading }),
    [data, error, isError, isLoading]
  );
};

const genericRequestPost = async <T>(
  contentType: StrapiContentTypes,
  body: unknown,
  params?: StrapiRequestParams
): Promise<StrapiResponse<T>> => {
  return await strapiInstance.create<T>(contentType, body, params);
};

const fetchQuery = <T>(
  queryClient: QueryClient,
  contentType: StrapiContentTypes,
  params?: StrapiRequestParams
): Promise<StrapiResponse<T>> =>
  queryClient.fetchQuery({
    queryKey: [contentType, params],
    queryFn: async () => {
      return await strapiInstance.find(contentType, params);
    },
  });

const prefetchQuery = (
  queryClient: QueryClient,
  contentType: StrapiContentTypes,
  params?: StrapiRequestParams
) =>
  queryClient.prefetchQuery({
    queryKey: [contentType, params],
    queryFn: async () => {
      return await strapiInstance.find(contentType, params);
    },
  });

export const useGetArtCategories = (params?: StrapiRequestParams) =>
  useGenericRequestFindMany<ArtCategory_Plain>(
    StrapiContentTypes.ArtCategories,
    params
  );

export const fetchArtCategories = (
  queryClient: QueryClient,
  params?: StrapiRequestParams
) =>
  fetchQuery<ArtCategory_Plain[]>(
    queryClient,
    StrapiContentTypes.ArtCategories,
    params
  );

export const prefetchArtCategories = (
  queryClient: QueryClient,
  params?: StrapiRequestParams
) => prefetchQuery(queryClient, StrapiContentTypes.ArtCategories, params);

export const useGetArts = (params?: StrapiRequestParams) =>
  useGenericRequestFindMany<Art_Plain>(StrapiContentTypes.Arts, params);

export const prefetchArts = (
  queryClient: QueryClient,
  params?: StrapiRequestParams
) => prefetchQuery(queryClient, StrapiContentTypes.Arts, params);

export const useGetArtTagCategories = (params?: StrapiRequestParams) =>
  useGenericRequestFindMany<ArtTagCategory_Plain>(
    StrapiContentTypes.ArtTagCategories,
    params
  );

export const prefetchArtTagCategories = (
  queryClient: QueryClient,
  params?: StrapiRequestParams
) => prefetchQuery(queryClient, StrapiContentTypes.ArtTagCategories, params);

export const useGetArtTags = (params?: StrapiRequestParams) =>
  useGenericRequestFindMany<ArtTag_Plain>(StrapiContentTypes.ArtTags, params);

export const prefetchArtTags = (
  queryClient: QueryClient,
  params?: StrapiRequestParams
) => prefetchQuery(queryClient, StrapiContentTypes.ArtTags, params);

export const useGetNews = (params?: StrapiRequestParams) =>
  useGenericRequestFindSingle<New_Plain>(StrapiContentTypes.News, params);

export const prefetchNews = (
  queryClient: QueryClient,
  params?: StrapiRequestParams
) => prefetchQuery(queryClient, StrapiContentTypes.News, params);

export const sendContactForm = (body: unknown, params?: StrapiRequestParams) =>
  genericRequestPost<GenericEmail>(
    StrapiContentTypes.ContactForm,
    body,
    params
  );

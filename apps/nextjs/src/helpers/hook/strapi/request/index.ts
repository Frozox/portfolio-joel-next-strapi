import { useQuery } from "react-query";
import { strapiInstance } from "@/helpers/hook/strapi";
import { ArtCategory } from "@portfolio/strapi/src/api/art-category/content-types/art-category/art-category";
import {
  StrapiError,
  StrapiRequestParams,
  StrapiResponse,
} from "strapi-sdk-js";
import React from "react";
import { Art } from "@portfolio/strapi/src/api/art/content-types/art/art";
import { ArtTag } from "@portfolio/strapi/src/api/art-tag/content-types/art-tag/art-tag";
import { ArtTagCategory } from "@portfolio/strapi/src/api/art-tag-category/content-types/art-tag-category/art-tag-category";

const genericRequestFindMany = <T>(
  contentType: string,
  params?: StrapiRequestParams
) => {
  const { data, error, isError, isLoading } = useQuery<
    StrapiResponse<T[]>,
    StrapiError
  >({
    queryKey: [contentType],
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
  genericRequestFindMany<ArtCategory>("art-categories", params);

export const useGetArts = (params?: StrapiRequestParams) =>
  genericRequestFindMany<Art>("arts", params);

export const useGetArtTagCategories = (params?: StrapiRequestParams) =>
  genericRequestFindMany<ArtTagCategory>("art-tag-categories", params);

export const useGetArtTags = (params?: StrapiRequestParams) =>
  genericRequestFindMany<ArtTag>("art-tags", params);

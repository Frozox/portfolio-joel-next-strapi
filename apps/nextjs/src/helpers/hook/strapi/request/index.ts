import { useQuery } from "react-query";
import { strapiInstance } from "@/helpers/hook/strapi";
import { ArtCategory } from "@portfolio/strapi/src/api/art-category/content-types/art-category/art-category";
import { StrapiError, StrapiResponse } from "strapi-sdk-js";
import React from "react";

export const useGetAllArtCategories = () => {
  const { data, error, isError, isLoading } = useQuery<
    StrapiResponse<ArtCategory[]>,
    StrapiError
  >([], async () => {
    return await strapiInstance.find<ArtCategory[]>("art-categories", {
      populate: "*",
    });
  });

  return React.useMemo(
    () => ({ response: data, error, isError, isLoading }),
    [data, error, isError, isLoading]
  );
};

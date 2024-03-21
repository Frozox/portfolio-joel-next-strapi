"use client";

import { env } from "@/env.mjs";
import { ArtCategoryContext } from "@/helpers/context/strapi/artCategoryContext";
import React from "react";
import Strapi, { type StrapiOptions } from "strapi-sdk-js";

export const useStrapiSdk = () => {
  const [strapiSdk, setStrapiSdk] = React.useState<Strapi>();

  React.useEffect(() => {
    const strapiOptions: StrapiOptions = {
      url: env.NEXT_PUBLIC_BACKEND_HOST,
    };

    setStrapiSdk(new Strapi(strapiOptions));
  }, []);

  return [strapiSdk];
};

export const useArtCategory = () => React.useContext(ArtCategoryContext);

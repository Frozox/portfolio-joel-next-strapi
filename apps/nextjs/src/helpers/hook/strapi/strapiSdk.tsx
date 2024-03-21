"use client";

import { ArtCategoryContext } from "@/helpers/context/strapi/artCategoryContext";
import { env } from "process";
import React, { useEffect } from "react";
import Strapi, { type StrapiOptions } from "strapi-sdk-js";

export const useStrapiSdk = () => {
  const [strapiSdk, setStrapiSdk] = React.useState<Strapi>();

  useEffect(() => {
    const strapiOptions: StrapiOptions = {
      url: "http://localhost:8000/",
    };

    setStrapiSdk(new Strapi(strapiOptions));
  }, []);

  return [strapiSdk];
};

export const useArtCategory = () => React.useContext(ArtCategoryContext);

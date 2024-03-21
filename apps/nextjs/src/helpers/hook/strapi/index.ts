import { env } from "@/env.mjs";
import Strapi, { type StrapiOptions } from "strapi-sdk-js";

const strapiConfig: StrapiOptions = {
  url: env.NEXT_PUBLIC_BACKEND_HOST,
};

export const strapiInstance = new Strapi(strapiConfig);

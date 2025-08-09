import { env } from '@env';
import Strapi, { type StrapiOptions } from 'strapi-sdk-js';

const strapiConfig: StrapiOptions = {
  url: env.NEXT_PUBLIC_BACKEND_HOST,
};

export enum StrapiContentTypes {
  ArtCategories = 'art-categories',
  Arts = 'arts',
  ArtTagCategories = 'art-tag-categories',
  ArtTags = 'art-tags',
  News = 'new',
  ContactForm = 'email/contact-form',
}

export const strapiInstance = new Strapi(strapiConfig);

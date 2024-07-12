// Interface automatically generated by schemas-to-ts

import { Media } from '../../../../common/sharedSchemas/Media';
import { ArtCategory } from '../../../art-category/content-types/art-category/art-category';
import { ArtTag } from '../../../art-tag/content-types/art-tag/art-tag';
import { Media_Plain } from '../../../../common/sharedSchemas/Media';
import { ArtCategory_Plain } from '../../../art-category/content-types/art-category/art-category';
import { ArtTag_Plain } from '../../../art-tag/content-types/art-tag/art-tag';
import { AdminPanelRelationPropertyModification } from '../../../../common/sharedSchemas/AdminPanelRelationPropertyModification';

export interface Art {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    name: string;
    description?: string;
    date?: Date;
    thumbnail: { data: Media };
    images?: { data: Media[] };
    height: number;
    width: number;
    depth?: number;
    art_category?: { data: ArtCategory };
    art_tags?: { data: ArtTag[] };
    sold_out: boolean;
    locale: string;
    localizations?: { data: Art[] };
  };
}
export interface Art_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name: string;
  description?: string;
  date?: Date;
  thumbnail: Media_Plain;
  images?: Media_Plain[];
  height: number;
  width: number;
  depth?: number;
  art_category?: ArtCategory_Plain;
  art_tags?: ArtTag_Plain[];
  sold_out: boolean;
  locale: string;
  localizations?: Art_Plain[];
}

export interface Art_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name: string;
  description?: string;
  date?: Date;
  thumbnail: number;
  images?: number[];
  height: number;
  width: number;
  depth?: number;
  art_category?: number;
  art_tags?: number[];
  sold_out: boolean;
  locale: string;
  localizations?: Art[];
}

export interface Art_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name: string;
  description?: string;
  date?: Date;
  thumbnail: AdminPanelRelationPropertyModification<Media_Plain>;
  images?: AdminPanelRelationPropertyModification<Media_Plain>[];
  height: number;
  width: number;
  depth?: number;
  art_category?: AdminPanelRelationPropertyModification<ArtCategory_Plain>;
  art_tags?: AdminPanelRelationPropertyModification<ArtTag_Plain>;
  sold_out: boolean;
  locale: string;
  localizations?: Art[];
}

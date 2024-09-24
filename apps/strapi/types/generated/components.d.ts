import type { Schema, Attribute } from '@strapi/strapi';

export interface VisualComponentsTextMediaComponent extends Schema.Component {
  collectionName: 'components_visual_components_text_medias';
  info: {
    displayName: 'Text + Media';
    icon: 'dashboard';
    description: '';
  };
  attributes: {
    content: Attribute.Text & Attribute.Required;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
    media_position: Attribute.Enumeration<['left', 'right']> &
      Attribute.Required &
      Attribute.DefaultTo<'left'>;
    media_mobile_position: Attribute.Enumeration<['top', 'bottom']> &
      Attribute.Required &
      Attribute.DefaultTo<'top'>;
  };
}

export interface VisualComponentsTextComponent extends Schema.Component {
  collectionName: 'components_visual_components_texts';
  info: {
    displayName: 'Text';
    icon: 'pencil';
    description: '';
  };
  attributes: {
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
  };
}

export interface VisualComponentsMediaComponent extends Schema.Component {
  collectionName: 'components_visual_components_media';
  info: {
    displayName: 'Media';
    icon: 'picture';
    description: '';
  };
  attributes: {
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'visual-components.text-media-component': VisualComponentsTextMediaComponent;
      'visual-components.text-component': VisualComponentsTextComponent;
      'visual-components.media-component': VisualComponentsMediaComponent;
    }
  }
}

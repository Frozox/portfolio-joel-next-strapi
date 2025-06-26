import type { Attribute, Schema } from '@strapi/strapi';

export interface VisualComponentsMediaComponent extends Schema.Component {
  collectionName: 'components_visual_components_media';
  info: {
    description: '';
    displayName: 'Media';
    icon: 'picture';
  };
  attributes: {
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
  };
}

export interface VisualComponentsSpacerComponent extends Schema.Component {
  collectionName: 'components_visual_components_spacers';
  info: {
    description: '';
    displayName: 'Spacer';
    icon: 'bulletList';
  };
  attributes: {};
}

export interface VisualComponentsTextComponent extends Schema.Component {
  collectionName: 'components_visual_components_texts';
  info: {
    description: '';
    displayName: 'Text';
    icon: 'pencil';
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
    title: Attribute.String;
  };
}

export interface VisualComponentsTextMediaComponent extends Schema.Component {
  collectionName: 'components_visual_components_text_medias';
  info: {
    description: '';
    displayName: 'Text + Media';
    icon: 'dashboard';
  };
  attributes: {
    content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
    media_mobile_position: Attribute.Enumeration<['top', 'bottom']> &
      Attribute.Required &
      Attribute.DefaultTo<'top'>;
    media_position: Attribute.Enumeration<['left', 'right']> &
      Attribute.Required &
      Attribute.DefaultTo<'left'>;
    title: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'visual-components.media-component': VisualComponentsMediaComponent;
      'visual-components.spacer-component': VisualComponentsSpacerComponent;
      'visual-components.text-component': VisualComponentsTextComponent;
      'visual-components.text-media-component': VisualComponentsTextMediaComponent;
    }
  }
}

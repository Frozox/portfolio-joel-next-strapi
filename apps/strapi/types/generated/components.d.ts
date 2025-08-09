import type { Schema, Struct } from '@strapi/strapi';

export interface VisualComponentsMediaComponent extends Struct.ComponentSchema {
  collectionName: 'components_visual_components_media';
  info: {
    description: '';
    displayName: 'Media';
    icon: 'picture';
  };
  attributes: {
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    media_position: Schema.Attribute.Enumeration<['left', 'right', 'center']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'left'>;
  };
}

export interface VisualComponentsSpacerComponent
  extends Struct.ComponentSchema {
  collectionName: 'components_visual_components_spacers';
  info: {
    description: '';
    displayName: 'Spacer';
    icon: 'bulletList';
  };
  attributes: {};
}

export interface VisualComponentsTextComponent extends Struct.ComponentSchema {
  collectionName: 'components_visual_components_texts';
  info: {
    description: '';
    displayName: 'Text';
    icon: 'pencil';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          output: 'HTML';
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface VisualComponentsTextMediaComponent
  extends Struct.ComponentSchema {
  collectionName: 'components_visual_components_text_medias';
  info: {
    description: '';
    displayName: 'Text + Media';
    icon: 'dashboard';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          output: 'HTML';
          preset: 'defaultHtml';
        }
      >;
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    media_mobile_position: Schema.Attribute.Enumeration<['top', 'bottom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'top'>;
    media_position: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'left'>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'visual-components.media-component': VisualComponentsMediaComponent;
      'visual-components.spacer-component': VisualComponentsSpacerComponent;
      'visual-components.text-component': VisualComponentsTextComponent;
      'visual-components.text-media-component': VisualComponentsTextMediaComponent;
    }
  }
}

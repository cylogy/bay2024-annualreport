import { Field, ImageField, LayoutServiceData, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Headline: Field<string>;
  Description: Field<string>;
  Video: LinkField;
  Image: ImageField;
  CTA: LinkField;
  AnchorID: Field<string>;
}

export type HeroProps = {
  params: { [key: string]: string };
  fields: Fields;
  layoutData: LayoutServiceData;
};

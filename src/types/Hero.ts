import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Headline: Field<string>;
  Description: Field<string>;
  Video: Field<string>;
  Image: ImageField;
  CTA: LinkField;
  AnchorID: Field<string>;
}

export type HeroProps = {
  params: { [key: string]: string };
  fields: Fields;
};

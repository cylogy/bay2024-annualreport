import {
  Field,
  Text,
  LayoutServiceData,
  RichTextField,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
type ContentTileItemProps = ComponentProps & {
  layoutData: LayoutServiceData;
  fields: {
    Headline: Field<string>;
    Subheadline: RichTextField;
    Number: Field<string>;
  };
};
export const Default = (props: ContentTileItemProps): JSX.Element => {
  return props.params.variant === 'Default' ? (
    <div style={{ backgroundColor: 'lightblue' }}>
      TILE Variant Default
      <Text field={props.fields.Headline} />
      <RichText field={props.fields.Subheadline} />
      <Text field={props.fields.Number} />
    </div>
  ) : props.params.variant === 'Variant2' ? (
    <div style={{ backgroundColor: 'purple' }}>
      TILE Variant 2
      <Text field={props.fields.Headline} />
      <RichText field={props.fields.Subheadline} />
      <Text field={props.fields.Number} />
    </div>
  ) : (
    <div style={{ backgroundColor: 'green' }}>
      TILE Variant 3
      <Text field={props.fields.Headline} />
      <RichText field={props.fields.Subheadline} />
      <Text field={props.fields.Number} />
    </div>
  );
};

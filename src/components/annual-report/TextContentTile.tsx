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
      <article className="text-white bg-powder-blue p-[40px] rounded-[20px] relative">
        <img
          src="/images/textContentTiles-bg.png"
          alt=""
          className="object-cover w-full absolute top-0 left-0"
        />
        <Text
          tag="h4"
          className="mb-[10px] text-[1.625rem] leading-[1.980625rem]  md:text-[2rem] md:leading-[2.4375rem]"
          field={props.fields.Headline}
        />

        <RichText className="text-[1rem] leading-[1.6rem]" field={props.fields.Subheadline} />
      </article>
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

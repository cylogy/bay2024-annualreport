import {
  Text,
  Field,
  Placeholder,
  LayoutServiceData,
  ComponentRendering,
  RichTextField,
  ImageField,
  RichText,
  Image,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type CTAProps = ComponentProps & {
  layoutData: LayoutServiceData;
  rendering: ComponentRendering;
  fields: {
    Headline: Field<string>;
    Description: RichTextField;
    Image: ImageField;
  };
};

export const Default = (props: CTAProps): JSX.Element => {
  const phKey = `graphiccontentlinks-${props.params.DynamicPlaceholderId}`;
  return (
    <section>
      <div>Default</div>
      <Text field={props.fields.Headline} />
      <RichText field={props.fields.Description} />
      <Image field={props.fields?.Image} />
      <Placeholder name={phKey} rendering={props.rendering} />
    </section>
  );
};

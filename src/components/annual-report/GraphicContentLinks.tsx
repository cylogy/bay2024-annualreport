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

type GraphicContentLinksProps = ComponentProps & {
  layoutData: LayoutServiceData;
  rendering: ComponentRendering;
  fields: {
    Headline: Field<string>;
    Description: RichTextField;
    Image: ImageField;
  };
};

export const Default = (props: GraphicContentLinksProps): JSX.Element => {
  const phKey = `graphiccontentlinks-${props.params.DynamicPlaceholderId}`;
  return (
    <section>
      <div>GraphicContentLinks</div>
      <Text field={props.fields.Headline} />
      <RichText field={props.fields.Description} />
      <Image field={props.fields?.Image} />
      <Placeholder name={phKey} rendering={props.rendering} />
    </section>
  );
};

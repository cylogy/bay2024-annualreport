import {
  Text,
  Field,
  LayoutServiceData,
  ComponentRendering,
  LinkField,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type GraphicContentLinksProps = ComponentProps & {
  layoutData: LayoutServiceData;
  rendering: ComponentRendering;
  fields: {
    Headline: Field<string>;
    Subheadline: Field<string>;
    CTA: LinkField;
  };
};

export const Default = (props: GraphicContentLinksProps): JSX.Element => {
  return (
    <section>
      <Text field={props.fields.Headline} />
      <Text field={props.fields.Subheadline} />
      <Link field={props.fields?.CTA} />
    </section>
  );
};

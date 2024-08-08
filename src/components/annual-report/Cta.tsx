import {
  Text,
  Field,
  LayoutServiceData,
  ComponentRendering,
  LinkField,
  Link,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type CTAProps = ComponentProps & {
  layoutData: LayoutServiceData;
  rendering: ComponentRendering;
  fields: {
    Headline: Field<string>;
    Subheadline: Field<string>;
    CTA: LinkField;
  };
};

export const Default = withDatasourceCheck()<CTAProps>((props: CTAProps): JSX.Element => {
  return (
    <section>
      <div>CTA</div>
      <Text field={props.fields.Headline} />
      <Text field={props.fields.Subheadline} />
      <Link field={props.fields?.CTA} />
    </section>
  );
});

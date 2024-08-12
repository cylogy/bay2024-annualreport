import {
  Field,
  Text,
  ComponentRendering,
  LinkField,
  withDatasourceCheck,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type AnchorLinksProps = ComponentProps & {
  rendering: ComponentRendering;
  fields: {
    Headline: Field<string>;
  };
};

export const Default = withDatasourceCheck()<AnchorLinksProps>(
  (props: AnchorLinksProps): JSX.Element => {
    return (
      <>
        <Text tag="h4" className="mb-[10px]" field={props.fields.Headline} />
        <Placeholder name={`anchor-links`} rendering={props.rendering} />
      </>
    );
  }
);

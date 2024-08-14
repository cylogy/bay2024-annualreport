import {
  Field,
  ComponentRendering,
  withDatasourceCheck,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type AnchorLinkProps = ComponentProps & {
  rendering: ComponentRendering;
  fields: {
    Name: Field<string>;
    AnchorID: Field<string>;
  };
};

export const Default = withDatasourceCheck()<AnchorLinkProps>(
  (props: AnchorLinkProps): JSX.Element => {
    console.log('AnchorLinks', props);
    return (
      <>
        <Link field={props.fields} />
      </>
    );
  }
);

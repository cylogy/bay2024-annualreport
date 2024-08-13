import {
  Field,
  Text,
  ComponentRendering,
  withDatasourceCheck,
  Placeholder,
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
    console.log(props);
    return (
      <>
        <a href="">
          <Text field={props.fields.Name} />
        </a>
        <Placeholder name={`anchor-links`} rendering={props.rendering} />
      </>
    );
  }
);

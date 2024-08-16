import {
  Field,
  ComponentRendering,
  withDatasourceCheck,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type AnchorLinkProps = ComponentProps & {
  rendering: ComponentRendering;
  fields: {
    Name: Field<string>;
    AnchorID: Field<string>;
    Level: Field<string>;
  };
};

export const Default = withDatasourceCheck()<AnchorLinkProps>(
  (props: AnchorLinkProps): JSX.Element => {
    console.log('AnchorLinks', props);
    return (
      <a
        href={`#${props.fields.AnchorID.value}`}
        className={`p2 ${props.fields.Level.value === '2' ? 'indent' : ''}`}
      >
        <Text field={props.fields.Name} />
      </a>
    );
  }
);

import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type SignUpProps = ComponentProps & {
  fields: {
    Headline: Field<string>;
    Description: Field<string>;
    EmailLabel: Field<string>;
    EmailCTA: Field<string>;
  };
};

export const Default = withDatasourceCheck()<SignUpProps>((props: SignUpProps): JSX.Element => {
  return (
    <>
      <Text field={props.fields.Headline} />
      <Text field={props.fields.Description} />
      <Text field={props.fields.EmailLabel} />
      <Text field={props.fields.EmailCTA} />
    </>
  );
});

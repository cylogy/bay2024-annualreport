import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type QuoteProps = ComponentProps & {
  fields: {
    Quote: Field<string>;
    Author: Field<string>;
  };
};

export const Default = withDatasourceCheck()<QuoteProps>((props: QuoteProps): JSX.Element => {
  return (
    <>
      <Text field={props.fields.Quote} />
      <Text field={props.fields.Author} />
    </>
  );
});

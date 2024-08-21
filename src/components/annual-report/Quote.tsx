import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type TextContentTilesProps = ComponentProps & {
  fields: {
    Quote: Field<string>;
    Author: Field<string>;
  };
};

export const Default = withDatasourceCheck()<TextContentTilesProps>(
  (props: TextContentTilesProps): JSX.Element => {
    return (
      <>
        <Text field={props.fields.Quote} />
        <Text field={props.fields.Author} />
      </>
    );
  }
);

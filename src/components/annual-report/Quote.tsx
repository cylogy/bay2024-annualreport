import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type QuoteProps = ComponentProps & {
  fields: {
    Quote: Field<string>;
    Author: Field<string>;
  };
};

export const Default = withDatasourceCheck()<QuoteProps>((props: QuoteProps): JSX.Element => {
  if (props.fields) {
    const {
      fields: { Author, Quote },
    } = props;
    return (
      <div className="bg-soft-white pb-9 lg:pb-[120px]">
        <div className="container-anchors">
          <div className="text-callout max-w-[56.25rem]">
            <div className="flex flex-col gap-2.5 text-dark-blue">
              <span>
                “<Text field={Quote} />”
              </span>
              <p className="font-montserrat">
                -- <Text field={Author} />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
});

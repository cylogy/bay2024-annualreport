import { Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Footer: Field<string>;
}

export type FooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = ({ fields }: FooterProps): JSX.Element => {
  return (
    <div className="container">
      {fields ? (
        <RichText field={fields.Footer} />
      ) : (
        <span className="is-empty-hint">Rich text</span>
      )}
    </div>
  );
};

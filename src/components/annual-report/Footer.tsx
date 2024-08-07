import React from 'react';
import { Field, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Footer: Field<string>;
}

export type FooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FooterProps): JSX.Element => {
  const text = props.fields ? (
    <JssRichText field={props.fields.Footer} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );

  return <div className="container">{text}</div>;
};

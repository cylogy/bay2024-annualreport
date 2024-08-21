import React from 'react';
import { Field, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Text: Field<string>;
  AnchorID: Field<string>;
}

export type RichTextExtProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: RichTextExtProps): JSX.Element => {
  const text = props.fields ? (
    <JssRichText field={props.fields.Text} />
  ) : (
    <span className="is-empty-hint">Rich Text Extended</span>
  );
  return (
    <div
      className={`component rich-text ${props.params.styles.trimEnd()}`}
      id={props.fields.AnchorID.value}
    >
      <div className="component-content">{text}</div>
    </div>
  );
};

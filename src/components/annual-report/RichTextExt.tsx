import React from 'react';
import { Field, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Text: Field<string>;
  AnchorID: Field<string>;
}

export type RichTextExtProps = {
  params: { [key: string]: string };
  fields?: Fields;
};

export const Default = (props: RichTextExtProps): JSX.Element => {
  const text = props.fields ? (
    <JssRichText field={props.fields.Text} />
  ) : (
    <span className="is-empty-hint">Rich Text Extended</span>
  );
  return (
    <section className="bg-soft-white py-[36px] lg:py-[96px]" id={props.fields?.AnchorID.value}>
      <div className={`component rich-text container-anchors  ${props.params.styles.trimEnd()}`}>
        <div className="component-content rich-text-container lg:max-w-[879px] text-dark-blue">
          {text}
        </div>
      </div>
    </section>
  );
};

export const WhiteBkg = (props: RichTextExtProps): JSX.Element => {
  const text = props.fields ? (
    <JssRichText field={props.fields.Text} />
  ) : (
    <span className="is-empty-hint">Rich Text Extended</span>
  );
  return (
    <section
      className="bg-white py-[36px] lg:py-[96px] max-w-[58.2rem] mx-auto"
      id={props.fields?.AnchorID.value}
    >
      <div className="component-content rich-text-container container text-dark-blue">{text}</div>
    </section>
  );
};

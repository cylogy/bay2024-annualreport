import React from 'react';
import {
  Field,
  Text,
  Image as JssImage,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Headline: Field<string>;
  Description: Field<string>;
  Video: Field<string>;
  Image: ImageField;
  Cta: LinkField;
}

export type HeroProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: HeroProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  console.log(props?.fields);

  return (
    <div
      className={`component rich-text ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="component-content">
        <h1>{props?.fields?.Headline?.value}</h1>
        <Text tag="h1" className="" field={props.fields.Headline} />
        <Text field={props.fields.Description} />
        {/* <div>{props.fields.HeroVideo}</div> */}
        <JssImage field={props.fields.Image} />
        {/* <div>{props.fields.HeroCta}</div> */}
      </div>
    </div>
  );
};

export const Secondary = (props: HeroProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div
      className={`component rich-text ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="component-content">
        <h1>Secondary</h1>
        <h1>{props?.fields?.Headline?.value}</h1>
        <Text tag="h1" className="" field={props.fields.Headline} />
        <Text field={props.fields.Description} />
        {/* <div>{props.fields.HeroVideo}</div> */}
        <JssImage field={props.fields.Image} />
        {/* <div>{props.fields.HeroCta}</div> */}
      </div>
    </div>
  );
};

export const Download = (props: HeroProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div
      className={`component rich-text ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="component-content">
        <h1>Download</h1>
        <h1>{props?.fields?.Headline?.value}</h1>
        <Text tag="h1" className="" field={props.fields.Headline} />
        <Text field={props.fields.Description} />
        {/* <div>{props.fields.HeroVideo}</div> */}
        <JssImage field={props.fields.Image} />
        {/* <div>{props.fields.HeroCta}</div> */}
      </div>
    </div>
  );
};

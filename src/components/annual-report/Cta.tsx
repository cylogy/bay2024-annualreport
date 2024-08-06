import { Field, Text, Link as JssLink, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Headline: Field<string>;
  Subheadline: Field<string>;
  Cta: LinkField;
}

type CtaProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: CtaProps): JSX.Element => {
  //const id = props.params.RenderingIdentifier;
  console.log('CtaProps');
  console.log(props);

  return (
    <div className="component-content" style={{ height: '100%', width: '100%', padding: '100px' }}>
      <Text field={props.fields?.Headline} />
      <Text field={props.fields?.Subheadline} />
      <JssLink field={props.fields.Cta} />
    </div>
  );
};

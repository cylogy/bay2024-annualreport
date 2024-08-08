import {
  ImageField,
  Field,
  Text,
  Placeholder,
  DateField,
  RichText as JssRichText,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Name: Field<string>;
  UpdateDate: Field<string>;
  Status: Field<string>;
  Image: ImageField;
  Description: Field<string>;
  Headline: Field<string>;
  Intro: Field<string>;
}

type StrategyProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: StrategyProps): JSX.Element => {
  //const id = props.params.RenderingIdentifier;
  // console.log('StrategyProps');
  // console.log(props);
  const modifyImageProps = {
    ...props.fields.Image,
    editable: props?.fields?.Image?.editable
      ?.replace(`width="${props?.fields?.Image?.value?.width}"`, 'width="20%"')
      .replace(`height="${props?.fields?.Image?.value?.height}"`, 'height="20%"'),
  };
  return (
    <div className="component-content" style={{ height: '100%', width: '100%', padding: '100px' }}>
      <h2>
        Name:
        <Text field={props.fields?.Name} />
      </h2>
      <p>
        UpdatedDate:
        <DateField field={props.fields?.UpdateDate} />
      </p>
      <p>
        Status:
        <Text field={props.fields?.Status} />
      </p>
      <div>
        <JssImage field={modifyImageProps} />
      </div>
      <div>
        <JssRichText field={props.fields?.Description} />
      </div>

      <div>
        <h1>
          <Text field={props.fields?.Headline} />
        </h1>
        <JssRichText field={props.fields?.Intro} />
      </div>
      <Placeholder name={'strategy-commitment-container'} rendering={props.rendering} />
    </div>
  );
};

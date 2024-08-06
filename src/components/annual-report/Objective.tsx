import {
  ImageField,
  Field,
  Placeholder,
  Text,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Name: Field<string>;
  Description: Field<string>;
  Image: ImageField;
}

type ObjectiveProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: ObjectiveProps): JSX.Element => {
  console.log('ObjectiveProps');
  console.log(props);
  const modifyImageProps = {
    ...props.fields.Image,
    editable: props?.fields?.Image?.editable
      ?.replace(`width="${props?.fields?.Image?.value?.width}"`, 'width="20%"')
      .replace(`height="${props?.fields?.Image?.value?.height}"`, 'height="20%"'),
  };

  return (
    <div className="component-content" style={{ height: '100%', width: '100%' }}>
      <h1>Objective component</h1>
      <h2>
        <Text field={props.fields?.Name} />
      </h2>
      <h3>
        <Text field={props.fields?.Description} />
      </h3>

      <JssImage field={modifyImageProps} />
      <Placeholder name={'objective-strategy-container'} rendering={props.rendering} />
    </div>
  );
};

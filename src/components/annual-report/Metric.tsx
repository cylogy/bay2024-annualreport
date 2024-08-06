import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Prefix: Field<string>;
  Value: Field<string>;
  Suffix: Field<string>;
  Description: Field<string>;
}

type MetricProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: MetricProps): JSX.Element => {
  //const id = props.params.RenderingIdentifier;
  console.log('MetricProps');
  console.log(props);

  return (
    <div className="component-content" style={{ height: '100%', width: '100%', padding: '100px' }}>
      <Text field={props.fields?.Prefix} />
      <Text field={props.fields?.Value} />
      <Text field={props.fields?.Suffix} />
      <Text field={props.fields?.Description} />
    </div>
  );
};

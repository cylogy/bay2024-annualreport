import {
  Field,
  Text,
  Placeholder,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Name: Field<string>;
  ActionPlans: Field<string>;
  PerformanceHeadline: Field<string>;
  ResourcesHeadline: Field<string>;
}

type CommitmentProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: CommitmentProps): JSX.Element => {
  //const id = props.params.RenderingIdentifier;
  console.log('CommitmentProps');
  console.log(props);

  return (
    <div className="component-content" style={{ height: '100%', width: '100%', padding: '100px' }}>
      <h2>
        <Text field={props.fields?.Name} />
      </h2>

      <div>
        <JssRichText field={props.fields?.ActionPlans} />
      </div>
      <div className="component-content" style={{ height: '100%', width: '100%' }}>
        <h3>
          <Text field={props.fields?.PerformanceHeadline} />
        </h3>
        <Placeholder name={'commitment-metric-container'} rendering={props.rendering} />
      </div>
      <div className="component-content" style={{ height: '100%', width: '100%' }}>
        <h3>
          <Text field={props.fields?.ResourcesHeadline} />
        </h3>
        <Placeholder name={'commitment-resources-container'} rendering={props.rendering} />
      </div>
    </div>
  );
};

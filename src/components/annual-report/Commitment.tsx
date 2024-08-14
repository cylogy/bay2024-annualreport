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

export const Default = ({
  fields: { ActionPlans, Name, PerformanceHeadline, ResourcesHeadline },
  rendering,
}: CommitmentProps): JSX.Element => {
  return (
    <div className="text-dark-blue space-y-[3.75rem] px-5 py-10 md:p-10">
      <Text field={Name} tag="span" className="text-callout" />
      <JssRichText field={ActionPlans} tag="div" className="richtext space-y-5" />
      <div>
        <Text field={PerformanceHeadline} className="!font-bold pb-[30px] h6" tag="span" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 items-start">
          <Placeholder name={'commitment-metric-container'} rendering={rendering} />
        </div>
      </div>
      <div>
        <Text field={ResourcesHeadline} className="!font-bold pb-[30px] h6 block" tag="span" />
        <div className="space-y-5 inline-block">
          <Placeholder name={'commitment-resources-container'} rendering={rendering} />
        </div>
      </div>
    </div>
  );
};

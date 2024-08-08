import {
  Text,
  Field,
  LayoutServiceData,
  ComponentRendering,
  LinkField,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import RightArrow from 'assets/svg/RightArrow';
import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';

type CTAProps = ComponentProps & {
  layoutData: LayoutServiceData;
  rendering: ComponentRendering;
  fields: {
    Headline: Field<string>;
    Subheadline: Field<string>;
    Cta: LinkField;
  };
};

export const Default = withDatasourceCheck()<CTAProps>((props: CTAProps): JSX.Element => {
  return (
    <>
      <Link
        href="http://www.google.com"
        className="text-dark-blue p-[30px] flex gap-[20px] items-end md:items-center bg-white shadow-md radius-[10px] justify-between"
      >
        <div>
          <Text tag="h5" className="pb-[10px]" field={props.fields.Headline} />
          <Text tag="p" field={props.fields.Subheadline} />
        </div>
        <RightArrow />
      </Link>
    </>
  );
});

import {
  Text,
  Field,
  LayoutServiceData,
  ComponentRendering,
  LinkField,
  withDatasourceCheck,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';
import RightArrow from 'assets/svg/RightArrow';
import { ComponentProps } from 'lib/component-props';

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
        field={props.fields.Cta.value}
        className="text-dark-blue p-[30px] flex gap-[20px] items-end lg:items-center bg-white shadow-md radius-[10px] justify-between boxShadowEffect"
      >
        <div className="">
          <Text tag="h5" className="pb-[10px]" field={props.fields.Headline} />
          <Text tag="p" field={props.fields.Subheadline} />
        </div>
        <RightArrow />
      </Link>
    </>
  );
});

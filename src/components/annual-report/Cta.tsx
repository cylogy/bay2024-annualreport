import {
  Text,
  Field,
  LayoutServiceData,
  ComponentRendering,
  LinkField,
  withDatasourceCheck,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Download from 'assets/svg/Download';
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
  resource?: boolean;
};

export const Default = withDatasourceCheck()<CTAProps>((props: CTAProps): JSX.Element => {
  if (props.fields) {
    return (
      <Link
        field={props.fields.Cta.value}
        className={
          props.resource
            ? 'btn-blue'
            : 'text-dark-blue p-[30px] flex gap-5 items-end lg:items-center bg-white shadow-md rounded-[10px] justify-between boxShadowEffect'
        }
      >
        {props.resource ? (
          <>
            <Download className="fill-white flex-shrink-0" />
            <Text field={props.fields.Headline} />
          </>
        ) : (
          <>
            <div>
              <Text tag="span" className="h5 pb-2.5" field={props.fields.Headline} />
              <Text tag="p" field={props.fields.Subheadline} />
            </div>
            <RightArrow />
          </>
        )}
      </Link>
    );
  }
  return <></>;
});

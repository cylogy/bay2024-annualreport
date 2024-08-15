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
  resource?: boolean;
};

export const Default = withDatasourceCheck()<CTAProps>((props: CTAProps): JSX.Element => {
  return (
    <Link
      field={props.fields.Cta.value}
      className={
        props.resource
          ? 'p2 flex items-center px-4 md:px-5 py-2 gap-2 md:gap-5 bg-powder-blue rounded text-white !font-bold'
          : 'text-dark-blue p-[30px] flex gap-5 items-end lg:items-center bg-white shadow-md rounded-[10px] justify-between boxShadowEffect'
      }
    >
      {props.resource ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M3.4375 17.5C2.85734 17.5 2.30094 17.2695 1.8907 16.8593C1.48047 16.4491 1.25 15.8927 1.25 15.3125V12.1875C1.25 11.9389 1.34877 11.7004 1.52459 11.5246C1.7004 11.3488 1.93886 11.25 2.1875 11.25C2.43614 11.25 2.6746 11.3488 2.85041 11.5246C3.02623 11.7004 3.125 11.9389 3.125 12.1875V15.3125C3.125 15.485 3.265 15.625 3.4375 15.625H16.5625C16.6454 15.625 16.7249 15.5921 16.7835 15.5335C16.8421 15.4749 16.875 15.3954 16.875 15.3125V12.1875C16.875 11.9389 16.9738 11.7004 17.1496 11.5246C17.3254 11.3488 17.5639 11.25 17.8125 11.25C18.0611 11.25 18.2996 11.3488 18.4754 11.5246C18.6512 11.7004 18.75 11.9389 18.75 12.1875V15.3125C18.75 15.8927 18.5195 16.4491 18.1093 16.8593C17.6991 17.2695 17.1427 17.5 16.5625 17.5H3.4375Z"
              fill="white"
            />
            <path
              d="M9.0624 9.61125V2.5C9.0624 2.25136 9.16118 2.0129 9.33699 1.83709C9.51281 1.66127 9.75126 1.5625 9.9999 1.5625C10.2485 1.5625 10.487 1.66127 10.6628 1.83709C10.8386 2.0129 10.9374 2.25136 10.9374 2.5V9.61125L13.3999 7.15C13.4869 7.063 13.5902 6.99399 13.7039 6.9469C13.8175 6.89982 13.9394 6.87558 14.0624 6.87558C14.1854 6.87558 14.3073 6.89982 14.4209 6.9469C14.5346 6.99399 14.6379 7.063 14.7249 7.15C14.8119 7.237 14.8809 7.34029 14.928 7.45396C14.9751 7.56763 14.9993 7.68946 14.9993 7.8125C14.9993 7.93554 14.9751 8.05737 14.928 8.17104C14.8809 8.28471 14.8119 8.388 14.7249 8.475L10.6624 12.5375C10.4866 12.7131 10.2483 12.8117 9.9999 12.8117C9.75147 12.8117 9.51319 12.7131 9.3374 12.5375L5.2749 8.475C5.1879 8.388 5.11889 8.28471 5.07181 8.17104C5.02472 8.05737 5.00049 7.93554 5.00049 7.8125C5.00049 7.68946 5.02472 7.56763 5.07181 7.45396C5.11889 7.34029 5.1879 7.237 5.2749 7.15C5.36191 7.063 5.46519 6.99399 5.57886 6.9469C5.69253 6.89982 5.81437 6.87558 5.9374 6.87558C6.06044 6.87558 6.18228 6.89982 6.29595 6.9469C6.40962 6.99399 6.5129 7.063 6.59991 7.15L9.0624 9.61125Z"
              fill="white"
            />
          </svg>
          <Text field={props.fields.Headline} />
        </>
      ) : (
        <>
          <div>
            <Text tag="h5" className="pb-2.5" field={props.fields.Headline} />
            <Text tag="p" field={props.fields.Subheadline} />
          </div>
          <RightArrow />
        </>
      )}
    </Link>
  );
});

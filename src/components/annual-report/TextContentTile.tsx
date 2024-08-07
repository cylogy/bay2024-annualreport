import {
  Field,
  Text,
  LayoutServiceData,
  RichTextField,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
type ContentTileItemProps = ComponentProps & {
  layoutData: LayoutServiceData;
  fields: {
    Headline: Field<string>;
    Description: RichTextField;
    Number: Field<string>;
  };
};
export const Default = (props: ContentTileItemProps): JSX.Element => {
  return props.params.variant === 'ThreeColumns' ? (
    <article className="text-white bg-powder-blue p-[40px] rounded-[20px] relative tct">
      <img
        src="/images/textContentTiles-bg.png"
        alt=""
        className="object-cover w-full absolute top-0 left-0 decoration"
      />
      <Text tag="h4" className="mb-[10px]" field={props.fields.Headline} />
      <RichText className="p2" field={props.fields.Description} />
    </article>
  ) : props.params.variant === 'Stacked' ? (
    <article className="text-dark-blue tct">
      <Text tag="p" className="mb-[12px] year h4" field={props.fields.Number} />
      <Text tag="p" className="mb-[12px] h3" field={props.fields.Headline} />
      <RichText className="p1" field={props.fields.Description} />
    </article>
  ) : (
    <article className="text-dark-blue bg-white p-[40px] rounded-[40px] relative tct">
      {/* <Text field={props.fields.Headline} />
      <RichText field={props.fields.Description} />
      <Text field={props.fields.Number} /> */}
      <div className="mb-[24px] flex flex-col md:flex-row items-start md:items-center gap-[24px]">
        <span className="bullet-number relative w-[75px] h-[75px] rounded-[20px] bg-powder-blue overflow-hidden flex items-center text-white justify-center text-[2.875rem] leading-[2.875rem] font-newsreader">
          <Text field={props.fields.Number} />
          <div className="absolute bottom-0">
            <svg
              width="75"
              height="21"
              viewBox="0 0 75 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35.9781 11.8693C62.3789 11.8693 101.66 3.63068 118 0.5L118 28.3466L-43 29.5L-43 0.500014C-27.6743 4.28978 9.57732 11.8693 35.9781 11.8693Z"
                fill="#B6D158"
              />
            </svg>
          </div>
        </span>
        <Text tag="h3" field={props.fields.Headline} />
      </div>
      <RichText className="p1" field={props.fields.Description} />
    </article>
  );
};

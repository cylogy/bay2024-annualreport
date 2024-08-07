import {
  Field,
  Text,
  LayoutServiceData,
  RichTextField,
  RichText,
  Image,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
type ContentTileItemProps = ComponentProps & {
  layoutData: LayoutServiceData;
  fields: {
    Headline: Field<string>;
    Subheadline: RichTextField;
    Number: Field<string>;
  };
};
export const Default = (props: ContentTileItemProps): JSX.Element => {
  return props.params.variant === 'ThreeColumns' ? (
    <div style={{ backgroundColor: 'lightblue' }}>
      <article className="text-white bg-powder-blue p-[40px] rounded-[20px] relative">
        <img
          src="/images/textContentTiles-bg.png"
          alt=""
          className="object-cover w-full absolute top-0 left-0"
        />
        <Text
          tag="h4"
          className="mb-[10px] text-[1.625rem] leading-[1.980625rem]  md:text-[2rem] md:leading-[2.4375rem]"
          field={props.fields.Headline}
        />
        <RichText className="text-[1rem] leading-[1.6rem]" field={props.fields.Subheadline} />
      </article>
    </div>
  ) : props.params.variant === 'Stacked' ? (
    <article className="text-dark-blue">
      <Text tag="h4" className="mb-[12px] year" field={props.fields.Number} />
      <Text tag="h3" className="mb-[12px] year" field={props.fields.Headline} />
      <Image
        className="py-[24px]"
        src=""
        alt=""
        width={1200} // Original width of the image
        height={675} // Original height of the image (example for a 16:9 aspect ratio)
        style={{
          width: '100%', // Makes the image responsive
          height: 'auto', // Maintains the aspect ratio
          objectFit: 'cover', // Ensures the image covers the container without distortion
          objectPosition: 'center', // Centers the image within the container
        }}
      />
      <RichText className="p1" field={props.fields.Subheadline} />
    </article>
  ) : (
    <article className="text-dark-blue bg-white p-[40px] rounded-[40px] relative">
      <Text field={props.fields.Headline} />
      <RichText field={props.fields.Subheadline} />
      <Text field={props.fields.Number} />
      {/* <h3 className="mb-[24px] flex flex-col md:flex-row items-start md:items-center gap-[24px]">
        <span className="bullet-number relative w-[75px] h-[75px] rounded-[20px] bg-powder-blue overflow-hidden flex items-center text-white justify-center">
          {index + 1}
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
        <span>{tile.title}</span>
      </h3>
      <p>{tile.text}</p> */}
    </article>
  );
};

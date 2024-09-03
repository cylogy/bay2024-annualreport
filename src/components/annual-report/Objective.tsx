import { Field, ImageField, Placeholder, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Accordion from './atoms/Accordion';
import NextImage from './atoms/NextImage';
import Intersect from 'public/images/Intersect.png';
import NativeImage from 'next/image';

interface Fields {
  Name: Field<string>;
  Description: Field<string>;
  Image: ImageField;
  AnchorID: Field<string>;
}

type ObjectiveProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: ObjectiveProps): JSX.Element => {
  if (props.fields) {
    const {
      fields: { Description, Image, Name, AnchorID },
      rendering,
      params,
    } = props;

    const modifyImageProps = {
      ...Image,
      editable: Image?.editable
        ?.replace(`width="${Image?.value?.width}"`, 'width="20%"')
        .replace(`height="${Image?.value?.height}"`, 'height="20%"'),
    };
    return params?.variant === 'ObjectiveTiles' ? (
      <span className="bullet-number relative lg:w-[267px] h-[290px] rounded-[40px] bg-powder-blue overflow-hidden flex flex-col shrink-0 items-center text-white px-[36px] py-[36px] pb-[48px] text-center justify-center lg:justify-start gap-2">
        <Text tag="span" className="block h1" field={Name}></Text>
        <Text tag="span" className="h6" field={Description}></Text>
        <div className="absolute bottom-0 w-full">
          <NativeImage fetchPriority="low" src={Intersect} alt="" className="w-full" />
        </div>
      </span>
    ) : (
      <div className="objectives" id={AnchorID.value.trim()}>
        <div className="objectives__group-image">
          <svg
            width="354"
            height="337"
            viewBox="0 0 354 337"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M181.568 143.151C181.568 470.128 280.432 956.624 318 1159L-16.1591 1159L-30 -835L318 -835C272.523 -645.19 181.568 -183.825 181.568 143.151Z"
              fill="#B6D158"
            />
            <path
              opacity="0.2"
              d="M217.568 143.151C217.568 470.128 316.432 956.624 354 1159L19.8409 1159L5.99999 -835L354 -835C308.523 -645.19 217.568 -183.825 217.568 143.151Z"
              fill="#B6D158"
            />
          </svg>
          <div className="bg" />
          <div className="objectives__content space-y-3">
            <Text field={Name} tag="h2" />
            <Text field={Description} tag="p" />
          </div>
          <NextImage field={modifyImageProps} fetchPriority="low" />
        </div>
        <div className="objectives__accordions container-anchors">
          <div className="max-w-[56rem] xl:max-w-[61.25rem]">
            <Accordion>
              <Placeholder name={'objective-strategy-container'} rendering={rendering} />
            </Accordion>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

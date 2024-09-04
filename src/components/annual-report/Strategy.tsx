import {
  Field,
  ImageField,
  RichText as JssRichText,
  Placeholder,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Accordion from './atoms/Accordion';
import NextImage from './atoms/NextImage';

interface Fields {
  Name: Field<string>;
  UpdateDate: Field<string>;
  Status: Field<string>;
  Image: ImageField;
  Description: Field<string>;
  Headline: Field<string>;
  Intro: Field<string>;
  AnchorID: Field<string>;
}

type StrategyProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: StrategyProps): JSX.Element => {
  if (props.fields) {
    const {
      fields: { Description, Headline, Image, Intro, Name, Status, UpdateDate, AnchorID },
      rendering,
    } = props;
    const modifyImageProps = {
      ...Image,
      editable: Image?.editable
        ?.replace(`width="${Image?.value?.width}"`, 'width="20%"')
        .replace(`height="${Image?.value?.height}"`, 'height="20%"'),
    };
    return (
      <Accordion.Item
        Name={Name.value}
        Status={Status.value}
        UpdateDate={UpdateDate.value}
        Id={AnchorID.value}
      >
        <div className="space-y-11 text-dark-blue">
          <NextImage
            field={modifyImageProps}
            className="w-full object-cover rounded-[10px] aspect-[16/6] max-h-[17.5rem]"
            fetchPriority="low"
          />
          <div className="space-y-16 max-w-[55rem]">
            <div>
              <JssRichText field={Description} className="richtext rich-text-container" />
            </div>
            <div>
              <Text field={Headline} tag="span" className="h4 block pb-3" />
              <JssRichText field={Intro} className="richtext" />
            </div>
          </div>
          <div className="space-y-12">
            <Placeholder name={'strategy-commitment-container'} rendering={rendering} />
          </div>
        </div>
      </Accordion.Item>
    );
  }
  return <></>;
};

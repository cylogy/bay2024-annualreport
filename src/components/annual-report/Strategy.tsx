import {
  Field,
  ImageField,
  Image as JssImage,
  RichText as JssRichText,
  Placeholder,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Accordion from './atoms/Accordion';

interface Fields {
  Name: Field<string>;
  UpdateDate: Field<string>;
  Status: Field<string>;
  Image: ImageField;
  Description: Field<string>;
  Headline: Field<string>;
  Intro: Field<string>;
}

type StrategyProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = ({
  fields: { Description, Headline, Image, Intro, Name, Status, UpdateDate },
  rendering,
}: StrategyProps): JSX.Element => {
  const modifyImageProps = {
    ...Image,
    editable: Image?.editable
      ?.replace(`width="${Image?.value?.width}"`, 'width="20%"')
      .replace(`height="${Image?.value?.height}"`, 'height="20%"'),
  };
  return (
    <Accordion.Item Name={Name.value} Status={Status.value} UpdateDate={UpdateDate.value}>
      <div className="space-y-11 text-dark-blue">
        <JssImage
          field={modifyImageProps}
          className="max-h-[11.25rem] md:max-h-[17.5rem] w-full object-cover rounded-[10px]"
          placeholder="empty"
          fetchpriority="low"
          loading="lazy"
        />
        <div className="space-y-16">
          <div>
            <span className="h4 block pb-3">Description</span>
            <JssRichText field={Description} className="richtext" />
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
};

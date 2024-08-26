import {
  Field,
  Text,
  LayoutServiceData,
  RichTextField,
  RichText,
  withDatasourceCheck,
  Image,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import BlueSquareBullet from './atoms/BlueSquareBullet';
type ContentTileItemProps = ComponentProps & {
  layoutData: LayoutServiceData;
  fields: {
    Headline: Field<string>;
    Description: RichTextField;
    Number: Field<string>;
    AnchorID: Field<string>;
  };
};
export const Default = withDatasourceCheck()<ContentTileItemProps>(
  (props: ContentTileItemProps): JSX.Element => {
    return props.params.variant === 'ThreeColumns' ? (
      <article className="text-white bg-dark-powder-blue p-[40px] rounded-[20px] relative tct">
        <Image
          className="object-cover w-full absolute top-0 left-0 decoration"
          field={{ src: '/images/textContentTiles-bg.png', alt: '' }}
        />
        <Text tag="p" className="mb-[10px] h4" field={props.fields.Headline} />
        <RichText className="p2" field={props.fields.Description} />
      </article>
    ) : props.params.variant === 'Stacked' ? (
      <article className="text-dark-blue tct" id={props.fields.AnchorID.value.trim()}>
        <Text tag="p" className="mb-[12px] year h4" field={props.fields.Number} />
        <Text tag="p" className="mb-[12px] h3" field={props.fields.Headline} />
        <RichText className="p1 rich-text-container" field={props.fields.Description} />
      </article>
    ) : props.params.variant === 'Cards' ? (
      <article className="text-dark-blue bg-white p-[40px] rounded-[20px] relative">
        <Text
          tag="h4"
          className="mb-[10px] pb-[20px] border-b-[2px] border-solid border-light-green mb-[30px]"
          field={props.fields.Headline}
        />
        <RichText className="p1" field={props.fields.Description} />
      </article>
    ) : (
      <article className="text-dark-blue bg-white pt-[40px] pb-[40px] lg:p-[40px] lg:rounded-[40px] relative tct">
        <div className="mb-[24px] flex flex-col md:flex-row items-start md:items-center gap-[24px]">
          <BlueSquareBullet text={props.fields.Number.value} />
          <Text tag="h3" field={props.fields.Headline} />
        </div>
        <RichText
          className="p1 tct-rich-text rich-text-container"
          field={props.fields.Description}
        />
      </article>
    );
  }
);

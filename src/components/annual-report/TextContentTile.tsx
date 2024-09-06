import {
  Field,
  Image,
  LayoutServiceData,
  LinkField,
  Link,
  RichText,
  RichTextField,
  Text,
  withDatasourceCheck,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import BlueSquareBullet from './atoms/BlueSquareBullet';
type ContentTileItemProps = ComponentProps & {
  layoutData: LayoutServiceData;
  fields: {
    Headline: Field<string>;
    Description: RichTextField;
    Number: Field<string>;
    CTA: LinkField;
    AnchorID: Field<string>;
  };
};
export const Default = withDatasourceCheck()<ContentTileItemProps>(
  (props: ContentTileItemProps): JSX.Element => {
    const {
      sitecoreContext: { pageEditing },
    } = useSitecoreContext();
    if (props.fields) {
      return props.params.variant === 'ThreeColumns' ? (
        <article className="text-white bg-dark-powder-blue p-[40px] rounded-[20px] relative tct">
          <Image
            className="object-cover w-full absolute top-0 left-0 decoration"
            field={{ src: '/images/textContentTiles-bg.png', alt: '' }}
          />
          <Text tag="span" className="mb-[10px] h4" field={props.fields.Headline} />
          <RichText className="p2" field={props.fields.Description} />
        </article>
      ) : props.params.variant === 'Stacked' ? (
        <article className="text-dark-blue tct" id={props.fields.AnchorID.value.trim()}>
          <Text tag="span" className="mb-[12px] year h4" field={props.fields.Number} />
          <Text tag="h3" className="mb-[12px]" field={props.fields.Headline} />
          <RichText className="p1 rich-text-container" field={props.fields.Description} />
        </article>
      ) : props.params.variant === 'Cards' ? (
        props.fields.CTA.value.href === '' ? (
          <article className="text-dark-blue bg-white p-[40px] rounded-[20px] relative">
            <Text
              tag="span"
              className="h4 pb-[20px] border-b-[2px] border-solid border-light-green mb-[30px]"
              field={props.fields.Headline}
            />
            <RichText className="p1" field={props.fields.Description} />
          </article>
        ) : pageEditing ? (
          <div className="text-dark-blue bg-white p-[40px] rounded-[20px] relative boxShadowEffect">
            <Link field={props.fields.CTA} />
            <Text
              tag="span"
              className="h4 pb-[20px] border-b-[2px] border-solid border-light-green mb-[30px]"
              field={props.fields.Headline}
            />
            <RichText className="p1" field={props.fields.Description} />
          </div>
        ) : (
          <Link
            field={props.fields.CTA}
            className="text-dark-blue bg-white p-[40px] rounded-[20px] relative boxShadowEffect"
          >
            <Text
              tag="span"
              className="h4 pb-[20px] border-b-[2px] border-solid border-light-green mb-[30px]"
              field={props.fields.Headline}
            />
            <RichText className="p1" field={props.fields.Description} />
          </Link>
        )
      ) : (
        <article className="text-dark-blue bg-white p-5 lg:p-[40px] rounded-[40px] relative tct">
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
    return <></>;
  }
);

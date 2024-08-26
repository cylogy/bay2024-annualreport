import {
  Field,
  Text,
  LayoutServiceData,
  RichTextField,
  RichText,
  withDatasourceCheck,
  ImageField,
  LinkField,
  Link,
  Image as JssImage,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import RightArrow from 'assets/svg/RightArrow';
import { ComponentProps } from 'lib/component-props';
import NextImage from './atoms/NextImage';
type GraphicContentTileItemProps = ComponentProps & {
  layoutData: LayoutServiceData;
  fields: {
    Headline: Field<string>;
    Subheadline: RichTextField;
    Image: ImageField;
    Cta: LinkField;
  };
};

export const Default = withDatasourceCheck()<GraphicContentTileItemProps>(
  (props: GraphicContentTileItemProps): JSX.Element => {
    const {
      fields: { Cta, Headline, Image, Subheadline },
    } = props;
    const { sitecoreContext } = useSitecoreContext();
    const isPageEditing = sitecoreContext.pageEditing;

    if (isPageEditing) {
      return (
        <div className="rounded-[2.5rem] bg-soft-white text-dark-blue grid grid-cols-1 lg:grid-cols-12 min-h-[27.5rem] boxShadowEffect">
          <div className="col-span-5">
            <Link field={Cta} editable={sitecoreContext.pageEditing} />
            <JssImage
              field={Image}
              className="w-full h-[250px] lg:h-full object-cover rounded-ss-[2.5rem] rounded-se-[2.5rem] lg:rounded-se-none lg:rounded-es-[2.5rem]"
              fetchPriority="low"
              loading="lazy"
            />
          </div>
          <div className="p-5 xl:p-10 col-span-7 flex flex-col justify-between">
            <div className="space-y-5">
              <Text tag="h4" className="block underlined-header" field={Headline} />
              <RichText field={Subheadline} className="richtext p1 rich-text-container" />
            </div>
            <div className="flex justify-end">
              <RightArrow />
            </div>
          </div>
        </div>
      );
    }

    return (
      <Link
        field={Cta}
        editable={sitecoreContext.pageEditing}
        className="rounded-[2.5rem] bg-soft-white text-dark-blue grid grid-cols-1 lg:grid-cols-12 min-h-[27.5rem] boxShadowEffect"
      >
        <div className="col-span-5">
          <NextImage
            field={Image}
            className="w-full h-[250px] lg:h-full object-cover rounded-ss-[2.5rem] rounded-se-[2.5rem] lg:rounded-se-none lg:rounded-es-[2.5rem]"
            fetchPriority="low"
          />
        </div>
        <div className="p-5 xl:p-10 col-span-7 flex flex-col justify-between">
          <div className="space-y-5">
            <Text tag="span" className="h4 block underlined-header" field={Headline} />
            <RichText field={Subheadline} className="richtext p1 rich-text-container" />
          </div>
          <div className="flex justify-end">
            <RightArrow />
          </div>
        </div>
      </Link>
    );
  }
);

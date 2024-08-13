import {
  Field,
  Text,
  LayoutServiceData,
  RichTextField,
  RichText,
  withDatasourceCheck,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
type GraphicContentTileItemProps = ComponentProps & {
  layoutData: LayoutServiceData;
  fields: {
    Headline: Field<string>;
    Subheadline: RichTextField;
    Image: ImageField;
    CTA: LinkField;
  };
};

export const Default = withDatasourceCheck()<GraphicContentTileItemProps>(
  (props: GraphicContentTileItemProps): JSX.Element => {
    return (
      <section className="py-[60px] md:py-[120px] bg-dark-blue">
        <div className="container md:px-[70px]">
          <Text
            tag="h4"
            className="text-center text-white mb-[10px]"
            field={props.fields.Headline}
          />
          <RichText className="text-center text-white p1" field={props.fields.Subheadline} />
        </div>
      </section>
    );
  }
);

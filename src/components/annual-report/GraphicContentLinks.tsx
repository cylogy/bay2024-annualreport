import {
  Text,
  Field,
  Placeholder,
  LayoutServiceData,
  ComponentRendering,
  RichTextField,
  ImageField,
  RichText,
  Image,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type GraphicContentLinksProps = ComponentProps & {
  layoutData: LayoutServiceData;
  rendering: ComponentRendering;
  fields: {
    Headline: Field<string>;
    Description: RichTextField;
    Image: ImageField;
  };
};

export const Default = withDatasourceCheck()<GraphicContentLinksProps>(
  (props: GraphicContentLinksProps): JSX.Element => {
    return (
      <section>
        <section className="py-[60px] md:py-[120px] bg-soft-white">
          <div className="container">
            <section className="grid md:grid-cols-2 gap-[60px] md:gap-[140px] text-dark-blue">
              <div className="column order-last md:!order-first" role="region">
                <Text
                  tag="h2"
                  className="pb-[12px] md:max-w-[500px]"
                  field={props.fields.Headline}
                />
                <RichText className="h6" field={props.fields.Description} />

                <section className="ctas mt-[60px] flex flex-col gap-[20px]">
                  <Placeholder name={`graphic-content-links`} rendering={props.rendering} />
                </section>
              </div>
              <div className="column relative" role="region">
                <Image
                  field={props.fields?.Image}
                  width={840} // Original width of the image
                  height={663}
                  style={{
                    width: '100%', // Makes the image responsive
                    height: '100%', // Maintains the aspect ratio
                    objectFit: 'cover',
                    objectPosition: 'center',
                    position: 'relative',
                  }}
                  className="rounded-[40px]"
                />
              </div>
            </section>
          </div>
        </section>
      </section>
    );
  }
);

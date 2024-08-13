import {
  Text,
  Field,
  Placeholder,
  LayoutServiceData,
  ComponentRendering,
  RichText,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { injectDynamicParams } from 'lib/dynamic-params';

type GraphicContentTilesProps = ComponentProps & {
  layoutData: LayoutServiceData;
  rendering: ComponentRendering;
  fields: {
    Headline: Field<string>;
    Description: Field<string>;
  };
};

export const GraphicContentTiles = withDatasourceCheck()<GraphicContentTilesProps>(
  (props: GraphicContentTilesProps): JSX.Element => {
    return (
      <section className="py-[60px] md:py-[120px] bg-dark-blue">
        <div className="container md:px-[70px]">
          <Text
            tag="h4"
            className="text-center text-white mb-[10px]"
            field={props.fields.Headline}
          />
          <RichText className="text-center text-white p1" field={props.fields.Description} />
          <section className="grid md:grid-cols-3 gap-[40px] mt-[80px]">
            <Placeholder
              name={`graphic-content-tiles`}
              rendering={props.rendering}
              render={(components) =>
                injectDynamicParams(components, { variant: 'GraphicContentTiles' })
              }
            />
          </section>
        </div>
      </section>
    );
  }
);

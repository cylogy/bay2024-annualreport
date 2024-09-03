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
    if (props.fields) {
      const {
        fields: { Description, Headline },
        rendering,
      } = props;
      return (
        <section className="py-20 lg:py-[7.5rem] container flex flex-col items-center gap-14 md:gap-20">
          <div className="text-center max-w-[56.25rem] space-y-3 text-dark-blue font-">
            <Text tag="h2" field={Headline} />
            <RichText field={Description} className="richtext p1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
            <Placeholder
              name={`graphic-content-tiles`}
              rendering={rendering}
              render={(components) =>
                injectDynamicParams(components, { variant: 'GraphicContentTiles' })
              }
            />
          </div>
        </section>
      );
    }
    return <></>;
  }
);

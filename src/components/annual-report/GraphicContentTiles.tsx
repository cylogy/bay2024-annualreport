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
    AnchorID: Field<string>;
  };
};

export const GraphicContentTiles = withDatasourceCheck()<GraphicContentTilesProps>(
  ({
    fields: { Description, Headline, AnchorID },
    rendering,
  }: GraphicContentTilesProps): JSX.Element => {
    return (
      <section
        className="py-20 md:py-[7.5rem] container flex flex-col items-center gap-14 md:gap-20"
        id={AnchorID.value}
      >
        <div className="text-center max-w-[56.25rem] space-y-3 text-dark-blue">
          <Text tag="span" className="h4" field={Headline} />
          <RichText field={Description} tag="p" className="richtext" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
);

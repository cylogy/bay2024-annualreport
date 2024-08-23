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

type TextContentTilesProps = ComponentProps & {
  layoutData: LayoutServiceData;
  rendering: ComponentRendering;
  fields: {
    Headline: Field<string>;
    Description: Field<string>;
    AnchorID: Field<string>;
  };
};

export const ThreeColumns = withDatasourceCheck()<TextContentTilesProps>(
  (props: TextContentTilesProps): JSX.Element => {
    return (
      /* Blue 3 cols */
      <section className="py-[60px] lg:py-[120px] bg-dark-blue" id={props.fields.AnchorID.value}>
        <div className="container lg:px-[100px]">
          <Text
            tag="h2"
            className="text-center text-white mb-[10px]"
            field={props.fields.Headline}
          />
          <RichText
            className="text-center text-white p1 rich-text-container"
            field={props.fields.Description}
          />
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-[40px] mt-[80px]">
            <Placeholder
              name={`text-content-tiles`}
              rendering={props.rendering}
              render={(components) => injectDynamicParams(components, { variant: 'ThreeColumns' })}
            />
          </section>
        </div>
      </section>
    );
  }
);

export const Stacked = withDatasourceCheck()<TextContentTilesProps>(
  (props: TextContentTilesProps): JSX.Element => {
    return (
      /* Timeline */
      <div className="container-anchors">
        <div className="max-w-[879px]">
          <section className="py-[60px] lg:py-[120px]">
            <Text
              tag="h2"
              className="text-dark-blue mb-[48px]"
              field={props.fields.Headline}
              id={props.fields.AnchorID.value.trim()}
            />
            <section className="grid gap-[40px]">
              <div className="grid gap-[80px] w-full timeline relative">
                <Placeholder
                  name={`text-content-tiles`}
                  rendering={props.rendering}
                  render={(components) => injectDynamicParams(components, { variant: 'Stacked' })}
                />
              </div>
            </section>
          </section>
        </div>
      </div>
    );
  }
);

export const Numbered = withDatasourceCheck()<TextContentTilesProps>(
  (props: TextContentTilesProps): JSX.Element => {
    return (
      <section className="lg:bg-soft-white">
        <div className="container" id={props.fields.AnchorID.value}>
          <div className="max-w-[879px]">
            <section className="py-[60px] lg:py-[120px]">
              <Text tag="h2" className="text-dark-blue mb-[48px]" field={props.fields.Headline} />
              <div className="grid grid-cols-1 lg:gap-[48px]">
                <Placeholder
                  name={`text-content-tiles`}
                  rendering={props.rendering}
                  render={(components) => injectDynamicParams(components, { variant: 'Numbered' })}
                />
              </div>
            </section>
          </div>
        </div>
      </section>
    );
  }
);

export const Cards = withDatasourceCheck()<TextContentTilesProps>(
  (props: TextContentTilesProps): JSX.Element => {
    return (
      <section className="py-[60px] lg:py-[120px] bg-soft-white" id={props.fields.AnchorID.value}>
        <div className="container lg:px-[100px]">
          <Text
            tag="h2"
            className="text-dark-blue mb-[10px] border-b-[3px] border-solid pb-[20px] "
            field={props.fields.Headline}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[40px] mt-[50px]">
            <Placeholder
              name={`text-content-tiles`}
              rendering={props.rendering}
              render={(components) => injectDynamicParams(components, { variant: 'Cards' })}
            />
          </div>
        </div>
      </section>
    );
  }
);

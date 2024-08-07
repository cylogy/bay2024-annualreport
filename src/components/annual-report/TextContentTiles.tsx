import {
  Text,
  Field,
  Placeholder,
  LayoutServiceData,
  ComponentRendering,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { injectDynamicParams } from 'lib/dynamic-params';

type TextContentTilesProps = ComponentProps & {
  layoutData: LayoutServiceData;
  rendering: ComponentRendering;
  fields: {
    Headline: Field<string>;
    Description: Field<string>;
  };
};

export const ThreeColumns = (props: TextContentTilesProps): JSX.Element => {
  return (
    /* Blue 3 cols */
    <section className="py-[60px] md:py-[120px] bg-dark-blue">
      <div className="container md:px-[70px]">
        <Text tag="h2" className="text-center text-white mb-[10px]" field={props.fields.Headline} />
        <RichText className="text-center text-white p1" field={props.fields.Description} />
        <section className="grid md:grid-cols-3 gap-[40px] mt-[80px]">
          <Placeholder
            name={`text-content-tiles`}
            rendering={props.rendering}
            render={(components) => injectDynamicParams(components, { variant: 'ThreeColumns' })}
          />
        </section>
      </div>
    </section>
  );
};

export const Stacked = (props: TextContentTilesProps): JSX.Element => {
  return (
    /* Timeline */
    <section className="py-[60px] md:py-[120px] bg-soft-white">
      <Text tag="h2" className="text-dark-blue mb-[48px]" field={props.fields.Headline} />
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
  );
};

export const Numbered = (props: TextContentTilesProps): JSX.Element => {
  return (
    <section className="py-[60px] md:py-[120px] bg-soft-white">
      <Text tag="h2" className="text-dark-blue mb-[48px]" field={props.fields.Headline} />
      <div className="grid grid-cols-1 gap-[48px]">
        <Placeholder
          name={`text-content-tiles`}
          rendering={props.rendering}
          render={(components) => injectDynamicParams(components, { variant: 'Numbered' })}
        />
      </div>
    </section>
  );
};

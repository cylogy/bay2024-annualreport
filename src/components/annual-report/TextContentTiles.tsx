import {
  Text,
  Field,
  Placeholder,
  LayoutServiceData,
  ComponentRendering,
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

export const Default = (props: TextContentTilesProps): JSX.Element => {
  const phKey = `textcontenttiles-${props.params.DynamicPlaceholderId}`;
  return (
    <section>
      <div>Default</div>
      <Text field={props.fields.Headline} />
      <Text field={props.fields.Description} />
      <Placeholder
        name={phKey}
        rendering={props.rendering}
        render={(components) => injectDynamicParams(components, { variant: 'Default' })}
      />
    </section>
  );
};

export const Variant2 = (props: TextContentTilesProps): JSX.Element => {
  const phKey = `textcontenttiles-${props.params.DynamicPlaceholderId}`;
  return (
    <section>
      <div>Variant 2</div>
      <Text field={props.fields.Headline} />
      <Text field={props.fields.Description} />
      <Placeholder
        name={phKey}
        rendering={props.rendering}
        render={(components) => injectDynamicParams(components, { variant: 'Variant1' })}
      />
    </section>
  );
};

export const Variant3 = (props: TextContentTilesProps): JSX.Element => {
  const phKey = `textcontenttiles-${props.params.DynamicPlaceholderId}`;
  return (
    <section>
      <div>Variant 3</div>
      <Text field={props.fields.Headline} />
      <Text field={props.fields.Description} />
      <Placeholder
        name={phKey}
        rendering={props.rendering}
        render={(components) => injectDynamicParams(components, { variant: 'Variant2' })}
      />
    </section>
  );
};

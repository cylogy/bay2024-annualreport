import { Placeholder, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { injectDynamicParams } from 'lib/dynamic-params';
import React from 'react';

type ObjectiveTilesProps = ComponentProps & {
  rendering: ComponentRendering;
};

export const Default = (props: ObjectiveTilesProps): JSX.Element => {
  return (
    <section className="bg-white lg:bg-soft-white pb-[3.75rem]">
      <div className="container-anchors">
        <section className="grid lg:grid-cols-3 gap-[40px] max-w-[879px]">
          <Placeholder
            name={`objective-tiles`}
            rendering={props.rendering}
            render={(components) => injectDynamicParams(components, { variant: 'ObjectiveTiles' })}
          />
        </section>
      </div>
    </section>
  );
};

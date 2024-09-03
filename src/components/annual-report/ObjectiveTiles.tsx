import { Placeholder, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { injectDynamicParams } from 'lib/dynamic-params';
import React, { useEffect } from 'react';

type ObjectiveTilesProps = ComponentProps & {
  rendering: ComponentRendering;
};

export const Default = (props: ObjectiveTilesProps): JSX.Element => {
  useEffect(() => {
    const tiles = document.querySelectorAll<HTMLDivElement>(
      '.objective-tiles__wrapper .bullet-number'
    );
    tiles.forEach((tile, i) => (tile.dataset.count = String(i + 1)));
  }, []);

  return (
    <section className="bg-soft-white pb-[3.75rem]">
      <div className="container-anchors">
        <section className="objective-tiles__wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[40px] max-w-[879px]">
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

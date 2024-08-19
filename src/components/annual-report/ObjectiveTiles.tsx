import { Placeholder, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ObjectiveTilesProps = ComponentProps & {
  rendering: ComponentRendering;
};

export const Default = (props: ObjectiveTilesProps): JSX.Element => {
  return (
    <>
      <div>
        <h2 className="text-dark-blue pb-[12px]">Overview</h2>
        <p className="p1 text-dark-blue">
          Our Achieve Impact goal is centered around sed faucibus turpis in eu mi bibendum neque.
          Sem fringilla ut morbi tincidunt augue. This goal has 3 primary objectives, each
          containing 2-4 strategies that will be tracked with action plans, performance metrics, and
          progress reports. The 3 objectives are:
        </p>
        <section className="pt-[100px]">
          <div className="">
            <Placeholder name={`objective-tiles`} rendering={props.rendering} />
          </div>
        </section>
      </div>
    </>
  );
};

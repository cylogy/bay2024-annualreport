import { LayoutServiceData, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ContentWithRightRailProps = ComponentProps & {
  layoutData: LayoutServiceData;
};

export const Default = (props: ContentWithRightRailProps): JSX.Element => {
  return (
    <>
      <div className="col-span-full md:col-span-9">
        <Placeholder
          name="left-content"
          rendering={props.rendering}
          layoutData={props.layoutData}
        />
      </div>

      <div className="col-span-full md:col-span-3">
        <Placeholder
          name="right-content"
          rendering={props.rendering}
          layoutData={props.layoutData}
        />
      </div>
    </>
  );
};

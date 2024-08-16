import {
  Field,
  Text,
  ComponentRendering,
  withDatasourceCheck,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type AnchorLinksProps = ComponentProps & {
  rendering: ComponentRendering;
  fields: {
    Headline: Field<string>;
    FullWidth: Field<boolean>;
  };
};

export const Default = withDatasourceCheck()<AnchorLinksProps>(
  (props: AnchorLinksProps): JSX.Element => {
    return (
      <div className="relative">
        <nav
          id="anchorLinks"
          className="sticky ml-auto z-50 top-10 right-[10%] max-w-[350px]  text-dark-blue boxShadow rounded-[40px] p-[40px] bg-white"
        >
          <Text
            tag="h4"
            className="text-dark-blue mb-[10px] border-b-[3px] border-solid pb-[20px]"
            field={props.fields.Headline}
          />
          <div className="mt-[30px]">
            <Placeholder name={`anchor-links`} rendering={props.rendering} />
          </div>
        </nav>
        <div className="-top-64 relative w-full">
          <Placeholder name={`anchor-content`} rendering={props.rendering} />
        </div>
      </div>
    );
  }
);

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
  };
};

export const Default = withDatasourceCheck()<AnchorLinksProps>(
  (props: AnchorLinksProps): JSX.Element => {
    return (
      <div className="container">
        <nav
          id="anchorLinks"
          className="lg:max-w-[350px] bg-white rounded-[40px] p-[40px] text-dark-blue boxShadow sticky top-0 right-0 lg:z-10"
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
      </div>
    );
  }
);

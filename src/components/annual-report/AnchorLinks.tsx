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
      <section className="py-[60px] lg:py-[120px]">
        <div className="container">
          <div className="grid grid-cols-2 gap-[171px]">
            <div></div>
            <nav
              id="anchorLinks"
              className="bg-white rounded-[40px] p-[40px] text-dark-blue boxShadow"
            >
              <Text
                tag="h4"
                className="text-dark-blue mb-[10px] border-b-[3px] border-solid pb-[20px]"
                field={props.fields.Headline}
              />
              <ul className="mt-[30px]">
                <Placeholder name={`anchor-links`} rendering={props.rendering} />
              </ul>
            </nav>
          </div>
        </div>
      </section>
    );
  }
);

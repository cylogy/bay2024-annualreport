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
    FullWidth: Field;
  };
};

export const Default = withDatasourceCheck()<AnchorLinksProps>(
  (props: AnchorLinksProps): JSX.Element => {
    return (
      <div className="relative">
        <nav className="sticky ml-auto z-50 top-10 right-[10%] max-w-[350px] shadow-lg">
          <div className="rounded-lg p-10 text-dark-blue bg-white">
            <Text
              field={props.fields.Headline}
              className="text-dark-blue mb-[10px] border-b-[3px] border-solid pb-[20px]"
            />
            <div className="mt-[30px]">
              <Placeholder name={`anchor-links`} rendering={props.rendering} />
            </div>
          </div>
        </nav>
        <div className={`-top-64 relative ${props.fields.FullWidth ? 'w-full' : 'w-2/3'}`}>
          {' '}
          <Placeholder name={`anchor-content`} rendering={props.rendering} />
        </div>
      </div>
    );
  }
);

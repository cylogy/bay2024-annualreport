import {
  Field,
  Text,
  ComponentRendering,
  withDatasourceCheck,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useEffect, useRef } from 'react';

type AnchorLinksProps = ComponentProps & {
  rendering: ComponentRendering;
  fields: {
    Headline: Field<string>;
    FullWidth: Field<boolean>;
  };
};

export const Default = withDatasourceCheck()<AnchorLinksProps>(
  (props: AnchorLinksProps): JSX.Element => {
    const navRef = useRef<HTMLDivElement>(null);
    const anchorsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      anchorsRef.current?.style.setProperty('--top', `-${navRef.current?.offsetHeight}px`);
    }, []);

    return (
      <div className="anchor-links" ref={anchorsRef}>
        <nav className="text-dark-blue shadow-none lg:shadow-3xl" ref={navRef}>
          <Text
            tag="span"
            className="h4 block mb-2.5 border-b border-solid pb-2.5"
            field={props.fields.Headline}
          />
          <div className="mt-[30px]">
            <Placeholder name={`anchor-links`} rendering={props.rendering} />
          </div>
        </nav>
        <div className="anchor-links__content">
          <Placeholder name={`anchor-content`} rendering={props.rendering} />
        </div>
      </div>
    );
  }
);

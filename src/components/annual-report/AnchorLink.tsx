import {
  Field,
  ComponentRendering,
  withDatasourceCheck,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { MouseEvent } from 'react';
import ScrollSpy from 'react-scrollspy-navigation';

type AnchorLinkProps = ComponentProps & {
  rendering: ComponentRendering;
  fields: {
    Name: Field<string>;
    AnchorID: Field<string>;
    Level: Field<string>;
  };
};

export const Default = withDatasourceCheck()<AnchorLinkProps>(
  ({ fields: { AnchorID, Level, Name } }: AnchorLinkProps): JSX.Element => {
    const onClickEach = (e: MouseEvent<HTMLAnchorElement>) => {
      const id = e.currentTarget.getAttribute('href')?.replace('#', '');
      document.getElementById(id ?? '')?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
      <ScrollSpy activeClass="active" offsetTop={0} threshold={0.9} onClickEach={onClickEach}>
        <a
          href={`#${AnchorID.value.trim()}`}
          className={`p2 ${Level.value === '2' ? 'indent' : ''}`}
        >
          <Text field={Name} />
        </a>
      </ScrollSpy>
    );
  }
);

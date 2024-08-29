import {
  ComponentRendering,
  Field,
  Text,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { MouseEvent, useEffect, useState } from 'react';

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
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
      const determineActiveSection = () => {
        const sections = document.querySelectorAll<HTMLDivElement>('.anchor-links__content [id]:not(button[id])');
        const sectionIds = [...sections].map((section) => section.getAttribute('id') ?? '');

        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const section = document.getElementById(sectionIds[i]);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) {
              setActiveLink(sectionIds[i]);
              break;
            }
          }
        }
      };

      window.addEventListener('scroll', determineActiveSection);
      return () => window.removeEventListener('scroll', determineActiveSection);
    }, []);

    const onClickEach = (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const id = e.currentTarget.getAttribute('href')?.replace('#', '');
      document.getElementById(id ?? '')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <a
        onClick={onClickEach}
        href={`#${AnchorID.value.trim()}`}
        className={`p2 ${Level.value === '2' ? 'indent' : ''} ${
          activeLink === AnchorID.value.trim() ? 'active' : ''
        }`}
      >
        <Text field={Name} />
      </a>
    );
  }
);

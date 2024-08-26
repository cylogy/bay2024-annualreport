import {
  useComponentProps,
  GetStaticComponentProps,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { getMainGlossary } from 'lib/graphql-utils';
import { GLOSSARY_ITEM } from 'lib/constants';
import { GlossaryQueryResult } from 'lib/graphql-queries/Glossary';
import BlueSquareBullet from './atoms/BlueSquareBullet';
import Accordion from './atoms/Accordion';

type GlossaryProps = ComponentProps;

type GlossaryQueryProps = {
  glossaryItems: GlossaryQueryResult;
};

export const Default = (props: GlossaryProps): JSX.Element => {
  const componentProps = useComponentProps<GlossaryQueryProps>(props.rendering.uid);
  return (
    <section className="py-[60px] lg:py-[120px]">
      <div className="container grid gap-[96px]">
        {componentProps?.glossaryItems.mainGlossary.children.results.map((item, index) => {
          if (!item) return;
          return (
            <section key={index} className="flex flex-col lg:flex-row gap-[20px] lg:gap-[70px]">
              <div>
                <BlueSquareBullet text={item.name} />
              </div>
              <div className="w-full lg:max-w-[835px]">
                <Accordion>
                  {item.children.results.map((term) => {
                    if (!term) return;
                    return (
                      <Accordion.Item Name={term.name} key={term.name}>
                        <RichText
                          field={term.description.jsonValue}
                          className="richtext text-dark-blue p1 rich-text-container"
                        />
                      </Accordion.Item>
                    );
                  })}
                </Accordion>
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticComponentProps = async () => {
  return {
    glossaryItems: await getMainGlossary(GLOSSARY_ITEM),
  };
};

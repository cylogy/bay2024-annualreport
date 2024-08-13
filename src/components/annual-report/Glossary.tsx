import { useComponentProps, GetStaticComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { getMainGlossary } from 'lib/graphql-utils';
import { GLOSSARY_ITEM } from 'lib/constants';
import { GlossaryQueryResult } from 'lib/graphql-queries/Glossary';
import BlueSquareBullet from './atoms/BlueSquareBullet';

type GlossaryProps = ComponentProps;

type GlossaryQueryProps = {
  glossaryItems: GlossaryQueryResult;
};

export const Default = (props: GlossaryProps): JSX.Element => {
  const componentProps = useComponentProps<GlossaryQueryProps>(props.rendering.uid);
  //const parentItems = componentProps?.glossaryItems?.mainGlossary?.children?.results;
  console.log('glossary componentProps', componentProps);
  //console.log('glossary items', parentItems);
  //console.log('item props', props);

  return (
    <div className="pt-[200px]">
      <section className="py-[60px] lg:py-[120px]">
        <div className="container grid gap-[96px]">
          {componentProps?.glossaryItems.mainGlossary.children.results.map((item, index) => (
            <section key={index} className="flex gap-[70px]">
              <div>
                <BlueSquareBullet text={item.name} />
              </div>
              <div>
                {item.children.results.map((term) => (
                  <h1 key={term.name}>{term.term.jsonValue.value}</h1>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticComponentProps = async () => {
  return {
    glossaryItems: await getMainGlossary(GLOSSARY_ITEM),
  };
};

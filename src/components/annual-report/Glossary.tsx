import { useComponentProps, GetStaticComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { getMainGlossary } from 'lib/graphql-utils';
import { GLOSSARY_ITEM } from 'lib/constants';
import { GlossaryQueryResult } from 'lib/graphql-queries/Glossary';

type GlossaryProps = ComponentProps;

type GlossaryQueryProps = {
  glossaryItems: GlossaryQueryResult;
};

export const Default = (props: GlossaryProps): JSX.Element => {
  const componentProps = useComponentProps<GlossaryQueryProps>(props.rendering.uid);
  console.log('glossary items');
  console.log(componentProps);
  console.log('glossary items 1');
  console.log(componentProps?.glossaryItems?.mainGlossary);
  const info = props;
  console.log('item props');
  console.log(info);
  return <></>;
};

export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData, context) => {
  return {
    glossaryItems: await getMainGlossary(GLOSSARY_ITEM),
  };
};

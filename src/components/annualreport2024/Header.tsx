import {
  ImageField,
  LayoutServiceData,
  useComponentProps,
  GetStaticComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { HeaderMenuQueryResult } from 'lib/graphql-queries/HeaderMenu';
import { getHeaderMenu } from 'lib/graphql-utils';
import { MENU_ITEM } from 'lib/constants';

type HeaderProps = ComponentProps & {
  layoutData: LayoutServiceData;
  fields: {
    logoDesktop: ImageField;
    logoMobile: ImageField;
  };
};

type MenuHeaderQueryProps = {
  menuItems: HeaderMenuQueryResult;
};

export const Default = (props: HeaderProps): JSX.Element => {
  const componentProps = useComponentProps<MenuHeaderQueryProps>(props.rendering.uid);
  console.log('menu items');
  console.log(componentProps);
  const info = props;
  console.log('item props');
  console.log(info);
  return <></>;
};

export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData, context) => {
  return {
    mainMenuItems: await getHeaderMenu(MENU_ITEM),
  };
};

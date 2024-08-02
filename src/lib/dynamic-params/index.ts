import { ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
import { ReactElement, ReactNode } from 'react';

export const injectDynamicParams = (
  components: ReactNode[],
  params: ComponentParams
): ReactNode[] => {
  const finalComponents: ReactNode[] = [];

  components.forEach((component, index: number) => {
    const componentAsElement = component as ReactElement;
    const clonedComponent = React.cloneElement(componentAsElement, {
      params: { ...componentAsElement.props.params, ...params, index },
    });

    finalComponents.push(clonedComponent);
  });

  return finalComponents;
};

import { GraphQLClient } from 'graphql-request';
import HeaderMenu, {
  MenuChild,
  HeaderMenuQueryResult,
  ItemQueryResult,
} from 'lib/graphql-queries/HeaderMenu';

import MainGlossary, {
  GlossaryChild,
  GlossaryQueryResult,
  GlossaryItemQueryResult,
} from 'lib/graphql-queries/Glossary';
import { sitecoreApiKey, graphQLEndpoint } from 'temp/config';

function getGraphQLClient(): GraphQLClient {
  if (!sitecoreApiKey || !graphQLEndpoint) {
    console.error('No Sitecore API Key, Sitemap Root ID and/or public URL configured for the site');
    return {} as GraphQLClient;
  }

  const client = new GraphQLClient(graphQLEndpoint);
  client.setHeader('sc_apikey', sitecoreApiKey);
  return client;
}

const getHeaderMenu = async (menuItem: string): Promise<HeaderMenuQueryResult> => {
  const graphQLClient = getGraphQLClient();
  const result = await graphQLClient.request<HeaderMenuQueryResult>(HeaderMenu(menuItem));
  for (let index = 0; index < result.headerMenu.children.results.length; index++) {
    result.headerMenu.children.results[index].children = { results: [] };
    if (result.headerMenu.children.results[index].hasChildren) {
      result.headerMenu.children.results[index].children.results = await getHeaderChildMenu(
        result.headerMenu.children.results[index].id ?? ''
      );
    }
  }

  return result;
};
const getHeaderChildMenu = async <T = unknown>(menuChild: string): Promise<T[]> => {
  const graphQLClient = getGraphQLClient();
  let nextCursor = true;
  let endCursor = '';
  const items: T[] = [];
  while (nextCursor) {
    // eslint-disable-next-line
    const result: any = await graphQLClient.request<ItemQueryResult>(
      MenuChild(menuChild, nextCursor, endCursor)
    );
    if (result != undefined) {
      items.push(...result.itemMenu.children.results);
      nextCursor = result.itemMenu.children.pageInfo.hasNext;
      endCursor = result.itemMenu.children.pageInfo.endCursor;
    }
  }
  return items;
};

const getMainGlossary = async (glossaryItem: string): Promise<GlossaryQueryResult> => {
  const graphQLClient = getGraphQLClient();
  const result = await graphQLClient.request<GlossaryQueryResult>(MainGlossary(glossaryItem));
  for (let index = 0; index < result.mainGlossary.children.results.length; index++) {
    result.mainGlossary.children.results[index].children = { results: [] };
    if (result.mainGlossary.children.results[index].hasChildren) {
      result.mainGlossary.children.results[index].children.results = await getGlossaryChild(
        result.mainGlossary.children.results[index].id ?? ''
      );
    }
  }

  return result;
};
const getGlossaryChild = async <T = unknown>(glossaryChild: string): Promise<T[]> => {
  const graphQLClient = getGraphQLClient();
  let nextCursor = true;
  let endCursor = '';
  const items: T[] = [];
  while (nextCursor) {
    // eslint-disable-next-line
    const result: any = await graphQLClient.request<GlossaryItemQueryResult>(
      GlossaryChild(glossaryChild, nextCursor, endCursor)
    );
    if (result != undefined) {
      items.push(...result.itemGlossary.children.results);
      nextCursor = result.itemGlossary.children.pageInfo.hasNext;
      endCursor = result.itemGlossary.children.pageInfo.endCursor;
    }
  }
  return items;
};

export { getGraphQLClient, getHeaderMenu, getHeaderChildMenu, getMainGlossary, getGlossaryChild };

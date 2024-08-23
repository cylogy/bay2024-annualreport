import gql from 'graphql-tag';

const HeaderMenu = (menuItem: string) =>
  gql`
    query {
      headerMenu: item(path: "${menuItem}", language: "EN") {
        children {
          results {
            hasChildren
            id
            title: field(name: "title") {
              jsonValue
            }
            cta: field(name: "cta") {
              jsonValue
            }            
          }
        }
      }
    }
  `;
const MenuChild = (menuChild: string, hasNext: boolean, endCursor: string) =>
  gql`
    query {
      itemMenu: item(path: "${menuChild}", language: "EN") {
        children ${hasNext ? '(after:"' + endCursor + '")' : ''}{
          pageInfo {
            endCursor
            hasNext
          }
          results {
            name
            cta: field(name: "cta") {
              jsonValue
            }
            description: field(name: "description") {
              jsonValue
            }
            image: field(name: "image") {
            jsonValue
            }
          }
        }
      }
    }
  `;
type HeaderMenuQueryResult = {
  headerMenu: {
    children: {
      results: {
        hasChildren?: boolean;
        id?: string;
        title: {
          jsonValue: {
            value?: string;
          };
        };
        cta: {
          jsonValue: {
            value?: {
              href?: string;
              text?: string;
              querystring?: string;
              linktype?: string;
              target?: string;
            };
          };
        };
        children: {
          results: ItemResult[];
        };
      }[];
    };
  };
};
type ItemQueryResult = {
  itemMenu: {
    children: {
      pageInfo?: {
        endCursor?: string;
        hasNext?: boolean;
      };
      results: ItemResult[];
    };
  };
};
type ItemResult = {
  name: string;
  cta: {
    jsonValue: {
      value?: {
        href?: string;
        text?: string;
        querystring?: string;
      };
    };
  };
  description: {
    jsonValue: {
      value?: string;
    };
  };
  image: {
    jsonValue: {
      value?: {
        src?: string;
        alt?: string;
      };
    };
  };
};

export default HeaderMenu;
export { MenuChild };
export type { HeaderMenuQueryResult, ItemQueryResult, ItemResult };

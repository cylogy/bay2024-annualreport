import gql from 'graphql-tag';

const MainGlossary = (glossary: string) =>
  gql`
    query {
      mainGlossary: item(path: "${glossary}", language: "EN") {
        children (
            first: 27
          ){
          results {
            hasChildren
            id
            name        
          }
        }
      }
    }
  `;
const GlossaryChild = (glossaryChild: string, hasNext: boolean, endCursor: string) =>
  gql`
    query {
      itemGlossary: item(path: "${glossaryChild}", language: "EN") {
        children ${hasNext ? '(after:"' + endCursor + '")' : ''}{
          pageInfo {
            endCursor
            hasNext
          }
          results {
            name
            anchorId: field(name: "AnchorID") {
              jsonValue
            }
            term: field(name: "term") {
              jsonValue
            }
            description: field(name: "description") {
              jsonValue
            }
          }
        }
      }
    }
  `;
type GlossaryQueryResult = {
  mainGlossary: {
    children: {
      results: [
        {
          hasChildren?: boolean;
          id: string;
          name: string;
          children: {
            results: ItemResult[];
          };
        }
      ];
    };
  };
};
type GlossaryItemQueryResult = {
  itemGlossary: {
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
  anchorId: {
    jsonValue: {
      value?: string;
    };
  };
  term: {
    jsonValue: {
      value?: string;
    };
  };
  description: {
    jsonValue: {
      value?: string;
    };
  };
};

export default MainGlossary;
export { GlossaryChild };
export type { GlossaryQueryResult, GlossaryItemQueryResult, ItemResult };

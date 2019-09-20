import gql from 'graphql-tag';

export let removeProductTypeFromUserCartMutationFragments: any = {
  DefaultFragment: gql`
    fragment fragment on UserCart {
      id
    }
  `
};

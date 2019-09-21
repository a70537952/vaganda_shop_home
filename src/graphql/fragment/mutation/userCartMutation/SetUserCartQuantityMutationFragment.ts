import gql from 'graphql-tag';

export let setUserCartQuantityMutationFragments: any = {
  DefaultFragment: gql`
    fragment fragment on UserCart {
      id
      quantity
    }
  `
};

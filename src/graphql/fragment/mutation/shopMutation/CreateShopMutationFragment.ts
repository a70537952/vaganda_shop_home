import gql from 'graphql-tag';

export let createShopMutationFragments: any = {
  DefaultFragment: gql`
    fragment fragment on Shop {
      id
    }
  `
};

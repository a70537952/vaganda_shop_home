import gql from 'graphql-tag';

export let addProductTypeToUserCartMutationFragments: any = {
  DefaultFragment: gql`
    fragment fragment on UserCart {
      id
    }
  `,
  Product: gql`
    fragment fragment on UserCart {
      id
      user_id
      product_type_id
    }
  `
};

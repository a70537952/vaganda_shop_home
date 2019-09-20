import gql from 'graphql-tag';

export let userCartFragments: any = {
  UserCartButton: gql`
    fragment fragment on UserCart {
      id
      user_id
      product_type_id
      quantity

      product_type {
        id
        product_id
        title
        quantity
        currency
        final_price
        product_type_image {
          id
          product_type_id
          path
          image_small
          image_medium
          image_large
          image_original
        }

        product {
          id
          title
          product_image {
            id
            product_id
            path
            image_small
          }
        }
      }
    }
  `
};

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
  `,
  UserCart: gql`
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
        price
        currency
        discount
        discount_unit
        discounted_price
        final_price
        discount_amount
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
          product_shipping {
            id
            product_id
            shipping_method
            shipping_currency
            shipping_fee
            shipping_country
            is_disabled
          }
        }
      }
    }
  `
};

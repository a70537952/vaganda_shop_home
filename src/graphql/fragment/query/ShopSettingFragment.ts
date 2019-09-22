import gql from 'graphql-tag';

export let shopSettingFragments: any = {
  ShopHome: gql`
    fragment fragment on ShopSetting {
      id
      shop_id
      title
      value
      shop {
        id
        name
        product_count
        created_at
        shop_info {
          id
          summary
          logo
          logo_medium
          logo_large
          banner
          banner_medium
          banner_large
        }
        shop_product_category {
          id
          shop_id
          title
        }
      }
    }
  `
};

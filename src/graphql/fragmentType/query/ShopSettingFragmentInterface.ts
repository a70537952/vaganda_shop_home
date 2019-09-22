export interface IShopSettingFragmentShopHome {
  id: string;
  shop_id: string;
  title: string;
  value: string;
  shop: {
    id: string;
    name: string;
    product_count: string;
    created_at: string;
    shop_info: {
      id: string;
      summary: string;
      logo: string;
      logo_medium: string;
      logo_large: string;
      banner: string;
      banner_medium: string;
      banner_large: string;
    };
    shop_product_category: {
      id: string;
      shop_id: string;
      title: string;
    }[];
  };
}

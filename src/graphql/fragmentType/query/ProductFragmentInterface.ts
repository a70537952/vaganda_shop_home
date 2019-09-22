export interface IProductFragmentProductList {
  id: string;
  title: string;
  product_category_id: string;
  description: string;
  extra_option: {
    key: string;
    value: string;
  }[];
  width: string;
  width_unit: string;
  height: string;
  height_unit: string;
  length: string;
  length_unit: string;
  weight: string;
  weight_unit: string;
  is_publish: number;
  created_at: string;

  product_image: {
    id: string;
    product_id: string;
    path: string;
    image_medium: string;
    image_large: string;
    image_original: string;
  };

  product_category: {
    id: string;
    title: string;
  };

  product_type: {
    id: string;
    product_id: string;
    title: string;
    quantity: string;
    cost: string;
    cost_currency: string;
    price: string;
    currency: string;
    discount: string;
    discount_unit: string;
    discounted_price: string;
    final_price: string;
    discount_amount: string;
    product_type_image: {
      id: string;
      product_type_id: string;
      path: string;
      image_medium: string;
      image_large: string;
      image_original: string;
    };
  }[];

  product_shipping: {
    id: string;
    product_id: string;
    shipping_method: string;
    shipping_fee: string;
    shipping_country: string;
    is_disabled: number;
  }[];

  shop_product_category_product: {
    id: string;
    shop_product_category_id: string;
    shop_product_category: {
      id: string;
      title: string;
    };
  };
}

export interface IProductFragmentModalCreateEditProduct {
  id: string;
  title: string;
  product_category_id: string;
  description: string;
  extra_option: {
    key: string;
    value: string;
  }[];
  width: string;
  width_unit: string;
  height: string;
  height_unit: string;
  length: string;
  length_unit: string;
  weight: string;
  weight_unit: string;
  is_publish: number;
  created_at: string;

  product_image: {
    id: string;
    product_id: string;
    path: string;
    image_medium: string;
    image_large: string;
    image_original: string;
  };

  product_category: {
    id: string;
    title: string;
  };

  product_type: {
    id: string;
    product_id: string;
    title: string;
    quantity: string;
    cost: string;
    cost_currency: string;
    price: string;
    currency: string;
    discount: string;
    discount_unit: string;
    discounted_price: string;
    final_price: string;
    discount_amount: string;
    product_type_image: {
      id: string;
      product_type_id: string;
      path: string;
      image_medium: string;
      image_large: string;
      image_original: string;
    };
  }[];

  product_shipping: {
    id: string;
    product_id: string;
    shipping_method: string;
    shipping_fee: string;
    shipping_country: string;
    is_disabled: number;
  }[];

  shop_product_category_product: {
    id: string;
    shop_product_category_id: string;
    shop_product_category: {
      id: string;
      title: string;
    };
  };
}

export interface IProductFragmentProduct {
  id: string;
  shop_id: string;
  title: string;
  product_category_id: string;
  description: string;
  extra_option: {
    key: string;
    value: string;
  }[];
  width: string;
  width_unit: string;
  height: string;
  height_unit: string;
  length: string;
  length_unit: string;
  weight: string;
  weight_unit: string;
  is_publish: string;
  created_at: string;
  product_rating: number;
  one_star_comment_count: number;
  two_star_comment_count: number;
  three_star_comment_count: number;
  four_star_comment_count: number;
  five_star_comment_count: number;

  product_image: {
    id: string;
    product_id: string;
    path: string;
    image_small: string;
    image_medium: string;
    image_large: string;
    image_original: string;
    image_extra: string;
  }[];

  product_category: {
    id: string;
    title: string;
  };

  product_type: {
    id: string;
    product_id: string;
    title: string;
    quantity: string;
    cost: string;
    cost_currency: string;
    price: string;
    currency: string;
    discount: string;
    discount_unit: string;
    discounted_price: string;
    final_price: string;
    discount_amount: string;
    product_type_image: {
      id: string;
      product_type_id: string;
      path: string;
      image_small: string;
      image_medium: string;
      image_large: string;
      image_extra: string;
      image_original: string;
    }[];
  }[];

  shop: {
    id: string;
    name: string;
    product_count: string;
    created_at: string;
    shop_info: {
      id: string;
      logo: string;
      logo_medium: string;
      banner: string;
      banner_large: string;
    };
    shop_setting: {
      id: string;
      title: string;
      value: string;
    };
  };

  shop_product_category_product: {
    id: string;
    shop_product_category_id: string;
    shop_product_category: {
      id: string;
      title: string;
    };
  };
}

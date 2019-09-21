export interface IUserCartFragmentUserCartButton {
  id: string;
  user_id: string;
  product_type_id: string;
  quantity: string;

  product_type: {
    id: string;
    product_id: string;
    title: string;
    quantity: string;
    currency: string;
    final_price: string;
    product_type_image: {
      id: string;
      product_type_id: string;
      path: string;
      image_small: string;
      image_medium: string;
      image_large: string;
      image_original: string;
    };

    product: {
      id: string;
      title: string;
      product_image: {
        id: string;
        product_id: string;
        path: string;
        image_small: string;
      }[];
    };
  };
}

export interface IUserCartFragmentUserCart {
  id: string;
  user_id: string;
  product_type_id: string;
  quantity: string;

  product_type: {
    id: string;
    product_id: string;
    title: string;
    quantity: string;
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
      image_original: string;
    };

    product: {
      id: string;
      title: string;
      product_image: {
        id: string;
        product_id: string;
        path: string;
        image_small: string;
      };
      product_shipping: {
        id: string;
        product_id: string;
        shipping_method: string;
        shipping_currency: string;
        shipping_fee: string;
        shipping_country: string;
        is_disabled: number;
      };
    };
  };
}

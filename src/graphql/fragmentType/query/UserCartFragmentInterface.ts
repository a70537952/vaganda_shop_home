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
      };
    };
  };
}

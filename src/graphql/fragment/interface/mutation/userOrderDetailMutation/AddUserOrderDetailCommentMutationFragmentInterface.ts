export interface IAddUserOrderDetailCommentMutationFragmentInterfaceFragmentModalAddUserOrderDetailComment {
  id: string;
  is_commented: number;
  order_detail_comment: {
    id: string;
    comment: string;
    star: string;
    user_order_detail_comment_image: {
      id: string;
      path: string;
      image_medium: string;
      image_original: string;
    };
  };
}

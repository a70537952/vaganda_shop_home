import Button from '@material-ui/core/Button';
import React from 'react';
import {useTranslation} from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useRemoveProductTypeFromUserCartMutation} from '../../../graphql/mutation/userCartMutation/RemoveProductTypeFromUserCartMutation';
import {DocumentNode} from 'graphql';
import {ApolloError} from 'apollo-client';

interface IProps<FragmentInterface = any> {
  userCart: IUserCart;
  disabled?: boolean;
  onCompleted?: (data: {
    removeProductTypeFromUserCartMutation: FragmentInterface[];
  }) => void;
  onError?: (error: ApolloError) => void;
  fragment: DocumentNode;
}

interface IUserCart {
  id: string;

  [key: string]: any;
}

export default function UserCartRemoveButton<FragmentInterface = any>(
  props: IProps<FragmentInterface>
) {
  const { t } = useTranslation();
  const { userCart, disabled, onCompleted, onError, fragment } = props;

  const [
    removeProductTypeFromUserCartMutation,
    { loading: isRemovingProductTypeFromUserCartMutation }
  ] = useRemoveProductTypeFromUserCartMutation<FragmentInterface>(fragment, {
    onCompleted: data => {
      if (onCompleted) {
        onCompleted(data);
      }
    },
    onError: error => {
      if (onError) {
        onError(error);
      }
    }
  });

  function onClickRemoveProductTypeFromUserCart(user_cart_id: string) {
    removeProductTypeFromUserCartMutation({
      variables: {
        user_cart_ids: [user_cart_id]
      }
    });
  }

  return (
    <>
      {isRemovingProductTypeFromUserCartMutation ? (
        <Button size="small" variant="text">
          <CircularProgress size={15} />
        </Button>
      ) : (
        <Button
          size="small"
          variant="text"
          disabled={disabled}
          onClick={() => {
            onClickRemoveProductTypeFromUserCart(userCart.id);
          }}
        >
          {t('remove')}
        </Button>
      )}
    </>
  );
}

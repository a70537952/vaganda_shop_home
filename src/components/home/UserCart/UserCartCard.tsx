import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import { homePath } from '../../../utils/RouteUtil';
import Image from '../../Image';
import ProductTitle from '../../ProductTitle';
import useToast from '../../_hook/useToast';
import { useRemoveProductTypeFromUserCartMutation } from '../../../graphql/mutation/userCartMutation/RemoveProductTypeFromUserCartMutation';
import { removeProductTypeFromUserCartMutationFragments } from '../../../graphql/fragment/mutation/userCartMutation/RemoveProductTypeFromUserCartMutationFragment';
import { IRemoveProductTypeFromUserCartMutationFragmentDefaultFragment } from '../../../graphql/fragmentType/mutation/userCartMutation/MutationFragmentInterface';

interface IProps {
  userCart: any;
  onRemoved?: () => void;
}

export default function UserCartCard(props: IProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { userCart, onRemoved } = props;

  const [
    removeProductTypeFromUserCartMutation,
    { loading: isRemovingProductTypeFromUserCartMutation }
  ] = useRemoveProductTypeFromUserCartMutation<
    IRemoveProductTypeFromUserCartMutationFragmentDefaultFragment
  >(removeProductTypeFromUserCartMutationFragments.DefaultFragment, {
    onCompleted: () => {
      toast.default(t('product successfully remove from cart'));
      if (onRemoved) {
        onRemoved();
      }
    },
    onError: () => {
      toast.error(
        t('something went wrong. please refresh the page and try again.')
      );
    }
  });

  function onClickRemoveProductTypeFromUserCart(user_cart_id: number) {
    removeProductTypeFromUserCartMutation({
      variables: {
        user_cart_ids: [user_cart_id]
      }
    });
  }

  return (
    <Grid container item key={userCart.id} spacing={1} alignItems="center">
      <Grid item xs={2}>
        <Link
          to={homePath('product', {
            productId: userCart.product_type.product.id
          })}
        >
          <Image
            alt={userCart.product_type.product.title}
            useLazyLoad
            src={userCart.product_type.product.product_image[0].image_small}
            style={{
              width: '100%',
              height: '54px'
            }}
          />
        </Link>
      </Grid>
      <Grid item container xs={10}>
        <Grid item container justify="space-between">
          <Grid item>
            <ProductTitle
              variant="subtitle1"
              color={'inherit'}
              withLink
              product={userCart.product_type.product}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle1"
              color="primary"
              {...({
                component: Link,
                to: homePath('product', {
                  productId: userCart.product_type.product.id
                })
              } as any)}
            >
              {userCart.product_type.currency}{' '}
              {userCart.product_type.final_price}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container justify="space-between" alignItems="center">
          <Grid item>
            <Typography
              variant="body2"
              color={'inherit'}
              {...({
                component: Link,
                to: homePath('product', {
                  productId: userCart.product_type.product.id
                })
              } as any)}
            >
              {t('variation')}
              :&nbsp;
              {userCart.product_type.title}
              &nbsp; X &nbsp;
              {userCart.quantity}
            </Typography>
          </Grid>
          <Grid item>
            {isRemovingProductTypeFromUserCartMutation ? (
              <Button size="small" variant="text">
                <CircularProgress size={15} />
              </Button>
            ) : (
              <Button
                size="small"
                variant="text"
                onClick={() => {
                  onClickRemoveProductTypeFromUserCart(userCart.id);
                }}
              >
                {t('remove')}
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

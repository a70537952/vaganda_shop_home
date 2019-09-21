import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { homePath } from '../../../utils/RouteUtil';
import Image from '../../Image';
import ProductTitle from '../../ProductTitle';
import useToast from '../../_hook/useToast';
import { removeProductTypeFromUserCartMutationFragments } from '../../../graphql/fragment/mutation/userCartMutation/RemoveProductTypeFromUserCartMutationFragment';
import { IRemoveProductTypeFromUserCartMutationFragmentDefaultFragment } from '../../../graphql/fragmentType/mutation/userCartMutation/RemoveProductTypeFromUserCartMutationFragmentInterface';
import UserCartRemoveButton from './UserCartRemoveButton';

interface IProps {
  userCart: IUserCart;
  onRemoved?: () => void;
}

interface IUserCart {
  id: string;
  product_type: {
    quantity: string;
    title: string;
    currency: string;
    final_price: string;
    product: {
      id: string;
      title: string;
      product_image: {
        image_small: string;
      }[];
    };
  };

  [key: string]: any;
}

export default function UserCartCard(props: IProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { userCart, onRemoved } = props;

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
            <UserCartRemoveButton<
              IRemoveProductTypeFromUserCartMutationFragmentDefaultFragment
            >
              userCart={userCart}
              fragment={
                removeProductTypeFromUserCartMutationFragments.DefaultFragment
              }
              onCompleted={() => {
                toast.default(t('product successfully remove from cart'));
                if (onRemoved) {
                  onRemoved();
                }
              }}
              onError={() => {
                toast.error(
                  t(
                    'something went wrong. please refresh the page and try again.'
                  )
                );
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
import Store from '@material-ui/icons/Store';
import classnames from 'classnames';
import React from 'react';
import {StyledComponentProps} from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import {homePath} from '../utils/RouteUtil';

interface IProps extends StyledComponentProps {
  shop: any;
  className?: string;
  withLink?: boolean;
  imageSize?:
    | 'logo_original'
    | 'logo_small'
    | 'logo_medium'
    | 'logo_large'
    | 'logo_extra';
}

const useStyles = makeStyles({
  logo: {
    width: 30,
    height: 30
  }
});

export default function ShopLogo(props: IProps) {
  const classes = useStyles();
  const { className, shop, withLink, imageSize } = props;

  let shopLink: any = {
    ...(withLink && shop && shop.shop_setting
      ? {
          component: Link,
          to: homePath('shopHome', {
            account: shop.shop_setting.find(
              (setting: any) => setting.title === 'account'
            ).value
          })
        }
      : ({} as any))
  };

  let logoClass = classnames(classes.logo, className);
  let imageKey = imageSize || 'logo_medium';

  return (
    <React.Fragment>
      {shop ? (
        <React.Fragment>
          {shop.shop_info && shop.shop_info.logo && shop.shop_info[imageKey] ? (
            <Avatar
              src={shop.shop_info[imageKey]}
              className={logoClass}
              {...shopLink}
            />
          ) : (
            <Avatar className={logoClass} {...shopLink}>
              {shop.name[0].toUpperCase()}
            </Avatar>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Store className={className} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

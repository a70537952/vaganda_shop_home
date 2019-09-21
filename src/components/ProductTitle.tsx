import React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { homePath } from '../utils/RouteUtil';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface IProduct {
  id: string;
  title: string;

  [key: string]: any;
}

interface IProps extends TypographyProps {
  product: IProduct;
  className?: string;
  withLink?: boolean;
}

export default function ProductTitle(props: IProps) {
  const {
    className,
    product,
    color,
    align,
    gutterBottom,
    variant,
    withLink,
    display
  } = props;

  let productLink: any = {
    ...((withLink && product && product.id
      ? {
          component: Link,
          to: homePath('product', { productId: product.id })
        }
      : {}) as any)
  };

  return (
    <Typography
      variant={variant}
      className={classNames(className, {
        pointer: withLink
      })}
      gutterBottom={gutterBottom}
      color={color}
      align={align}
      display={display}
      {...productLink}
    >
      {product.title}
    </Typography>
  );
}

import home from '../routes/home';
import seller from '../routes/seller';

export type IHomeRoutePathName =
  | 'home'
  | 'account'
  | 'accountEdit'
  | 'accountEditAddress'
  | 'accountEditContact'
  | 'accountEditPassword'
  | 'createShop'
  | 'resetPassword'
  | 'shopHome'
  | 'search'
  | 'product'
  | 'userCart'
  | 'myOrder'
  | 'myOrderShip'
  | 'myOrderReceive'
  | 'myOrderComplete'
  | 'myOrderCancel'
  | 'error404';

let getPath = (routesFile: any, pathName: string, params: any = {}) => {
  if (routesFile[pathName]) {
    let path = routesFile[pathName].path;

    Object.keys(params).forEach((key: string) => {
      path = path.replace(':' + key, params[key]);
    });

    return path;
  } else {
    console.log('pathNotFound:' + pathName);
  }
};

export let homePath = (pathName: IHomeRoutePathName, params: any = {}) => {
  return getPath(home, pathName, params);
};

export let sellerPath = (pathName: string, params: any = {}) => {
  return getPath(seller, pathName, params);
};
